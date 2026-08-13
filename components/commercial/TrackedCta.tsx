"use client";

import { trackEvent } from "./analytics";

type Props = {
  href: string;
  /** Identifica el CTA dentro de la página: "hero", "cierre", "cabecera"… */
  location: string;
  /** Plan al que lleva este CTA, si viene de uno concreto (ver Pricing). */
  plan?: string;
  className?: string;
  children: React.ReactNode;
};

/** Enlace de CTA que emite un evento de clic identificando página y posición. */
export function TrackedCta({ href, location, plan, className = "btn", children }: Props) {
  function handleClick() {
    trackEvent("cta_click", { location, href });
    // "CTA Click" en Plausible es solo el botón principal del hero: el resto
    // de posiciones (cabecera, cierre…) ya quedan cubiertas por "cta_click".
    if (location === "hero") trackEvent("CTA Click", { location, href, plan });
  }

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
