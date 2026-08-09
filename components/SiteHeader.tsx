import Link from "next/link";
import { MAIN_NAV } from "@/lib/site";
import { BixioMark } from "./icons";

/**
 * El menú móvil es un <details> nativo: se abre y cierra sin JavaScript, es
 * accesible por teclado y no obliga a convertir la cabecera en client component.
 */
export function SiteHeader() {
  return (
    <header>
      <div className="wrap nav">
        <Link className="logo" href="/">
          <BixioMark />
          Bixio
        </Link>

        <nav className="nav-links" aria-label="Principal">
          {MAIN_NAV.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="btn btn-sm" href="/#precios">
            Empezar gratis
          </Link>

          <details className="nav-mobile">
            <summary aria-label="Abrir menú" title="Menú">
              <span className="nav-burger" aria-hidden="true" />
            </summary>
            <nav className="nav-mobile-panel" aria-label="Principal (móvil)">
              {MAIN_NAV.map(({ href, label }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
