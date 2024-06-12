import connectMongoDB from "../../../../../libs/mongodb";
import Session from "../../../../../models/session";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  await connectMongoDB();
  await Session.findByIdAndDelete(id);
  return NextResponse.json({ message: "Session deleted" });
}

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  await connectMongoDB();
  const session = await Session.findById(context.params.id);
  return NextResponse.json(session);
}

export async function UPDATE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const requestBody = await req.json();
  await connectMongoDB();
  await Session.findByIdAndUpdate(id, requestBody);
  return NextResponse.json({ message: "Session updated" });
}
