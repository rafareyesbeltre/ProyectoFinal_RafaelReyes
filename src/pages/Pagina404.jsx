/**
 * Pagina404.jsx — Página de error (ruta comodín "*").
 *
 * Se muestra para cualquier ruta que no coincida con las definidas en App.jsx.
 * Comparte el estilo del bloque "artículo no encontrado" de DetallePage para
 * que los fallos de navegación se vean iguales.
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pagina404() {
  // Título de la pestaña para esta página.
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