import { NextResponse } from "next/server";

import { getExerciseTip } from "@/app/lib/tips";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Missing exercise name" },
      { status: 400 }
    );
  }

  try {
    const tip = await getExerciseTip(name);

    if (!tip) {
      return NextResponse.json(
        { ok: false, error: "Tip unavailable" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, tip });
  } catch (error) {
    console.error("Failed to fetch exercise tip", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch exercise tip" },
      { status: 500 }
    );
  }
}
