import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log("\n-NEXT-- /api/eform/eformsign-webhook received a request ---");
  try {
    const event_data = await req.json();
    console.log("수신된 이벤트 데이터:", event_data);
    return NextResponse.json({ status: "success", message: "data received" });
  } catch (error) {
    console.error("오류 발생:", error);
    return new NextResponse(JSON.stringify({ status: "error", message: "An error occurred" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
