import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnection } from "@/db/dbConnection";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

dbConnection();

interface reqBodyType {
  email: string;
  password: string;
}


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password }: reqBodyType = reqBody;
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        message: "User doesn't exist!",
        success: false
      }, { status: 404 })
    }
    const isMatched = await bcrypt.compare(password,user.password);
    if (!isMatched) {
      return NextResponse.json({ message: "Email or password is incorrect!", success: false }, { status: 401 })
    }

    const tokenData = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login successfully!",
      success: true
    }, { status: 200 })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 3
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({error: error.message},{status: 500})
  }
}