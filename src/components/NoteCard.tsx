"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <>
      <article
        onClick={openModal}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-950/20"
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
            onClick={handleDeleteClick}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 opacity-0 transition-all duration-200 hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:text-gray-400 dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:focus:ring-red-500/30"
            aria-label={`Delete note: ${title}`}
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            Delete
          </button>
        </div>
      </article>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative m-4 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 p-8 dark:border-gray-800">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
                  {title}
                </h2>
                <time
                  className="mt-2 block text-sm font-medium text-gray-400 dark:text-gray-500"
                  dateTime={createdAt}
                >
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <button
                onClick={closeModal}
                className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {description}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-6 dark:border-gray-800">
              <button
                onClick={() => {
                  onDelete(id);
                  closeModal();
                }}
                className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
              >
                <Trash2 className="h-4 w-4" strokeWidth={2} />
                Delete Note
              </button>
              <button
                onClick={closeModal}
                className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
