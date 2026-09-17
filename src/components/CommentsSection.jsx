/**
 * CommentsSection.jsx — Sección de comentarios (presentacional, memoizada).
 *
 * Demuestra varios temas de la rúbrica a la vez:
 *   - lifting state up (Tema 4): el texto escrito es estado LOCAL del form,
 *     pero añadir/eliminar comentarios llama a callbacks del padre
 *     (onAddComment / onDeleteComment).
 *   - Eventos (Tema 3): texto controlado con onChange, envío con onSubmit,
 *     borrado con onClick.
 *   - Listas dinámicas (Tema 2): render con .map() y prop key única.
 *
 * Se envuelve en React.memo + el padre usa useCallback en los handlers:
 * como las props de función mantienen identidad estable, React puede evitar
 * re-renderizar la sección cuando cambia cualquier otro estado del artículo.
 */

import { memo, useState } from "react";

function CommentsSection({ comments, onAddComment, onDeleteComment }) {
  // Solo el texto del formulario es estado interno del componente hijo.
  const [text, setText] = useState("");

  // Envío del formulario: se "eleva" el texto al padre y se limpia el campo.
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
        {/* Comentarios (n): el contador se calcula desde los datos del padre. */}
        Comentarios ({comments.length})
      </h3>

      {/* FORMULARIO: textarea controlado + submit (evento onSubmit). */}
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

      {/* LISTA (renderizado condicional): mensaje si no hay comentarios. */}
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
              {/* Borrado: invoca el callback del padre (que usa .filter()). */}
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

// React.memo: solo re-renderiza si cambian los comentarios o las funciones
// (mantenidas estables con useCallback en el padre).
export default memo(CommentsSection);