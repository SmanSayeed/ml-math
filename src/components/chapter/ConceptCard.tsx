"use client";

import type { Definition } from "@/types";
import { FormulaBlock } from "./FormulaBlock";

interface ConceptCardProps {
  definition: Definition;
}

export function ConceptCard({ definition }: ConceptCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border-subtle p-5 mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-3">
        সংজ্ঞা
      </h3>
      <p className="text-text-secondary leading-relaxed mb-4">
        {definition.content}
      </p>
      <FormulaBlock
        formula={definition.formula}
        label={definition.formulaLabel}
      />
    </div>
  );
}
