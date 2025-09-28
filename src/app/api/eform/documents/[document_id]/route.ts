import { NextRequest, NextResponse } from 'next/server';
import { efsClient, HttpRelayError } from '@/lib/eformsign';

interface Params {
  document_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { document_id } = params;
  const include_fields = req.nextUrl.searchParams.get('include_fields') !== 'false';

  try {
    const result = await efsClient.getDocumentDetail(document_id, include_fields);
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
