import { NextResponse } from 'next/server';
import { getBroadcastList } from '@/lib/googleSheets';

export async function GET() {
  try {
    const list = await getBroadcastList();
    return NextResponse.json(list);
  } catch (error) {
    console.error('Error fetching broadcast list:', error);
    return NextResponse.json({ error: 'Failed to fetch broadcast list' }, { status: 500 });
  }
}
