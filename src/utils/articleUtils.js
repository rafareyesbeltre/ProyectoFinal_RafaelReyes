/**
 * articleUtils.js — Utilidades de presentación para los artículos.
 *
 * Reúne aquí la lógica visual: los colores del badge por categoría en el
 * detalle y las clases CSS de la etiqueta de cada tarjeta.
 */

/**
 * Colores del badge de categoría que se aplican en el detalle del artículo.
 *   - CSS  → tono principal
 *   - HTML → verde
 *   - JS   → ámbar
 *   - resto → gris
 */
export function getCategoryBadgeStyle(category) {
  if (category.includes("CSS")) {
    return { background: "rgba(79, 70, 229, 0.08)", color: "var(--color-primary)" };
  }
  if (category.includes("HTML")) {
    return { background: "rgba(16, 185, 129, 0.08)", color: "var(--color-success)" };
  }
  if (category.includes("JS") || category.includes("Java")) {
    return { background: "rgba(245, 158, 11, 0.08)", color: "var(--color-accent)" };
  }
  return { background: "rgba(107, 114, 128, 0.08)", color: "var(--color-muted)" };
}

/**
 * Clase CSS y etiqueta del texto que va sobre la imagen de cada tarjeta:
 * blog-tag-css, blog-tag-html, blog-tag-js y blog-tag-career.
 *
 * previewBadgeClass es la variante de las tarjetas "Recomendados" del detalle
 * (el CSS solo define blog-preview-badge-* para CSS/HTML/JS; por eso Carrera
 * devuelve una cadena vacía y en ese caso no se pinta el badge).
 */
export function getTagInfo(category) {
  if (category === "CSS") {
    return { badgeClass: "blog-tag-css", label: "CSS", previewBadgeClass: "blog-preview-badge-css" };
  }
  if (category === "HTML") {
    return { badgeClass: "blog-tag-html", label: "HTML", previewBadgeClass: "blog-preview-badge-html" };
  }
  if (category === "JS") {
    return { badgeClass: "blog-tag-js", label: "JS", previewBadgeClass: "blog-preview-badge-js" };
  }
  return { badgeClass: "blog-tag-career", label: "CARRERA", previewBadgeClass: "" };
}