"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { X, Check } from "lucide-react";
import { useAuth } from "../context/userContext";

export default function CreateTask() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();
  const { userId, loading } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated (only after loading is complete)
    if (!loading && !userId) {
      router.push('/login?reason=auth');
    }
  }, [userId, loading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;

    try {
      setIsSaving(true);
      const res = await axios.post("/api/todo/createtodo", { title, description });
      if (res.data?.success) {
        toast.success(res?.data?.message || "Note created successfully!");
        router.push("/home");
      } else {
        toast.error(res.data?.message || "Failed to create note!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating note!");
    } finally {
      setIsSaving(false);
    }
  };

  const isValid = title.trim() && description.trim();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-800 dark:border-t-gray-50"></div>
      </div>
    );
  }

  // Don't render the form if not authenticated (will be redirected)
  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Sticky Header */}
      <div className="sticky top-16 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/90 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-50/20"
          >
            <X className="h-4 w-4" strokeWidth={2} />
            Cancel
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              const form = document.querySelector('form') as HTMLFormElement;
              if (form) form.requestSubmit();
            }}
            disabled={!isValid || isSaving}
            className="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-900 disabled:hover:shadow-sm dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-50/20 disabled:dark:hover:bg-gray-50"
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-gray-900 dark:border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" strokeWidth={2.5} />
                Save Note
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled"
              required
              autoFocus
              maxLength={200}
              className="w-full border-0 bg-transparent px-0 text-4xl font-bold tracking-tight text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-0 dark:text-gray-50 dark:placeholder-gray-700 sm:text-5xl"
            />
            {title.length > 0 && (
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-600">
                {title.length}/200 characters
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Start writing your note..."
              required
              rows={20}
              className="w-full resize-none border-0 bg-transparent px-0 text-base leading-relaxed text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-0 dark:text-gray-300 dark:placeholder-gray-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
}