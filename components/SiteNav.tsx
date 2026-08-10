"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type NavLink = { href: string; label: string };

/**
 * Navegación de la home.
 *
 * Es cliente porque tiene dos cosas con estado que antes faltaban: el menú
 * hamburguesa (por debajo de 900px la barra de enlaces no cabe, y hasta ahora
 * simplemente se ocultaba sin nada que la sustituyera) y el desplegable de
 * "Para negocios", que abre al pulsar en vez de al pasar por encima: con hover
 * no había forma de llegar a los enlaces desde el móvil, y en escritorio el
 * propio "Para negocios" navegaba al primer clic.
 */
export function SiteNav({
  links,
  businessLinks,
  cta,
}: {
  links: NavLink[];
  businessLinks: NavLink[];
  cta: NavLink;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);

  // Cerrar el desplegable al pulsar fuera o con Escape. Sin esto se queda
  // abierto tapando la página hasta que se vuelve a pulsar el propio botón.
  useEffect(() => {
    if (!menuOpen && !drawerOpen) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!groupRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setDrawerOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, drawerOpen]);

  function closeAll() {
    setMenuOpen(false);
    setDrawerOpen(false);
  }

  return (
    <>
      <nav className="nav-links" aria-label="Principal">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}

        <div className="nav-group" ref={groupRef}>
          <button
            type="button"
            className="nav-trigger"
            aria-expanded={menuOpen}
            aria-controls="menu-negocios"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Para negocios
            <Caret open={menuOpen} />
          </button>
          <div className="nav-menu" id="menu-negocios" hidden={!menuOpen}>
            {businessLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={closeAll}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="nav-right">
        <a className="btn btn-sm" href={cta.href}>
          {cta.label}
        </a>
        <button
          type="button"
          className="nav-burger"
          aria-expanded={drawerOpen}
          aria-controls="menu-movil"
          aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <BurgerIcon open={drawerOpen} />
        </button>
      </div>

      <div className="nav-drawer" id="menu-movil" hidden={!drawerOpen}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={closeAll}>
            {label}
          </Link>
        ))}
        <span className="nav-drawer-head">Para negocios</span>
        {businessLinks.map(({ href, label }) => (
          <Link className="nav-drawer-sub" key={href} href={href} onClick={closeAll}>
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      className={open ? "nav-caret nav-caret-up" : "nav-caret"}
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 1.5 5.5 6 10 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      {open ? (
        <path d="M3 2l16 12M19 2 3 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      ) : (
        <path d="M1 2h20M1 8h20M1 14h20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      )}
    </svg>
  );
}
