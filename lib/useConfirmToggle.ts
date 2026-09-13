"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A "press once to arm, press again to confirm" toggle. Used to gate an
 * undo/correction action behind a deliberate second tap, instead of one
 * accidental tap reverting something.
 */
export function useConfirmToggle(onConfirm: () => void, timeoutMs = 3000) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const trigger = useCallback(() => {
    if (armed) {
      if (timer.current) clearTimeout(timer.current);
      setArmed(false);
      onConfirm();
    } else {
      setArmed(true);
      timer.current = setTimeout(() => setArmed(false), timeoutMs);
    }
  }, [armed, onConfirm, timeoutMs]);

  return { armed, trigger };
}
