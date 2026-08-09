import Link from "next/link";
import { LEGAL_NAV } from "@/lib/site";
import { BixioMark } from "./icons";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "/#como", label: "Cómo funciona" },
      { href: "/#precios", label: "Precios" },
      { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
    ],
  },
  {
    title: "Casos de uso",
    links: [
      { href: "/particulares", label: "Mudanzas y casa" },
      { href: "/particulares#trastero", label: "Trastero y garaje" },
      { href: "/trasteros", label: "Para trasteros" },
    ],
  },
  {
    title: "Legal",
    links: LEGAL_NAV,
  },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="logo" href="/">
              <BixioMark size={26} />
              Bixio
            </Link>
            <p className="foot-about">
              Inventario doméstico con tags NFC. Guarda, olvida, encuentra.
            </p>
          </div>
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h2 className="foot-title">{title}</h2>
              <ul>
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© 2026 Bixio</span>
          <span>Tus fotos son tuyas. No las vendemos ni las usamos para entrenar nada.</span>
        </div>
      </div>
    </footer>
  );
}
