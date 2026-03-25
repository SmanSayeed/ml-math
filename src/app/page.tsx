"use client";

import Link from "next/link";
import { getCategories } from "@/data";
import { useProgress } from "@/hooks/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";

const categoryColorMap: Record<string, string> = {
  amber: "border-accent-amber/30 hover:border-accent-amber/60",
  blue: "border-accent-blue/30 hover:border-accent-blue/60",
  red: "border-accent-red/30 hover:border-accent-red/60",
  orange: "border-accent-orange/30 hover:border-accent-orange/60",
  green: "border-accent-green/30 hover:border-accent-green/60",
};

const categoryTextMap: Record<string, string> = {
  amber: "text-accent-amber",
  blue: "text-accent-blue",
  red: "text-accent-red",
  orange: "text-accent-orange",
  green: "text-accent-green",
};

export default function Home() {
  const categories = getCategories();
  const { progress, completionPercentage, completedCount } = useProgress();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-3">
          🧮 ML গণিত গুরু
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          মেশিন লার্নিং-এর জন্য দরকারি সব গণিত শিখো — ঢাকাইয়া বাংলায়, মজার
          গল্পে, চায়ের কাপে!
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-card rounded-xl border border-border-subtle p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              তোমার প্রোগ্রেস
            </h2>
            <p className="text-sm text-text-secondary">
              <span className="text-accent-amber font-medium">
                {completedCount}
              </span>{" "}
              / 56 চ্যাপ্টার পড়া হইছে
            </p>
          </div>
          <ProgressRing percentage={completionPercentage} size={60} strokeWidth={4} />
        </div>

        {/* Continue Reading */}
        {progress.currentChapter && (
          <Link
            href={`/chapter/${progress.currentChapter}/`}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-accent-amber text-base rounded-xl font-medium hover:bg-accent-amber/90 transition-colors"
          >
            পড়া চালিয়ে যাও →
          </Link>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const borderClass = categoryColorMap[cat.color] || "";
          const textClass = categoryTextMap[cat.color] || "text-text-primary";

          return (
            <Link
              key={cat.id}
              href={`/chapter/${cat.chapters[0]}/`}
              className={`bg-card rounded-xl border ${borderClass} p-5 transition-all hover:bg-card2 group`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className={`text-lg font-semibold ${textClass}`}>
                    {cat.titleBn}
                  </h3>
                  <p className="text-xs text-text-muted">{cat.title}</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                {cat.chapters.length} টা চ্যাপ্টার
              </p>
              <div className="mt-3 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                শুরু করো →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
