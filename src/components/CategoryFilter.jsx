/**
 * CategoryFilter.jsx — Componente PRESENTACIONAL del filtro de categorías.
 *
 * Recibe todo por props (no maneja estado interno):
 *   - categories:      lista {id, label} a pintar como botones.
 *   - activeCategory:  categoría seleccionada (decidida por el PADRE).
 *   - onSelect:        callback (lifting state up) que el padre usa para
 *                      actualizar su estado al pulsar un botón.
 *
 * Es el ejemplo explícito de LIFTING STATE UP del Tema 4: el hijo no guarda
 * la categoría, la solicita recién de su padre, que es quien "levanta" el dato.
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
          // Llama al callback del padre informándole de qué categoría se pulsó.
          onClick={() => onSelect(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}