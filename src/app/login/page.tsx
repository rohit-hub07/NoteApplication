"use client"

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/userContext";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";



export default function LoginPage() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const router = useRouter();

  const authUser = useAuth();
  if (!authUser) return null;
  const { refreshedUser } = authUser;


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", {
        email,
        password
      })
      console.log("res data inside of login page: ", res.data)

      if (res.data?.success) {
        const res = await axios.get("/api/user/me");
        toast.success(res.data?.message);
        refreshedUser();
        // userId = res.data.user?._id;
        router.push("/home")
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <Card className="w-full max-w-sm m-auto mt-10">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
            </div>
          </div>
          <div className="flex">
            <p className="mr-3">Don't have a account?</p><Link className="underline" href="/signup">
            Sign Up
          </Link>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}


