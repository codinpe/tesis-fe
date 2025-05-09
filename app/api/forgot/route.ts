import { randomDelay } from "@/src/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  await randomDelay();
  return NextResponse.json({ success: true }, { status: 200 });
}
