/**
 * useLocalStorage.js — Hook de estado que se guarda en localStorage
 * (el ejemplo típico que se cita en el Tema 6).
 *
 * Se usa igual que useState:
 *
 *   const [theme, setTheme] = useLocalStorageState("coffee_end_theme", "light");
 *
 *   - La primera vez lee lo que haya guardado (o usa el valor por defecto;
 *     también acepta una función que lo devuelva).
 *   - Cada cambio se guarda solo en la clave indicada.
 *   - Si la clave cambia en un componente que NO se desmonta (p. ej. el id de
 *     un artículo dentro de la misma ruta), el estado se relee con la nueva
 *     clave en lugar de arrastrar el valor anterior.
 *   - Todo el acceso va protegido con try/catch para no romper la app si el
 *     almacenamiento no está disponible (p. ej. render en Node/SSR).
 *
 * @param {string} key — clave usada en localStorage.
 * @param {*} defaultValue — valor por defecto (o función que lo devuelve).
 */

import { useEffect, useState } from "react";

// Lee y descifra el valor guardado; null si no existe o no se puede leer.
function readStored(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch {
    // JSON dañado o sin almacenamiento: se ignora y se usa el valor por defecto.
  }
  return null;
}

export function useLocalStorageState(key, defaultValue) {
  // Solo corre una vez, en el primer render.
  const [value, setValue] = useState(() => {
    const stored = readStored(key);
    if (stored !== null) return stored;
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  // Si la clave cambia (p. ej. al pasar de /blog/art_1 a /blog/art_2, donde la
  // página no se desmonta), el estado se vuelve a leer con la nueva clave; así
  // los comentarios de un artículo no pasan al siguiente.
  const [prevKey, setPrevKey] = useState(key);
  if (prevKey !== key) {
    setPrevKey(key);
    setValue(() => {
      const stored = readStored(key);
      if (stored !== null) return stored;
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    });
  }

  // Con cada cambio, se guarda el valor en localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sin almacenamiento se sigue trabajando en memoria.
    }
  }, [key, value]);

  return [value, setValue];
}