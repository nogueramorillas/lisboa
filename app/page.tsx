"use client";

import Link from "next/link";
import { useTrip } from "@/lib/store";
import { trip, getDay } from "@/lib/data/trip";
import { NowNext } from "@/components/NowNext";
import { Header } from "@/components/Header";

export default function HomePage() {
  const { activeDay, setActiveDay, travelMode } = useTrip();
  const day = getDay(activeDay);

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-28 sm:max-w-2xl">
      <Header />

      <main className="flex flex-1 flex-col gap-4 px-4 pt-3">
        {!travelMode && (
          <div className="flex items-center gap-2">
            {trip.days.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDay(d.id)}
                className={`flex-1 rounded-2xl py-2 text-sm font-bold transition-all ${
                  activeDay === d.id
                    ? "text-white shadow-[var(--shadow-soft)]"
                    : "bg-[var(--color-surface)] text-[var(--color-ink-soft)]"
                }`}
                style={{
                  background: activeDay === d.id ? (d.accent === "rose" ? "var(--color-rose)" : "var(--color-blue)") : undefined,
                }}
              >
                {d.emoji} {d.id === "day1" ? "Día 1" : "Día 2"}
              </button>
            ))}
          </div>
        )}

        <NowNext day={day} />

        {!travelMode && (
          <Link
            href="/itinerario"
            className="mt-1 text-center text-sm font-semibold text-[var(--color-azul)] underline underline-offset-4"
          >
            Ver itinerario completo del día →
          </Link>
        )}
      </main>
    </div>
  );
}
