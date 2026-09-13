"use client";

import { useRef } from "react";
import { trip, getDay, getRoute } from "@/lib/data/trip";
import { useTrip } from "@/lib/store";
import { ActivityCard } from "@/components/ActivityCard";
import { RouteConnector } from "@/components/RouteConnector";
import { DayProgress } from "@/components/DayProgress";
import { Header } from "@/components/Header";
import { getActivityStatus, nowMinutes } from "@/lib/time";
import { useNow } from "@/lib/store";

export default function ItinerarioPage() {
  const { activeDay, setActiveDay, completed, completeActivity, uncompleteActivity, hydrated } = useTrip();
  const now = useNow();
  const day = getDay(activeDay);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const completedIds = new Set(completed[day.id] ?? []);
  const currentMin = now ? nowMinutes(now) : 0;
  const places = day.activities.filter((a) => a.countsAsPlace);
  const doneCount = places.filter((a) => completedIds.has(a.id)).length;

  // One-way: marking an activity done advances to the next one. Already-done
  // activities can't be un-marked, so this only ever fires on the way forward.
  function handleComplete(activityId: string, index: number) {
    if (completedIds.has(activityId)) return;
    completeActivity(day.id, activityId);
    const nextActivity = day.activities[index + 1];
    if (nextActivity) {
      setTimeout(() => {
        cardRefs.current[nextActivity.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 250);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-28 sm:max-w-2xl">
      <Header title="📅 Itinerario" />

      <main className="flex flex-1 flex-col gap-4 px-4 pt-3">
        <div className="flex items-center gap-2">
          {trip.days.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDay(d.id)}
              className={`flex-1 rounded-2xl py-2 text-sm font-bold transition-all ${
                activeDay === d.id ? "text-white shadow-[var(--shadow-soft)]" : "bg-[var(--color-surface)] text-[var(--color-ink-soft)]"
              }`}
              style={{
                background: activeDay === d.id ? (d.accent === "rose" ? "var(--color-rose)" : "var(--color-blue)") : undefined,
              }}
            >
              {d.emoji} {d.id === "day1" ? "Día 1" : "Día 2"}
            </button>
          ))}
        </div>

        <div>
          <h1 className="text-xl font-extrabold">{day.title}</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">{day.subtitle}</p>
        </div>

        <div className="rounded-2xl bg-[var(--color-surface)] p-3 shadow-[var(--shadow-soft)]">
          <DayProgress done={doneCount} total={places.length} accent={day.accent} />
        </div>

        <div className="flex flex-col">
          {day.activities.map((activity, index) => {
            const isDone = completedIds.has(activity.id);
            const status =
              hydrated && !(activity.isAnchor && !isDone)
                ? getActivityStatus(activity, currentMin, isDone)
                : "upcoming";
            const nextActivity = day.activities[index + 1];
            const route = nextActivity ? getRoute(day.id, activity.id, nextActivity.id) : undefined;

            return (
              <div key={activity.id}>
                <ActivityCard
                  activity={activity}
                  status={status}
                  completed={completedIds.has(activity.id)}
                  accent={day.accent}
                  onComplete={() => handleComplete(activity.id, index)}
                  onUndo={() => uncompleteActivity(day.id, activity.id)}
                  cardRef={(el) => {
                    cardRefs.current[activity.id] = el;
                  }}
                />
                {route && nextActivity && (
                  <RouteConnector route={route} origin={activity.address} destination={nextActivity.address} />
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
