import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-GB", { hour12: false });

  const uptime: number = os.uptime();

  return NextResponse.json({ data: uptime, collectedAt: formattedTime });
}
