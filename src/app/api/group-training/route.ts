import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import GroupTraining from "../../../../models/groupTraining";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();
    const groupTraining = requestBody;

      console.log("groupTraining", groupTraining);
      
    if (!groupTraining) {
      return NextResponse.json(
        { message: "Group Training data is missing in the request" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const createdGroupTraining = await GroupTraining.create({ ...groupTraining });
      
      console.log("createdGroupTraining", createdGroupTraining);

    if (!createdGroupTraining) {
      return NextResponse.json(
        { message: "Failed to create Group Training" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Group Training created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create Group Trainign" },
      { status: 500 }
    );
  }
}
