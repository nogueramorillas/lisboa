"use client";

import { Clock, Footprints, MapPin } from "lucide-react";
import type { SalePoint } from "@/lib/data/transportCard";
import { HOTEL_ADDRESS } from "@/lib/data/transportCard";
import { buildMapsUrl } from "@/lib/maps";

const RANK_BADGE: Record<1 | 2 | 3, string> = {
  1: "🥇 MÁS CERCANO AL HOTEL",
  2: "🥈 SEGUNDA OPCIÓN",
  3: "🥉 TERCERA OPCIÓN",
};

export function SalePointCard({ point }: { point: SalePoint }) {
  const mapsUrl = buildMapsUrl(point.mapsQuery, "walking");
  const fromHotelUrl = buildMapsUrl(point.mapsQuery, "walking", HOTEL_ADDRESS);

  return (
    <div className="animate-in flex flex-col gap-2.5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
      {point.rank && (
        <span className="w-fit rounded-full bg-[var(--color-amarillo-soft)] px-2.5 py-1 text-[11px] font-bold text-[#7a5b0e]">
          {RANK_BADGE[point.rank]}
        </span>
      )}

      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-azul-soft)] text-xl">
          🚇
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-bold">{point.name}</h3>
          <p className="text-[13px] text-[var(--color-ink-soft)]">
            📌 {point.address} · {point.line}
          </p>
          {point.note && <p className="mt-0.5 text-[12px] text-[var(--color-ink-soft)]">{point.note}</p>}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="flex items-center gap-1 rounded-full bg-[var(--color-cream-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-ink-soft)]">
          <Clock size={11} /> {point.hours}
        </span>
        {point.walkMin !== null && (
          <span className="flex items-center gap-1 rounded-full bg-[var(--color-cream-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-ink-soft)]">
            <Footprints size={11} /> ≈ {point.walkMin} min · {point.walkKm} km desde el hotel
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-azul)] px-3 py-2.5 text-center text-[13px] font-bold text-white shadow-[var(--shadow-soft)] transition-transform active:scale-95"
        >
          <MapPin size={15} /> GOOGLE MAPS
        </a>
        {point.walkMin !== null && (
          <a
            href={fromHotelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-azul-soft)] px-3 py-2.5 text-center text-[13px] font-bold text-[var(--color-azul)] transition-transform active:scale-95"
          >
            <Footprints size={15} /> DESDE EL HOTEL
          </a>
        )}
      </div>
    </div>
  );
}
