import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";
import connectMongoDB from "../../../../../libs/mongodb";
import GroupTraining from "../../../../../models/groupTraining";
import User from "../../../../../models/user";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = req.headers.get("userId");
  const groupId = params.id;

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing" },
      { status: 400 }
    );
  }

  if (!groupId) {
    return NextResponse.json(
      { message: "Group ID is missing" },
      { status: 400 }
    );
  }
  try {
    await connectMongoDB();

    const updatedGroupTraining = await GroupTraining.findByIdAndUpdate(
      groupId,
      {
        $push: { participants: userId },
      }
    );

    if (!updatedGroupTraining) {
      return NextResponse.json(
        { message: "Failed to add user to Group" },
        { status: 500 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $push: { groupTrainings: groupId },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to add Group to User" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "User added to Group" });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to add user to Group" },
      { status: 500 }
    );
  }
}

export async function DELETE( req: NextRequest, { params }: { params: { id: string } }) {
  const userId = req.headers.get("userId");
  const groupId = params.id;

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing" },
      { status: 400 }
    );
  }

  if (!groupId) {
    return NextResponse.json(
      { message: "Group ID is missing" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const updatedGroupTraining = await GroupTraining.findByIdAndUpdate(
      groupId,
      {
        $pull: { participants: userId },
      }
    );

    if (!updatedGroupTraining) {
      return NextResponse.json(
        { message: "Failed to remove user from Group" },
        { status: 500 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: { groupTrainings: groupId },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to remove Group from User" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "User removed from Group" });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to remove user from Group" },
      { status: 500 }
    );
  }
}
