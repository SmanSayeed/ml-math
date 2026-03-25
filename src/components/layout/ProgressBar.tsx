"use client";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export function ProgressBar({ percentage, className = "" }: ProgressBarProps) {
  return (
    <div className={`h-1 w-full bg-surface rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-accent-amber rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  );
}
