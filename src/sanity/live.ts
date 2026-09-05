import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/client";
import { token } from "@/sanity/token";

if (!client) {
  throw new Error("Sanity client is not configured");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "2026-05-19",
  }),
  serverToken: token,
  browserToken: false,
});
