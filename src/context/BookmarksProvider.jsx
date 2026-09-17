/**
 * BookmarksProvider.jsx — Proveedor del estado global de favoritos.
 *
 * Lleva la lista de artículos marcados (🔖/⭐):
 *   - la carga al inicio desde localStorage
 *   - la guarda automáticamente con cada cambio
 *   - los interruptores de las tarjetas y del artículo destacado
 */

import { useCallback, useEffect, useState } from "react";
import { BOOKMARKS_STORAGE_KEY, FEATURED_ARTICLE_ID } from "../utils/constants";
import { BookmarksContext } from "./BookmarksContext";

/**
 * Lee los favoritos guardados. Solo corre la primera vez que se monta el
 * proveedor (inicializador perezoso de useState) y, si no hay datos o el
 * JSON está dañado, devuelve una lista vacía.
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
  // El estado arranca con lo que el usuario ya tenía guardado en el navegador.
  const [bookmarkedIds, setBookmarkedIds] = useState(loadBookmarks);

  // Cada vez que cambia la lista se vuelve a guardar en localStorage, así los
  // marcadores sobreviven al cerrar la página.
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

  // Añade o quita un id de la lista según ya exista. useCallback deja la
  // función estable para evitar repintados innecesarios.
  const toggleBookmark = useCallback((id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  // Dice si un artículo concreto está marcado.
  const isBookmarked = useCallback(
    (id) => bookmarkedIds.includes(id),
    [bookmarkedIds],
  );

  // Atajo para el artículo destacado, que tiene botón propio en la página principal.
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
