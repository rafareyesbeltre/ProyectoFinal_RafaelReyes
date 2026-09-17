/**
 * useFetch.js — Custom hook genérico de peticiones asíncronas (Tema 6).
 *
 * Centraliza el ciclo de vida básico de cualquier "fetch" del proyecto y
 * expone los 3 estados exigidos en el Tema 5:
 *
 *   const { data, loading, error, refetch } = useFetch(fetchBlogPosts);
 *
 *   - data:    resultado resuelto de la Promesa (null mientras se carga).
 *   - loading: true desde el inicio hasta que la Promesa termina.
 *   - error:   el Error en caso de fallo (null en el resto de casos).
 *   - refetch: función para relanzar la petición (botones "Reintentar").
 *
 * Detalles de implementación:
 *   - La fetcher se guarda en un ref, así el efecto no depende de su identidad
 *     (que cambiaría en cada render) y el hook no "vuelve a pedir" sin motivo.
 *   - El efecto depende de `tick` (incrementado por refetch) y de las
 *     dependencias reales pasadas por el llamante (p. ej. el id del artículo);
 *     así la petición se relanza al cambiar la URL sin desmontarse.
 *   - Un flag interno evita actualizar estado de una petición cancelada
 *     (salir de la página mientras la Promesa sigue pendiente).
 *
 * @param {Function} fetchFn — función que devuelve una Promesa.
 * @param {Array} [deps=[]] — dependencias que deben relanzar la petición.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export function useFetch(fetchFn, deps = []) {
  // Ref con la última función de petición (siempre actual, nunca en deps).
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // "tick" es un contador: refetch() lo incrementa y el efecto se relanza.
  const [tick, setTick] = useState(0);

  // refetch estable por identidad (no provoca re-renders por sí misma).
  const refetch = useCallback(() => setTick((t) => t + 1), []);

  // Petición principal. `deps` extras (como [id]) vuelven a lanzarla cuando
  // cambian; `tick` la relanza también desde refetch.
  useEffect(() => {
    let active = true; // false al desmontar o al relanzar → ignora la respuesta.

    setLoading(true);
    setError(null);
    // No se guarda la Promise para no disparar avisos de lint; el .catch
    // convierte el fallo en el estado `error` del hook.
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

    // Cleanup: marca la petición como inactiva si cambia deps o se desmonta.
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps se expande a propósito
  }, [tick, ...deps]);

  return { data, loading, error, refetch };
}