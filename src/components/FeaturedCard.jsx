/**
 * FeaturedCard.jsx — Banner del artículo destacado de la página principal.
 *
 * Muestra el artículo más reciente, con su propio botón de marcador
 * (distinto al de las tarjetas: usa FEATURED_ARTICLE_ID como id especial).
 *
 * @param {object} article — Entrada de ARTICLES_DATABASE[FEATURED_ARTICLE_ID].
 */

import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import { FEATURED_ARTICLE_ID } from "../utils/constants";

export default function FeaturedCard({ article }) {
  const { isFeaturedBookmarked, toggleBookmark } = useBookmarks();

  return (
    <div className="featured-blog-card featured-blog-card-styled">
      {/* Columna izquierda: imagen grande + badge de categoría. */}
      <div className="featured-blog-img-cnt">
        <img
          src={article.image}
          alt="Patrones de JS asincrónico"
          className="featured-blog-img"
          referrerPolicy="no-referrer"
        />
        <span className="featured-blog-category-badge">{article.category}</span>
      </div>

      {/* Columna derecha: metadatos, título, descripción y acciones. */}
      <div className="featured-blog-txt">
        <div className="featured-blog-meta">
          <span className="font-mono">Por {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span className="featured-blog-reading-time">
            ⏱ {article.readTime}
          </span>
        </div>

        <h2 className="featured-blog-title">{article.title}</h2>
        <p className="featured-blog-desc">
          Analizamos en detalle cómo las nuevas directrices parlamentarias del
          W3C y ECMA están dando forma a flujos ultra-rápidos de descarte de
          fragmentos del DOM sin bloquear el hilo principal. Aprende a dominar
          los bucles asincrónicos modernos con ejemplos prácticos paso a paso.
        </p>

        <div className="featured-blog-actions-bar">
          {/* Botón principal que abre la ficha del artículo destacado. */}
          <Link
            to={`/blog/${FEATURED_ARTICLE_ID}`}
            className="btn btn-primary featured-blog-read-btn"
          >
            Leer Artículo Completo
          </Link>

          {/* Marcador propio del banner: lo guarda para leerlo después. */}
          <button
            id="feat-bookmark-btn"
            type="button"
            onClick={() => toggleBookmark(FEATURED_ARTICLE_ID)}
            className="featured-blog-bookmark-btn"
            title={
              isFeaturedBookmarked
                ? "Guardado en tu lista"
                : "Guardar para lectura posterior"
            }
            style={
              isFeaturedBookmarked
                ? {
                    borderColor: "var(--color-primary)",
                    backgroundColor: "rgba(79, 70, 229, 0.08)",
                  }
                : {
                    borderColor: "var(--color-border)",
                    backgroundColor: "transparent",
                  }
            }
          >
            {isFeaturedBookmarked ? "⭐" : "🔖"}
          </button>
        </div>
      </div>
    </div>
  );
}
