export type EruvState = "up" | "down" | "unknown";

export type EruvStatus = {
  downtown: EruvState;
  southWindermere: EruvState;
  /** ISO date the gabbai last confirmed status. Update this when the eruv is checked. */
  lastChecked: string;
  note?: string;
};

/**
 * Office / gabbai: change these values when the eruv is checked each Friday.
 * The homepage and /eruv page read from this file.
 */
export const eruv: EruvStatus = {
  downtown: "up",
  southWindermere: "up",
  lastChecked: "2026-04-24",
  note: "Please contact Rabbi Bart with any questions about our Eruv.",
};

const STALE_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;

export function isEruvStale(now = new Date()) {
  const checked = new Date(`${eruv.lastChecked}T12:00:00`);
  return now.getTime() - checked.getTime() > STALE_THRESHOLD_MS;
}
