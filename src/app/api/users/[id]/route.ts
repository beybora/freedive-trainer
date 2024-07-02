import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  console.log("id", id);

  if (!id) {
    return NextResponse.json(
      { message: "User ID is missing" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const user = await User.findById(id).select("name email");
    if (!user) {
      return NextResponse.json(
        { message: "Failed to fetch Users" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch Users" },
      { status: 500 }
    );
  }
}
