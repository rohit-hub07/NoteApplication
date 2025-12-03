"use client"

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react"

interface authContextType {
  userId: string | null,
  logout: () => Promise<void>,
  refreshedUser: () => Promise<void>,
  loading: Boolean
}


const AuthContext = createContext<authContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true)

  const refreshedUser = async () => {
    try {
      const res = await axios.get("/api/user/me", {
        withCredentials: true
      })
      setUserId(res.data.userId || null);
    } catch (error) {
      setUserId(null);
    }
  }

  const logout = async () => {
    try {
      const res = await axios.get("/api/user/logout", { withCredentials: true })
      if (res.data.success) {
        setUserId(null)
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails on server, clear local state
      setUserId(null);
    }
  }

  useEffect(() => {
    refreshedUser().finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ userId, refreshedUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};