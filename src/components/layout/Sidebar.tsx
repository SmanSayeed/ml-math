"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/data";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { CategoryMeta } from "@/types";

const categoryAccentMap: Record<string, string> = {
  amber: "text-accent-amber",
  blue: "text-accent-blue",
  red: "text-accent-red",
  orange: "text-accent-orange",
  green: "text-accent-green",
};

const categoryBorderMap: Record<string, string> = {
  amber: "border-accent-amber",
  blue: "border-accent-blue",
  red: "border-accent-red",
  orange: "border-accent-orange",
  green: "border-accent-green",
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const categories = getCategories();
  const pathname = usePathname();
  const { isRead, completionPercentage, completedCount } = useProgress();
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map((c) => c.id)
  );

  const currentSlug = pathname?.split("/chapter/")[1]?.replace(/\/$/, "") || "";

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        chapters: cat.chapters.filter((slug) =>
          slug.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.chapters.length > 0);
  }, [categories, search]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-surface border-r border-border-subtle z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border-subtle">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="text-2xl">🧮</span>
            <div>
              <h1 className="text-base font-bold text-text-primary">
                ML গণিত গুরু
              </h1>
              <p className="text-xs text-text-muted">ঢাকাইয়া স্টাইলে</p>
            </div>
          </Link>

          {/* Progress */}
          <div className="mt-3 flex items-center gap-3">
            <ProgressRing percentage={completionPercentage} size={36} />
            <div className="text-xs text-text-secondary">
              <span className="font-medium text-text-primary">
                {completedCount}
              </span>{" "}
              / 56 পড়া হইছে
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <input
            type="text"
            placeholder="🔍 চ্যাপ্টার খোঁজো..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-card rounded-lg text-sm text-text-primary placeholder-text-muted border border-border-subtle focus:border-accent-amber focus:outline-none transition-colors"
          />
        </div>

        {/* Category list */}
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {filteredCategories.map((cat) => (
            <CategoryGroup
              key={cat.id}
              category={cat}
              isExpanded={expandedCategories.includes(cat.id)}
              onToggle={() => toggleCategory(cat.id)}
              currentSlug={currentSlug}
              isRead={isRead}
              onChapterClick={onClose}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

interface CategoryGroupProps {
  category: CategoryMeta;
  isExpanded: boolean;
  onToggle: () => void;
  currentSlug: string;
  isRead: (slug: string) => boolean;
  onChapterClick: () => void;
}

function CategoryGroup({
  category,
  isExpanded,
  onToggle,
  currentSlug,
  isRead,
  onChapterClick,
}: CategoryGroupProps) {
  const accentClass = categoryAccentMap[category.color] || "text-text-primary";
  const borderClass = categoryBorderMap[category.color] || "border-border-default";

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card transition-colors text-left"
      >
        <span className="text-base">{category.icon}</span>
        <span className={`text-sm font-medium flex-1 ${accentClass}`}>
          {category.titleBn}
        </span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
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
      </button>

      {isExpanded && (
        <div className={`ml-4 border-l-2 ${borderClass} pl-2 mt-1`}>
          {category.chapters.map((slug, i) => {
            const isCurrent = slug === currentSlug;
            const read = isRead(slug);

            return (
              <Link
                key={slug}
                href={`/chapter/${slug}/`}
                onClick={onChapterClick}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                  isCurrent
                    ? "bg-card2 text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-card"
                }`}
              >
                <span className="w-4 text-center text-[10px] text-text-muted">
                  {read ? "✓" : i + 1}
                </span>
                <span className="truncate capitalize">
                  {slug.replace(/-/g, " ")}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
