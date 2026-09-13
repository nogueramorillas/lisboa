"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RotateCcw, Ticket } from "lucide-react";
import { trip } from "@/lib/data/trip";
import { useTrip } from "@/lib/store";
import { buildMapsUrl } from "@/lib/maps";
import { endTime, formatDuration } from "@/lib/time";
import { useConfirmToggle } from "@/lib/useConfirmToggle";
import { HOTEL_ADDRESS, salePoints, type SalePoint } from "@/lib/data/transportCard";
import type { Activity, Day } from "@/lib/types";

function dayColor(day: Day) {
  return day.accent === "rose" ? "#d16a7a" : "#2f6f9e";
}

function makeIcon(emoji: string, color: string, muted: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
        background:${muted ? "#9c948c" : color};
        width:34px;height:34px;border-radius:50% 50% 50% 4px;
        display:flex;align-items:center;justify-content:center;
        transform:rotate(45deg);
        box-shadow:0 2px 6px rgba(0,0,0,0.35);
        border:2px solid white;
      ">
        <span style="transform:rotate(-45deg);font-size:16px;line-height:1;">${emoji}</span>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 30],
    popupAnchor: [0, -30],
  });
}

function MarkerPopupBody({
  day,
  activity,
  done,
  onComplete,
  onUndo,
}: {
  day: Day;
  activity: Activity;
  done: boolean;
  onComplete: () => void;
  onUndo: () => void;
}) {
  const { armed, trigger } = useConfirmToggle(onUndo);

  return (
    <div className="flex min-w-[180px] flex-col gap-1.5 p-0.5">
      <span className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">
        {day.emoji} {day.id === "day1" ? "Día 1" : "Día 2"}
      </span>
      <span className="text-sm font-bold">{activity.name}</span>
      <span className="text-xs text-[var(--color-ink-soft)]">
        {activity.time} – {endTime(activity)} · {formatDuration(activity.durationMin)}
      </span>
      <a
        href={buildMapsUrl(activity.address, "walking")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 rounded-lg bg-[var(--color-azul)] px-2 py-1.5 text-center text-xs font-bold text-white"
      >
        🚶 Ver ruta hasta aquí
      </a>
      {done ? (
        <button
          onClick={trigger}
          className="flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-center text-xs font-bold"
          style={{
            background: armed ? "var(--color-terracota)" : "var(--color-cream-soft)",
            color: armed ? "white" : "var(--color-ink-soft)",
          }}
        >
          {armed ? (
            <>
              <RotateCcw size={13} /> Confirmar
            </>
          ) : (
            "✓ Completado"
          )}
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="rounded-lg px-2 py-1.5 text-center text-xs font-bold text-white"
          style={{ background: dayColor(day) }}
        >
          ☑️ Marcar como hecho
        </button>
      )}
    </div>
  );
}

function SalePointPopup({ point }: { point: SalePoint }) {
  const mapsUrl = buildMapsUrl(point.mapsQuery, "walking");
  const fromHotelUrl = buildMapsUrl(point.mapsQuery, "walking", HOTEL_ADDRESS);

  return (
    <div className="flex min-w-[180px] flex-col gap-1.5 p-0.5">
      <span className="text-xs font-bold uppercase text-[var(--color-ink-soft)]">🎫 Punto de venta</span>
      <span className="text-sm font-bold">{point.name}</span>
      <span className="text-xs text-[var(--color-ink-soft)]">
        {point.line} · {point.hours}
      </span>
      {point.walkMin !== null && (
        <span className="text-xs text-[var(--color-ink-soft)]">
          🚶 ≈ {point.walkMin} min desde el hotel
        </span>
      )}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 rounded-lg bg-[var(--color-terracota)] px-2 py-1.5 text-center text-xs font-bold text-white"
      >
        📍 Abrir en Google Maps
      </a>
      {point.walkMin !== null && (
        <a
          href={fromHotelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-[var(--color-terracota-soft)] px-2 py-1.5 text-center text-xs font-bold text-[var(--color-terracota)]"
        >
          🚶 Ruta desde el hotel
        </a>
      )}
    </div>
  );
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useMemo(() => {
    if (points.length > 0) {
      map.fitBounds(points, { padding: [32, 32] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points.length]);
  return null;
}

const SALE_POINT_COLOR = "#d9724c";

export function MapView() {
  const { completeActivity, uncompleteActivity, isCompleted } = useTrip();
  const [filter, setFilter] = useState<"all" | "day1" | "day2">("all");
  const [showSalePoints, setShowSalePoints] = useState(true);

  const visibleDays = trip.days.filter((d) => filter === "all" || filter === d.id);
  const activityPoints = visibleDays.flatMap((d) => d.activities.map((a) => [a.lat, a.lng] as [number, number]));
  const salePointCoords = showSalePoints ? salePoints.map((p) => [p.lat, p.lng] as [number, number]) : [];
  const points = [...activityPoints, ...salePointCoords];
  const center: [number, number] = points[0] ?? [38.71, -9.14];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 px-4">
        {(
          [
            { key: "all", label: "🩷💙 Ambos" },
            { key: "day1", label: "🩷 Día 1" },
            { key: "day2", label: "💙 Día 2" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.key}
            onClick={() => setFilter(opt.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === opt.key
                ? "bg-[var(--color-terracota)] text-white"
                : "bg-[var(--color-surface)] text-[var(--color-ink-soft)]"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          onClick={() => setShowSalePoints((v) => !v)}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
            showSalePoints ? "text-white" : "bg-[var(--color-surface)] text-[var(--color-ink-soft)]"
          }`}
          style={{ background: showSalePoints ? SALE_POINT_COLOR : undefined }}
        >
          <Ticket size={13} /> Puntos de venta
        </button>
      </div>

      <div className="mx-4 overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]" style={{ height: "62dvh" }}>
        <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={points} />
          {showSalePoints &&
            salePoints.map((point) => (
              <Marker key={point.id} position={[point.lat, point.lng]} icon={makeIcon("🎫", SALE_POINT_COLOR, false)}>
                <Popup>
                  <SalePointPopup point={point} />
                </Popup>
              </Marker>
            ))}
          {visibleDays.map((day) =>
            day.activities.map((activity) => {
              const done = isCompleted(day.id, activity.id);
              return (
                <Marker
                  key={activity.id}
                  position={[activity.lat, activity.lng]}
                  icon={makeIcon(activity.emoji, dayColor(day), done)}
                >
                  <Popup>
                    <MarkerPopupBody
                      day={day}
                      activity={activity}
                      done={done}
                      onComplete={() => completeActivity(day.id, activity.id)}
                      onUndo={() => uncompleteActivity(day.id, activity.id)}
                    />
                  </Popup>
                </Marker>
              );
            })
          )}
        </MapContainer>
      </div>

      <p className="px-5 text-center text-xs text-[var(--color-ink-soft)]">
        Mapa con OpenStreetMap · toca un pin para ver detalles y abrir la ruta
      </p>
    </div>
  );
}
