-- Cohort funnel: signup → first analysis → upgrade-intent → checkout
--
-- Drop into Supabase SQL editor. Assumes the `analytics_events` scaffold
-- below; if you have an existing events table with different column names,
-- the CTEs at the bottom are the only thing you need to rewrite.
--
-- Funnel steps (event_name values):
--   1. signup                — auth.users row created (handled by trigger)
--   2. first_analysis        — user ran their first video audit
--   3. checkout_started      — clicked upgrade / opened Stripe checkout
--   4. checkout_completed    — Stripe webhook fired checkout.session.completed
--
-- The `signup` event is auto-populated by a trigger on auth.users so the
-- analytics table is the single source of truth for the funnel.

-- ─────────────────────────────────────────────────────────────────────────
-- 1. Schema scaffold
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.analytics_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  event_name  text not null,
  properties  jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists analytics_events_user_event_idx
  on public.analytics_events (user_id, event_name, occurred_at desc);

create index if not exists analytics_events_event_time_idx
  on public.analytics_events (event_name, occurred_at desc);

-- Row-level security: users see only their own events; service role
-- (used by the cohort queries below) sees everything.
alter table public.analytics_events enable row level security;

drop policy if exists "users see own events" on public.analytics_events;
create policy "users see own events" on public.analytics_events
  for select using (auth.uid() = user_id);

drop policy if exists "users insert own events" on public.analytics_events;
create policy "users insert own events" on public.analytics_events
  for insert with check (auth.uid() = user_id);

-- Auto-record signup the moment auth.users gets a row.
create or replace function public.record_signup_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.analytics_events (user_id, event_name, occurred_at)
  values (new.id, 'signup', new.created_at);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_signup on auth.users;
create trigger on_auth_user_created_signup
  after insert on auth.users
  for each row execute function public.record_signup_event();

-- ─────────────────────────────────────────────────────────────────────────
-- 2. Overall funnel: counts + step-over-step drop-off
-- ─────────────────────────────────────────────────────────────────────────
-- Run-as: service role (so RLS doesn't filter to the caller's user).

with first_per_user as (
  select
    user_id,
    event_name,
    min(occurred_at) as first_at
  from public.analytics_events
  where event_name in ('signup', 'first_analysis', 'checkout_started', 'checkout_completed')
  group by user_id, event_name
),
pivoted as (
  select
    user_id,
    max(first_at) filter (where event_name = 'signup')              as signed_up_at,
    max(first_at) filter (where event_name = 'first_analysis')      as first_analysis_at,
    max(first_at) filter (where event_name = 'checkout_started')    as checkout_started_at,
    max(first_at) filter (where event_name = 'checkout_completed')  as checkout_completed_at
  from first_per_user
  group by user_id
),
counts as (
  select
    count(*) filter (where signed_up_at           is not null) as n_signup,
    count(*) filter (where first_analysis_at      is not null) as n_first_analysis,
    count(*) filter (where checkout_started_at    is not null) as n_checkout_started,
    count(*) filter (where checkout_completed_at  is not null) as n_checkout_completed
  from pivoted
)
select
  n_signup,
  n_first_analysis,
  n_checkout_started,
  n_checkout_completed,
  round(100.0 * n_first_analysis     / nullif(n_signup, 0), 1)            as pct_activated,
  round(100.0 * n_checkout_started   / nullif(n_first_analysis, 0), 1)    as pct_intent_after_activation,
  round(100.0 * n_checkout_completed / nullif(n_checkout_started, 0), 1)  as pct_completed_checkout,
  round(100.0 * n_checkout_completed / nullif(n_signup, 0), 1)            as pct_signup_to_paid
from counts;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. Weekly signup cohorts: how does activation/conversion shift over time?
-- ─────────────────────────────────────────────────────────────────────────

with first_per_user as (
  select user_id, event_name, min(occurred_at) as first_at
  from public.analytics_events
  where event_name in ('signup', 'first_analysis', 'checkout_started', 'checkout_completed')
  group by user_id, event_name
),
pivoted as (
  select
    user_id,
    date_trunc('week', max(first_at) filter (where event_name = 'signup'))::date as cohort_week,
    max(first_at) filter (where event_name = 'signup')             as signed_up_at,
    max(first_at) filter (where event_name = 'first_analysis')     as first_analysis_at,
    max(first_at) filter (where event_name = 'checkout_started')   as checkout_started_at,
    max(first_at) filter (where event_name = 'checkout_completed') as checkout_completed_at
  from first_per_user
  group by user_id
)
select
  cohort_week,
  count(*) filter (where signed_up_at is not null)          as signups,
  count(*) filter (where first_analysis_at is not null)     as activated,
  count(*) filter (where checkout_started_at is not null)   as started_checkout,
  count(*) filter (where checkout_completed_at is not null) as paid,
  round(100.0 * count(*) filter (where first_analysis_at is not null)
              / nullif(count(*) filter (where signed_up_at is not null), 0), 1) as activation_pct,
  round(100.0 * count(*) filter (where checkout_completed_at is not null)
              / nullif(count(*) filter (where signed_up_at is not null), 0), 1) as paid_pct
from pivoted
where cohort_week is not null
group by cohort_week
order by cohort_week desc
limit 12;

-- ─────────────────────────────────────────────────────────────────────────
-- 4. Time-to-conversion: how long does it take cohort members to convert?
-- ─────────────────────────────────────────────────────────────────────────
-- Median (50p) and 90p of the time between successive funnel steps.

with first_per_user as (
  select user_id, event_name, min(occurred_at) as first_at
  from public.analytics_events
  where event_name in ('signup', 'first_analysis', 'checkout_started', 'checkout_completed')
  group by user_id, event_name
),
pivoted as (
  select
    user_id,
    max(first_at) filter (where event_name = 'signup')             as signed_up_at,
    max(first_at) filter (where event_name = 'first_analysis')     as first_analysis_at,
    max(first_at) filter (where event_name = 'checkout_started')   as checkout_started_at,
    max(first_at) filter (where event_name = 'checkout_completed') as checkout_completed_at
  from first_per_user
  group by user_id
)
select
  'signup → first_analysis'      as step,
  percentile_cont(0.50) within group (order by extract(epoch from (first_analysis_at     - signed_up_at))         / 3600.0) as p50_hours,
  percentile_cont(0.90) within group (order by extract(epoch from (first_analysis_at     - signed_up_at))         / 3600.0) as p90_hours
from pivoted where first_analysis_at     is not null and signed_up_at         is not null
union all
select
  'first_analysis → checkout_started',
  percentile_cont(0.50) within group (order by extract(epoch from (checkout_started_at   - first_analysis_at))    / 3600.0),
  percentile_cont(0.90) within group (order by extract(epoch from (checkout_started_at   - first_analysis_at))    / 3600.0)
from pivoted where checkout_started_at   is not null and first_analysis_at    is not null
union all
select
  'checkout_started → checkout_completed',
  percentile_cont(0.50) within group (order by extract(epoch from (checkout_completed_at - checkout_started_at))  / 3600.0),
  percentile_cont(0.90) within group (order by extract(epoch from (checkout_completed_at - checkout_started_at))  / 3600.0)
from pivoted where checkout_completed_at is not null and checkout_started_at  is not null;

-- ─────────────────────────────────────────────────────────────────────────
-- 5. Stuck users: signed up, never activated (7+ days ago)
-- ─────────────────────────────────────────────────────────────────────────
-- The list to target with re-engagement email / in-app prompt.

with first_per_user as (
  select user_id, event_name, min(occurred_at) as first_at
  from public.analytics_events
  where event_name in ('signup', 'first_analysis')
  group by user_id, event_name
),
pivoted as (
  select
    user_id,
    max(first_at) filter (where event_name = 'signup')         as signed_up_at,
    max(first_at) filter (where event_name = 'first_analysis') as first_analysis_at
  from first_per_user
  group by user_id
)
select
  p.user_id,
  u.email,
  p.signed_up_at,
  now() - p.signed_up_at as time_since_signup
from pivoted p
join auth.users u on u.id = p.user_id
where p.signed_up_at is not null
  and p.first_analysis_at is null
  and p.signed_up_at < now() - interval '7 days'
order by p.signed_up_at desc
limit 100;
