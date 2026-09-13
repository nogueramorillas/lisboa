"use client";

import { Check, Clock } from "lucide-react";
import type { Activity } from "@/lib/types";
import type { ActivityStatus } from "@/lib/time";
import { endTime, formatDuration } from "@/lib/time";
import { StatusBadge } from "./StatusBadge";

export function ActivityCard({
  activity,
  status,
  completed,
  accent,
  onToggle,
  cardRef,
}: {
  activity: Activity;
  status: ActivityStatus;
  completed: boolean;
  accent: "rose" | "blue";
  onToggle: () => void;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const accentVar = accent === "rose" ? "var(--color-rose)" : "var(--color-blue)";
  const accentSoft = accent === "rose" ? "var(--color-rose-soft)" : "var(--color-blue-soft)";

  return (
    <div
      ref={cardRef}
      className={`animate-in rounded-3xl border p-4 shadow-[var(--shadow-soft)] transition-all ${
        status === "now" ? "scale-[1.01] border-transparent" : "border-[var(--color-border)]"
      } ${completed ? "opacity-60" : "opacity-100"}`}
      style={{
        background: status === "now" ? accentSoft : "var(--color-surface)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl"
          style={{ background: accentSoft }}
        >
          {activity.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-soft)]">
            <Clock size={12} />
            <span className="tabular-nums">{activity.time}</span>
            <span>–</span>
            <span className="tabular-nums">{endTime(activity)}</span>
          </div>
          <h3 className={`mt-0.5 text-[15px] font-bold ${completed ? "line-through" : ""}`}>
            {activity.name}
          </h3>
          {activity.description && (
            <p className="mt-0.5 text-[13px] text-[var(--color-ink-soft)]">{activity.description}</p>
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-[var(--color-cream-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-ink-soft)]">
              ⏱️ {formatDuration(activity.durationMin)}
            </span>
            {activity.note && (
              <span className="rounded-full bg-[var(--color-cream-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-ink-soft)]">
                {activity.note}
              </span>
            )}
            <StatusBadge status={status} />
          </div>
        </div>

        <button
          onClick={onToggle}
          aria-label={completed ? "Marcar como pendiente" : "Marcar como hecho"}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all active:scale-90 ${
            completed
              ? "border-transparent text-white animate-pop"
              : "border-[var(--color-border)] text-transparent"
          }`}
          style={{ background: completed ? accentVar : "transparent" }}
        >
          <Check size={18} strokeWidth={3} className={completed ? "opacity-100" : "opacity-0"} />
        </button>
      </div>
    </div>
  );
}
