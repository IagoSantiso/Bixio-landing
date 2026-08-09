import Link from "next/link";
import { MAIN_NAV } from "@/lib/site";
import { BixioMark } from "./icons";

/**
 * Una sola lista de navegación en el DOM: el <details> se comporta como menú
 * desplegable en móvil y, por encima de 900 px, el CSS oculta el botón y
 * despliega la lista en horizontal. Antes se renderizaban dos copias de los
 * mismos enlaces y los rastreadores veían el menú duplicado.
 */
export function SiteHeader() {
  return (
    <header>
      <div className="wrap nav">
        <Link className="logo" href="/">
          <BixioMark />
          Bixio
        </Link>

        <div className="nav-actions">
          <Link className="btn btn-sm" href="/lista-de-espera" data-cta="nav">
            Empezar gratis
          </Link>

          <details className="nav-disclosure">
            <summary aria-label="Abrir menú" title="Menú">
              <span className="nav-burger" aria-hidden="true" />
            </summary>
            <nav className="nav-links" aria-label="Principal">
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
