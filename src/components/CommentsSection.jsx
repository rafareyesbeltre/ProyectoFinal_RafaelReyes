/**
 * CommentsSection.jsx — Sección de comentarios de cada artículo.
 *
 * Sirve para mostrar varios logros del curso:
 *   - Lifting state up (Tema 4): el texto que se escribe es estado local del
 *     form, mientras que añadir y borrar comentarios lo hace la página.
 *   - Eventos (Tema 3): texto controlado con onChange, envío con onSubmit y
 *     borrado con onClick.
 *   - Listas (Tema 2): se pintan con .map() y una key única.
 *
 * Está envuelta en React.memo y la página usa useCallback en las funciones:
 * como las props que recibe no cambian de identidad, React evita repintar la
 * sección cuando cambia cualquier otro dato del artículo.
 */

import { memo, useState } from "react";

function CommentsSection({ comments, onAddComment, onDeleteComment }) {
  // El único estado propio es el texto que se está escribiendo.
  const [text, setText] = useState("");

  // Al enviar, se pasa el texto a la página y se vacía el campo.
  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setText("");
  }

  return (
    <section className="comments-section">
      <h3 className="comments-count">
        {/* El contador sale de los comentarios que recibe la sección. */}
        Comentarios ({comments.length})
      </h3>

      {/* El formulario: textarea controlado y envío con onSubmit. */}
      <form className="comments-form" onSubmit={handleSubmit}>
        <textarea
          className="comments-textarea"
          placeholder="Escribe un comentario técnico sobre el artículo..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          aria-label="Escribe un comentario"
        />
        <div className="comments-form-footer">
          <span className="comments-hint">Sé claro y aporta valor a la comunidad.</span>
          <button type="submit" className="btn btn-primary comments-submit">
            Publicar comentario
          </button>
        </div>
      </form>

      {/* Si no hay comentarios se muestra un aviso; si hay, se pintan en una lista. */}
      {comments.length === 0 ? (
        <p className="comments-empty">Sé el primero en dejar un comentario en este artículo.</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <span className="comment-avatar" aria-hidden="true">
                {comment.author.charAt(0).toUpperCase()}
              </span>
              <div className="comment-body">
                <div className="comment-head">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
              {/* Borrar avisa a la página, que descarta ese comentario de la lista. */}
              <button
                type="button"
                className="comment-delete"
                title="Eliminar comentario"
                aria-label={`Eliminar comentario de ${comment.author}`}
                onClick={() => onDeleteComment(comment.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Con React.memo evitamos repintados de más: solo cambia cuando cambian los
// comentarios o las funciones (que la página mantiene estables con useCallback).
export default memo(CommentsSection);