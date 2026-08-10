import Link from "next/link";
import { BixioMark } from "./icons";
import { TrackedCta } from "./commercial/TrackedCta";

const navLinks = [
  { href: "/#como", label: "Cómo funciona" },
  { href: "/#casos", label: "Para quién" },
  { href: "/#precios", label: "Precios" },
];

const businessLinks = [
  { href: "/comercios", label: "Comercios" },
  { href: "/recomienda", label: "Recomienda" },
];

type Props = {
  /**
   * "home" lleva la navegación de consumidor y el "Empezar gratis".
   * "comercial" no: /comercios y /recomienda tienen un solo CTA y ofrecerle
   * dos caminos a un comerciante lo pierde.
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

        {variant === "home" && (
          <nav className="nav-links">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <span className="nav-group">
              <Link href="/comercios">Para negocios</Link>
              <span className="nav-menu">
                {businessLinks.map(({ href, label }) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              </span>
            </span>
          </nav>
        )}

        {variant === "home" ? (
          <a className="btn btn-sm" href="/#precios">
            Empezar gratis
          </a>
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
