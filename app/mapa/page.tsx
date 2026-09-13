"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/Header";

const MapView = dynamic(() => import("@/components/MapView").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="mx-4 h-[62dvh] animate-pulse rounded-3xl bg-[var(--color-cream-soft)]" />,
});

export default function MapaPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-28 sm:max-w-2xl">
      <Header title="📍 Mapa" />

      <main className="flex flex-1 flex-col gap-3 pt-3">
        <h1 className="px-4 text-xl font-extrabold">📍 Mapa del viaje</h1>
        <MapView />
      </main>
    </div>
  );
}
