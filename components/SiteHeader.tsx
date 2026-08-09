import { BixioMark } from "./icons";

const navLinks = [
  { href: "#como", label: "Cómo funciona" },
  { href: "#casos", label: "Para quién" },
  { href: "#precios", label: "Precios" },
  { href: "#partners", label: "Trasteros" },
];

export function SiteHeader() {
  return (
    <header>
      <div className="wrap nav">
        <a className="logo" href="#">
          <BixioMark />
          Bixio
        </a>
        <nav className="nav-links">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn-sm" href="#precios">
          Empezar gratis
        </a>
      </div>
    </header>
  );
}
