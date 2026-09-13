export function DayProgress({
  done,
  total,
  accent,
  size = "default",
}: {
  done: number;
  total: number;
  accent: "rose" | "blue";
  size?: "default" | "large";
}) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const remaining = Math.max(total - done, 0);
  const barColor = accent === "rose" ? "var(--color-rose)" : "var(--color-blue)";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span className={`font-semibold ${size === "large" ? "text-sm" : "text-xs"} text-[var(--color-ink-soft)]`}>
          {done}/{total} completados
        </span>
        <span className={`font-bold ${size === "large" ? "text-sm" : "text-xs"}`} style={{ color: barColor }}>
          {remaining === 0 ? "¡Día completo! 🎉" : `Te quedan ${remaining} lugares`}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--color-cream-soft)]">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
    </div>
  );
}
