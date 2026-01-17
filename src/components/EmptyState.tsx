"use client";

import Link from "next/link";
import { Plus, FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white py-20 text-center dark:border-gray-800 dark:from-gray-900 dark:to-gray-900/50">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        <FileText className="h-7 w-7 text-gray-400 dark:text-gray-500" strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
        No notes yet
      </h3>
      <p className="mb-8 max-w-sm text-sm text-gray-600 dark:text-gray-400">
        Create your first note to get started. Organize your thoughts, ideas, and tasks in one place.
      </p>
      <Link
        href="/createtask"
        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/20 active:scale-95 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-50/20"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Create First Note
      </Link>
    </div>
  );
}
