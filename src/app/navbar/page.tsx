"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useAuth } from "../context/userContext"
import { StickyNote, LogOut } from "lucide-react"

export default function Navbar() {
  const auth = useAuth()

  if (!auth) {
    return null;
  }

  let { userId, refreshedUser } = auth;

  useEffect(() => {
    refreshedUser();
  }, [])

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const res = await axios.get("/api/user/logout");
    if (res.data.success) {
      await refreshedUser()
      toast.success(res.data.message)
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/home" className="flex items-center gap-2 transition-opacity hover:opacity-70">
            <StickyNote className="h-5 w-5 text-zinc-900" strokeWidth={2} />
            <span className="text-base font-semibold tracking-tight text-zinc-900">Notes</span>
          </Link>

          <div className="flex items-center gap-3">
            {!userId ? (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-zinc-800"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 