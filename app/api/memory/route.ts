import os from "os";
import { NextResponse } from "next/server";

export async function GET() {
  // Get current system memory information
  const totalMemory = os.totalmem(); // Total memory in bytes
  const freeMemory = os.freemem(); // Free memory in bytes
  const usedMemory = totalMemory - freeMemory; // Used memory in bytes

  // Convert memory values to GB for easier readability
  const freeMemoryGB = (freeMemory / 1024 ** 3).toFixed(2); // GB
  const usedMemoryGB = (usedMemory / 1024 ** 3).toFixed(2); // GB

  // Get the current time
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Convert the current time into total seconds since midnight
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Return the memory stats and total seconds as JSON
  return NextResponse.json({
    data: {
      freeMemory: freeMemoryGB,
      usedMemory: usedMemoryGB,
    },
    collectedAt: totalSeconds, // Return time in seconds as a number
  });
}
