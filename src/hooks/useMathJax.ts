"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
      startup?: {
        defaultReady: () => void;
        promise: Promise<void>;
      };
    };
  }
}

export function useMathJax(dependencies: unknown[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);

  const typeset = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.MathJax?.typesetPromise &&
      containerRef.current
    ) {
      // Clear previous MathJax rendering
      window.MathJax.typesetPromise([containerRef.current]).catch(
        (err: unknown) => {
          console.warn("MathJax typeset error:", err);
        }
      );
    }
  }, []);

  useEffect(() => {
    // MathJax might not be loaded yet, retry with interval
    const tryTypeset = () => {
      if (window.MathJax?.typesetPromise) {
        typeset();
        return true;
      }
      return false;
    };

    if (!tryTypeset()) {
      const interval = setInterval(() => {
        if (tryTypeset()) {
          clearInterval(interval);
        }
      }, 200);

      // Clean up after 10 seconds
      const timeout = setTimeout(() => clearInterval(interval), 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeset, ...dependencies]);

  return containerRef;
}
