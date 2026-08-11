"use client";

import { useEffect, useRef, useState } from "react";
import { readUtm, trackEvent } from "./commercial/analytics";

/**
 * Captación de particulares.
 *
 * Hasta ahora los CTA de la home no llevaban a ninguna parte (`href="#"`): la
 * app todavía no existe, así que no había cuenta que crear. El coste de eso no
 * era solo perder al visitante, era no saber nada de él — y el panel de /admin
 * no puede enseñar demanda que nadie recoge.
 *
 * Lo que se pregunta es lo mínimo para que un lead valga: el email, para poder
 * contestar, y **para qué** lo necesita. Ese segundo dato es el que decide
 * dónde va el producto: si cuatro de cada diez dicen "una mudanza", el plan
 * destacado de la home debería ser Mudanza, y eso no se puede deducir del
 * tráfico.
 *
 * Se monta una sola vez por página y escucha los clics de cualquier elemento
 * con `data-lead-modal`. Así los CTA siguen viviendo en componentes de
 * servidor (Hero, Pricing, FinalCta) sin convertirlos en cliente ni pasar
 * callbacks por media home.
 */

const SEGMENTOS = [
  { value: "mudanza", label: "Una mudanza" },
  { value: "casa", label: "Mi casa" },
  { value: "trastero", label: "Un trastero" },
  { value: "negocio", label: "Un negocio" },
] as const;

type Status = "idle" | "sending" | "done" | "error";

export function StartModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  /** Qué botón lo abrió: viaja a D1 para medir qué CTA convierte. */
  const [cta, setCta] = useState("desconocido");
  const [segmento, setSegmento] = useState<string>("");

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-lead-modal]");
      if (!trigger) return;

      event.preventDefault();
      const origen = trigger.dataset.leadModal || "desconocido";
      setCta(origen);
      // Algunos CTA ya dicen a qué vienen (el plan Mudanza, por ejemplo):
      // preseleccionar ahorra un clic y no cambia lo que se guarda.
      setSegmento(trigger.dataset.leadSegmento || "");
      setStatus("idle");
      trackEvent("cta_click", { location: origen });
      dialogRef.current?.showModal();
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Misma trampa para bots que en el formulario comercial.
    if (data.website) {
      setStatus("done");
      return;
    }
    delete data.website;

    setStatus("sending");
    trackEvent("lead_submit", { lead_type: "particular", location: cta });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_type: "particular",
          page: window.location.pathname,
          cta,
          ...readUtm(),
          ...data,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("done");
      trackEvent("lead_ok", { lead_type: "particular", location: cta });
      form.reset();
    } catch {
      setStatus("error");
      trackEvent("lead_error", { lead_type: "particular", location: cta });
    }
  }

  return (
    <dialog className="modal" ref={dialogRef} aria-labelledby="modal-titulo">
      <button
        type="button"
        className="modal-cerrar"
        aria-label="Cerrar"
        onClick={() => dialogRef.current?.close()}
      >
        ×
      </button>

      {status === "done" ? (
        <div className="modal-done" role="status">
          <h2 id="modal-titulo">Anotado.</h2>
          <p>
            Te escribimos en cuanto puedas empezar. Mientras tanto no te vamos a mandar nada más:
            no es una lista de correo.
          </p>
          <button type="button" className="btn" onClick={() => dialogRef.current?.close()}>
            Cerrar
          </button>
        </div>
      ) : (
        <form className="modal-form" onSubmit={handleSubmit}>
          <h2 id="modal-titulo">Empieza gratis</h2>
          <p className="modal-sub">
            Todavía estamos abriendo el acceso. Déjanos el email y para qué lo quieres, y te
            avisamos con tus 10 cajas listas.
          </p>

          <fieldset className="modal-segmentos">
            <legend>¿Qué quieres organizar?</legend>
            {SEGMENTOS.map(({ value, label }) => (
              <label key={value} className="modal-chip">
                <input
                  type="radio"
                  name="segmento"
                  value={value}
                  required
                  checked={segmento === value}
                  onChange={() => setSegmento(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>

          <label className="lead-field">
            <span>Email</span>
            <input type="email" name="contacto" required autoComplete="email" />
          </label>

          <label className="lead-field">
            <span>Nombre (opcional)</span>
            <input type="text" name="nombre" autoComplete="given-name" />
          </label>

          <input
            className="lead-trap"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando…" : "Avisadme"}
          </button>

          {status === "error" && (
            <p className="lead-error" role="alert">
              No hemos podido enviarlo. Vuelve a intentarlo en un momento.
            </p>
          )}
        </form>
      )}
    </dialog>
  );
}
