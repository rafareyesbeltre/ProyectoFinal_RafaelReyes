/**
 * ThemeProvider.jsx — Proveedor del tema global claro/oscuro (Tema 8).
 *
 * Un único "dato global" (theme) disponible en toda la app:
 *   - El estado vive en el proveedor y se persiste con useLocalStorageState
 *     (clave coffee_end_theme) para recordar la elección entre visitas.
 *   - Un useEffect sincroniza el DOM con el tema: atributo data-theme="dark"
 *     en <html> (para los overrides CSS) y la clase body-dark-bg en <body>
 *     (fondo oscuro que ya existía en el proyecto).
 *   - toggleTheme alterna entre "light" y "dark".
 *
 * Al dividir ThemeContext / ThemeProvider / useTheme en 3 ficheros se respeta
 * la regla only-export-components de oxlint (Fast Refresh).
 */

import { useCallback, useEffect, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";
import { THEME_STORAGE_KEY } from "../utils/constants";
import { useLocalStorageState } from "../hooks/useLocalStorage";

export default function ThemeProvider({ children }) {
  // Estado global del tema, persistido en localStorage.
  const [theme, setTheme] = useLocalStorageState(THEME_STORAGE_KEY, "light");

  // Alterna el valor actual (light <-> dark) sin depender del valor anterior.
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  // Sincroniza el DOM con el tema: data-theme en <html> y fondo del <body>.
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.body.classList.toggle("body-dark-bg", isDark);
  }, [theme]);

  // Valor del contexto memorizado: solo cambia cuando cambia el tema.
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}