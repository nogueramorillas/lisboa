import type { ActivityStatus } from "@/lib/time";

const CONFIG: Record<ActivityStatus, { label: string; className: string }> = {
  done: { label: "✓ Completado", className: "bg-[var(--color-azul-soft)] text-[var(--color-azul)]" },
  now: { label: "📍 AHORA", className: "bg-[var(--color-terracota)] text-white" },
  soon: { label: "⏰ Próximamente", className: "bg-[var(--color-amarillo-soft)] text-[#7a5b0e]" },
  late: { label: "⌛ Pendiente", className: "bg-[var(--color-rose-soft)] text-[var(--color-rose)]" },
  upcoming: { label: "", className: "bg-transparent text-[var(--color-ink-soft)]" },
};

export function StatusBadge({ status }: { status: ActivityStatus }) {
  const { label, className } = CONFIG[status];
  if (!label) return null;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${className}`}>
      {label}
    </span>
  );
}
