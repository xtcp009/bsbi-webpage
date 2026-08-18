import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/times",
  "/visit",
  "/locations",
  "/eruv",
  "/kosher",
  "/hotels",
  "/mikvah",
  "/about",
  "/community",
  "/membership",
  "/calendar",
  "/gallery",
  "/remembrance",
  "/contact",
  "/donate",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/times" || path === "/" || path === "/calendar" ? "daily" : "weekly",
    priority: path === "/" || path === "/times" ? 1 : path === "/visit" || path === "/locations" ? 0.9 : 0.7,
  }));
}
