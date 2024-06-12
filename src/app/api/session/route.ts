import connectMongoDB from "../../../../libs/mongodb";
import Session from "../../../../models/session";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await connectMongoDB();
  const sessions = await Session.find();
  return NextResponse.json(sessions);
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();
    const dives = requestBody?.dives;

    if (!dives) {
      return NextResponse.json(
        { message: "Dives data is missing in the request." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const formattedDives = dives.map((dive: any) => ({
      discipline: dive.discipline.value,
      time: dive.time,
      depth: dive.depth,
      mood: dive.mood.value,
    }));

    await Session.create({ dives: formattedDives });

    return NextResponse.json({ message: "Session created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { message: "Failed to create session" },
      { status: 500 }
    );
  }
}
