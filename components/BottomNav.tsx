"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, CalendarDays, MapPinned, Luggage } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/ruta", label: "Ruta", icon: Map },
  { href: "/itinerario", label: "Itinerario", icon: CalendarDays },
  { href: "/mapa", label: "Mapa", icon: MapPinned },
  { href: "/lista", label: "Lista", icon: Luggage },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-bottom border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-xl items-stretch justify-between px-1 py-1.5 sm:max-w-2xl">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition-colors"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                  active ? "bg-[var(--color-terracota-soft)] text-[var(--color-terracota)]" : "text-[var(--color-ink-soft)]"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 2} />
              </span>
              <span
                className={`text-[10.5px] font-medium leading-none ${
                  active ? "text-[var(--color-terracota)]" : "text-[var(--color-ink-soft)]"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
