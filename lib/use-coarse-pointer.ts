import { useSyncExternalStore } from "react";

const QUERY = "(pointer: coarse)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return true;
}

export function useIsCoarsePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
