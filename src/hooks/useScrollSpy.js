/**
 * useScrollSpy.js — Engine interactivo del menú lateral del artículo.
 *
 *   - resalta el enlace del menú lateral que corresponde a la sección visible
 *   - hace scroll suave al hacer clic (con compensación por el header)
 *   - optimiza el scroll con requestAnimationFrame (una actualización por frame)
 *
 * En React los listeners no se registran "por documento"; el hook consulta los
 * nodos .menu-lateral_link y .anchor-span (renderizados por DetallePage) y se
 * auto-limpia al desmontar o cambiar de artículo.
 */

import { useEffect } from "react";

// Margen superior (px) para decidir qué enlace está activo durante el scroll.
const SCROLL_OFFSET = 180;
// Compensación del header al hacer scroll suave con clic (100px del estático).
const CLICK_OFFSET = 100;

/**
 * @param {number} sectionCount Número de secciones del artículo. Se usa como
 *   dependencia: si cambia el artículo, el engine se re-inicializa.
 */
export function useScrollSpy(sectionCount) {
  useEffect(() => {
    // Los nodos ya existen: el efecto corre después del render del DOM.
    const links = Array.from(document.querySelectorAll(".menu-lateral_link"));
    const anchors = Array.from(document.querySelectorAll(".anchor-span"));

    // Sin menú ni anchors (p. ej. artículo no encontrado), no hay nada que vigilar.
    if (!links.length || !anchors.length) return;

    /**
     * Índice activo: la última sección cuyo top esté por encima de
     * scrollY - SCROLL_OFFSET. Empieza en 0 (primera sección).
     */
    function getActiveIndex() {
      const scrollY = window.scrollY;
      let activeIndex = 0;

      anchors.forEach((anchor, index) => {
        const top = anchor.getBoundingClientRect().top + scrollY - SCROLL_OFFSET;
        if (scrollY >= top) {
          activeIndex = index;
        }
      });

      return activeIndex;
    }

    // Aplica la clase CSS --active solo al enlace correspondiente.
    function updateMenu() {
      const activeIndex = getActiveIndex();

      links.forEach((link, index) => {
        if (index === activeIndex) {
          link.classList.add("menu-lateral_link--active");
        } else {
          link.classList.remove("menu-lateral_link--active");
        }
      });
    }

    // Scroll suave al clic, compensando la altura del navbar superior.
    function handleLinkClick(event, index) {
      event.preventDefault();

      const target = anchors[index];
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - CLICK_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }

    // Se guarda la referencia de cada handler para poder quitarlo en el
    // cleanup (removeEventListener exige la misma función que se registró).
    const linkHandlers = links.map((link, index) => {
      const handler = (event) => handleLinkClick(event, index);
      link.addEventListener("click", handler);
      return { link, handler };
    });

    // Throttling del evento scroll: solo se actualiza una vez por frame
    // (requestAnimationFrame), evitando trabajo redundante en scrolls largos.
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateMenu();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll);
    updateMenu();

    // Cleanup: se eliminan los listeners al desmontar o cambiar de artículo.
    return () => {
      linkHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionCount]);
}