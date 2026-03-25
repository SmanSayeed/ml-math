"use client";

import { useState, useCallback } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="rounded-lg overflow-hidden border border-border-subtle">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border-subtle">
        <span className="text-xs font-medium text-accent-blue uppercase tracking-wider font-[family-name:var(--font-jetbrains-mono)]">
          {language}
        </span>
        <button
          onClick={copyCode}
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
              কপি
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="bg-[#0d1117] p-4 overflow-x-auto">
        <code className="text-sm text-text-secondary font-[family-name:var(--font-jetbrains-mono)] leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
