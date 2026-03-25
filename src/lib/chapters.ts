import type { Chapter, CategoryType } from "@/types";
import { getCategories, getChapterCategory, getOrderedSlugs } from "@/data";

// Chapter import map — maps slug to dynamic import
// In future: replace these imports with API calls
const chapterImports: Record<string, () => Promise<Chapter>> = {};

// Build the import map dynamically from all categories
function registerChapter(category: string, slug: string) {
  chapterImports[slug] = () =>
    import(`@/data/chapters/${category}/${slug}.json`).then(
      (m) => m.default || m
    );
}

// Register all chapters from meta
const categories = getCategories();
for (const cat of categories) {
  for (const slug of cat.chapters) {
    registerChapter(cat.id, slug);
  }
}

/**
 * Get all chapters — loads all JSON files
 * Future: replace with API call
 */
export async function getAllChapters(): Promise<Chapter[]> {
  const slugs = getOrderedSlugs();
  const chapters: Chapter[] = [];
  for (const slug of slugs) {
    try {
      const chapter = await getChapterBySlug(slug);
      if (chapter) chapters.push(chapter);
    } catch {
      // Chapter JSON doesn't exist yet, skip
    }
  }
  return chapters;
}

/**
 * Get single chapter by slug
 * Future: replace with API call
 */
export async function getChapterBySlug(
  slug: string
): Promise<Chapter | null> {
  const importFn = chapterImports[slug];
  if (!importFn) return null;
  try {
    return await importFn();
  } catch {
    return null;
  }
}

/**
 * Get chapters by category
 * Future: replace with API call
 */
export async function getChaptersByCategory(
  category: CategoryType
): Promise<Chapter[]> {
  const cat = categories.find((c) => c.id === category);
  if (!cat) return [];

  const chapters: Chapter[] = [];
  for (const slug of cat.chapters) {
    try {
      const chapter = await getChapterBySlug(slug);
      if (chapter) chapters.push(chapter);
    } catch {
      // skip missing chapters
    }
  }
  return chapters;
}

/**
 * Get previous and next chapters for navigation
 */
export async function getAdjacentChapters(
  slug: string
): Promise<{ prev: Chapter | null; next: Chapter | null }> {
  const allSlugs = getOrderedSlugs();
  const index = allSlugs.indexOf(slug);

  const prev =
    index > 0 ? await getChapterBySlug(allSlugs[index - 1]) : null;
  const next =
    index < allSlugs.length - 1
      ? await getChapterBySlug(allSlugs[index + 1])
      : null;

  return { prev, next };
}

/**
 * Get all slugs — for generateStaticParams
 */
export async function getAllSlugs(): Promise<string[]> {
  return getOrderedSlugs();
}

/**
 * Get category for a chapter slug
 */
export function getCategoryForSlug(slug: string): CategoryType | undefined {
  return getChapterCategory(slug);
}
