"use client";

import { Moon, Sun, Zap, ZapOff } from "lucide-react";
import { useTrip, useNow } from "@/lib/store";
import { formatClock } from "@/lib/time";

export function Header({ title }: { title?: string }) {
  const { darkMode, setDarkMode, travelMode, setTravelMode, hydrated } = useTrip();
  const now = useNow();

  return (
    <header className="safe-top sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-cream)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-2.5 sm:max-w-2xl">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold">{title ?? "🇵🇹 Lisboa"}</span>
          {hydrated && now && (
            <span className="font-mono text-xs tabular-nums text-[var(--color-ink-soft)]">
              {formatClock(now)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Modo viaje"
            onClick={() => setTravelMode(!travelMode)}
            className={`flex h-8 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition-colors ${
              travelMode
                ? "bg-[var(--color-amarillo)] text-[#3a2c05]"
                : "bg-[var(--color-cream-soft)] text-[var(--color-ink-soft)]"
            }`}
          >
            {travelMode ? <Zap size={14} /> : <ZapOff size={14} />}
            <span className="hidden xs:inline">Modo viaje</span>
          </button>
          <button
            aria-label="Modo oscuro"
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-cream-soft)] text-[var(--color-ink-soft)] transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
