"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus, Eye, EyeOff } from "lucide-react";
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
    isHidden?: boolean;
  }

  const [task, setTask] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"notes" | "hidden">("notes");

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

  const hideTask = async (id: string) => {
    try {
      const res = await axios.put(`/api/todo/hide/${id}`);
      if (res.data.success) {
        setTask((prev) =>
          prev.map((t) => (t._id === id ? { ...t, isHidden: res.data.isHidden } : t))
        );
        toast.success(res?.data?.message);
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to update note visibility";
      toast.error(message);
    }
  };

  const filteredTasks = task.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleTasks = filteredTasks.filter((t) => !t.isHidden);
  const hiddenTasks = filteredTasks.filter((t) => t.isHidden);

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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
              {activeTab === "notes" ? "All Notes" : "Hidden Notes"}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? (
                <span className="inline-block h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></span>
              ) : (
                <>
                  {activeTab === "notes" ? visibleTasks.length : hiddenTasks.length}{" "}
                  {activeTab === "notes" ? visibleTasks.length === 1 ? "note" : "notes" : hiddenTasks.length === 1 ? "hidden note" : "hidden notes"}
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
        <div className="mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search notes by title or content..."
          />
        </div>

        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("notes")}
            className={`inline-flex items-center gap-1.5 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "notes"
                ? "border-gray-900 text-gray-900 dark:border-gray-50 dark:text-gray-50"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <Eye className="h-4 w-4" strokeWidth={2} />
            Notes
          </button>
          <button
            onClick={() => setActiveTab("hidden")}
            className={`inline-flex items-center gap-1.5 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "hidden"
                ? "border-gray-900 text-gray-900 dark:border-gray-50 dark:text-gray-50"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <EyeOff className="h-4 w-4" strokeWidth={2} />
            Hidden Notes
          </button>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <NoteCardSkeleton key={i} />
              ))}
            </div>
          ) : activeTab === "notes" && visibleTasks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleTasks.map((el) => (
                <NoteCard
                  key={el._id}
                  id={el._id}
                  title={el.title}
                  description={el.description}
                  createdAt={el.createdAt}
                  onDelete={deleteTask}
                  onHide={hideTask}
                  isHidden={el.isHidden ?? false}
                />
              ))}
            </div>
          ) : activeTab === "hidden" && hiddenTasks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hiddenTasks.map((el) => (
                <NoteCard
                  key={el._id}
                  id={el._id}
                  title={el.title}
                  description={el.description}
                  createdAt={el.createdAt}
                  onDelete={deleteTask}
                  onHide={hideTask}
                  isHidden={el.isHidden ?? false}
                />
              ))}
            </div>
          ) : activeTab === "notes" && task.length > 0 && visibleTasks.length === 0 ? (
            <NoSearchResults />
          ) : activeTab === "hidden" && task.length > 0 && hiddenTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <EyeOff className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No hidden notes</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Notes you hide will appear here</p>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>

      <Footer />
    </div>
  );
}