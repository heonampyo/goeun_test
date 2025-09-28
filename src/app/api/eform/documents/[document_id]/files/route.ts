import { NextRequest, NextResponse } from 'next/server';
import { efsClient, HttpRelayError } from '@/lib/eformsign';

interface Params {
  document_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { document_id } = params;
  const type = req.nextUrl.searchParams.get('type') || 'document';

  try {
    const { content, filename } = await efsClient.downloadFiles(document_id, type);
    
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Type', 'application/octet-stream');

    return new NextResponse(content, { status: 200, headers });

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
