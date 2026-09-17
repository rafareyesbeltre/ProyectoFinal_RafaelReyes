/**
 * DetallePage.jsx — Página de detalle de un artículo "blog.html?id=...".
 *
 * Además de renderizar el artículo, esta página es el "banco de pruebas" de
 * varios temas de la rúbrica:
 *   - Tema 3 (arrays en estado): los comentarios se guardan en estado; añadir
 *     usa spread y eliminar usa .filter().
 *   - Tema 4 (lifting state up + separación): CommentsSection es presentacional
 *     y recibe onAddComment/onDeleteComment como callbacks desde aquí.
 *   - Tema 5 (3 estados + useEffect): el artículo se carga con useFetch sobre
 *     mockApi → cargando (skeleton) / error (reintento) / datos (o no encontrado).
 *   - Tema 6 (useCallback justificado): los handlers de comentarios son estables
 *     por identidad para que React.memo de CommentsSection evite re-renders.
 *
 * Los comentarios persisten por artículo en localStorage (coffee_end_comments_<id>)
 * mediante useLocalStorageState.
 */

import { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticleDetail } from "../services/mockApi";
import { useFetch } from "../hooks/useFetch";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { buildSeedComments } from "../data/comments";
import { COMMENTS_STORAGE_PREFIX } from "../utils/constants";
import { getCategoryBadgeStyle, getTagInfo } from "../utils/articleUtils";
import CommentsSection from "../components/CommentsSection";

export default function DetallePage() {
  // id de la URL: /blog/:id. Ej. /blog/nuevo-paradigma-coffee-end.
  const { id } = useParams();

  // Carga asíncrona del artículo + 3 recomendados ([] de deps relanza con id).
  const { data, loading, error, refetch } = useFetch(() => fetchArticleDetail(id), [id]);
  const article = data ? data.article : null;
  const recommendations = data ? data.recommendations : [];

  // Comentarios del artículo: estado sincronizado con localStorage. El valor
  // inicial son 2 comentarios semilla (solo si no hay nada guardado todavía).
  const [comments, setComments] = useLocalStorageState(`${COMMENTS_STORAGE_PREFIX}${id}`, () =>
    buildSeedComments(id)
  );

  // --- Operaciones sobre el array de comentarios (Tema 3) -----------------
  // Añadir: se crea un comentario nuevo y se antepone al array (spread).
  const onAddComment = useCallback(
    (text) => {
      const nuevo = {
        id: `c_${id}_${Date.now()}`,
        author: "Tú",
        date: "Ahora",
        text,
      };
      setComments((prev) => [nuevo, ...prev]);
    },
    [id, setComments]
  );

  // Eliminar: .filter() conserva todo menos el id borrado (operación requerida).
  const onDeleteComment = useCallback(
    (commentId) => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    },
    [setComments]
  );

  // Scroll-spy del menú lateral (0 secciones si aún no hay artículo cargado).
  useScrollSpy(article ? article.sections.length : 0);

  // Al entrar o cambiar de artículo: scroll arriba + título de pestaña.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = article ? `${article.title} — Coffee-End` : "Cargando artículo — Coffee-End";
  }, [id, article]);

  // --- ESTADO DE CARGA (Tema 5): skeleton mientras llegan los datos. ------
  if (loading) {
    return (
      <main className="articulo-main-cnt">
        <div className="container" style={{ padding: "120px 24px" }}>
          <div className="skeleton-line w-40" />
          <div className="skeleton-line w-90" style={{ height: "28px", margin: "18px 0" }} />
          <div className="skeleton-line skeleton-img" style={{ height: "380px", marginTop: "18px" }} />
        </div>
      </main>
    );
  }

  // --- ESTADO DE ERROR: caja con reintento (refetch). ----------------------
  if (error) {
    return (
      <main className="articulo-main-cnt">
        <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
          <div className="fetch-error-box" role="alert">
            <span className="fetch-error-title">⚠ No pudimos cargar el artículo</span>
            <p>{String(error.message || error)}</p>
            <button type="button" className="btn btn-primary fetch-error-btn" onClick={refetch}>
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  // --- DATOS: artículo inexistente → estado "no encontrado", con retorno. ---
  if (!article) {
    return (
      <main>
        <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", marginBottom: "12px", fontFamily: "var(--font-display)" }}>
            Artículo Académico no Encontrado
          </h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto 32px auto" }}>
            La lectura a la que intentas ingresar ha sido archivada, reubicada o el código ID es inconsistente.
          </p>
          <Link to="/" className="btn btn-primary">
            Volver al Blog Técnico de DevAcademy
          </Link>
        </div>
      </main>
    );
  }

  // Estilo inline del badge de categoría (colores CSS/HTML/JS del estático).
  const badgeStyle = getCategoryBadgeStyle(article.category);

  return (
    <main className="articulo-main-cnt">
      {/* MIGA DE PAN: breadcrumb de navegación interna. */}
      <div className="container articulo-breadcrumb-container">
        <div className="articulo-breadcrumb-row">
          <Link to="/" className="articulo-breadcrumb-link">
            Articulo
          </Link>
          <span>/</span>
          <span className="articulo-breadcrumb-current-item">{article.title}</span>
        </div>
      </div>

      {/* HERO DEL ARTÍCULO: category, autor, fecha, lectura y portada. */}
      <section className="articulo-detail-hero-sec">
        <div className="container">
          <div className="articulo-detail-meta-row">
            <span className="articulo-detail-meta-badge" style={badgeStyle}>
              {article.category.toUpperCase()}
            </span>
            <span>•</span>
            <span>Por {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span className="articulo-read-time-meta">⏱ {article.readTime}</span>
          </div>

          <h1 className="articulo-detail-headline-title">{article.title}</h1>

          <div className="articulo-detail-img-wrapper">
            <img src={article.image} alt={article.title} className="articulo-detail-img" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* CONTENIDO: columna izquierda = índice con scroll-spy; derecha = texto.
          Los <span id="anchor-N"> son los marcadores sobre los que salta el
          índice (scroll-behavior smooth del CSS). */}
      <section className="articulo-content-section">
        <div className="container">
          <div className="wrapper-article">
            <div id="article-menu-lateral" className="menu-lateral">
              {article.sections.map((sec, index) => (
                <a
                  key={sec.title}
                  href={`#anchor-${index}`}
                  className={`menu-lateral_link tipo-body-m${index === 0 ? " menu-lateral_link--active" : ""}`}
                >
                  {sec.title}
                </a>
              ))}
            </div>

            <div className="wrapper-derecha">
              <div className="post-content padding-15px">
                <div className="post-content_richtext">
                  {article.sections.map((sec, index) => (
                    <div key={sec.title} style={{ marginBottom: "40px" }}>
                      <h2>
                        {sec.title}
                        <span id={`anchor-${index}`} className="anchor-span" />
                      </h2>
                      {/* El contenido del artículo proviene de los datos locales
                          del proyecto (HTML propio), no de entrada de usuario. */}
                      <div dangerouslySetInnerHTML={{ __html: sec.content }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA final: enlaces reales a las páginas de la SPA. */}
              <div className="articulo-cta-card">
                <div className="emoji-heading-big">💡</div>
                <h4 className="articulo-cta-card-heading">¿Te gustaría seguir aprendiendo sobre este tema?</h4>
                <p className="articulo-cta-card-p">
                  Únete a nuestra comunidad de desarrolladores para acceder a artículos exclusivos, discusiones
                  técnicas y recibir contenido nuevo directamente en tu correo cada semana.
                </p>
                <div className="articulo-cta-card-buttons">
                  <Link to="/comunidad" className="btn btn-primary btn-med-padding">
                    Unirme a la Comunidad
                  </Link>
                  <Link to="/newsletter" className="btn btn-secondary btn-med-padding">
                    Suscribirme al Newsletter
                  </Link>
                </div>
              </div>

              {/* COMENTARIOS: hijo presentacional, callbacks desde el padre. */}
              <CommentsSection comments={comments} onAddComment={onAddComment} onDeleteComment={onDeleteComment} />
            </div>
          </div>
        </div>
      </section>

      {/* RECOMENDADOS: previews de otros artículos + acceso al listado. */}
      <section className="blog-preview-section" id="explora-blog">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recomendados para ti</h2>
            <p className="section-subtitle">Sumergete en el mundo de la programación</p>
          </div>

          <div className="blog-preview-grid">
            {recommendations.map((post) => {
              const tag = getTagInfo(post.category);
              return (
                <article key={post.id} className="blog-preview-card-item">
                  <div className="blog-preview-img-wrap">
                    <img src={post.image} alt={post.title} className="blog-preview-img" loading="lazy" />
                    {tag.previewBadgeClass && <span className={tag.previewBadgeClass}>{tag.label}</span>}
                  </div>
                  <div className="blog-preview-body">
                    <div>
                      <div className="blog-preview-meta">
                        <span>Por {post.author}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="blog-preview-title">{post.title}</h3>
                      <p className="blog-preview-desc">{post.excerpt}</p>
                    </div>
                    <Link to={`/blog/${post.id}`} className="btn btn-outline blog-preview-btn-read">
                      Leer artículo ⚡
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="blog-preview-center-btn">
            <Link to="/" className="btn btn-primary blog-preview-more-btn">
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}