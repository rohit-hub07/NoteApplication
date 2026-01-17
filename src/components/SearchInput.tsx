"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search notes...",
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500"
        strokeWidth={2}
        aria-hidden="true"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-50 dark:placeholder:text-gray-500 dark:hover:border-gray-700 dark:focus:border-gray-600 dark:focus:bg-gray-900 dark:focus:ring-gray-50/10"
        aria-label="Search notes"
      />
    </div>
  );
}
