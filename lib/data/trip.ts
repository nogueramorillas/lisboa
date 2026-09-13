import type { Trip } from "../types";
import { day1 } from "./day1";
import { day2 } from "./day2";
import { packingList } from "./packing";

export const trip: Trip = {
  name: "Lisboa en 2 días",
  days: [day1, day2],
  packingList,
};

export function getDay(dayId: string) {
  return trip.days.find((d) => d.id === dayId) ?? trip.days[0];
}

export function getRoute(dayId: string, fromId: string, toId: string) {
  const day = getDay(dayId);
  return day.routes.find((r) => r.fromId === fromId && r.toId === toId);
}
