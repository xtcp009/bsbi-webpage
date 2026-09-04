export type EruvState = "up" | "down" | "unknown";

/**
 * Maps and notes for the eruv remain here. Live UP/DOWN status is read from
 * ShulCloud (`getShulcloudSnapshot`) so staff updates on the current website
 * appear on the Vercel preview without a second data entry.
 */
export const eruvNote = "Please contact Rabbi Bart with any questions about our Eruv.";
