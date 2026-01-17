"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus } from "lucide-react";
import { useAuth } from "../context/userContext";
import { useRouter } from "next/navigation";
import NoteCard from "@/components/NoteCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import NoSearchResults from "@/components/NoSearchResults";
import NoteCardSkeleton from "@/components/NoteCardSkeleton";
import Footer from "@/components/Footer";


export default function HomePage() {
  const { userId, loading } = useAuth();
  const router = useRouter();

  interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  }

  const [task, setTask] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redirect to login if not authenticated (only after loading is complete)
    if (!loading && !userId) {
      router.push('/login?reason=auth');
      return;
    }
    if (!loading && userId) {
      getTask();
    }
  }, [userId, loading, router]);


  const getTask = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("api/todo/showtodo");
      setTask(res.data.alltasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    const res = await axios.delete(`/api/todo/deletetodo/${id}`);
    if (res.data.success) {
      setTask((prev) => prev.filter((t) => t._id !== id));
    }
    toast.success(res?.data?.message);
  };

  const filteredTasks = task.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-800 dark:border-t-gray-50"></div>
      </div>
    );
  }

  // Don't render the content if not authenticated (will be redirected)
  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
              All Notes
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? (
                <span className="inline-block h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></span>
              ) : (
                <>
                  {task.length} {task.length === 1 ? "note" : "notes"}
                </>
              )}
            </p>
          </div>

          <Link
            href="/createtask"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/20 active:scale-95 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-50/20"
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
            New Note
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search notes by title or content..."
          />
        </div>

        {/* Notes Grid / Loading / Empty States */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <NoteCardSkeleton key={i} />
            ))}
          </div>
        ) : userId && filteredTasks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((el) => (
              <NoteCard
                key={el._id}
                id={el._id}
                title={el.title}
                description={el.description}
                createdAt={el.createdAt}
                onDelete={deleteTask}
              />
            ))}
          </div>
        ) : userId && task.length > 0 && filteredTasks.length === 0 ? (
          <NoSearchResults />
        ) : (
          <EmptyState />
        )}
      </div>

      <Footer />
    </div>
  );
}