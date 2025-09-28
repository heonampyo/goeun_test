import { NextRequest, NextResponse } from 'next/server';
import { webhookFileStore } from '@/lib/webhook-file-store';

export async function GET(req: NextRequest, { params }: { params: { document_id: string } }) {
  const { document_id } = params;
  console.log(`[StatusAPI] Checking for document_id: ${document_id}`);

  const data = await webhookFileStore.get(document_id);

  if (data) {
    console.log(`[StatusAPI] Data found for ${document_id}.`);
    await webhookFileStore.delete(document_id); // 한 번 조회 후 삭제
    return NextResponse.json({ ready: true, data });
  } else {
    console.log(`[StatusAPI] Data not yet ready for ${document_id}.`);
    return NextResponse.json({ ready: false });
  }
}
