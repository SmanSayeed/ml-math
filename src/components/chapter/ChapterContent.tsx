"use client";

import type { Chapter } from "@/types";
import { useMathJax } from "@/hooks/useMathJax";
import { useProgress } from "@/hooks/useProgress";
import { StoryBox } from "./StoryBox";
import { ConceptCard } from "./ConceptCard";
import { FormulaBlock } from "./FormulaBlock";
import { UseCaseCard } from "./UseCaseCard";
import { MemoryTrick } from "./MemoryTrick";
import { ChapterNav } from "./ChapterNav";
import { Badge } from "@/components/ui/Badge";

interface ChapterContentProps {
  chapter: Chapter;
}

export function ChapterContent({ chapter }: ChapterContentProps) {
  const mathRef = useMathJax([chapter.slug]);
  const { isRead, markAsRead, unmarkAsRead } = useProgress();
  const read = isRead(chapter.slug);

  return (
    <div ref={mathRef} className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="category" category={chapter.category} label={chapter.category} />
          <Badge variant="difficulty" difficulty={chapter.difficulty} />
          <span className="text-xs text-text-muted">
            ⏱ {chapter.readTime} মিনিট
          </span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {chapter.title}
        </h1>
        <p className="text-text-muted text-sm">{chapter.titleEn}</p>
      </div>

      {/* Story */}
      <StoryBox story={chapter.story} />

      {/* Definition */}
      <ConceptCard definition={chapter.definition} />

      {/* Explanation Steps */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          ব্যাখ্যা
        </h2>
        {chapter.explanation.steps.map((step, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-base font-medium text-accent-blue mb-2">
              {step.title}
            </h3>
            <p className="text-text-secondary leading-relaxed mb-2">
              {step.content}
            </p>
            {step.formula && (
              <FormulaBlock formula={step.formula} />
            )}
          </div>
        ))}
      </div>

      {/* Worked Example */}
      <div className="bg-card rounded-xl border border-border-subtle p-5 mb-6">
        <h2 className="text-xl font-semibold text-accent-purple mb-3">
          {chapter.workedExample.title}
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          {chapter.workedExample.problem}
        </p>
        {chapter.workedExample.steps.map((step, i) => (
          <div key={i} className="mb-3 pl-4 border-l-2 border-accent-purple/30">
            <h4 className="text-sm font-medium text-text-primary mb-1">
              {step.label}
            </h4>
            <p className="text-text-secondary text-sm mb-1">{step.content}</p>
            {step.formula && (
              <FormulaBlock formula={step.formula} />
            )}
          </div>
        ))}
        <div className="mt-4 bg-accent-green/10 border border-accent-green/20 rounded-lg px-4 py-3">
          <span className="text-sm font-medium text-accent-green">
            উত্তর:
          </span>
          <p className="text-text-secondary text-sm mt-1">
            {chapter.workedExample.answer}
          </p>
        </div>
      </div>

      {/* ML Use Cases */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          ML-এ কোথায় লাগে?
        </h2>
        {chapter.mlUseCases.map((uc) => (
          <UseCaseCard key={uc.id} useCase={uc} category={chapter.category} />
        ))}
      </div>

      {/* Memory Trick */}
      <MemoryTrick trick={chapter.memoryTrick} />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chapter.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded text-xs text-text-muted bg-card border border-border-subtle"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Mark as Read */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => (read ? unmarkAsRead(chapter.slug) : markAsRead(chapter.slug))}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
            read
              ? "bg-accent-green/15 text-accent-green border border-accent-green/30"
              : "bg-accent-amber text-base hover:bg-accent-amber/90"
          }`}
        >
          {read ? "✓ পড়া হইছে" : "পড়া শেষ — মার্ক করো"}
        </button>
      </div>

      {/* Navigation */}
      <ChapterNav
        prevSlug={chapter.prev}
        nextSlug={chapter.next}
      />
    </div>
  );
}
