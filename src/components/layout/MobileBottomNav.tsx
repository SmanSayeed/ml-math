"use client";

import Link from "next/link";

interface MobileBottomNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

export function MobileBottomNav({
  prevSlug,
  nextSlug,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur border-t border-border-subtle lg:hidden">
      <div className="flex items-center justify-between px-4 py-2">
        {prevSlug ? (
          <Link
            href={`/chapter/${prevSlug}/`}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            আগের
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/"
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          হোম
        </Link>

        {nextSlug ? (
          <Link
            href={`/chapter/${nextSlug}/`}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
          >
            পরের
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
