/**
 * BookmarksContext.jsx — Definición del contexto de favoritos.
 *
 * Este archivo SOLO crea y exporta el objeto contexto.
 */

import { createContext } from "react";

// Valor inicial null: cualquier consumo fuera de <BookmarksProvider />
// detectará que no hay proveedor y lanzará un error controlado (ver useBookmarks).
export const BookmarksContext = createContext(null);
