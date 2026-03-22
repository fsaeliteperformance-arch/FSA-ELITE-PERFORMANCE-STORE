import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = { matcher: "/welcome" };

export async function middleware() {
  if (!process.env.EDGE_CONFIG) {
    return NextResponse.json(
      { error: "EDGE_CONFIG is not configured" },
      { status: 503 },
    );
  }

  try {
    const greeting = await get("greeting");

    return NextResponse.json({ greeting });
  } catch (error) {
    console.error("Failed to load greeting from Edge Config", error);

    return NextResponse.json(
      { error: "Unable to load greeting from Edge Config" },
      { status: 503 },
    );
  }
}
