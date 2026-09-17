/**
 * FaqAccordion.jsx — Acordeón de preguntas frecuentes.
 *
 * Comportamiento:
 *   - solo una respuesta abierta a la vez (al abrir una, se cierran las demás)
 *   - la apertura se anima con la transición CSS de max-height
 *
 * Para conseguirlo, tras cambiar la pregunta abierta se mide la altura real del
 * cuerpo (scrollHeight) y se aplica en píxeles.
 */

import { useEffect, useRef, useState } from "react";

export default function FaqAccordion({ items }) {
  // -1 indica que ninguna respuesta está abierta; aquí vive el índice de la abierta.
  const [openIndex, setOpenIndex] = useState(-1);

  // Referencias a cada cuerpo de respuesta, para poder medir su altura.
  const bodyRefs = useRef([]);

  // Ajusta la altura de cada cuerpo según el estado: 0px si está cerrado o su
  // altura real si está abierto (así la transición CSS se ve suave).
  useEffect(() => {
    bodyRefs.current.forEach((body, index) => {
      if (!body) return;
      body.style.maxHeight =
        index === openIndex ? `${body.scrollHeight}px` : "0px";
    });
  }, [openIndex]);

  // Al pulsar una respuesta abierta se cierra; al pulsar otra, se abre esa y se cierra la anterior.
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
            {/* El icono cambia: − si está abierta, + si está cerrada. */}
            <span className="faq-toggle-icon">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {/* Cada referencia se guarda por posición para medir su respuesta al abrir o cerrar. */}
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
