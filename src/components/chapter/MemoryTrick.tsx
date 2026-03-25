interface MemoryTrickProps {
  trick: string;
}

export function MemoryTrick({ trick }: MemoryTrickProps) {
  return (
    <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl px-5 py-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">💡</span>
        <h3 className="text-sm font-semibold text-accent-green">
          মনে রাখার ট্রিক
        </h3>
      </div>
      <p className="text-text-secondary leading-relaxed">{trick}</p>
    </div>
  );
}
