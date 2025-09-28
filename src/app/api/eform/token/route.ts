import { NextResponse } from 'next/server';
import { efsClient, HttpRelayError } from '@/lib/eformsign';

export async function POST() {
  try {
    const token = await efsClient.getAccessToken();
    return NextResponse.json({ access_token: token });
  } catch (error) {
    if (error instanceof HttpRelayError) {
      return new NextResponse(JSON.stringify(error.body), {
        status: error.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error('Internal Server Error:', error);
    return new NextResponse(JSON.stringify({ detail: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
