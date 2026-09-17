/**
 * useFetch.js — Hook para cargar datos de forma asíncrona (Tema 6).
 *
 * Centraliza el ciclo de vida de cualquier petición del proyecto y expone los
 * 3 estados pedidos en el Tema 5:
 *
 *   const { data, loading, error, refetch } = useFetch(fetchBlogPosts);
 *
 *   - data:    el resultado de la Promesa (null mientras carga).
 *   - loading: true desde que empieza hasta que termina.
 *   - error:   el error ocurrido (null si todo va bien).
 *   - refetch: función para volver a pedir (botones "Reintentar").
 *
 * Detalles:
 *   - La función de petición vive en un ref, así el efecto no depende de su
 *     identidad (que cambia en cada render) y no se vuelve a pedir sin motivo.
 *   - El efecto depende de `tick` (lo aumenta refetch) y de las dependencias
 *     que pasa el llamante (p. ej. el id del artículo); así la petición se
 *     relanza al cambiar la URL sin desmontarse.
 *   - Un flag interno evita actualizar el estado de una petición que ya no
 *     interesa (p. ej. si el usuario sale de la página antes de que termine).
 *
 * @param {Function} fetchFn — función que devuelve una Promesa.
 * @param {Array} [deps=[]] — dependencias que deben relanzar la petición.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export function useFetch(fetchFn, deps = []) {
  // La última función de petición, guardada para no depender de su identidad.
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Un contador: refetch() lo aumenta y el efecto vuelve a pedir.
  const [tick, setTick] = useState(0);

  // refetch no cambia entre renders, así no provoca repintados por sí sola.
  const refetch = useCallback(() => setTick((t) => t + 1), []);

  // La petición principal: las `deps` extra (como [id]) la relanzan al cambiar,
  // y `tick` hace lo mismo desde refetch.
  useEffect(() => {
    let active = true; // Se desactiva al desmontar o relanzar para ignorar la respuesta vieja.

    setLoading(true);
    setError(null);
    // No se guarda la promesa; el .catch pasa el fallo al estado `error`.
    fetchFnRef.current()
      .then((payload) => {
        if (!active) return;
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err : new Error("Error de carga"));
        setLoading(false);
      });

    // Al limpiar, la petición se marca como inactiva (cambió la pantalla o se salió).
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps se expande a propósito
  }, [tick, ...deps]);

  return { data, loading, error, refetch };
}