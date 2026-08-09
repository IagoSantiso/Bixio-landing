import Link from "next/link";

export function CtaBand({
  eyebrow,
  title,
  text,
  cta,
  href,
  secondary,
}: {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="cierre">
      <div className="wrap">
        <div className="eyebrow eyebrow-center">{eyebrow}</div>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="cierre-cta">
          <Link className="btn btn-coral" href={href}>
            {cta}
          </Link>
          {secondary && (
            <Link className="btn btn-ghost" href={secondary.href}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
