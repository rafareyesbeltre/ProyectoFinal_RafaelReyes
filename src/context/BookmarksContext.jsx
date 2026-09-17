/**
 * BookmarksContext.jsx — Contexto de favoritos.
 *
 * Este archivo solo crea y exporta el objeto de contexto.
 */

import { createContext } from "react";

// Empieza en null: si algo intenta usarlo fuera del proveedor, useBookmarks
// lanza un error avisando de que no existe.
export const BookmarksContext = createContext(null);
