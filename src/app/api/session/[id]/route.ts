import connectMongoDB from "../../../../../libs/mongodb";
import Session from "../../../../../models/session";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  await connectMongoDB();

  const session = await Session.findByIdAndDelete(id);
  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Session deleted" });
}

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  await connectMongoDB();

  const session = await Session.findById(context.params.id);
  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(session);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
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

  const session = await Session.findByIdAndUpdate(id, {
    dives: formattedDives,
  });
  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Session updated" });
}
