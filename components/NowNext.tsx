"use client";

import { PartyPopper, ArrowDown, Check } from "lucide-react";
import type { Day } from "@/lib/types";
import { useTrip, useNow } from "@/lib/store";
import { getFocusAndNext, getActivityStatus, nowMinutes, toMinutes, endTime, formatDuration } from "@/lib/time";
import { RouteButtons } from "./RouteButtons";
import { DayProgress } from "./DayProgress";
import { StatusBadge } from "./StatusBadge";

export function NowNext({ day }: { day: Day }) {
  const { completed, toggleActivity, travelMode, hydrated } = useTrip();
  const now = useNow();

  const accentVar = day.accent === "rose" ? "var(--color-rose)" : "var(--color-blue)";
  const accentSoft = day.accent === "rose" ? "var(--color-rose-soft)" : "var(--color-blue-soft)";

  if (!hydrated || !now) {
    return <div className="h-64 animate-pulse rounded-3xl bg-[var(--color-cream-soft)]" />;
  }

  const completedIds = new Set(completed[day.id] ?? []);
  const currentMin = nowMinutes(now);
  const { focus, next, remainingCount, totalPlaces, doneCount } = getFocusAndNext(
    day.activities,
    completedIds,
    currentMin
  );

  if (!focus) {
    return (
      <div
        className="animate-in flex flex-col items-center gap-3 rounded-3xl p-8 text-center shadow-[var(--shadow-lift)]"
        style={{ background: accentSoft }}
      >
        <PartyPopper size={40} style={{ color: accentVar }} />
        <h2 className="text-xl font-bold">¡{day.title} completado!</h2>
        <p className="text-sm text-[var(--color-ink-soft)]">Habéis marcado los {totalPlaces} lugares del día.</p>
      </div>
    );
  }

  const status = getActivityStatus(focus, currentMin, false);
  const route = next ? day.routes.find((r) => r.fromId === focus.id && r.toId === next.id) : undefined;

  const start = toMinutes(focus.time);
  const end = start + focus.durationMin;
  let timeLine: string;
  if (currentMin >= start && currentMin < end) {
    timeLine = `Te quedan ≈ ${end - currentMin} min aquí`;
  } else if (currentMin < start) {
    timeLine = `Empieza a las ${focus.time} · dura ${formatDuration(focus.durationMin)}`;
  } else {
    timeLine = `Estaba previsto hasta las ${endTime(focus)}`;
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="animate-in flex flex-col gap-3 rounded-3xl p-5 shadow-[var(--shadow-lift)]"
        style={{ background: accentSoft }}
      >
        <div className="flex items-center justify-between">
          <StatusBadge status={status} />
          <span className="font-mono text-xs font-semibold tabular-nums text-[var(--color-ink-soft)]">
            {focus.time} – {endTime(focus)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-3xl shadow-[var(--shadow-soft)]">
            {focus.emoji}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold leading-tight">{focus.name}</h1>
            {!travelMode && focus.description && (
              <p className="text-sm text-[var(--color-ink-soft)]">{focus.description}</p>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold" style={{ color: accentVar }}>
          {timeLine}
        </p>

        <button
          onClick={() => toggleActivity(day.id, focus.id)}
          className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-extrabold text-white shadow-[var(--shadow-soft)] transition-transform active:scale-95"
          style={{ background: accentVar }}
        >
          <Check size={20} strokeWidth={3} />
          HECHO — IR AL SIGUIENTE
        </button>
      </div>

      {!travelMode && (
        <div className="rounded-2xl bg-[var(--color-surface)] p-3 shadow-[var(--shadow-soft)]">
          <DayProgress done={doneCount} total={totalPlaces} accent={day.accent} />
        </div>
      )}

      {next && (
        <>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[var(--color-ink-soft)]">
            <ArrowDown size={14} />
            SIGUIENTE
          </div>

          <div className="animate-in flex items-center gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-cream-soft)] text-xl">
              {next.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold">{next.name}</h2>
              <p className="text-xs text-[var(--color-ink-soft)]">
                {next.time} · {formatDuration(next.durationMin)}
              </p>
            </div>
          </div>

          {route && <RouteButtons route={route} origin={focus.address} destination={next.address} />}
        </>
      )}

      {!next && (
        <p className="rounded-2xl bg-[var(--color-surface)] p-4 text-center text-sm font-semibold text-[var(--color-ink-soft)] shadow-[var(--shadow-soft)]">
          🏁 Es el último punto del día
        </p>
      )}

      {!travelMode && (
        <p className="pt-1 text-center text-xs text-[var(--color-ink-soft)]">
          Quedan {remainingCount} lugares por completar hoy
        </p>
      )}
    </div>
  );
}
