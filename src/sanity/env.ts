export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-19";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3jfxxcrm";

export const hostedStudioUrl = "https://bsbisynagogue.sanity.studio";

export const studioUrl = resolveStudioUrl();

function resolveStudioUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
  if (fromEnv?.startsWith("https://")) {
    return fromEnv;
  }
  if (process.env.NODE_ENV === "production") {
    return hostedStudioUrl;
  }
  return fromEnv || "http://localhost:3333";
}

export function isSanityConfigured() {
  return Boolean(projectId);
}
