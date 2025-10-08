import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "z14bazne", //  project ID
  dataset: "production", // dataset name
  useCdn: true, // `true` for fast, cached data
  apiVersion: "2025-10-08"
});
