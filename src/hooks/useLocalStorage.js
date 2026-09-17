/**
 * useLocalStorage.js — Custom hook de estado sincronizado con localStorage
 * (ejemplo típico citado en el Tema 6: useLocalStorage).
 *
 * API idéntica a useState:
 *
 *   const [theme, setTheme] = useLocalStorageState("coffee_end_theme", "light");
 *
 *   - Al leer por primera vez, inicializa desde localStorage (si existe) o
 *     con defaultValue (se admite también un inicializador perezoso).
 *   - Cada cambio se persiste automáticamente en la clave indicada.
 *   - Si la clave cambia en un componente que NO se desmonta (p. ej. el id de
 *     un artículo en la misma ruta), el estado se re-inicializa con el valor
 *     de la nueva clave en lugar de reutilizar el anterior.
 *   - Todo el acceso va envuelto en try/catch para no romper la app si
 *     localStorage no está disponible (p. ej. render en Node/SSR).
 *
 * @param {string} key — clave usada en localStorage.
 * @param {*} defaultValue — valor por defecto (o función que lo devuelve).
 */

import { useEffect, useState } from "react";

// Lee y parsea el valor guardado; devuelve null si no existe o no se puede leer.
function readStored(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch {
    // JSON corrupto o almacenamiento no disponible → se ignora.
  }
  return null;
}

export function useLocalStorageState(key, defaultValue) {
  // Inicializador perezoso: solo se ejecuta una vez en el primer render.
  const [value, setValue] = useState(() => {
    const stored = readStored(key);
    if (stored !== null) return stored;
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  // Reset derivado de estado (patrón oficial de React): si la clave cambia
  // (p. ej. al navegar entre /blog/art_1 y /blog/art_2, donde DetallePage NO
  // se desmonta), el estado se vuelve a leer desde la NUEVA clave. Sin esto,
  // los comentarios de un artículo se "filtrarían" al siguiente.
  const [prevKey, setPrevKey] = useState(key);
  if (prevKey !== key) {
    setPrevKey(key);
    setValue(() => {
      const stored = readStored(key);
      if (stored !== null) return stored;
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    });
  }

  // Persiste el valor cada vez que cambia (efecto de "ciclo de vida").
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Almacenamiento no disponible: se sigue funcionando en memoria.
    }
  }, [key, value]);

  return [value, setValue];
}