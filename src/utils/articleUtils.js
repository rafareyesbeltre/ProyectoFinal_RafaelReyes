/**
 * articleUtils.js — Utilidades de presentación para artículos.
 *
 * Concentra la lógica "visual" que en el estático vivía esparcida en
 * js/blog.js y js/articulo.js: colores de badge por categoría y las clases
 * CSS de los tags de tarjeta.
 */

/**
 * Estilos inline del badge de categoría del detalle de artículo.
 * Replica el mapeo de fetchAndLoadArticle() en js/articulo.js:
 *   - CSS  → fondo/acento primario
 *   - HTML → verde (éxito)
 *   - JS   → ámbar (acento)
 *   - resto → gris (muted)
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
 * Clases CSS y etiqueta del tag pintado sobre la imagen de cada tarjeta.
 * El estático usaba, por categoría: blog-tag-css, blog-tag-html,
 * blog-tag-js y blog-tag-career.
 *
 * previewBadgeClass es la variante de las tarjetas "Recomendados" del
 * detalle (el CSS solo define blog-preview-badge-* para CSS/HTML/JS; por eso
 * Carrera devuelve cadena vacía y en ese caso no se pinta badge).
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