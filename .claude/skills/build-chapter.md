---
name: build-chapter
description: Generate a single chapter JSON file for the ML Math E-Book
---

# Build Chapter Skill

Generate a chapter JSON file following the exact schema below. All content must be in Dhakaia Bengali (ঢাকাইয়া বাংলা) with the "গুরু" persona.

## JSON Schema

```typescript
interface Chapter {
  slug: string;           // kebab-case, matches filename
  title: string;          // Bengali title
  titleEn: string;        // English title
  category: CategoryType; // one of the 5 categories
  order: number;          // position within category
  readTime: number;       // estimated minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  story: {
    icon: string;         // emoji
    title: string;        // story title in Bengali
    content: string;      // funny Dhaka story connecting to concept
    reveal: string;       // "এইটাই হইল [CONCEPT]! বুঝলা মামা?"
  };

  definition: {
    content: string;      // clean definition in Bengali
    formula: string;      // LaTeX formula (use \\ for backslash)
    formulaLabel: string; // formula name in Bengali
  };

  explanation: {
    steps: Array<{
      title: string;
      content: string;    // Bengali explanation
      formula?: string;   // optional LaTeX
    }>;
  };

  workedExample: {
    title: string;
    problem: string;      // Bengali problem statement
    steps: Array<{
      label: string;
      content: string;
      formula?: string;
    }>;
    answer: string;
  };

  mlUseCases: Array<{     // 3-5 use cases
    id: number;
    title: string;
    icon: string;
    explanation: string;  // Bengali
    realExample: string;  // specific ML model/system
    code: {
      language: 'python' | 'typescript';
      snippet: string;    // working code
    };
  }>;

  memoryTrick: string;    // one-liner Bengali memory trick
  tags: string[];
  prev: string | null;    // previous chapter slug
  next: string | null;    // next chapter slug
}
```

## Content Rules

1. Start every story with a funny Dhaka scenario (rickshaw, CNG, bazar, biryani, traffic jam, pathao, bou, jamai, etc.)
2. Story must connect naturally to the math concept
3. After story reveal: "এইটাই হইল [CONCEPT]! বুঝলা মামা?"
4. Use casual Dhaka slang: "ভাই", "মামা", "ধর", "বুঝলা?", "এইটাই হইল", "দেখো", "মনে কর"
5. Explain WHY before HOW
6. Mix Bengali + English: "Gradient (ঢালের দিক)"
7. MathJax: Use `\\(` `\\)` for inline, `\\[` `\\]` for display math
8. In JSON strings, escape backslashes: `\\\\(` `\\\\)` for inline, `\\\\[` `\\\\]` for display

## File Location

Save to: `src/data/chapters/{category}/{slug}.json`

## Usage

```
/build-chapter scalar linear-algebra 1
```
