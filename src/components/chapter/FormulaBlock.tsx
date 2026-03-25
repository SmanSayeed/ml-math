"use client";

import { useState, useCallback } from "react";

interface FormulaBlockProps {
  formula: string;
  label?: string;
}

export function FormulaBlock({ formula, label }: FormulaBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyLatex = useCallback(() => {
    navigator.clipboard.writeText(formula).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [formula]);

  return (
    <div className="bg-card2 rounded-lg border border-border-subtle overflow-hidden">
      {label && (
        <div className="px-4 py-2 border-b border-border-subtle">
          <span className="text-xs text-text-muted">{label}</span>
        </div>
      )}
      <div className="px-4 py-4 text-center overflow-x-auto">
        <span className="text-text-primary text-lg">
          {"\\[" + formula + "\\]"}
        </span>
      </div>
      <div className="px-4 py-2 border-t border-border-subtle flex justify-end">
        <button
          onClick={copyLatex}
          className="text-xs text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              কপি হইছে!
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              LaTeX কপি
            </>
          )}
        </button>
      </div>
    </div>
  );
}
