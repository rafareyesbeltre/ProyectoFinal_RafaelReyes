/**
 * CategoryFilter.jsx — Filtro de categorías (solo presenta, no guarda estado).
 *
 * Todo entra por props:
 *   - categories:      lista {id, label} que se muestra como botones.
 *   - activeCategory:  categoría elegida (la decide la página).
 *   - onSelect:        función que avisa a la página al pulsar un botón.
 *
 * Es el ejemplo de "lifting state up" del Tema 4: este componente no recuerda
 * la categoría, se la pide al padre, que es quien conserva la elección.
 */
export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="blog-search-categories">
      <span className="blog-search-cat-label">Filtrar Categorías:</span>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`filter-btn filter-btn-padding${activeCategory === cat.id ? " active" : ""}`}
          // Avisa a la página de que se eligió otra categoría.
          onClick={() => onSelect(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}