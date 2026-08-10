import Link from "next/link";

/** La línea del final que manda al comerciante a la otra página, y al revés. */
export function CrossLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="wrap">
      <p className="crosslink">
        <Link href={href}>{children} →</Link>
      </p>
    </div>
  );
}
