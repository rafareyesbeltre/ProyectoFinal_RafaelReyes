/**
 * constants.js — Constantes globales de la aplicación.
 *
 * Centraliza claves de persistencia, identificadores especiales y categorías
 * del blog para no duplicar "magic strings" en componentes y páginas.
 */

// Clave usada en localStorage para guardar los favoritos (marcadores) del blog.
export const BOOKMARKS_STORAGE_KEY = "devacademy_blog_bookmarks";

// Clave usada en localStorage para recordar el email del suscriptor de la newsletter.
export const NEWSLETTER_STORAGE_KEY = "coffee_end_newsletter_email";

// Clave usada en localStorage para persistir el tema global (claro/oscuro).
export const THEME_STORAGE_KEY = "coffee_end_theme";

// Prefijo de la clave que guarda los comentarios de cada artículo. La clave
// completa es `${COMMENTS_STORAGE_PREFIX}${articleId}` (p. ej. coffee_end_comments_art_2).
export const COMMENTS_STORAGE_PREFIX = "coffee_end_comments_";

// Clave "modo comunicación" de la API simulada: si en localStorage vale "1",
// la siguiente petición (fetchBlogPosts/fetchArticleDetail) falla una vez.
// Sirve para demostrar el estado de ERROR del Tema 5, y al reintentar se limpia.
export const MOCK_ERROR_KEY = "coffee_end_mock_error";

// ID del artículo destacado (featured) dentro de ARTICLES_DATABASE.
// En el estático lo referenciaba la función toggleFeatBookmark() de js/blog.js.
export const FEATURED_ARTICLE_ID = "featured_dom_asincrono";

// Categorías del filtro de la home. El campo `id` coincide con post.category
// de BLOG_POSTS; `label` es el texto que se muestra en el botón.
export const BLOG_CATEGORIES = [
  { id: "Todos", label: "Todo" },
  { id: "HTML", label: "HTML5" },
  { id: "CSS", label: "CSS3 & Layouts" },
  { id: "JS", label: "JavaScript" },
  { id: "Carrera", label: "Carrera & Soft Skills" },
];