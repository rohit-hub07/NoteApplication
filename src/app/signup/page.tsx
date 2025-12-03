"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
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



export default function Signup() {
  const [username, setUsername] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/user/signup", {
        username,
        email,
        password
      })
      console.log("res data for signup page: ", res.data);

      if (res.data.success) {
        toast.success("User signup successfully!")
        router.push("/home")
      }
    } catch (error: any) {
      return toast.error(error.response.data.message)
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
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                name="username"
                placeholder="username"
                required
              />
            </div>
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
                <Input onChange={(e) => setPassword(e.target.value)} id="password" placeholder="******" type="password" required />
              </div>
            </div>
            <div className="flex">
              <p className="mr-3">Already have a account?</p><Link className="underline" href="/login">
                Login
              </Link>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

