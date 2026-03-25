export type CategoryType =
  | "linear-algebra"
  | "calculus"
  | "probability-stats"
  | "information-theory"
  | "optimization";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type CodeLanguage = "python" | "typescript";

export interface Story {
  icon: string;
  title: string;
  content: string;
  reveal: string;
}

export interface Definition {
  content: string;
  formula: string;
  formulaLabel: string;
}

export interface ExplanationStep {
  title: string;
  content: string;
  formula?: string;
}

export interface Explanation {
  steps: ExplanationStep[];
}

export interface WorkedExampleStep {
  label: string;
  content: string;
  formula?: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: WorkedExampleStep[];
  answer: string;
}

export interface CodeSnippet {
  language: CodeLanguage;
  snippet: string;
}

export interface MLUseCase {
  id: number;
  title: string;
  icon: string;
  explanation: string;
  realExample: string;
  code: CodeSnippet;
}

export interface Chapter {
  slug: string;
  title: string;
  titleEn: string;
  category: CategoryType;
  order: number;
  readTime: number;
  difficulty: Difficulty;
  story: Story;
  definition: Definition;
  explanation: Explanation;
  workedExample: WorkedExample;
  mlUseCases: MLUseCase[];
  memoryTrick: string;
  tags: string[];
  prev: string | null;
  next: string | null;
}

export interface CategoryMeta {
  id: CategoryType;
  title: string;
  titleBn: string;
  icon: string;
  color: string;
  chapters: string[];
}

export interface MetaData {
  categories: CategoryMeta[];
  totalChapters: number;
  version: string;
}

export interface ProgressState {
  completedChapters: string[];
  currentChapter: string | null;
  lastVisited: string;
}

export const CATEGORY_COLORS: Record<CategoryType, string> = {
  "linear-algebra": "amber",
  calculus: "blue",
  "probability-stats": "red",
  "information-theory": "orange",
  optimization: "green",
};
