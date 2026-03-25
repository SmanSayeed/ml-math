"use client";

import Link from "next/link";
import { ProgressBar } from "./ProgressBar";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  completionPercentage: number;
}

export function MobileHeader({
  onMenuToggle,
  completionPercentage,
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur border-b border-border-subtle lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg hover:bg-card transition-colors"
          aria-label="মেনু খোলো"
        >
          <svg
            className="w-6 h-6 text-text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg">🧮</span>
          <span className="text-sm font-bold text-text-primary">
            ML গণিত গুরু
          </span>
        </Link>

        <div className="w-8" /> {/* Spacer for centering */}
      </div>
      <ProgressBar percentage={completionPercentage} />
    </header>
  );
}
