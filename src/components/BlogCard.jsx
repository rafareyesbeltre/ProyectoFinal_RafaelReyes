/**
 * BlogCard.jsx — Tarjeta resumen de un artículo.
 *
 * Reutilizable tanto en la home (rejilla principal) como en cualquier otra
 * vista que liste posts. Replica el <article> generado en archive.html:
 * imagen + tag de categoría, metadatos (autor/fecha), título, extracto,
 * tiempo de lectura, botón "Leer" y el marcador de favorito (🔖/⭐).
 */

import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import { getTagInfo } from "../utils/articleUtils";

export default function BlogCard({ post }) {
  // Lee del contexto global si este post está marcado y el toggle para cambiarlo.
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(post.id);

  // Clases del tag (CSS/HTML/JS/CARRERA) según la categoría del post.
  const tag = getTagInfo(post.category);

  return (
    // id y data-category se conservan por compatibilidad con el estático.
    <article
      className="blog-card blog-card-element"
      id={`card_${post.id}`}
      data-category={post.category}
    >
      <div className="blog-card-img-wrapper">
        <img
          src={post.image}
          alt={post.title}
          className="blog-card-img"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <span className={`blog-tag ${tag.badgeClass}`}>{tag.label}</span>
      </div>

      <div className="blog-card-body">
        <div className="blog-card-meta-row">
          <span>Por {post.author}</span>
          <span>{post.date}</span>
        </div>
        <h3 className="blog-card-title-heading">{post.title}</h3>
        {/* El extracto se muestra entre comillas como en el diseño original. */}
        <p className="blog-card-desc-paragraph">"{post.excerpt}"</p>

        <div className="blog-card-footer-bar">
          <span className="blog-card-reading-time">
            ⏱ {post.readTime} lect.
          </span>
          <div className="display-flex gap-2">
            {/* Enlace interno del React Router hacia el detalle del artículo. */}
            <Link to={`/blog/${post.id}`} className="btn blog-card-read-btn">
              Leer
            </Link>

            {/* Toggle de favorito: alterna el id del post y pinta el icono +
                estilos inline según el estado (igual que renderArticles() de blog.js). */}
            <button
              type="button"
              className="bookmark-btn-custom bookmark-btn-custom-styled"
              onClick={() => toggleBookmark(post.id)}
              title={bookmarked ? "Quitar guardado" : "Guardar lectura"}
              style={
                bookmarked
                  ? {
                      background: "rgba(79, 70, 229, 0.08)",
                      borderColor: "var(--color-primary)",
                    }
                  : {
                      background: "transparent",
                      borderColor: "var(--color-border)",
                    }
              }
            >
              <span className="bookmark-icon">{bookmarked ? "⭐" : "🔖"}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
