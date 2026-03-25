"use client";

import { useMemo } from "react";
import type { Chapter } from "@/types";
import { getOrderedSlugs } from "@/data";

interface UseChapterReturn {
  prevSlug: string | null;
  nextSlug: string | null;
  chapterIndex: number;
  totalChapters: number;
}

export function useChapter(slug: string): UseChapterReturn {
  return useMemo(() => {
    const allSlugs = getOrderedSlugs();
    const index = allSlugs.indexOf(slug);

    return {
      prevSlug: index > 0 ? allSlugs[index - 1] : null,
      nextSlug: index < allSlugs.length - 1 ? allSlugs[index + 1] : null,
      chapterIndex: index,
      totalChapters: allSlugs.length,
    };
  }, [slug]);
}

export function useChapterData(chapter: Chapter) {
  return useMemo(
    () => ({
      slug: chapter.slug,
      title: chapter.title,
      titleEn: chapter.titleEn,
      category: chapter.category,
      difficulty: chapter.difficulty,
      readTime: chapter.readTime,
      hasPrev: chapter.prev !== null,
      hasNext: chapter.next !== null,
    }),
    [chapter]
  );
}
