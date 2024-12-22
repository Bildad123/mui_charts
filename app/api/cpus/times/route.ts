import { NextResponse } from "next/server";
import os from "os";

interface CPU {
  model: string;
  speed: number;
  times: {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
  };
}

export async function GET() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-GB", { hour12: false });

  const cpuInfo: CPU[] = os.cpus();
  const response = cpuInfo.map((cpu) => ({
    times: cpu.times,
  }));

  return NextResponse.json({ data: response, collectedAt: formattedTime });
}
