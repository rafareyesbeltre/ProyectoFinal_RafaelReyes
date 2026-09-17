/**
 * ThemeContext.jsx — Contexto global del tema claro/oscuro (Tema 8).
 *
 * Archivo separado del proveedor para cumplir la regla only-export-components
 * de oxlint (Fast Refresh): aquí SOLO se crea y se exporta el objeto contexto.
 * El valor real lo inyecta ThemeProvider con el estado `theme` y la función
 * toggleTheme.
 */

import { createContext } from "react";

// Si un componente lo consume fuera del proveedor, useTheme() lanza un error;
// el valor por defecto null lo hace detectable.
export const ThemeContext = createContext(null);