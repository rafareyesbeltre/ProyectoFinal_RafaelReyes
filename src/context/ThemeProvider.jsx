/**
 * ThemeProvider.jsx — Proveedor del tema global claro/oscuro (Tema 8).
 *
 * Deja un único dato global (theme) disponible en toda la app:
 *   - El estado vive aquí y se persiste con useLocalStorageState (clave
 *     coffee_end_theme) para recordar la elección entre visitas.
 *   - Un useEffect sincroniza el DOM con el tema: el atributo data-theme="dark"
 *     en <html> (para el CSS en modo oscuro) y la clase body-dark-bg en <body>.
 *   - toggleTheme alterna entre "light" y "dark".
 *
 * ThemeContext y ThemeProvider viven en ficheros aparte para cumplir la regla
 * only-export-components de oxlint (Fast Refresh).
 */

import { useCallback, useEffect, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";
import { THEME_STORAGE_KEY } from "../utils/constants";
import { useLocalStorageState } from "../hooks/useLocalStorage";

export default function ThemeProvider({ children }) {
  // El tema actual, guardado en localStorage.
  const [theme, setTheme] = useLocalStorageState(THEME_STORAGE_KEY, "light");

  // Cambia entre claro y oscuro sin importar cuál estaba activo.
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  // Lleva el tema al DOM: el atributo data-theme en <html> y el fondo del <body>.
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.body.classList.toggle("body-dark-bg", isDark);
  }, [theme]);

  // El valor del contexto solo cambia cuando cambia el tema.
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}