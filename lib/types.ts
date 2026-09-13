export interface Activity {
  id: string;
  time: string; // "HH:MM" 24h
  durationMin: number;
  name: string;
  description?: string;
  note?: string;
  emoji: string;
  address: string;
  lat: number;
  lng: number;
  countsAsPlace: boolean;
  /** Pure start/end bookend (e.g. the hotel) — shown in the timeline but never
   * becomes the "AHORA" focus, since there's nothing to actually do there. */
  isAnchor?: boolean;
}

export type TransitMode = "metro" | "tram" | "bus" | "train" | "ferry";

export interface RouteInfo {
  fromId: string;
  toId: string;
  sameLocation?: boolean;
  walkMin: number;
  walkKm: number;
  transitMin: number;
  transitModes: TransitMode[];
  transitHint?: string;
  recommended: "walking" | "transit" | "taxi";
  recommendedReason: string;
}

export interface Day {
  id: "day1" | "day2";
  title: string;
  subtitle: string;
  emoji: string;
  accent: "rose" | "blue";
  activities: Activity[];
  routes: RouteInfo[];
}

export interface PackingItem {
  id: string;
  name: string;
}

export interface Trip {
  name: string;
  days: Day[];
  packingList: PackingItem[];
}
