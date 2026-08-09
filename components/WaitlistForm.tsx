"use client";

import { useId, useState } from "react";
import { BOXES_RANGES, SEGMENTS, mailtoFor, submitLead, type LeadPayload } from "@/lib/leads";
import { HELLO_EMAIL, PARTNERS_EMAIL } from "@/lib/site";

type Props = {
  /** Página desde la que se envía; se guarda con el lead. */
  origin: string;
  /** Botón que abrió el formulario; se guarda con el lead. */
  cta: string;
  /** Segmento preseleccionado, si el botón ya lo sabe. */
  defaultSegment?: string;
  /** Variante de partners: pide teléfono y número de boxes. */
  partner?: boolean;
  onDone?: () => void;
};

export function WaitlistForm({ origin, cta, defaultSegment, partner = false, onDone }: Props) {
  const id = useId();
  const [segment, setSegment] = useState(defaultSegment ?? (partner ? "partner" : ""));
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: LeadPayload = {
      email: String(data.get("email") ?? ""),
      segment: partner ? "partner" : segment,
      partnerLead: partner || segment === "partner",
      origin,
      cta,
      phone: partner ? String(data.get("phone") ?? "") : undefined,
      boxes: partner ? String(data.get("boxes") ?? "") : undefined,
    };

    setState("sending");
    try {
      const result = await submitLead(payload);
      if (result === "mailto") {
        // Sin endpoint configurado: abrimos el correo con todo escrito en vez
        // de fingir que se ha guardado algo.
        window.location.href = mailtoFor(payload, partner ? PARTNERS_EMAIL : HELLO_EMAIL);
      }
      setState("sent");
      onDone?.();
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "Error desconocido");
    }
  }

  if (state === "sent") {
    return (
      <div className="form-done" role="status">
        <h3>Apuntado.</h3>
        <p>
          {partner
            ? "Te escribimos para cuadrar los veinte minutos. Si prefieres adelantar algo, responde a ese correo con el número de boxes."
            : "Te avisamos en cuanto abramos. Si eres de los primeros 100, entras con el pack de tags gratis."}
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
        />
      </div>

      {partner ? (
        <>
          <fieldset className="field">
            <legend>¿Cuántos boxes gestionas?</legend>
            <div className="radio-row">
              {BOXES_RANGES.map(({ value, label }) => (
                <label className="radio" key={value}>
                  <input type="radio" name="boxes" value={value} required />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor={`${id}-phone`}>Teléfono</label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="600 000 000"
            />
          </div>
        </>
      ) : (
        <fieldset className="field">
          <legend>¿Qué vas a organizar?</legend>
          <div className="radio-row">
            {SEGMENTS.map(({ value, label }) => (
              <label className="radio" key={value}>
                <input
                  type="radio"
                  name="segment"
                  value={value}
                  required
                  checked={segment === value}
                  onChange={() => setSegment(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <button className="btn btn-coral" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Enviando…" : partner ? "Reservar 20 minutos" : "Entrar en la lista"}
      </button>

      {state === "error" && (
        <p className="form-error" role="alert">
          No se ha podido enviar ({error}). Escríbenos a{" "}
          <a href={`mailto:${partner ? PARTNERS_EMAIL : HELLO_EMAIL}`}>
            {partner ? PARTNERS_EMAIL : HELLO_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
