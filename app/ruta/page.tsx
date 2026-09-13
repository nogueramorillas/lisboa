import { trip } from "@/lib/data/trip";
import { DayOverviewCard } from "@/components/DayOverviewCard";
import { Header } from "@/components/Header";

export default function RutaPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-28 sm:max-w-2xl">
      <Header title="🇵🇹 Lisboa en 2 días" />

      <main className="flex flex-1 flex-col gap-4 px-4 pt-4">
        <div>
          <h1 className="text-2xl font-extrabold">Nuestro viaje</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">Toca un día para ver el itinerario completo</p>
        </div>

        <div className="flex flex-col gap-4">
          {trip.days.map((day) => (
            <DayOverviewCard key={day.id} day={day} />
          ))}
        </div>
      </main>
    </div>
  );
}
