"use client";

export default function NoteCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 h-6 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
      <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
      <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
      <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="h-7 w-16 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
      </div>
    </div>
  );
}
