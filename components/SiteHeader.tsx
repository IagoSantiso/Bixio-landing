import Link from "next/link";
import { BixioMark } from "./icons";
import { SiteNav } from "./SiteNav";
import { TrackedCta } from "./commercial/TrackedCta";

/**
 * Solo secciones de particulares. Las páginas comerciales no van en el menú
 * persistente: se llega a ellas desde el footer, desde el bloque "Para
 * negocios" de la home y desde un buscador. Siguen siendo públicas.
 */
const navLinks = [
  { href: "/#como", label: "Cómo funciona" },
  { href: "/#casos", label: "Para quién" },
  { href: "/#precios", label: "Precios" },
];

type Props = {
  /**
   * "home" lleva la navegación de consumidor y el "Empezar gratis".
   * "comercial" no: /comercios y /recomienda tienen un solo CTA y ofrecerle
   * dos caminos a un comerciante lo pierde. Por eso ahí tampoco hay
   * hamburguesa: no hay nada que meter dentro.
   */
  variant?: "home" | "comercial";
  cta?: { href: string; label: string };
};

export function SiteHeader({ variant = "home", cta }: Props) {
  return (
    <header>
      <div className="wrap nav">
        <Link className="logo" href="/">
          <BixioMark />
          Bixio
        </Link>

        {variant === "home" ? (
          <SiteNav links={navLinks} cta={{ href: "/#precios", label: "Empezar gratis" }} />
        ) : (
          cta && (
            <TrackedCta className="btn btn-sm" href={cta.href} location="cabecera">
              {cta.label}
            </TrackedCta>
          )
        )}
      </div>
    </header>
  );
}
