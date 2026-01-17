"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/userContext";

export default function Page() {
  const router = useRouter();
  const { userId, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Redirect based on authentication status
      if (userId) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    }
  }, [userId, loading, router]);

  // Show loading state while checking authentication
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-800 dark:border-t-gray-50"></div>
    </div>
  );
}