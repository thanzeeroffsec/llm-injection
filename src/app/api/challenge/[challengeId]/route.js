import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Ensure params and challengeId are defined
    const { challengeId } = await params;
    if (!challengeId) {
      return NextResponse.json(
        { error: "Challenge ID is required" },
        { status: 400 }
      );
    }

    // Fetch data from the external backend
    const req = await fetch(
      `${process.env.NEXT_EXTERNAL_BACKEND_ROUTE}/allchallenges`
    );

    // Check if the request was successful
    if (!req.ok) {
      throw new Error(`Failed to fetch challenges: ${req.statusText}`);
    }

    // Parse the response as JSON
    const data = await req.json();

    const challenge = data.find((challenge) => {
      return challenge.id === Number(challengeId);
    });

    // Return the filtered challenges
    return NextResponse.json({ challenge });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
