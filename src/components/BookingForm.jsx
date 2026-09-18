/**
 * BookingForm.jsx — Tarjeta con el formulario para agendar una mentoría.
 *
 * Es un componente de presentación: no guarda nada por su cuenta. Recibe los
 * valores de los campos, la fecha mínima, el contador de caracteres y el
 * resultado del último envío; todo cambio se avisa al padre con onChange.
 */

import { MENTOR_INSTRUCTORES, MENTOR_OBJETIVOS, MENTOR_HORARIOS } from "../utils/constants";

// Estilos del aviso de éxito y de error (verde y rojo del tema).
const FEEDBACK_STYLES = {
  success: {
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    color: "var(--color-success)",
    border: "1px solid rgba(16, 185, 129, 0.2)",
  },
  error: {
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    color: "var(--color-danger)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
};

export default function BookingForm({ values, minDate, charCount, feedback, onChange, onSubmit }) {
  return (
    <div className="feed-column booking-card-left">
      <h3 className="booking-h3">
        <span>🗓️</span> Programar Nueva Asesoría
      </h3>
      <p className="booking-p">
        Completa de manera fidedigna los datos solicitados. Un instructor revisará tu descripción del problema antes
        de habilitar la sala interactiva de depuración de código.
      </p>

      {/* Aviso de éxito o de error del último envío. */}
      <div
        className={`booking-feedback${feedback ? " display-block" : " display-none"}`}
        style={feedback ? FEEDBACK_STYLES[feedback.type] : undefined}
      >
        {feedback ? feedback.content : null}
      </div>

      <form className="booking-flex-form" onSubmit={onSubmit} noValidate>
        <div className="booking-grid-row">
          <div className="form-group booking-form-grp">
            <label htmlFor="booking-name" className="form-label booking-label">
              Tu Nombre Completo *
            </label>
            <input
              type="text"
              id="booking-name"
              className="form-input booking-input-styled"
              placeholder="Ej. Alejandra Valera"
              value={values.name}
              onChange={(event) => onChange("name", event.target.value)}
              required
            />
          </div>

          <div className="form-group booking-form-grp">
            <label htmlFor="booking-email" className="form-label booking-label">
              Correo Electrónico Académico *
            </label>
            <input
              type="email"
              id="booking-email"
              className="form-input booking-input-styled"
              placeholder="Ej. alejandra@devacademy.edu"
              value={values.email}
              onChange={(event) => onChange("email", event.target.value)}
              required
            />
          </div>
        </div>

        <div className="booking-grid-row">
          <div className="form-group booking-form-grp">
            <label htmlFor="booking-mentor" className="form-label booking-label">
              Instructor Senior *
            </label>
            <select
              id="booking-mentor"
              className="form-select booking-input-styled"
              value={values.mentor}
              onChange={(event) => onChange("mentor", event.target.value)}
              required
            >
              <option value="">Selecciona un tutor...</option>
              {MENTOR_INSTRUCTORES.map((mentor) => (
                <option key={mentor} value={mentor}>
                  {mentor}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group booking-form-grp">
            <label htmlFor="booking-type" className="form-label booking-label">
              Objetivo de la Sesión *
            </label>
            <select
              id="booking-type"
              className="form-select booking-input-styled"
              value={values.type}
              onChange={(event) => onChange("type", event.target.value)}
              required
            >
              <option value="">Selecciona una opción...</option>
              {MENTOR_OBJETIVOS.map((objetivo) => (
                <option key={objetivo.value} value={objetivo.value}>
                  {objetivo.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="booking-grid-row-unequal">
          <div className="form-group booking-form-grp">
            <label htmlFor="booking-date" className="form-label booking-label">
              Fecha de la Cita *
            </label>
            <input
              type="date"
              id="booking-date"
              className="form-input booking-input-styled"
              min={minDate}
              value={values.date}
              onChange={(event) => onChange("date", event.target.value)}
              required
            />
          </div>

          <div className="form-group booking-form-grp">
            <label htmlFor="booking-time" className="form-label booking-label">
              Horario Disponible *
            </label>
            <select
              id="booking-time"
              className="form-select booking-input-styled"
              value={values.time}
              onChange={(event) => onChange("time", event.target.value)}
              required
            >
              <option value="">Seleccionar hora...</option>
              {MENTOR_HORARIOS.map((horario) => (
                <option key={horario.value} value={horario.value}>
                  {horario.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group booking-form-grp">
          <div className="booking-textarea-row">
            <label htmlFor="booking-details" className="form-label booking-label">
              Describe el bug o tema exacto a resolver *
            </label>
            <span
              className="char-counter-mono"
              style={{ color: charCount >= 15 ? "var(--color-success)" : "var(--color-muted)" }}
            >
              {charCount}/15
            </span>
          </div>
          <textarea
            id="booking-details"
            className="form-textarea booking-textarea-styled"
            placeholder="Explica de manera concisa tu duda con el código o copia el error de tu pantalla (mínimo 15 caracteres)..."
            value={values.details}
            onChange={(event) => onChange("details", event.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary booking-submit-btn">
          Agendar e Inscribir Mentoría Académica
        </button>
      </form>
    </div>
  );
}
