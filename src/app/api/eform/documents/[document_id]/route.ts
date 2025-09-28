import { NextRequest, NextResponse } from 'next/server';
import { efsClient, HttpRelayError } from '@/lib/eformsign';

interface Params {
  document_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const pathname = req.nextUrl.pathname;
  const document_id = pathname.substring(pathname.lastIndexOf('/') + 1);
  console.log("DOCUMENTS GET");
  const include_fields = req.nextUrl.searchParams.get('include_fields') !== 'false';

    console.log(`hnp document_id : ${document_id} / include_fields : ${include_fields}`);

  try {
    const result = await efsClient.getDocumentDetail(document_id, include_fields);
      console.log(`hnp  result11 : ${JSON.stringify(result)}`);
      console.log(`hnp  result22 : ${NextResponse.json(result)}`);
    const response = NextResponse.json(result);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
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
