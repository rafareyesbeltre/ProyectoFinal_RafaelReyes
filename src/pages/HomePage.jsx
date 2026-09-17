/**
 * HomePage.jsx — Página principal ("/").
 *
 * Demuestra el Tema 5 (estados cargando/error/datos):
 *   - Los artículos se cargan con useFetch sobre la API simulada mockApi.
 *   - loading → rejilla de tarjetas esqueleto.
 *   - error   → caja de error con botón "Reintentar".
 *   - datos   → rejilla real de BlogCard + aviso si el filtro no da resultados.
 *
 * El filtro es un buen ejemplo de lifting state up: la categoría activa vive
 * aquí y se pasa al hijo CategoryFilter junto con la función que la actualiza.
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

// Cuántas tarjetas vacías se muestran mientras llegan los datos.
const SKELETON_COUNT = 6;

export default function HomePage() {
  // Categoría del filtro elegida (el estado vive aquí, en la página).
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Los artículos se cargan con useFetch; refetch sirve para "Reintentar".
  const { data: posts, loading, error, refetch } = useFetch(fetchBlogPosts);

  // Título de la pestaña para esta página.
  useEffect(() => {
    document.title = "// Blog — Coffee-End";
  }, []);

  // El artículo destacado se toma de la base de datos por su id.
  const featured = ARTICLES_DATABASE[FEATURED_ARTICLE_ID];

  // El filtrado solo se recalcula cuando cambia la categoría o los datos.
  const visiblePosts = useMemo(() => {
    if (!posts) return [];
    if (activeCategory === "Todos") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <main>
      {/* Cabecera de bienvenida del blog. */}
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

      {/* Banner del artículo destacado. */}
      <section className="featured-blog-section">
        <div className="container">
          <FeaturedCard article={featured} />
        </div>
      </section>

      {/* Filtro: el componente no guarda estado; la página decide la categoría. */}
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

      {/* Rejilla con los tres estados: cargando, error o datos. */}
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