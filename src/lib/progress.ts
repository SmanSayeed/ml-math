import type { ProgressState } from "@/types";

const STORAGE_KEY = "ml-math-progress";

function getDefaultProgress(): ProgressState {
  return {
    completedChapters: [],
    currentChapter: null,
    lastVisited: new Date().toISOString(),
  };
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getProgress(): ProgressState {
  if (!isClient()) return getDefaultProgress();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return JSON.parse(raw) as ProgressState;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(progress: ProgressState): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage might be full or unavailable
  }
}

export function getChapterProgress(slug: string): boolean {
  const progress = getProgress();
  return progress.completedChapters.includes(slug);
}

export function markAsRead(slug: string): void {
  const progress = getProgress();
  if (!progress.completedChapters.includes(slug)) {
    progress.completedChapters.push(slug);
  }
  progress.lastVisited = new Date().toISOString();
  saveProgress(progress);
}

export function unmarkAsRead(slug: string): void {
  const progress = getProgress();
  progress.completedChapters = progress.completedChapters.filter(
    (s) => s !== slug
  );
  saveProgress(progress);
}

export function setCurrentChapter(slug: string): void {
  const progress = getProgress();
  progress.currentChapter = slug;
  progress.lastVisited = new Date().toISOString();
  saveProgress(progress);
}

export function getOverallProgress(totalChapters: number): number {
  const progress = getProgress();
  if (totalChapters === 0) return 0;
  return Math.round(
    (progress.completedChapters.length / totalChapters) * 100
  );
}

export function resetProgress(): void {
  if (!isClient()) return;
  localStorage.removeItem(STORAGE_KEY);
}
