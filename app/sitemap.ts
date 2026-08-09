import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Las páginas legales quedan fuera a propósito: son borradores sin indexar. */
const ROUTES: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/particulares", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mudanza", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trasteros", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trasteros/calculadora", priority: 0.6, changeFrequency: "yearly" },
  { path: "/preguntas-frecuentes", priority: 0.8, changeFrequency: "monthly" },
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
