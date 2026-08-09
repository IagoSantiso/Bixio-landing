import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Las páginas legales quedan fuera a propósito: son borradores sin indexar. */
const ROUTES: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/particulares", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trasteros", priority: 0.9, changeFrequency: "monthly" },
  { path: "/preguntas-frecuentes", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
