"use client"

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", {
        email,
        password
      })
      console.log("res data inside of login page: ", res.data)

      if (res.data?.success) {
        toast.success(res.data?.message);
        router.push("/home")
      } 
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit} className="mt-5">
        <label className="">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="block h-10 w-50 border mt-5 mb-5 p-5" type="text" placeholder="Enter email" name="email" required />

        <label className="mt-5">Password </label>
        <input onChange={(e) => setPassword(e.target.value)} className="block h-10 w-50 border mt-5 mb-5 p-5" type="text" placeholder="Enter Password" name="email" required />

        <button className="border h-10 w-20 ml-5 rounded-md bg-amber-800" type="submit">Submit</button>
      </form>
    </div>
  )
}