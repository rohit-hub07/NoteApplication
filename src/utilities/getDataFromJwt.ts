import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export async function getDataFromJwt(req: NextRequest){
  try {
    const token = req.cookies.get("token")?.value
    console.log("getDataFromJwt: ", token);
    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }     
}