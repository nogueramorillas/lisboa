"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Day } from "@/lib/types";
import { useTrip } from "@/lib/store";
import { endTime } from "@/lib/time";
import { DayProgress } from "./DayProgress";

export function DayOverviewCard({ day }: { day: Day }) {
  const { completed, setActiveDay } = useTrip();
  const places = day.activities.filter((a) => a.countsAsPlace);
  const doneCount = places.filter((a) => (completed[day.id] ?? []).includes(a.id)).length;
  const first = day.activities[0];
  const last = day.activities[day.activities.length - 1];
  const accentSoft = day.accent === "rose" ? "var(--color-rose-soft)" : "var(--color-blue-soft)";
  const accentVar = day.accent === "rose" ? "var(--color-rose)" : "var(--color-blue)";

  return (
    <Link
      href="/itinerario"
      onClick={() => setActiveDay(day.id)}
      className="animate-in block rounded-3xl p-5 shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
      style={{ background: accentSoft }}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: accentVar }}>
            {day.id === "day1" ? "Día 1" : "Día 2"} {day.emoji}
          </span>
          <h2 className="mt-0.5 text-xl font-extrabold leading-tight">{day.title}</h2>
          <p className="text-sm text-[var(--color-ink-soft)]">{day.subtitle}</p>
        </div>
        <ChevronRight className="mt-1 shrink-0" style={{ color: accentVar }} />
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm font-semibold">
        <span className="tabular-nums">
          🕐 {first.time} → {endTime(last)}
        </span>
        <span>📍 {places.length} lugares</span>
      </div>

      <div className="mt-3 rounded-2xl bg-[var(--color-surface)]/70 p-3">
        <DayProgress done={doneCount} total={places.length} accent={day.accent} />
      </div>
    </Link>
  );
}
