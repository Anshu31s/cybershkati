import { NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/server-api';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', database: 'connected', orm: 'prisma' });
  } catch (error) {
    return NextResponse.json({ status: 'error', database: 'disconnected', message: 'Database connection failed.' }, { status: 503 });
  }
}
