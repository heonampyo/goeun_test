import { NextRequest, NextResponse } from 'next/server';
import { efsClient, HttpRelayError } from '@/lib/eformsign';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { template_id, document: documentBody } = body;

    if (!template_id || !documentBody) {
      return new NextResponse(JSON.stringify({ detail: 'template_id and document body are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await efsClient.createDocumentExternal(template_id, documentBody);
    return NextResponse.json(result);
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
