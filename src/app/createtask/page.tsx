"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

export default function CreateTask() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/todo/createtodo", { title, description });
      if (res.data?.success) {
        toast.success(res?.data?.message || "Note created successfully!");
        router.push("/home");
      } else {
        toast.error(res.data?.message || "Failed to create note!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating note!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X className="h-4 w-4" strokeWidth={2} />
            Close
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              const form = document.querySelector('form') as HTMLFormElement;
              if (form) form.requestSubmit();
            }}
            disabled={!title.trim() || !description.trim()}
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-900"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full border-0 bg-transparent px-0 text-4xl font-semibold tracking-tight text-zinc-900 placeholder-zinc-300 focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Start writing..."
              required
              rows={20}
              className="w-full resize-none border-0 bg-transparent px-0 text-base leading-relaxed text-zinc-700 placeholder-zinc-300 focus:outline-none focus:ring-0"
            />
          </div>
        </form>
      </div>
    </div>
  );
}