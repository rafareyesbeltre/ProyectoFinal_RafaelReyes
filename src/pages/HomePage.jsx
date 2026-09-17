/**
 * HomePage.jsx — Página principal "/" (antes archive.html).
 *
 * Demuestra el Tema 5 (estados cargando/error/datos):
 *   - Los posts se cargan con useFetch sobre la API simulada mockApi.
 *   - loading → rejilla de tarjetas esqueleto (skeleton).
 *   - error   → caja de error con botón "Reintentar" (refetch).
 *   - datos   → rejilla real de BlogCard + aviso si el filtro no da resultados.
 *
 * El filtro de categorías usa CategoryFilter (presentacional) como ejemplo de
 * lifting state up: el estado activeCategory vive AQUÍ y se pasa al hijo junto
 * con onSelect para actualizarlo.
 */

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { ARTICLES_DATABASE } from "../data/articles";
import { BLOG_CATEGORIES, FEATURED_ARTICLE_ID } from "../utils/constants";
import { fetchBlogPosts } from "../services/mockApi";
import { useFetch } from "../hooks/useFetch";
import BlogCard from "../components/BlogCard";
import FeaturedCard from "../components/FeaturedCard";
import CategoryFilter from "../components/CategoryFilter";

// Cuántas tarjetas esqueleto se muestran mientras se cargan los datos.
const SKELETON_COUNT = 6;

export default function HomePage() {
  // Categoría activa del filtro (lifting state up: la gestiona el padre).
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Carga asíncrona de los posts (mockApi). refetch alimenta "Reintentar".
  const { data: posts, loading, error, refetch } = useFetch(fetchBlogPosts);

  // Título de pestaña específico de esta página (SPA: index.html solo define uno).
  useEffect(() => {
    document.title = "// Blog — Coffee-End";
  }, []);

  // El destacado se lee directamente de la base de datos extendida por su id.
  const featured = ARTICLES_DATABASE[FEATURED_ARTICLE_ID];

  // Filtrado memorizado: solo se recalcula cuando cambia la categoría o los datos.
  const visiblePosts = useMemo(() => {
    if (!posts) return [];
    if (activeCategory === "Todos") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <main>
      {/* HERO: cabecera de bienvenida del blog (siempre visible). */}
      <section className="hero blog-hero-sec" id="blog-hero">
        <div className="container">
          <h1 className="hero-title blog-hero-title">
            Blog de <span>Arquitectura Front-End</span>
          </h1>
          <p className="hero-description hero-desc-centered">
            Artículos profundos, hacks prácticos de depuración, análisis de rendimiento y guías de desarrollo web
            moderno escritas por y para desarrolladores inconformistas.
          </p>
        </div>
      </section>

      {/* ARTÍCULO DESTACADO: banner principal reutilizable. */}
      <section className="featured-blog-section">
        <div className="container">
          <FeaturedCard article={featured} />
        </div>
      </section>

      {/* FILTROS: hijo presentacional; el estado vive aquí (lifting up). */}
      <section className="filter-bar blog-search-bar-sec" id="blog-search-bar">
        <div className="container">
          <div className="blog-search-flex-row">
            <CategoryFilter
              categories={BLOG_CATEGORIES}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>
        </div>
      </section>

      {/* REJILLA con los 3 estados de carga (renderizado condicional). */}
      <section className="blog-grid-section">
        <div className="container">
          <div className="w-full">
            {loading && (
              <div className="blog-posts-grid-style" aria-label="Cargando artículos">
                {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                  <div key={index} className="blog-card skeleton-card">
                    <div className="skeleton-line skeleton-img" />
                    <div className="blog-card-body">
                      <div className="skeleton-line w-60" />
                      <div className="skeleton-line w-90" />
                      <div className="skeleton-line w-80" />
                      <div className="skeleton-line w-40" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="fetch-error-box" role="alert">
                <span className="fetch-error-title">⚠ No pudimos cargar los artículos</span>
                <p>{String(error.message || error)}</p>
                <button type="button" className="btn btn-primary fetch-error-btn" onClick={refetch}>
                  Reintentar
                </button>
              </div>
            )}

            {!loading && !error && visiblePosts.length === 0 && (
              <p className="fetch-empty-state">No hay artículos publicados en la categoría «{activeCategory}».</p>
            )}

            {!loading && !error && visiblePosts.length > 0 && (
              <div className="blog-posts-grid-style" id="blog-posts-grid">
                {visiblePosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}