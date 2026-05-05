import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Wedding } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const config = await Wedding.findOne({});
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const updated = await Wedding.findOneAndUpdate({}, body, { upsert: true, new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
