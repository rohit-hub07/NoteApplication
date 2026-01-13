"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
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

      if (res.data.success) {
        toast.success("Account created successfully!")
        router.push("/home")
      }
    } catch (error: any) {
      return toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Create account</h1>
          <p className="mt-2 text-sm text-zinc-500">Get started with your notes</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-700">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                name="username"
                placeholder="johndoe"
                required
                className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-4 focus:ring-zinc-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-4 focus:ring-zinc-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-4 focus:ring-zinc-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-95"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-zinc-900 transition-colors hover:text-zinc-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

