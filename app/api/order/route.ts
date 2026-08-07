import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: Insert to Supabase orders table or send via email
    // Required fields: brandName, productDescription, style, quantity, email
    console.log('[Order received]', JSON.stringify(body, null, 2));

    // If Supabase is configured, insert here:
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    // await supabase.from('orders').insert({ ...body, created_at: new Date().toISOString() })

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Order API error]', err);
    return NextResponse.json({ error: 'Failed to submit order' }, { status: 500 });
  }
}
