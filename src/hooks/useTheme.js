/**
 * useTheme.js — El gancho para leer el tema activo desde cualquier lugar.
 *
 * Devuelve { theme, toggleTheme } y, si se usa fuera de <ThemeProvider />,
 * da un error claro en lugar de devolver null discretamente.
 */

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);

  // Fuera del proveedor el contexto es null; mejor avisar con un error claro
  // que fallar de forma rara más adelante.
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }

  return context;
}