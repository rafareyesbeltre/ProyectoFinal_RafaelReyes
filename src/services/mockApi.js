/**
 * mockApi.js — API simulada local (fuente de datos asíncrona para el Tema 5).
 *
 * Emula un backend con Promesas y un pequeño retardo (~700 ms) para que la
 * interfaz pueda mostrar los 3 estados de carga:
 *
 *   - CARGANDO: mientras la Promesa está pendiente (loading === true).
 *   - ERROR:   si la petición rechaza (p. ej. fallo forzado).
 *   - DATOS:   cuando resuelve (loading false, error null, data cargada).
 *
 * Los datos salen de los ficheros de src/data/, y las respuestas se "clonan"
 * para que ningún componente pueda modificar la fuente original.
 *
 * Para forzar un error de demostración, en la consola del navegador ejecuta
 *   localStorage.setItem("coffee_end_mock_error", "1")
 * La siguiente petición fallará una vez (el reintento vuelve a funcionar).
 */

import { BLOG_POSTS } from "../data/blogPosts";
import { ARTICLES_DATABASE } from "../data/articles";
import { MOCK_ERROR_KEY } from "../utils/constants";

// Cuánto se espera (en ms) para simular la latencia de una red real.
const SIMULATED_DELAY = 700;

// Una Promesa que espera `ms` milisegundos y luego resuelve.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Se devuelve una copia de los datos para que los componentes no toquen la fuente original.
function clone(payload) {
  return JSON.parse(JSON.stringify(payload));
}

// Cada petición decide aquí si falla una sola vez (para ver el estado de
// error) o sigue con normalidad.
function maybeFail() {
  try {
    if (localStorage.getItem(MOCK_ERROR_KEY) === "1") {
      localStorage.removeItem(MOCK_ERROR_KEY);
      return true;
    }
  } catch {
    // Si no hay localStorage, simplemente no se fuerza ningún error.
  }
  return false;
}

/**
 * fetchBlogPosts — devuelve la parrilla completa del blog.
 * @returns {Promise<Array>} Copia de BLOG_POSTS.
 */
export async function fetchBlogPosts() {
  await delay(SIMULATED_DELAY);
  if (maybeFail()) {
    throw new Error("No se pudo conectar con el servidor de artículos.");
  }
  return clone(BLOG_POSTS);
}

/**
 * fetchArticleDetail — devuelve el artículo completo + 3 recomendaciones.
 * Si el id no existe, resuelve con article: null (no es un fallo de red, sino
 * un dato que indica "contenido no encontrado").
 * @param {string} id — id del artículo (params de la ruta /blog/:id).
 * @returns {Promise<{article: object|null, recommendations: Array}>}
 */
export async function fetchArticleDetail(id) {
  await delay(SIMULATED_DELAY);
  if (maybeFail()) {
    throw new Error("No se pudo cargar el artículo solicitado.");
  }

  const article = ARTICLES_DATABASE[id] || null;
  let recommendations = [];
  if (article) {
    // Toma 3 artículos distintos del actual.
    recommendations = BLOG_POSTS.filter((post) => post.id !== id).slice(0, 3);
  }

  return clone({ article, recommendations });
}