import { NextResponse } from "next/server";

export async function GET() {
  try {
    const req = await fetch(
      `${process.env.NEXT_EXTERNAL_BACKEND_ROUTE}/allchallenges`
    );

    const data = await req.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
