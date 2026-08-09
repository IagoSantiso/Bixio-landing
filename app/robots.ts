import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Los rastreadores de asistentes (ChatGPT, Perplexity, Claude…) se listan
 * explícitamente. Técnicamente sobra, porque el "*" ya los permite, pero
 * dejarlo escrito evita que un cambio futuro los bloquee sin querer: es el
 * canal por el que queremos que nos lean.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/legal/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
