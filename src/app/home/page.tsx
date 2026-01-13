"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Trash2, Plus, Search, FileText } from "lucide-react";
import { useAuth } from "../context/userContext";

export default function HomePage() {
  const auth = useAuth();
  if (!auth) return null;
  const { userId } = auth;

  interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  }

  const [task, setTask] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const res = await axios.get("api/todo/showtodo");
    setTask(res.data.alltasks);
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

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              All Notes
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {task.length} {task.length === 1 ? 'note' : 'notes'}
            </p>
          </div>

          <Link
            href="/createtask"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-95"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Note
          </Link>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-4 focus:ring-zinc-100"
            />
          </div>
        </div>

        {userId && filteredTasks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((el) => (
              <div
                key={el._id}
                className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-100"
              >
                <h3 className="mb-2 line-clamp-2 text-base font-medium text-zinc-900">
                  {el.title}
                </h3>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600">
                  {el.description}
                </p>
                <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                  <time className="text-xs text-zinc-400" dateTime={el.createdAt}>
                    {new Date(el.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <button
                    onClick={() => deleteTask(el._id)}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${el.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : userId && task.length > 0 && filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <Search className="h-5 w-5 text-zinc-400" strokeWidth={2} />
            </div>
            <h3 className="mb-1 text-base font-medium text-zinc-900">No results found</h3>
            <p className="text-sm text-zinc-500">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <FileText className="h-5 w-5 text-zinc-400" strokeWidth={2} />
            </div>
            <h3 className="mb-1 text-base font-medium text-zinc-900">No notes yet</h3>
            <p className="mb-6 text-sm text-zinc-500">
              Create your first note to get started
            </p>
            <Link
              href="/createtask"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-95"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              New Note
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}