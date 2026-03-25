"use client";

import { useState, useEffect, useCallback } from "react";
import type { ProgressState } from "@/types";
import {
  getProgress,
  markAsRead as markAsReadLib,
  unmarkAsRead as unmarkAsReadLib,
  setCurrentChapter as setCurrentChapterLib,
  getOverallProgress,
  resetProgress as resetProgressLib,
} from "@/lib/progress";

export function useProgress(totalChapters: number = 56) {
  const [progress, setProgressState] = useState<ProgressState>({
    completedChapters: [],
    currentChapter: null,
    lastVisited: new Date().toISOString(),
  });

  useEffect(() => {
    setProgressState(getProgress());
  }, []);

  const refresh = useCallback(() => {
    setProgressState(getProgress());
  }, []);

  const markAsRead = useCallback(
    (slug: string) => {
      markAsReadLib(slug);
      refresh();
    },
    [refresh]
  );

  const unmarkAsRead = useCallback(
    (slug: string) => {
      unmarkAsReadLib(slug);
      refresh();
    },
    [refresh]
  );

  const setCurrentChapter = useCallback(
    (slug: string) => {
      setCurrentChapterLib(slug);
      refresh();
    },
    [refresh]
  );

  const resetAllProgress = useCallback(() => {
    resetProgressLib();
    refresh();
  }, [refresh]);

  const isRead = useCallback(
    (slug: string) => {
      return progress.completedChapters.includes(slug);
    },
    [progress.completedChapters]
  );

  const completionPercentage = getOverallProgress(totalChapters);

  return {
    progress,
    markAsRead,
    unmarkAsRead,
    setCurrentChapter,
    resetAllProgress,
    isRead,
    completionPercentage,
    completedCount: progress.completedChapters.length,
  };
}
