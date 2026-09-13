import type { RouteInfo } from "@/lib/types";
import { RouteButtons } from "./RouteButtons";

export function RouteConnector({
  route,
  origin,
  destination,
}: {
  route: RouteInfo;
  origin: string;
  destination: string;
}) {
  return (
    <div className="relative ml-[22px] flex gap-3 border-l-2 border-dashed border-[var(--color-border)] py-1 pl-[26px]">
      {!route.sameLocation && (
        <div className="w-full rounded-2xl bg-[var(--color-cream-soft)] p-3">
          <RouteButtons route={route} origin={origin} destination={destination} compact />
        </div>
      )}
      {route.sameLocation && <RouteButtons route={route} origin={origin} destination={destination} />}
    </div>
  );
}
