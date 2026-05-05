import { NextResponse } from 'next/server';
import { appendRSVP, getRSVPs } from '@/lib/googleSheets';

export async function GET() {
  try {
    const rsvps = await getRSVPs();
    return NextResponse.json(rsvps);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await appendRSVP(body);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
  }
}
