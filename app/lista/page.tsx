"use client";

import { Check } from "lucide-react";
import { trip } from "@/lib/data/trip";
import { useTrip } from "@/lib/store";
import { Header } from "@/components/Header";

export default function ListaPage() {
  const { isPacked, togglePacking, hydrated } = useTrip();
  const total = trip.packingList.length;
  const done = hydrated ? trip.packingList.filter((i) => isPacked(i.id)).length : 0;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-28 sm:max-w-2xl">
      <Header title="🧳 Maleta" />

      <main className="flex flex-1 flex-col gap-4 px-4 pt-3">
        <div>
          <h1 className="text-2xl font-extrabold">🧳 Maleta</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">Marca cada cosa cuando la metas en la maleta</p>
        </div>

        <div className="rounded-2xl bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>
              {done} / {total} preparados
            </span>
            <span className="text-[var(--color-terracota)]">{pct}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-cream-soft)]">
            <div
              className="h-full rounded-full bg-[var(--color-terracota)] transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {trip.packingList.map((item) => {
            const packed = hydrated && isPacked(item.id);
            return (
              <button
                key={item.id}
                onClick={() => togglePacking(item.id)}
                className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left shadow-[var(--shadow-soft)] transition-all active:scale-[0.98] ${
                  packed ? "border-transparent bg-[var(--color-terracota-soft)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    packed ? "border-transparent bg-[var(--color-terracota)] text-white animate-pop" : "border-[var(--color-border)] text-transparent"
                  }`}
                >
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className={`text-[15px] font-medium ${packed ? "text-[var(--color-ink-soft)] line-through" : ""}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
