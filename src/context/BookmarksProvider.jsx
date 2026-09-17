/**
 * BookmarksProvider.jsx — Proveedor del estado global de favoritos.
 *
 * Gestiona la lista de artículos marcados (🔖/⭐)
 *   - carga inicial desde localStorage
 *   - persistencia automática en cada cambio
 *   - toggles para los marcadores de tarjetas y del artículo destacado
 */

import { useCallback, useEffect, useState } from "react";
import { BOOKMARKS_STORAGE_KEY, FEATURED_ARTICLE_ID } from "../utils/constants";
import { BookmarksContext } from "./BookmarksContext";

/**
 * Lee los favoritos persistidos. Se usa como inicializador perezoso de
 * useState, así que solo se ejecuta la primera vez que se monta el proveedor.
 * Devuelve un array vacío si no hay datos o si el JSON está corrupto.
 */
function loadBookmarks() {
  try {
    const cachedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return cachedBookmarks ? JSON.parse(cachedBookmarks) : [];
  } catch (error) {
    console.error("Error al cargar persistencia de blog:", error);
    return [];
  }
}

export default function BookmarksProvider({ children }) {
  // Inicializa el estado con el valor ya persistido en el navegador del usuario.
  const [bookmarkedIds, setBookmarkedIds] = useState(loadBookmarks);

  // Efecto de sincronización: cada vez que cambia la lista se guarda en
  // localStorage (arquitectura offline-first, igual que el proyecto original).
  useEffect(() => {
    try {
      localStorage.setItem(
        BOOKMARKS_STORAGE_KEY,
        JSON.stringify(bookmarkedIds),
      );
    } catch (error) {
      console.error("Error al guardar persistencia de blog:", error);
    }
  }, [bookmarkedIds]);

  /**
   * Añade o elimina un id de la lista según ya exista (toggle real).
   * useCallback con dependencias vacías mantiene la referencia estable entre
   * renders y evita re-renders innecesarios en los consumidores.
   */
  const toggleBookmark = useCallback((id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  // Devuelve true si un artículo concreto está marcado.
  const isBookmarked = useCallback(
    (id) => bookmarkedIds.includes(id),
    [bookmarkedIds],
  );

  // Atajo para el artículo destacado, que tiene su propio botón en la home.
  const isFeaturedBookmarked = bookmarkedIds.includes(FEATURED_ARTICLE_ID);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        isBookmarked,
        isFeaturedBookmarked,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
