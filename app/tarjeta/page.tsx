"use client";

import { AlertTriangle, ArrowDown, Bus, CheckCircle2, CreditCard, Footprints, MapPin, Plane, TrainFront, TramFront, XCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { SalePointCard } from "@/components/SalePointCard";
import { buildMapsUrl } from "@/lib/maps";
import {
  AIRPORT_METRO_ADDRESS,
  HOTEL_ADDRESS,
  fareInfo,
  includedTransports,
  salePoints,
  sources,
} from "@/lib/data/transportCard";

const STEPS = [
  "Busca una estación de Metro (la más cercana es Martim Moniz).",
  "Entra en la estación.",
  "Busca una máquina de venta automática de billetes.",
  "Selecciona la opción para comprar la tarjeta Navegante Ocasional.",
  "Paga los 0,50 € de la tarjeta.",
  'Carga el billete "24h Carris/Metro" sobre esa misma tarjeta.',
  "Paga el importe del billete (7,25 € por persona).",
  "Recoge la tarjeta.",
  "Al entrar al Metro, acerca la tarjeta al lector y espera a que se abra la puerta.",
];

const martimMoniz = salePoints.find((p) => p.id === "martim-moniz")!;
const rankedPoints = salePoints.filter((p) => p.rank).sort((a, b) => a.rank! - b.rank!);
const otherPoints = salePoints.filter((p) => !p.rank);

export default function TarjetaPage() {
  const mapsMartimMoniz = buildMapsUrl(martimMoniz.mapsQuery, "walking");
  const fromHotelMartimMoniz = buildMapsUrl(martimMoniz.mapsQuery, "walking", HOTEL_ADDRESS);
  const mapsAirportMetro = buildMapsUrl(AIRPORT_METRO_ADDRESS, "walking");

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-28 sm:max-w-2xl">
      <Header title="🎫 Tarjeta" />

      <main className="flex flex-1 flex-col gap-4 px-4 pt-3">
        <div>
          <h1 className="text-2xl font-extrabold">🎫 Tarjeta de transporte</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">Todo lo necesario para comprarla en cuanto lleguéis</p>
        </div>

        {/* Best option hero */}
        <div className="animate-in flex flex-col gap-3 rounded-3xl bg-[var(--color-azul-soft)] p-5 shadow-[var(--shadow-lift)]">
          <span className="w-fit rounded-full bg-[var(--color-azul)] px-3 py-1 text-xs font-bold text-white">
            ⭐ NUESTRA MEJOR OPCIÓN
          </span>

          <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-[var(--color-surface)] p-3 text-center shadow-[var(--shadow-soft)]">
              <span className="text-2xl">🎫</span>
              <span className="mt-1 text-sm font-bold leading-tight">{fareInfo.cardName}</span>
              <span className="text-lg font-extrabold text-[var(--color-azul)]">
                {fareInfo.cardPrice.toFixed(2).replace(".", ",")} €
              </span>
            </div>
            <span className="text-xl font-extrabold text-[var(--color-azul)]">+</span>
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-[var(--color-surface)] p-3 text-center shadow-[var(--shadow-soft)]">
              <span className="text-2xl">🎟️</span>
              <span className="mt-1 text-sm font-bold leading-tight">{fareInfo.ticket24hName}</span>
              <span className="text-lg font-extrabold text-[var(--color-azul)]">
                {fareInfo.ticket24hPrice.toFixed(2).replace(".", ",")} €
              </span>
              <span className="text-[10px] text-[var(--color-ink-soft)]">por persona</span>
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--color-surface)]/70 p-3">
            <p className="text-xs font-bold text-[var(--color-ink-soft)]">📍 COMPRAR MÁS CERCA</p>
            <p className="text-base font-extrabold">{martimMoniz.name}</p>
            <p className="text-sm font-semibold text-[var(--color-azul)]">
              🚶 ≈ {martimMoniz.walkMin} min desde el hotel
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={mapsMartimMoniz}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-azul)] px-3 py-3 text-center text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform active:scale-95"
            >
              <MapPin size={16} /> ABRIR GOOGLE MAPS
            </a>
            <a
              href={fromHotelMartimMoniz}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-surface)] px-3 py-3 text-center text-sm font-bold text-[var(--color-azul)] shadow-[var(--shadow-soft)] transition-transform active:scale-95"
            >
              <Footprints size={16} /> IR DESDE EL HOTEL
            </a>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="flex flex-col items-center gap-1.5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center shadow-[var(--shadow-soft)]">
          {[
            "🏨 Hotel Lisbon 5",
            "🚶 3 min andando",
            "🚇 Metro Martim Moniz",
            "🎫 Máquinas de venta",
            "Comprar Navegante Ocasional (0,50 €)",
            "Cargar 24h Carris/Metro (7,25 €)",
          ].map((step, i, arr) => (
            <div key={step} className="flex flex-col items-center gap-1.5">
              <span className={`text-sm ${i === arr.length - 1 || i === arr.length - 2 ? "font-bold" : "font-semibold"}`}>
                {step}
              </span>
              {i < arr.length - 1 && <ArrowDown size={14} className="text-[var(--color-ink-soft)]" />}
            </div>
          ))}
        </div>

        {/* How to buy */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
          <h2 className="mb-3 text-base font-extrabold">🎫 ¿Cómo comprarla?</h2>
          <div className="flex flex-col gap-2.5">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-azul-soft)] text-[11px] font-extrabold text-[var(--color-azul)]">
                  {i + 1}
                </span>
                <p className="text-[13.5px] leading-snug">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[var(--color-ink-soft)]">
            Las máquinas cambian de aspecto de vez en cuando, pero siempre tienen una opción clara para
            &quot;Navegante Ocasional&quot; y otra para cargar títulos. Si tienes dudas, el personal de la estación
            ayuda a comprarla.
          </p>
        </div>

        {/* One card per person */}
        <div className="flex flex-col gap-3 rounded-3xl bg-[var(--color-terracota-soft)] p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-[var(--color-terracota)]">
            <AlertTriangle size={18} />
            <span className="text-sm font-extrabold">IMPORTANTE: una tarjeta por persona</span>
          </div>
          <p className="text-[13px]">
            Cada persona necesita su propia tarjeta para viajar — no se puede compartir una sola Navegante Ocasional
            entre dos personas.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-[var(--color-surface)] p-3 text-center">
              <p className="text-sm font-bold">👩 Persona 1</p>
              <p className="text-xs text-[var(--color-ink-soft)]">1 Navegante Ocasional</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface)] p-3 text-center">
              <p className="text-sm font-bold">👩 Persona 2</p>
              <p className="text-xs text-[var(--color-ink-soft)]">1 Navegante Ocasional</p>
            </div>
          </div>
          <p className="text-center text-sm font-bold">
            Total por persona: {(fareInfo.cardPrice + fareInfo.ticket24hPrice).toFixed(2).replace(".", ",")} € · Para
            los dos: {(2 * (fareInfo.cardPrice + fareInfo.ticket24hPrice)).toFixed(2).replace(".", ",")} €
          </p>
        </div>

        {/* Other sale points */}
        <div>
          <h2 className="mb-3 text-base font-extrabold">📍 Otros puntos de venta</h2>
          <div className="flex flex-col gap-3">
            {rankedPoints.map((p) => (
              <SalePointCard key={p.id} point={p} />
            ))}
          </div>
          <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)]">
            Otras opciones en Lisboa
          </p>
          <div className="flex flex-col gap-3">
            {otherPoints.map((p) => (
              <SalePointCard key={p.id} point={p} />
            ))}
          </div>
        </div>

        {/* What can I use it on */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
          <h2 className="mb-3 text-base font-extrabold">🚇 ¿Qué transportes puedo utilizar?</h2>
          <p className="mb-3 text-[13px] text-[var(--color-ink-soft)]">
            El billete {fareInfo.ticket24hName} incluye viajes ilimitados durante 24h desde la primera validación en:
          </p>
          <div className="grid grid-cols-3 gap-2">
            {includedTransports
              .filter((t) => t.included)
              .map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col items-center gap-1 rounded-2xl bg-[var(--color-azul-soft)] p-2.5 text-center"
                >
                  <span className="text-xl">{t.emoji}</span>
                  <span className="text-[11px] font-semibold leading-tight text-[var(--color-azul)]">{t.name}</span>
                  <CheckCircle2 size={13} className="text-[var(--color-azul)]" />
                </div>
              ))}
          </div>
          <p className="mb-2 mt-3 text-[13px] font-semibold text-[var(--color-ink-soft)]">No incluido:</p>
          <div className="flex flex-col gap-1.5">
            {includedTransports
              .filter((t) => !t.included)
              .map((t) => (
                <div key={t.name} className="flex items-center gap-2 text-[13px] text-[var(--color-ink-soft)]">
                  <XCircle size={14} className="shrink-0 text-[var(--color-rose)]" />
                  <span>
                    {t.emoji} {t.name}
                  </span>
                </div>
              ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-[var(--color-ink-soft)]">
            <TrainFront size={18} />
            <Bus size={18} />
            <TramFront size={18} />
          </div>
        </div>

        {/* Buying on arrival */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
          <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold">
            <Plane size={18} /> Si queremos comprarla al llegar
          </h2>
          <p className="mb-3 text-[13px]">
            Sí — la estación de Metro <strong>Aeroporto</strong> (línea roja), justo en la terminal, vende y carga la
            Navegante Ocasional igual que cualquier otra estación.
          </p>
          <div className="flex flex-col items-center gap-1.5 text-center">
            {["✈️ Aeropuerto de Lisboa", "🚇 Metro (línea roja)", "🎫 Máquinas de venta", "Navegante Ocasional", "24h Carris/Metro"].map(
              (step, i, arr) => (
                <div key={step} className="flex flex-col items-center gap-1.5">
                  <span className="text-sm font-semibold">{step}</span>
                  {i < arr.length - 1 && <ArrowDown size={13} className="text-[var(--color-ink-soft)]" />}
                </div>
              )
            )}
          </div>
          <a
            href={mapsAirportMetro}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-azul)] px-3 py-3 text-center text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-transform active:scale-95"
          >
            <MapPin size={16} /> ABRIR EN GOOGLE MAPS
          </a>
        </div>

        {/* Comparison */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
          <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold">
            <CreditCard size={18} /> ¿Qué nos conviene?
          </h2>
          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-azul-soft)] p-3">
              <p className="text-sm font-bold">🎫 Opción A — Navegante + 24h</p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                {fareInfo.cardPrice.toFixed(2).replace(".", ",")} € tarjeta +{" "}
                {fareInfo.ticket24hPrice.toFixed(2).replace(".", ",")} € el día
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--color-cream-soft)] p-3">
              <p className="text-sm font-bold">📱 Opción B — pago por viaje</p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                Tarjeta bancaria contactless: {fareInfo.contactlessPricePerTrip.toFixed(2).replace(".", ",")} € por
                viaje. Con saldo cargado en la Navegante (&quot;zapping&quot;):{" "}
                {fareInfo.zappingPricePerTrip.toFixed(2).replace(".", ",")} € por viaje.
              </p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed">
            Mirando vuestro itinerario real: el Día 1 solo tenéis un trayecto que compensa hacer en transporte (la
            vuelta de la cena al hotel) — el resto se hace andando. El Día 2 concentra casi todos los trayectos en
            transporte (ida a Belém en tranvía y la vuelta al hotel desde el MAAT), todos dentro de una misma ventana
            de 24h.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed">
            <strong>Recomendación:</strong> comprad la tarjeta Navegante Ocasional el Día 1 (0,50 €) y pagad ese único
            trayecto nocturno con saldo &quot;zapping&quot; (≈{fareInfo.zappingPricePerTrip.toFixed(2).replace(".", ",")}{" "}
            €). Cargad el billete 24h Carris/Metro (7,25 €) por la mañana del Día 2, justo antes de salir hacia Belém
            — así cubre todo el día sin caducar a medias. Sale más barato que comprar dos pases de 24h, y no tenéis
            que ir con prisa para aprovecharlo.
          </p>
        </div>

        <p className="px-1 text-center text-[11px] text-[var(--color-ink-soft)]">
          Información comprobada el {fareInfo.checkedOn} · Tarifas vigentes desde {fareInfo.effectiveSince} · Metro
          Lisboa: {fareInfo.metroHours}
        </p>
        <div className="flex flex-col items-center gap-1 pb-2">
          {sources.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[11px] text-[var(--color-azul)] underline underline-offset-2"
            >
              {s.label}
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
