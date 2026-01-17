"use client";

import { Trash2 } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function NoteCard({
  id,
  title,
  description,
  createdAt,
  onDelete,
}: NoteCardProps) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-950/20"
    >
      <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-tight text-gray-900 dark:text-gray-50">
        {title}
      </h3>
      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <time
          className="text-xs font-medium text-gray-400 dark:text-gray-500"
          dateTime={createdAt}
        >
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <button
          onClick={() => onDelete(id)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 opacity-0 transition-all duration-200 hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:text-gray-400 dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:focus:ring-red-500/30"
          aria-label={`Delete note: ${title}`}
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
          Delete
        </button>
      </div>
    </article>
  );
}
