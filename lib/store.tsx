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

const STORAGE_KEY = "lisboa-trip-state-v1";

interface PersistedState {
  completed: Record<string, string[]>;
  packing: string[];
  darkMode: boolean;
  travelMode: boolean;
  activeDay: "day1" | "day2";
}

const DEFAULT_STATE: PersistedState = {
  completed: { day1: [], day2: [] },
  packing: [],
  darkMode: false,
  travelMode: false,
  activeDay: "day1",
};

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
    };
  } catch {
    return DEFAULT_STATE;
  }
}

interface TripContextValue {
  hydrated: boolean;
  completed: Record<string, string[]>;
  packing: string[];
  darkMode: boolean;
  travelMode: boolean;
  activeDay: "day1" | "day2";
  isCompleted: (dayId: string, activityId: string) => boolean;
  toggleActivity: (dayId: string, activityId: string) => void;
  isPacked: (itemId: string) => boolean;
  togglePacking: (itemId: string) => void;
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

  const toggleActivity = useCallback((dayId: string, activityId: string) => {
    setState((prev) => {
      const current = prev.completed[dayId] ?? [];
      const next = current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId];
      return { ...prev, completed: { ...prev.completed, [dayId]: next } };
    });
  }, []);

  const isPacked = useCallback((itemId: string) => state.packing.includes(itemId), [state.packing]);

  const togglePacking = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      packing: prev.packing.includes(itemId)
        ? prev.packing.filter((id) => id !== itemId)
        : [...prev.packing, itemId],
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
      packing: state.packing,
      darkMode: state.darkMode,
      travelMode: state.travelMode,
      activeDay: state.activeDay,
      isCompleted,
      toggleActivity,
      isPacked,
      togglePacking,
      setDarkMode,
      setTravelMode,
      setActiveDay,
    }),
    [hydrated, state, isCompleted, toggleActivity, isPacked, togglePacking, setDarkMode, setTravelMode, setActiveDay]
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
