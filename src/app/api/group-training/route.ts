import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import GroupTraining from "../../../../models/groupTraining";
import socket from "../services/socket";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();
    const groupTraining = requestBody;
    const userId = req.headers.get("userId");

    console.log("userId", userId);

    if (!groupTraining) {
      return NextResponse.json(
        { message: "Group Training data is missing in the request" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is missing in the request" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newGroupTraining = {
      ...groupTraining,
      participants: [userId],
    };

    const createdGroupTraining = await GroupTraining.create(newGroupTraining);

    if (!createdGroupTraining) {
      return NextResponse.json(
        { message: "Failed to create Group Training" },
        { status: 500 }
      );
    }

    socket.emit("realtime-update", () => {
      console.log("realtime-update");
  
    })

    return NextResponse.json(
      { message: "Group Training created" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create Group Trainign" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDB();

    const groupTrainings = await GroupTraining.find();

    return NextResponse.json(groupTrainings, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch Group Trainings" },
      { status: 500 }
    );
  }
}
