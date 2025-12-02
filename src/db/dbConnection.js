import mongoose from "mongoose";
import dotenv from "dotenv";



dotenv.config();

export const dbConnection = async() => {
    await mongoose.connect(process.env.DB_URL).then(() => console.log("Connected to db!")).catch((err) => console.log("Error connecting to db!", err))
}