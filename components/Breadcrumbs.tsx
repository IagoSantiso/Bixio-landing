import Link from "next/link";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <div className="wrap">
        <ol>
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.path}>
                {isLast ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path}>{crumb.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
