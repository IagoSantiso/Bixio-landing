"use client";

import { useState } from "react";
import { readUtm, trackEvent } from "./analytics";

export type LeadField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select";
  /** Solo para type: "select". */
  options?: string[];
  autoComplete?: string;
  required?: boolean;
};

type Props = {
  /** Discrimina los dos programas en D1. */
  leadType: "comercio" | "prescriptor";
  fields: LeadField[];
  submitLabel: string;
  /** Qué se le dice a alguien que acaba de enviarlo. */
  confirmation: string;
};

type Status = "idle" | "sending" | "done" | "error";

export function LeadForm({ leadType, fields, submitLabel, confirmation }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Trampa para bots: un campo que ningún humano ve ni rellena. Si viene
    // lleno fingimos que todo ha ido bien y no lo mandamos a ninguna parte.
    if (data.website) {
      setStatus("done");
      return;
    }
    delete data.website;

    setStatus("sending");
    trackEvent("lead_submit", { lead_type: leadType });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_type: leadType,
          page: window.location.pathname,
          // Las páginas comerciales tienen un solo formulario, al final: el
          // CTA que lo llenó siempre es ese. La columna existe para poder
          // comparar con los varios CTA de la home en el mismo listado.
          cta: "formulario",
          ...readUtm(),
          ...data,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("done");
      trackEvent("lead_ok", { lead_type: leadType });
      // `segmento` distingue /comercios de /recomienda en Plausible: los dos
      // valores posibles de `leadType` son justo esa distinción.
      trackEvent("Lead B2B Submit", { segmento: leadType });
      form.reset();
    } catch {
      setStatus("error");
      trackEvent("lead_error", { lead_type: leadType });
    }
  }

  // Confirmación en la misma página, sin redirección: el formulario
  // desaparece y en su hueco queda el acuse de recibo.
  if (status === "done") {
    return (
      <p className="lead-done" role="status">
        {confirmation}
      </p>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate={false}>
      {fields.map((field) => (
        <label className="lead-field" key={field.name}>
          <span>{field.label}</span>
          {field.type === "select" ? (
            <select name={field.name} required={field.required} defaultValue="">
              <option value="" disabled>
                Elige una opción
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              autoComplete={field.autoComplete}
            />
          )}
        </label>
      ))}

      <input
        className="lead-trap"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : submitLabel}
      </button>

      {status === "error" && (
        <p className="lead-error" role="alert">
          No hemos podido enviarlo. Vuelve a intentarlo en un momento: lo que has
          escrito sigue ahí.
        </p>
      )}
    </form>
  );
}
