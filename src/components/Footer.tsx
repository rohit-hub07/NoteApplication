"use client";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/80 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Notes. Built with Next.js & Tailwind CSS.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/rohit-hub07/NoteApplication"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
