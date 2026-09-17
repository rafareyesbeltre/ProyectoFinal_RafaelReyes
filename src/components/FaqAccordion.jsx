/**
 * FaqAccordion.jsx — Acordeón de preguntas frecuentes.
 *
 * Porta la lógica de window.toggleFaq() de js/app.js del estático:
 *   - solo un ítem abierto a la vez (cerrar el resto al abrir otro)
 *   - animación de apertura mediante la transición CSS de max-height
 *
 * El estático medía scrollHeight para fijar max-height en px; aquí se hace lo
 * mismo desde React: tras cada cambio de openIndex se mide el body real.
 */

import { useEffect, useRef, useState } from "react";

export default function FaqAccordion({ items }) {
  // -1 = ninguno abierto. Guarda solo el índice del ítem abierto actual.
  const [openIndex, setOpenIndex] = useState(-1);

  // Refs a los .faq-body para poder leer su scrollHeight (altura de contenido).
  const bodyRefs = useRef([]);

  // Sincroniza el maxHeight inline con el estado abierto/contenido real:
  // "0px" cerrado, scrollHeight+"px" abierto (permite la transición CSS 0.3s).
  useEffect(() => {
    bodyRefs.current.forEach((body, index) => {
      if (!body) return;
      body.style.maxHeight =
        index === openIndex ? `${body.scrollHeight}px` : "0px";
    });
  }, [openIndex]);

  // Toggle: si se pulsa el item abierto se cierra; si no, se abre ese y los demás se cierran.
  function handleToggle(index) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div
          key={item.q}
          className={`faq-item${openIndex === index ? " active" : ""}`}
        >
          <button
            type="button"
            className="faq-header"
            onClick={() => handleToggle(index)}
          >
            <span className="faq-question">{item.q}</span>
            {/* Icono de estado: − si está abierto, + si está cerrado. */}
            <span className="faq-toggle-icon">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {/* Ref capturada por posición para medir cada cuerpo al abrir/cerrar. */}
          <div
            className="faq-body"
            ref={(el) => (bodyRefs.current[index] = el)}
          >
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
