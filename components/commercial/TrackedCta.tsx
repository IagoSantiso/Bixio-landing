"use client";

import { trackEvent } from "./analytics";

type Props = {
  href: string;
  /** Identifica el CTA dentro de la página: "hero", "cierre", "cabecera"… */
  location: string;
  className?: string;
  children: React.ReactNode;
};

/** Enlace de CTA que emite un evento de clic identificando página y posición. */
export function TrackedCta({ href, location, className = "btn", children }: Props) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => trackEvent("cta_click", { location, href })}
    >
      {children}
    </a>
  );
}
