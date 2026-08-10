"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type NavLink = { href: string; label: string };

/**
 * Navegación de la home.
 *
 * Solo lleva secciones de particulares. /comercios y /recomienda salieron de
 * aquí a propósito: siguen siendo públicas, indexables y en el sitemap, y se
 * llegan desde el footer, desde el bloque "Para negocios" de la home y desde
 * un buscador. Lo que no queremos es ofrecerle un camino de negocio a quien
 * viene a organizar su casa.
 *
 * Es cliente por el menú hamburguesa: por debajo de 900px la barra de enlaces
 * no cabe y hasta hace poco se ocultaba sin nada que la sustituyera.
 */
export function SiteNav({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Escape cierra el cajón: si no, en móvil tapa la página hasta que aciertas
  // otra vez con la hamburguesa.
  useEffect(() => {
    if (!drawerOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <>
      <nav className="nav-links" aria-label="Principal">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
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
          <Link key={href} href={href} onClick={() => setDrawerOpen(false)}>
            {label}
          </Link>
        ))}
      </div>
    </>
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
