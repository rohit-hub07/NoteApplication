"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAuth } from "../context/userContext"

export default function Navbar() {
  // const [userId, setUserId] = useState<String>()
  const auth = useAuth()

  if (!auth) {
    return null;
  }

  let { userId, refreshedUser } = auth;

  // const handleLogout = async() => {
  //   await logout();
  // }

  // const getUser = async () => {
  //   const res = await axios.get("/api/user/me");
  //   console.log("res of getuser: ", res.data)
  //   setUserId(res.data.userId)
  // }
  useEffect(() => {
    // getUser();
    refreshedUser();
  }, [])

  console.log(userId);

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const res = await axios.get("/api/user/logout");
    if (res.data.success) {
      // userId = null;
      await refreshedUser()
      // setUserId("");
      // await getUser()
      toast.success(res.data.message)
    }
    // router.push("/home")
  }

  return (
    <nav className="flex -m-px justify-center justify-items-center">
      <Link href="/home" className="mr-5">Home</Link>
      <Link href="/createtask" className="ml-5">Add Task</Link>
      <div className="flex ml-5 justify-between">
        {!userId ? (
          <>
            <Link className="mr-5" href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

      </div>
    </nav>
  )
} 