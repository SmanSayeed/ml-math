import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getChapterBySlug, getAllSlugs } from "@/lib/chapters";
import { ChapterContent } from "@/components/chapter/ChapterContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);
  if (!chapter) {
    return { title: "চ্যাপ্টার পাওয়া যায়নি" };
  }
  return {
    title: `${chapter.title} — ML গণিত গুরু`,
    description: `${chapter.titleEn} — মেশিন লার্নিং-এর গণিত শিখো ঢাকাইয়া স্টাইলে`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return <ChapterContent chapter={chapter} />;
}
