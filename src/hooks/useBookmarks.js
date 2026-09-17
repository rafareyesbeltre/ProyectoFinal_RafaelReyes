/**
 * useBookmarks.js — El gancho para leer los favoritos desde cualquier lugar.
 *
 * Cualquier componente o página que viva dentro de <BookmarksProvider /> puede
 * usarlo para consultar la lista de marcadores o alternar un favorito.
 */

import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";

export function useBookmarks() {
  const context = useContext(BookmarksContext);

  // Fuera del proveedor el contexto es null; mejor avisar con un error claro
  // que fallar de forma rara más adelante.
  if (!context) {
    throw new Error("useBookmarks debe usarse dentro de BookmarksProvider");
  }

  return context;
}