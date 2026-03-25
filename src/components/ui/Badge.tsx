"use client";

import type { CategoryType, Difficulty } from "@/types";

const categoryColorMap: Record<CategoryType, string> = {
  "linear-algebra": "bg-accent-amber/15 text-accent-amber border-accent-amber/30",
  calculus: "bg-accent-blue/15 text-accent-blue border-accent-blue/30",
  "probability-stats": "bg-accent-red/15 text-accent-red border-accent-red/30",
  "information-theory": "bg-accent-orange/15 text-accent-orange border-accent-orange/30",
  optimization: "bg-accent-green/15 text-accent-green border-accent-green/30",
};

const difficultyColorMap: Record<Difficulty, string> = {
  beginner: "bg-accent-green/15 text-accent-green border-accent-green/30",
  intermediate: "bg-accent-amber/15 text-accent-amber border-accent-amber/30",
  advanced: "bg-accent-red/15 text-accent-red border-accent-red/30",
};

const difficultyLabelMap: Record<Difficulty, string> = {
  beginner: "সহজ",
  intermediate: "মাঝারি",
  advanced: "কঠিন",
};

interface BadgeProps {
  variant?: "category" | "difficulty" | "custom";
  category?: CategoryType;
  difficulty?: Difficulty;
  label?: string;
  className?: string;
}

export function Badge({
  variant = "custom",
  category,
  difficulty,
  label,
  className = "",
}: BadgeProps) {
  let colorClass = "bg-card2 text-text-secondary border-border-default";
  let text = label || "";

  if (variant === "category" && category) {
    colorClass = categoryColorMap[category];
    text = label || category;
  } else if (variant === "difficulty" && difficulty) {
    colorClass = difficultyColorMap[difficulty];
    text = difficultyLabelMap[difficulty];
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}
    >
      {text}
    </span>
  );
}
