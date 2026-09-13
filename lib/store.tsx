"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { packingList as defaultPackingList } from "./data/packing";
import type { PackingItem } from "./types";

const STORAGE_KEY = "lisboa-trip-state-v1";

interface PersistedState {
  completed: Record<string, string[]>;
  packingChecked: string[];
  packingItems: PackingItem[];
  darkMode: boolean;
  travelMode: boolean;
  activeDay: "day1" | "day2";
}

const DEFAULT_STATE: PersistedState = {
  completed: { day1: [], day2: [] },
  packingChecked: [],
  packingItems: defaultPackingList,
  darkMode: false,
  travelMode: false,
  activeDay: "day1",
};

function makePackingId(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `custom-${slug || "item"}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function loadState(): PersistedState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      completed: { ...DEFAULT_STATE.completed, ...(parsed.completed ?? {}) },
      packingItems:
        Array.isArray(parsed.packingItems) && parsed.packingItems.length > 0
          ? parsed.packingItems
          : DEFAULT_STATE.packingItems,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

interface TripContextValue {
  hydrated: boolean;
  completed: Record<string, string[]>;
  packingItems: PackingItem[];
  packingChecked: string[];
  darkMode: boolean;
  travelMode: boolean;
  activeDay: "day1" | "day2";
  isCompleted: (dayId: string, activityId: string) => boolean;
  completeActivity: (dayId: string, activityId: string) => void;
  isPacked: (itemId: string) => boolean;
  togglePacking: (itemId: string) => void;
  addPackingItem: (name: string) => void;
  editPackingItem: (itemId: string, name: string) => void;
  removePackingItem: (itemId: string) => void;
  setDarkMode: (v: boolean) => void;
  setTravelMode: (v: boolean) => void;
  setActiveDay: (v: "day1" | "day2") => void;
}

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);

  useEffect(() => {
    // One-time sync from localStorage (an external system) once we're on the
    // client — the server has no localStorage, so this can't happen earlier.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", state.darkMode);
  }, [state.darkMode, hydrated]);

  const isCompleted = useCallback(
    (dayId: string, activityId: string) => state.completed[dayId]?.includes(activityId) ?? false,
    [state.completed]
  );

  // One-way: an activity can be marked done to advance to the next one, but
  // never un-marked — there's no "go back" in the trip flow.
  const completeActivity = useCallback((dayId: string, activityId: string) => {
    setState((prev) => {
      const current = prev.completed[dayId] ?? [];
      if (current.includes(activityId)) return prev;
      return { ...prev, completed: { ...prev.completed, [dayId]: [...current, activityId] } };
    });
  }, []);

  const isPacked = useCallback(
    (itemId: string) => state.packingChecked.includes(itemId),
    [state.packingChecked]
  );

  const togglePacking = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      packingChecked: prev.packingChecked.includes(itemId)
        ? prev.packingChecked.filter((id) => id !== itemId)
        : [...prev.packingChecked, itemId],
    }));
  }, []);

  const addPackingItem = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      packingItems: [...prev.packingItems, { id: makePackingId(trimmed), name: trimmed }],
    }));
  }, []);

  const editPackingItem = useCallback((itemId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      packingItems: prev.packingItems.map((item) => (item.id === itemId ? { ...item, name: trimmed } : item)),
    }));
  }, []);

  const removePackingItem = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      packingItems: prev.packingItems.filter((item) => item.id !== itemId),
      packingChecked: prev.packingChecked.filter((id) => id !== itemId),
    }));
  }, []);

  const setDarkMode = useCallback((v: boolean) => {
    setState((prev) => ({ ...prev, darkMode: v }));
  }, []);

  const setTravelMode = useCallback((v: boolean) => {
    setState((prev) => ({ ...prev, travelMode: v }));
  }, []);

  const setActiveDay = useCallback((v: "day1" | "day2") => {
    setState((prev) => ({ ...prev, activeDay: v }));
  }, []);

  const value = useMemo<TripContextValue>(
    () => ({
      hydrated,
      completed: state.completed,
      packingItems: state.packingItems,
      packingChecked: state.packingChecked,
      darkMode: state.darkMode,
      travelMode: state.travelMode,
      activeDay: state.activeDay,
      isCompleted,
      completeActivity,
      isPacked,
      togglePacking,
      addPackingItem,
      editPackingItem,
      removePackingItem,
      setDarkMode,
      setTravelMode,
      setActiveDay,
    }),
    [
      hydrated,
      state,
      isCompleted,
      completeActivity,
      isPacked,
      togglePacking,
      addPackingItem,
      editPackingItem,
      removePackingItem,
      setDarkMode,
      setTravelMode,
      setActiveDay,
    ]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
}

export function useNow(intervalMs = 15000) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
