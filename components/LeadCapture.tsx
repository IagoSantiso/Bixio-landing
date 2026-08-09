"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WaitlistForm } from "./WaitlistForm";

type Opened = { cta: string; segment?: string } | null;

/**
 * Isla de cliente única, montada en el layout. Intercepta los clics en
 * cualquier enlace a /lista-de-espera y abre el modal en su lugar.
 *
 * Los CTA siguen siendo enlaces normales renderizados en servidor: si el
 * JavaScript falla o aún no ha hidratado, el clic lleva a la página completa
 * del formulario. Nunca hay un botón muerto.
 */
export function LeadCapture() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState<Opened>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setOpened(null);
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("/lista-de-espera")) return;

      // stopPropagation además de preventDefault: si no, el Link de Next
      // continúa y navega a la página en vez de abrir el modal.
      event.preventDefault();
      event.stopPropagation();
      setOpened({
        cta: link.dataset.cta ?? link.textContent?.trim().slice(0, 60) ?? "desconocido",
        segment: link.dataset.segment,
      });
    }

    // Fase de captura: el manejador de <Link> vive en el propio enlace, así que
    // en fase de burbuja llegaríamos tarde y con el evento ya cancelado.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (opened && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [opened]);

  return (
    <dialog className="modal" ref={dialogRef} onClose={() => setOpened(null)} aria-label="Lista de espera">
      {opened && (
        <div className="modal-inner">
          <button className="modal-close" type="button" onClick={close} aria-label="Cerrar">
            ×
          </button>
          <h2>Bixio abre en septiembre.</h2>
          <p className="modal-lead">
            Déjanos tu email y eres de los primeros. Los primeros 100 entran con el pack de tags
            gratis.
          </p>
          <WaitlistForm
            origin={typeof window === "undefined" ? "" : window.location.pathname}
            cta={opened.cta}
            defaultSegment={opened.segment}
          />
        </div>
      )}
    </dialog>
  );
}
