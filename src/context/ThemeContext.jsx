/**
 * ThemeContext.jsx — Contexto del tema claro/oscuro (Tema 8).
 *
 * Vive en archivo aparte del proveedor para cumplir la regla
 * only-export-components de oxlint: aquí solo se crea y se exporta el objeto de
 * contexto. El valor real lo inyecta ThemeProvider (estado `theme` + función
 * toggleTheme).
 */

import { createContext } from "react";

// El valor empieza en null para que, si algo lo usa fuera del proveedor,
// useTheme pueda avisar del problema.
export const ThemeContext = createContext(null);