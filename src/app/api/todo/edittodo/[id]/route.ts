import React from "react";
import { dbConnection } from "@/db/dbConnection";
import Todo from "@/model/todoModel";
import { getDataFromJwt } from "@/utilities/getDataFromJwt";
import { NextRequest, NextResponse } from "next/server";

dbConnection()

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    console.log("request in put");
    console.log("params: ", params);
    const { id } = await params;

    console.log("id inside of the params: ", id)

    const reqBody = await request.json();
    console.log("reqBody: ",reqBody);

    const { title, description } = reqBody
    console.log("title, description : ", title, description);

    if(!title || !description){
      return NextResponse.json({message: "All fields are required!"})
    }

    // const searchParams = request.nextUrl.searchParams;
    // const id = searchParams.get('id');

    const taskid = await Todo.findById({ _id: id });

    const decodedData = await getDataFromJwt(request);

    const decodedUserID = (typeof decodedData === "object" && decodedData ? decodedData.id : undefined);

    // console.log("decodedUserID: ", decodedUserID);
    // console.log("taskowner: ", taskid.owner);

    if ((decodedUserID).toString() != (taskid.owner).toString()) {
      return NextResponse.json({ message: "You don't have access to perform this action!", success: false }, { status: 409 })
    }
    const updated = await Todo.findByIdAndUpdate(taskid._id, {title:title, description:description });

    console.log("Updated: ",updated);

    // if (!task) {`
    //   return NextResponse.json({
    //     message: "Something went wrong while editing the note",
    //     success: false
    //   }, { status: 500 })
    // }

    return NextResponse.json({
      message: "Note edited!",
      success: true,
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}