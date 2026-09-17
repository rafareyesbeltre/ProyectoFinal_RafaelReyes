/**
 * Pagina404.jsx — Página de error "a la carta" (catch-all "*").
 *
 * Se muestra para cualquier ruta que no coincida con las definidas en App.jsx.
 * Comparte el mismo estilo que el bloque "artículo no encontrado" de
 * DetallePage para mantener coherencia visual en los fallos de navegación.
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pagina404() {
  // Título de pestaña específico para esta página de error.
  useEffect(() => {
    document.title = "404 — Coffee-End";
  }, []);

  return (
    <main>
      <div
        className="container"
        style={{ padding: "120px 24px", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "12px",
            fontFamily: "var(--font-display)",
          }}
        >
          404 — Página no encontrada
        </h2>
        <p
          style={{
            color: "var(--color-muted)",
            maxWidth: "500px",
            margin: "0 auto 32px auto",
          }}
        >
          La ruta a la que intentas ingresar no existe dentro del blog.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al Blog
        </Link>
      </div>
    </main>
  );
}