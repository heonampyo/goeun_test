import { NextResponse } from 'next/server';

export async function GET() {
  const company_id = process.env.EFS_COMPANY_ID?.trim();
  const country_code = process.env.EFS_COUNTRY_CODE?.trim() || 'kr';

  if (!company_id) {
    return new NextResponse(JSON.stringify({ detail: 'EFS_COMPANY_ID not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.json({ company_id, country_code });
}
