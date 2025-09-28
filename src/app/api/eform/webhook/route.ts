import { NextRequest, NextResponse } from 'next/server';
import { efsClient } from '@/lib/eformsign';
import { webhookFileStore } from '@/lib/webhook-file-store';

export async function POST(req: NextRequest) {
  console.log("\n-NEXT HNP-- /api/eform/webhook received a request ---");
  try {
    const payload = await req.json();
    console.log("Received data:", payload);
    const doc = payload.document || {};
    // 안정적인 document_id 추출
    const document_id = doc.id || doc.document_id || payload.id || payload.document_id;
    const status = doc.status || payload.status;

    if (!document_id) {
      console.error('Webhook error: document_id not found in payload', payload);
      return new NextResponse(JSON.stringify({ detail: 'Webhook error: document_id is missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`hook document_id : ${document_id}`);

    if (document_id) {
      await webhookFileStore.set(document_id, payload);
      try {
        // 이 API 호출은 현재 결과를 사용하지 않으므로, 에러가 발생해도 무시합니다.
        await efsClient.getDocumentDetail(document_id, true);
      } catch (e) {
        console.error(`Webhook: Failed to get document detail for ${document_id}`, e);
      }
    }
    return NextResponse.json({ ok: true, status, document_id });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse(JSON.stringify({ detail: 'Webhook error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
