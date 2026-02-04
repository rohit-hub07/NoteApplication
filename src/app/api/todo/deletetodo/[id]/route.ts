import React from "react";
import { dbConnection } from "@/db/dbConnection";
import Todo from "@/model/todoModel";
import { getDataFromJwt } from "@/utilities/getDataFromJwt";
import { NextRequest, NextResponse } from "next/server";

dbConnection()

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    console.log("params: ", params)
    const { id } = await params;
    console.log("id inside of the params: ", id)
    // const searchParams = request.nextUrl.searchParams;
    // const id = searchParams.get('id');
    const taskid = await Todo.findById({ _id: id });

    const decodedData = await getDataFromJwt(request);

    const decodedUserID = (typeof decodedData === "object" && decodedData ? decodedData.id : undefined);

    // console.log("decodedUserID: ", decodedUserID);
    // console.log("taskowner: ", taskid.owner);

    if ((decodedUserID).toString() != (taskid.owner).toString()) {
      return NextResponse.json({ message: "You don't have acces to perform this action!", success: false }, { status: 409 })
    }
    const task = await Todo.findByIdAndDelete({ _id: id });
    if (!task) {
      return NextResponse.json({
        message: "Note doesn't exist!",
        success: false
      }, { status: 404 })
    }
    return NextResponse.json({
      message: "Note deleted!",
      success: true,
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}