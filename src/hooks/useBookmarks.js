/**
 * useBookmarks.js — Hook público para consumir el contexto de favoritos.
 *
 * Cualquier componente o página dentro de <BookmarksProvider /> puede llamar
 * a este hook para leer la lista de marcadores o alternar un favorito.
 */

import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";

export function useBookmarks() {
  const context = useContext(BookmarksContext);

  // Si no hay proveedor, el contexto es null: fallamos de forma explícita y
  // rápida en lugar de devolver undefined y generar errores confusos.
  if (!context) {
    throw new Error("useBookmarks debe usarse dentro de BookmarksProvider");
  }

  return context;
}