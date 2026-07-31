import { dbConnection } from "@/db/dbConnection";
import Todo from "@/model/todoModel";
import { getDataFromJwt } from "@/utilities/getDataFromJwt";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const decodedData = await getDataFromJwt(request);
    const decodedUserID = (typeof decodedData === "object" && decodedData ? decodedData.id : undefined);

    if (!decodedUserID) {
      return NextResponse.json({
        error: "Please login first"
      }, { status: 401 })
    }

    const task = await Todo.findById({ _id: id });

    if (!task) {
      return NextResponse.json({
        message: "Note not found"
      }, { status: 404 })
    }

    if ((task.owner).toString() !== (decodedUserID).toString()) {
      return NextResponse.json({
        message: "You don't have access to perform this action!",
        success: false
      }, { status: 409 })
    }

    const updatedTask = await Todo.findByIdAndUpdate(
      task._id,
      { $set: { isHidden: !task.isHidden } },
      { new: true }
    );

    return NextResponse.json({
      message: `Note ${updatedTask?.isHidden ? 'hidden' : 'unhidden'} successfully`,
      success: true,
      isHidden: updatedTask?.isHidden
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "An unknown error occurred"
    }, { status: 500 })
  }
}
