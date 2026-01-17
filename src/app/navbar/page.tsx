"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useAuth } from "../context/userContext"
import { StickyNote, LogOut, User } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function Navbar() {
  const auth = useAuth()

  if (!auth) {
    return null;
  }

  let { userId, refreshedUser } = auth;

  useEffect(() => {
    const user = async () => {
      await refreshedUser();
    };
    user();
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
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60 dark:border-gray-800 dark:bg-gray-950/80 dark:supports-backdrop-filter:bg-gray-950/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/home"
            className="group flex items-center gap-2.5 transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-900/20 rounded-lg px-1 dark:focus:ring-gray-50/20"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-gray-900 to-gray-700 transition-transform duration-200 group-hover:scale-105 dark:from-gray-50 dark:to-gray-200">
              <StickyNote className="h-4 w-4 text-white dark:text-gray-900" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-50">Notes</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {!userId ? (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-50/20"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/20 active:scale-95 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-50/20"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <User className="h-4 w-4 text-gray-600 dark:text-gray-400" strokeWidth={2} />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-50/20"
                >
                  <LogOut className="h-4 w-4" strokeWidth={2} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 