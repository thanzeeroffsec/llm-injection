import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { challengeId, input, poison, flag } = await req.json();
    const body = { query: input };
    if (!challengeId) {
      return NextResponse.json(
        { error: "Challenge ID is required" },
        { status: 400 }
      );
    }
    let slug = challengeId == 10 ? "llm10" : `llm0${challengeId}`;
    if (poison) {
      body.poison = poison;
    }

    if (flag === 0 || flag === 1) {
      body.flag = flag;
    }

    const request = await fetch(
      `${process.env.NEXT_EXTERNAL_BACKEND_ROUTE}/${slug}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await request.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "error" });
  }
}
