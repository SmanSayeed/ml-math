"use client";

import Link from "next/link";

interface ChapterNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
  prevTitle?: string;
  nextTitle?: string;
}

export function ChapterNav({
  prevSlug,
  nextSlug,
  prevTitle,
  nextTitle,
}: ChapterNavProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-border-subtle">
      {prevSlug ? (
        <Link
          href={`/chapter/${prevSlug}/`}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card hover:bg-card2 border border-border-subtle transition-colors group flex-1"
        >
          <svg
            className="w-5 h-5 text-text-muted group-hover:text-text-secondary transition-colors"
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
          <div className="text-left">
            <div className="text-xs text-text-muted">আগের চ্যাপ্টার</div>
            <div className="text-sm text-text-secondary group-hover:text-text-primary transition-colors capitalize">
              {prevTitle || prevSlug.replace(/-/g, " ")}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextSlug ? (
        <Link
          href={`/chapter/${nextSlug}/`}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card hover:bg-card2 border border-border-subtle transition-colors group flex-1 justify-end"
        >
          <div className="text-right">
            <div className="text-xs text-text-muted">পরের চ্যাপ্টার</div>
            <div className="text-sm text-text-secondary group-hover:text-text-primary transition-colors capitalize">
              {nextTitle || nextSlug.replace(/-/g, " ")}
            </div>
          </div>
          <svg
            className="w-5 h-5 text-text-muted group-hover:text-text-secondary transition-colors"
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
        <div className="flex-1" />
      )}
    </div>
  );
}
