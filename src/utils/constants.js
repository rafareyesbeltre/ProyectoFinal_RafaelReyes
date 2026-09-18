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

// Enlace único de Discord que usan los botones e invitaciones de la app.
export const DISCORD_INVITE_URL = "https://discord.gg/Ezf3Cj8UQC";

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

// Clave de localStorage donde se guardan las citas de mentorías.
export const MENTORIAS_STORAGE_KEY = "devacademy_mentorship_bookings";

// Instructores que aparecen en el selector del formulario.
export const MENTOR_INSTRUCTORES = [
  "Lucas Garmendia",
  "Elena Caro",
  "Sofía Domínguez",
  "Carlos Pérez",
];

// Objetivos que se pueden elegir para la sesión. El valor corto se guarda en
// la cita y la etiqueta es el texto que se lee en el formulario.
export const MENTOR_OBJETIVOS = [
  { value: "Revisión de Código Semántico", label: "Revisión de Código Semántico" },
  { value: "Resolución de Consola & Bugs", label: "Resolución de Consola & Bugs (Debugging)" },
  { value: "Disposición Flexbox / CSS Grid", label: "Diseño y Maquetación Flexbox / Grid" },
  { value: "Orientación Profesional & Porfolio", label: "Estrategia Profesional & Portfolio" },
];

// Franjas de horario disponibles para la videollamada (hora de Ecuador).
export const MENTOR_HORARIOS = [
  { value: "09:00 - 09:45 ECT", label: "09:00 AM - 09:45 AM ECT" },
  { value: "11:00 - 11:45 ECT", label: "11:00 AM - 11:45 AM ECT" },
  { value: "13:30 - 14:15 ECT", label: "01:30 PM - 02:15 PM ECT" },
  { value: "16:00 - 16:45 ECT", label: "04:00 PM - 04:45 PM ECT" },
  { value: "18:15 - 19:00 ECT", label: "06:15 PM - 07:00 PM ECT" },
];

// Cita de ejemplo que aparece la primera vez, para que la agenda no arranque
// vacía y se vea de inmediato cómo queda un ticket.
export const DEFAULT_BOOKINGS = [
  {
    id: "booking_default_1",
    name: "Alejandra Valera",
    email: "alejandra@devacademy.edu",
    mentor: "Lucas Garmendia",
    type: "Resolución de Consola & Bugs",
    date: "2026-06-12",
    time: "11:00 - 11:45 ECT",
    details:
      "Tengo un problema asíncrono con fetch() donde el estado local se actualiza antes de completarse la consulta, causando undefined en bucles mapping.",
    status: "Confirmada",
  },
];

// Color de la línea de cada ticket según el instructor elegido.
export const MENTOR_COLORS = {
  "Lucas Garmendia": "var(--color-primary)",
  "Elena Caro": "var(--color-secondary)",
  "Sofía Domínguez": "var(--color-accent)",
  "Carlos Pérez": "var(--color-muted)",
};