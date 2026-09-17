/**
 * mockApi.js — API simulada local (fuente de datos asíncrona para el Tema 5).
 *
 * Emula un backend con Promesas y un pequeño retardo de red (~700 ms) para
 * que la interfaz pueda mostrar los 3 estados de carga:
 *
 *   - CARGANDO: mientras la Promesa está pendiente (loading === true).
 *   - ERROR:   si la petición rechaza (p. ej. fallo forzado).
 *   - DATOS:   cuando resuelve (loading false, error null, data cargada).
 *
 * Los datos provienen de los ficheros de src/data/, por lo que el contenido
 * es idéntico al del proyecto estático. Las respuestas se "clonan" para que
 * ningún componente pueda mutar la fuente de datos original.
 *
 * Para forzar un error de demostración: en la consola del navegador ejecuta
 *   localStorage.setItem("coffee_end_mock_error", "1")
 * La siguiente petición fallará una vez (el reintento vuelve a funcionar).
 */

import { BLOG_POSTS } from "../data/blogPosts";
import { ARTICLES_DATABASE } from "../data/articles";
import { MOCK_ERROR_KEY } from "../utils/constants";

// Retardo en milisegundos que simula la latencia de red.
const SIMULATED_DELAY = 700;

// Devuelve una Promesa que espera `ms` milisegundos.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Clonado profundo de un objeto de datos: evita que los componentes modifiquen
// la base de datos original (que se importa en módulos compartidos).
function clone(payload) {
  return JSON.parse(JSON.stringify(payload));
}

// Cada llamada que llega aquí decide si debe fallar UNA vez (para demostrar
// el estado de error) o continuar con normalidad.
function maybeFail() {
  try {
    if (localStorage.getItem(MOCK_ERROR_KEY) === "1") {
      localStorage.removeItem(MOCK_ERROR_KEY);
      return true;
    }
  } catch {
    // Sin localStorage (p. ej. SSR de Node) simplemente no se fuerza error.
  }
  return false;
}

/**
 * fetchBlogPosts — devuelve el listado completo de tarjetas del blog.
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
 * Si el id no existe, resuelve con article: null (no es un error de red,
 * sino "datos" que indican contenido no encontrado).
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
    // 3 posts distintos del actual (igual que renderRecommendations() del estático).
    recommendations = BLOG_POSTS.filter((post) => post.id !== id).slice(0, 3);
  }

  return clone({ article, recommendations });
}