/**
 * useTheme.js — Hook público para consumir el ThemeContext.
 *
 * Devuelve { theme, toggleTheme }. Falla de forma explícita si se usa fuera
 * de <ThemeProvider />, en lugar de devolver null y provocar errores confusos.
 */

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }

  return context;
}