export type Metric = { num: string; label: string };

/**
 * Las cifras grandes, con la estética de las tarjetas del panel de partner
 * (`.comisiones` / `.com`, banda oscura). Va justo debajo del hero porque quien
 * llega desde un email tiene que ver el número sin hacer scroll.
 */
export function MetricBand({
  metrics,
  children,
}: {
  metrics: Metric[];
  /** Letra pequeña debajo de las cifras: condiciones, matices. */
  children?: React.ReactNode;
}) {
  return (
    <section className="b2b metric-band">
      <div className="wrap">
        <div className="comisiones">
          {metrics.map(({ num, label }) => (
            <div className="com" key={label}>
              <div className="num">{num}</div>
              <div className="lbl">{label}</div>
            </div>
          ))}
        </div>
        {children && <div className="metric-note">{children}</div>}
      </div>
    </section>
  );
}
