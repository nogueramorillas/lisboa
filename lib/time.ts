import type { Activity } from "./types";

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function toTimeString(totalMinutes: number): string {
  const m = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function endTime(activity: Activity): string {
  return toTimeString(toMinutes(activity.time) + activity.durationMin);
}

export function nowMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatClock(date: Date): string {
  return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

export function formatDuration(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export type ActivityStatus = "done" | "now" | "soon" | "late" | "upcoming";

export function getActivityStatus(
  activity: Activity,
  currentMinutes: number,
  isCompleted: boolean
): ActivityStatus {
  if (isCompleted) return "done";
  const start = toMinutes(activity.time);
  const end = start + activity.durationMin;
  if (currentMinutes >= start && currentMinutes < end) return "now";
  if (currentMinutes < start && start - currentMinutes <= 20) return "soon";
  if (currentMinutes >= end) return "late";
  return "upcoming";
}

export interface FocusResult {
  focus: Activity | null;
  next: Activity | null;
  remainingCount: number;
  totalPlaces: number;
  doneCount: number;
}

export function getFocusAndNext(
  activities: Activity[],
  completedIds: Set<string>,
  currentMinutes: number
): FocusResult {
  const places = activities.filter((a) => a.countsAsPlace);
  const totalPlaces = places.length;
  const doneCount = places.filter((a) => completedIds.has(a.id)).length;

  const pending = activities.filter((a) => !a.isAnchor && !completedIds.has(a.id));
  const remainingCount = places.filter((a) => !completedIds.has(a.id)).length;

  if (pending.length === 0) {
    return { focus: null, next: null, remainingCount: 0, totalPlaces, doneCount };
  }

  const inWindow = pending.find((a) => {
    const start = toMinutes(a.time);
    const end = start + a.durationMin;
    return currentMinutes >= start && currentMinutes < end;
  });

  const focus = inWindow ?? pending[0];
  const focusIndex = pending.indexOf(focus);
  const next = pending[focusIndex + 1] ?? null;

  return { focus, next, remainingCount, totalPlaces, doneCount };
}
