-- Lead capture table for pre-launch / pre-Stripe-LIVE email collection.
--
-- Drop into Supabase SQL editor. Anon role can INSERT but not SELECT — keeps
-- the list private while still letting unauthenticated visitors sign up from
-- /tools/* pages, /sora-refund, /case-studies, etc.
--
-- Once Stripe is LIVE and you're ready to push emails, query this table from
-- a privileged role (service_role) and pipe into Resend / Mailchimp / whatever.

create table if not exists public.lead_signups (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  source       text not null,           -- where they signed up (e.g. 'credit-calculator', 'sora-refund', 'refund-letter')
  utm_source   text,                    -- traffic source if known
  utm_medium   text,
  utm_campaign text,
  metadata     jsonb not null default '{}'::jsonb,  -- e.g. estimated savings, primary failure mode
  created_at   timestamptz not null default now(),
  -- Soft de-dupe: prevent the same email from re-registering for the same source.
  -- A user can sign up from multiple sources (calc + refund-letter) and we capture both;
  -- but they can't spam-register from the same source.
  unique (email, source)
);

create index if not exists lead_signups_email_idx on public.lead_signups (email);
create index if not exists lead_signups_source_idx on public.lead_signups (source);
create index if not exists lead_signups_created_at_idx on public.lead_signups (created_at desc);

-- RLS: anon can INSERT only. SELECT requires service_role (so leads stay private).
alter table public.lead_signups enable row level security;

create policy "anon can insert leads"
  on public.lead_signups
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT policy → only service_role can read. That's by design.

-- Convenience view for the service role to export weekly digest of new signups.
create or replace view public.lead_signups_weekly as
  select
    source,
    count(*) as new_signups,
    min(created_at) as first_signup,
    max(created_at) as latest_signup
  from public.lead_signups
  where created_at >= now() - interval '7 days'
  group by source
  order by new_signups desc;

comment on table public.lead_signups is 'Pre-launch email captures from /tools/* and /sora-refund. Anon-insert, service-role-select.';
comment on column public.lead_signups.source is 'Page or feature that produced the signup. Examples: credit-calculator, sora-refund, refund-letter, case-studies-cta';
