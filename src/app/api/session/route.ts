import connectMongoDB from "../../../../libs/mongodb";
import Session from "../../../../models/session";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  await connectMongoDB();
  const sessions = await Session.find();
  return NextResponse.json(sessions);
}

export async function POST(request: Request, res: Response) {
  try {
    const requestBody = await request.json();
    const dives = requestBody?.dives;

    if (!dives) {
      throw new Error("Dives data is missing in the request.");
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
