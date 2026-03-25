"use client";

import type { Story } from "@/types";

interface StoryBoxProps {
  story: Story;
}

export function StoryBox({ story }: StoryBoxProps) {
  return (
    <div className="bg-card rounded-xl border border-border-subtle p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{story.icon}</span>
        <h3 className="text-lg font-semibold text-accent-amber">
          {story.title}
        </h3>
      </div>
      <p className="text-text-secondary leading-relaxed mb-4">
        {story.content}
      </p>
      <div className="bg-accent-amber/10 border border-accent-amber/20 rounded-lg px-4 py-3">
        <p className="text-accent-amber font-medium">{story.reveal}</p>
      </div>
    </div>
  );
}
