/**
 * MentorBooking.jsx — Sección para agendar mentorías (isla "Sin API").
 *
 * Aquí vive toda la lógica: el formulario, la lista de citas guardadas en
 * localStorage y el alta/baja de reservas. Los componentes hijos solo pintan.
 *
 * Tema 6: useLocalStorageState se encarga de leer y guardar las citas, así que
 * al recargar la página no se pierde nada.
 */

import { useEffect, useRef, useState } from "react";
import BookingForm from "./BookingForm";
import BookingTicket from "./BookingTicket";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { DEFAULT_BOOKINGS, MENTORIAS_STORAGE_KEY } from "../utils/constants";

// Campos vacíos con los que arranca el formulario.
const EMPTY_FORM = {
  name: "",
  email: "",
  mentor: "",
  type: "",
  date: "",
  time: "",
  details: "",
};

export default function MentorBooking() {
  // Datos del formulario (Tema 3: estado controlado).
  const [values, setValues] = useState(EMPTY_FORM);
  // Aviso del último envío: null, éxito o error.
  const [feedback, setFeedback] = useState(null);

  // Citas guardadas en el navegador (Tema 6). Si no hay nada, parte del ejemplo.
  const [bookings, setBookings] = useLocalStorageState(MENTORIAS_STORAGE_KEY, DEFAULT_BOOKINGS);

  // Referencia a la lista para bajar hasta ella al reservar.
  const listRef = useRef(null);

  // El aviso de éxito se oculta solo a los 7 segundos.
  useEffect(() => {
    if (!feedback || feedback.type !== "success") return;

    const timer = window.setTimeout(() => setFeedback(null), 7000);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  // Un solo manejador para todos los campos: se le pasa el nombre y el nuevo valor.
  function handleChange(field, value) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  // Alta de la cita tras validar los campos del formulario (Tema 3).
  function handleSubmit(event) {
    event.preventDefault();

    const name = values.name.trim();
    const email = values.email.trim();
    const { mentor, type, date, time } = values;
    const details = values.details.trim();

    setFeedback(null);

    if (!name) {
      return setFeedback({ type: "error", content: "Por favor indica tu nombre completo." });
    }
    if (!email || !email.includes("@")) {
      return setFeedback({
        type: "error",
        content: "Por favor especifica un correo electrónico académico válido.",
      });
    }
    if (!mentor) {
      return setFeedback({ type: "error", content: "Por favor escoge un instructor para tu mentoría." });
    }
    if (!type) {
      return setFeedback({
        type: "error",
        content: "Elige un objetivo válido para estructurar la videollamada.",
      });
    }
    if (!date) {
      return setFeedback({
        type: "error",
        content: "Por favor especifica la fecha en la que deseas la tutoría.",
      });
    }
    if (!time) {
      return setFeedback({
        type: "error",
        content: "Por favor selecciona el horario disponible conveniente.",
      });
    }
    if (!details || details.length < 15) {
      return setFeedback({
        type: "error",
        content:
          "La descripción del bug o tema técnico es indispensable y requiere al menos 15 caracteres descriptivos.",
      });
    }

    const newBooking = {
      id: `booking_${Date.now()}`,
      name,
      email,
      mentor,
      type,
      date,
      time,
      details,
      status: "Confirmada",
    };

    // Se añade la nueva cita al final de la lista.
    setBookings((previous) => [...previous, newBooking]);

    setFeedback({
      type: "success",
      content: (
        <>
          ✔ <strong>¡Reserva Confirmada de Extremo a Extremo!</strong> Tu tutoría con <strong>{mentor}</strong> ha
          sido agendada con éxito para el <strong>{date}</strong> a las <strong>{time}</strong>. Ya puedes copiar el
          enlace directo de tu sala de videollamada.
        </>
      ),
    });

    // Formulario listo para la siguiente reserva.
    setValues(EMPTY_FORM);

    // Baja hasta la agenda para ver la cita recién creada.
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Baja de una cita: se pide confirmación y se quita de la lista.
  function handleCancel(bookingId) {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas cancelar de manera definitiva tu cita de mentoría? Esta acción liberará el cupo disponible."
    );
    if (!confirmed) return;

    setBookings((previous) => previous.filter((booking) => booking.id !== bookingId));
  }

  // Fecha mínima que acepta el selector: hoy.
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <section className="booking-section">
      <div className="container">
        <div className="community-layout">
          {/* Columna izquierda: formulario de reserva. */}
          <BookingForm
            values={values}
            minDate={minDate}
            charCount={values.details.length}
            feedback={feedback}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          {/* Columna derecha: seguimiento de las citas. */}
          <div className="sidebar-column">
            <div className="booking-card-right-agenda">
              <h3 className="booking-agenda-h3">
                <span>📋 Agenda de Sesiones</span>
                <span className="booking-agenda-badge">
                  {bookings.length} {bookings.length === 1 ? "activa" : "activas"}
                </span>
              </h3>

              <div ref={listRef} className="booking-agenda-list">
                {bookings.length === 0 ? (
                  <div className="booking-agenda-empty">
                    <p className="booking-agenda-empty__title">No tienes citas agendadas</p>
                    <p className="booking-agenda-empty__text">
                      Usa el formulario para reservar tu primera videollamada con un tutor experto.
                    </p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <BookingTicket key={booking.id} booking={booking} onCancel={handleCancel} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
