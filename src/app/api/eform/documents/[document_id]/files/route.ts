import { NextRequest, NextResponse } from 'next/server';
import { efsClient, HttpRelayError } from '@/lib/eformsign';

export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const document_id = pathname.split('/')[4]; // /api/eform/documents/[document_id]/files
  const type = req.nextUrl.searchParams.get('type') || 'document';

  try {
    const { content, filename } = await efsClient.downloadFiles(document_id, type);
    
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Type', 'application/octet-stream');

    // Buffer를 Uint8Array로 변환하여 NextResponse에 전달
    const uint8Array = new Uint8Array(content);
    return new NextResponse(uint8Array, { status: 200, headers });

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
