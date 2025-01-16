import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { challengeId, input, poison } = await req.json();
    const body = { query: input };
    if (poison) {
      body.poison = poison;
    }
    const request = await fetch(
      `${process.env.NEXT_EXTERNAL_BACKEND_ROUTE}/llm0${challengeId}/`,
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
