import type { CategoryMeta, MetaData, CategoryType } from "@/types";
import metaJson from "./meta.json";

const meta = metaJson as MetaData;

export function getCategories(): CategoryMeta[] {
  return meta.categories;
}

export function getCategory(id: CategoryType): CategoryMeta | undefined {
  return meta.categories.find((c) => c.id === id);
}

export function getAllChapterSlugs(): string[] {
  return meta.categories.flatMap((c) => c.chapters);
}

export function getChapterCategory(slug: string): CategoryType | undefined {
  for (const cat of meta.categories) {
    if (cat.chapters.includes(slug)) {
      return cat.id as CategoryType;
    }
  }
  return undefined;
}

export function getTotalChapters(): number {
  return meta.totalChapters;
}

export function getOrderedSlugs(): string[] {
  return meta.categories.flatMap((c) => c.chapters);
}

export { meta };
