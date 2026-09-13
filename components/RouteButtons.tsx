"use client";

import { Footprints, TrainFront, Car, Star } from "lucide-react";
import type { RouteInfo } from "@/lib/types";
import { buildMapsUrl } from "@/lib/maps";
import { formatDuration } from "@/lib/time";
import { transitModesLabel } from "@/lib/transit";

const RECOMMENDED_LABEL: Record<RouteInfo["recommended"], string> = {
  walking: "Caminar",
  transit: "Transporte público",
  taxi: "Taxi",
};

export function RouteButtons({
  route,
  origin,
  destination,
  compact = false,
}: {
  route: RouteInfo;
  origin: string;
  destination: string;
  compact?: boolean;
}) {
  if (route.sameLocation) {
    return (
      <div className="flex items-center gap-2 py-1 pl-1 text-xs text-[var(--color-ink-soft)]">
        <span>📍 Mismo sitio</span>
      </div>
    );
  }

  const walkUrl = buildMapsUrl(destination, "walking", origin);
  const transitUrl = buildMapsUrl(destination, "transit", origin);
  const driveUrl = buildMapsUrl(destination, "walking", origin).replace("travelmode=walking", "travelmode=driving");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-terracota)]">
        <Star size={13} fill="currentColor" />
        <span>
          MEJOR OPCIÓN: {RECOMMENDED_LABEL[route.recommended].toUpperCase()}
        </span>
      </div>

      <div className={`grid gap-2 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
        <a
          href={walkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl px-3 py-3 text-center shadow-[var(--shadow-soft)] transition-transform active:scale-95 ${
            route.recommended === "walking"
              ? "bg-[var(--color-azul)] text-white"
              : "bg-[var(--color-azul-soft)] text-[var(--color-azul)]"
          }`}
        >
          <Footprints size={20} />
          <span className="text-sm font-bold leading-tight">IR CAMINANDO</span>
          <span className="text-[11px] opacity-90">
            ≈ {formatDuration(route.walkMin)} · {route.walkKm} km
          </span>
        </a>

        <a
          href={transitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl px-3 py-3 text-center shadow-[var(--shadow-soft)] transition-transform active:scale-95 ${
            route.recommended === "transit"
              ? "bg-[var(--color-azul)] text-white"
              : "bg-[var(--color-azul-soft)] text-[var(--color-azul)]"
          }`}
        >
          <TrainFront size={20} />
          <span className="text-sm font-bold leading-tight">IR EN TRANSPORTE</span>
          <span className="text-[11px] opacity-90">
            ≈ {formatDuration(route.transitMin)} {route.transitModes.length > 0 && `· ${transitModesLabel(route.transitModes)}`}
          </span>
        </a>
      </div>

      {route.recommended === "taxi" && (
        <a
          href={driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-terracota)] px-3 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform active:scale-95"
        >
          <Car size={18} />
          VER RUTA EN COCHE / TAXI
        </a>
      )}

      {route.transitHint && (
        <p className="pl-1 text-[11px] text-[var(--color-ink-soft)]">🚌 {route.transitHint} (orientativo)</p>
      )}
      <p className="pl-1 text-[11px] text-[var(--color-ink-soft)]">{route.recommendedReason}</p>
    </div>
  );
}
