import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/db/dbConnection";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

dbConnection();

interface reqBodyType{
  username: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password }: reqBodyType = reqBody;
    console.log("reqBody: ", reqBody);

    //check user id already exist
    console.log(("Checking existing user"))
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 409 })
    }
    console.log("Creating new user")
    //register user
    const newUser = await User.create({
      username: username,
      email: email,
      password: password
    })
    console.log("Before registering: ")
    if (!newUser) {
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
    }
    const tokenData = {
      id: newUser._id,
      email: newUser.email
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '1d'}) 

    const response = NextResponse.json({
      message: 'User registered successfully!',
      success: true,
    },{status: 201})
    
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 3
    })
    return response;
  } catch (error: any) { 
    return NextResponse.json({error: error.message},{status: 500});
  }
}