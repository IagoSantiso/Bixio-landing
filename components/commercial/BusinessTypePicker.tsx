"use client";

import { useState } from "react";
import { businessTypes } from "./data";
import { trackEvent } from "./analytics";

/**
 * Un solo componente con estado local, no una página por tipo de negocio: lo
 * único que cambia entre uno y otro es una frase y la foto de contexto.
 */
export function BusinessTypePicker() {
  const [active, setActive] = useState(0);
  const selected = businessTypes[active];

  return (
    <section className="tipos">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Dónde encaja</div>
          <h2>Busca lo tuyo y mira dónde lo pondrías.</h2>
        </div>

        <div className="chips" role="tablist" aria-label="Tipo de negocio">
          {businessTypes.map((type, index) => (
            <button
              key={type.chip}
              type="button"
              role="tab"
              id={`chip-${index}`}
              aria-selected={index === active}
              aria-controls="tipo-panel"
              className={index === active ? "chip chip-on" : "chip"}
              onClick={() => {
                setActive(index);
                trackEvent("business_type_select", { type: type.chip });
              }}
            >
              {type.chip}
            </button>
          ))}
        </div>

        <div
          className="tipo-panel"
          id="tipo-panel"
          role="tabpanel"
          aria-labelledby={`chip-${active}`}
        >
          <p className="tipo-frase">{selected.frase}</p>
          {selected.imagen && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="tipo-foto"
              src={selected.imagen}
              alt={`Pack de Bixio colocado en ${selected.chip.toLowerCase()}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
