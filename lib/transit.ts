import type { TransitMode } from "./types";

export const TRANSIT_EMOJI: Record<TransitMode, string> = {
  metro: "🚇",
  tram: "🚋",
  bus: "🚌",
  train: "🚆",
  ferry: "⛴️",
};

export function transitModesLabel(modes: TransitMode[]): string {
  return modes.map((m) => TRANSIT_EMOJI[m]).join(" + ");
}
