import { dbConnection } from "@/db/dbConnection";
import Todo from "@/model/todoModel";
import { getDataFromJwt } from "@/utilities/getDataFromJwt";
import { NextRequest, NextResponse } from "next/server";

dbConnection()

export async function GET(request: NextRequest) {
  try {
    const data = await getDataFromJwt(request);
    const ownerId = (typeof data === "object" && data ? data.id : undefined);
    const allTodos = await Todo.find({ owner: ownerId });
    if (!ownerId || ownerId == undefined) {
      return NextResponse.json({
        error: "Please login to add tasks!"
      }, { status: 400 })
    }
    if (!allTodos || allTodos.length < 0) {
      return NextResponse.json({
        message: "No tasks added"
      }, { status: 404 })
    }
    return NextResponse.json({
      message: "All tasks fetched!",
      alltasks: allTodos
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}