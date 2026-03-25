"use client";

import { useState } from "react";
import type { MLUseCase, CategoryType } from "@/types";
import { CodeBlock } from "./CodeBlock";

const borderColorMap: Record<string, string> = {
  "linear-algebra": "border-l-accent-amber",
  calculus: "border-l-accent-blue",
  "probability-stats": "border-l-accent-red",
  "information-theory": "border-l-accent-orange",
  optimization: "border-l-accent-green",
};

interface UseCaseCardProps {
  useCase: MLUseCase;
  category: CategoryType;
}

export function UseCaseCard({ useCase, category }: UseCaseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const borderClass = borderColorMap[category] || "border-l-accent-amber";

  return (
    <div
      className={`bg-card rounded-xl border border-border-subtle border-l-4 ${borderClass} overflow-hidden mb-4`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-card2 transition-colors"
      >
        <span className="text-xl">{useCase.icon}</span>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-text-primary">
            {useCase.title}
          </h4>
        </div>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <p className="text-text-secondary text-sm leading-relaxed mb-3">
            {useCase.explanation}
          </p>
          <div className="bg-accent-purple/10 border border-accent-purple/20 rounded-lg px-3 py-2 mb-3">
            <span className="text-xs text-accent-purple font-medium">
              Real Example:
            </span>
            <p className="text-sm text-text-secondary mt-1">
              {useCase.realExample}
            </p>
          </div>
          <CodeBlock
            code={useCase.code.snippet}
            language={useCase.code.language}
          />
        </div>
      )}
    </div>
  );
}
