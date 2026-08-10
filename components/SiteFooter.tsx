import Link from "next/link";
import { BixioMark } from "./icons";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "/#como", label: "Cómo funciona" },
      { href: "/#precios", label: "Precios" },
      { href: "#", label: "Packs de tags" },
      { href: "#", label: "Preguntas frecuentes" },
    ],
  },
  {
    title: "Para negocios",
    links: [
      { href: "/comercios", label: "Vender en tu tienda" },
      { href: "/recomienda", label: "Recomendarlo a tus clientes" },
      { href: "#", label: "Contacto comercial" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Aviso legal" },
      { href: "#", label: "Privacidad" },
      { href: "#", label: "Condiciones" },
      { href: "#", label: "Cookies" },
    ],
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
              <h4>{title}</h4>
              <ul>
                {links.map(({ href, label }) => (
                  <li key={label}>
                    {href === "#" ? <a href={href}>{label}</a> : <Link href={href}>{label}</Link>}
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
