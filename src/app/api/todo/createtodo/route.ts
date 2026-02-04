import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/db/dbConnection";
import Todo from "@/model/todoModel";
import jwt from "jsonwebtoken";
import { getDataFromJwt } from "@/utilities/getDataFromJwt";


dbConnection();

export async function POST(request: NextRequest) {
  try {
    if (!request.cookies.get("token")?.value) {
      return NextResponse.json({
        message: "Please login!",
        success: false,
      }, { status: 401 })
    }

    const reqBody = await request.json();
    const { title, description } = reqBody;
    console.log(reqBody);
    const data = await getDataFromJwt(request);
    console.log("data: ", data)
    const newTask = await Todo.create({
      title: title,
      description: description,
      owner: (typeof data === 'object' && data ? data.id : undefined)
    })
    console.log("NewTask: ", newTask);

    // newTask.owner = (typeof data === 'object' && data && 'id' in data) ? data.id : undefined;

    // await newTask.save();
    return NextResponse.json({
      message: "Note added successfully",
      success: true,
      task: newTask
    }, { status: 201 })

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 })
  }
}