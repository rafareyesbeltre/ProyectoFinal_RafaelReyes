/**
 * constants.js — Constantes globales de la aplicación.
 *
 * Centraliza claves de persistencia, identificadores especiales y categorías
 * del blog para no repetir "textos mágicos" en componentes y páginas.
 */

// Clave de localStorage donde se guardan los favoritos (marcadores) del blog.
export const BOOKMARKS_STORAGE_KEY = "devacademy_blog_bookmarks";

// Clave de localStorage donde se recuerda el email del suscriptor de la newsletter.
export const NEWSLETTER_STORAGE_KEY = "coffee_end_newsletter_email";

// Clave de localStorage donde se guarda el tema elegido (claro/oscuro).
export const THEME_STORAGE_KEY = "coffee_end_theme";

// Prefijo de la clave con los comentarios: se le añade el id del artículo
// (p. ej. coffee_end_comments_art_2).
export const COMMENTS_STORAGE_PREFIX = "coffee_end_comments_";

// Interruptor de error de la API simulada: si en localStorage vale "1", la
// siguiente petición (fetchBlogPosts / fetchArticleDetail) falla una vez.
// Sirve para mostrar el estado de error del Tema 5 y se limpia al reintentar.
export const MOCK_ERROR_KEY = "coffee_end_mock_error";

// ID del artículo que aparece como destacado en la página principal.
export const FEATURED_ARTICLE_ID = "featured_dom_asincrono";

// Categorías del filtro de la página principal. El campo `id` coincide con la
// categoría de cada artículo; `label` es el texto que aparece en el botón.
export const BLOG_CATEGORIES = [
  { id: "Todos", label: "Todo" },
  { id: "HTML", label: "HTML5" },
  { id: "CSS", label: "CSS3 & Layouts" },
  { id: "JS", label: "JavaScript" },
  { id: "Carrera", label: "Carrera & Soft Skills" },
];