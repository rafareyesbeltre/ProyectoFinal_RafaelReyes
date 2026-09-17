/**
 * useScrollSpy.js — El índice lateral del artículo, en acción.
 *
 *   - resalta el enlace del menú que corresponde a la sección visible
 *   - desplaza con suavidad al hacer clic (dejando margen para el header)
 *   - aprovecha requestAnimationFrame para actualizar una vez por frame
 *
 * En React los listeners no se registran "por documento": el hook localiza los
 * nodos .menu-lateral_link y .anchor-span (los dibuja DetallePage) y se
 * autolimpia al desmontar o cambiar de artículo.
 */

import { useEffect } from "react";

// Cuánto se baja del tope para decidir qué enlace está activo al hacer scroll.
const SCROLL_OFFSET = 180;
// Margen para que el header no tape el título al saltar con un clic.
const CLICK_OFFSET = 100;

/**
 * @param {number} sectionCount — cuántas secciones tiene el artículo. Sirve de
 * dependencia: si cambia el artículo, el engine se reinicia.
 */
export function useScrollSpy(sectionCount) {
  useEffect(() => {
    // Los nodos ya están en el DOM cuando corre el efecto.
    const links = Array.from(document.querySelectorAll(".menu-lateral_link"));
    const anchors = Array.from(document.querySelectorAll(".anchor-span"));

    // Si no hay menú ni anclas (p. ej. artículo no encontrado), no hay nada que vigilar.
    if (!links.length || !anchors.length) return;

    /**
     * El índice activo es la última sección cuyo tope ya quedó por encima de
     * scrollY - SCROLL_OFFSET. Empieza en 0 (la primera sección).
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

    // Marca con la clase --active solo el enlace correspondiente.
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

    // Al hacer clic, baja suave hasta el título dejando espacio para el header.
    function handleLinkClick(event, index) {
      event.preventDefault();

      const target = anchors[index];
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - CLICK_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }

    // Se guarda cada listener para poder quitarlo después (addEventListener y
    // removeEventListener necesitan la misma función).
    const linkHandlers = links.map((link, index) => {
      const handler = (event) => handleLinkClick(event, index);
      link.addEventListener("click", handler);
      return { link, handler };
    });

    // El scroll solo se procesa una vez por frame, así no se trabaja de más
    // al bajar rápido por una página larga.
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

    // Al final se quitan los listeners (al salir o cambiar de artículo).
    return () => {
      linkHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionCount]);
}