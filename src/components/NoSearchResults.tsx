"use client";

import { Search } from "lucide-react";

export default function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 text-center dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Search className="h-6 w-6 text-gray-400 dark:text-gray-500" strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-50">
        No results found
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Try adjusting your search to find what you're looking for
      </p>
    </div>
  );
}
