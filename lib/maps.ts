export type MapsMode = "walking" | "transit";

/**
 * Builds a Google Maps Directions URL (works on mobile = opens the app, on
 * desktop = opens Google Maps web). Origin is optional: if omitted, Google
 * Maps uses the device's current location.
 */
export function buildMapsUrl(destination: string, mode: MapsMode, origin?: string): string {
  const params = new URLSearchParams();
  params.set("api", "1");
  if (origin) params.set("origin", origin);
  params.set("destination", destination);
  params.set("travelmode", mode);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function buildMapsSearchUrl(query: string): string {
  const params = new URLSearchParams({ api: "1", query });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export function openMaps(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
