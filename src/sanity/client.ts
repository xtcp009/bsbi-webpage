import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId, studioUrl } from "@/sanity/env";

export const client = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      stega: { studioUrl },
    })
  : null;
