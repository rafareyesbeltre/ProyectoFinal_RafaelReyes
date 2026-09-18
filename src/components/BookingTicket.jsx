/**
 * BookingTicket.jsx — Tarjeta de una cita ya agendada.
 *
 * Solo pinta los datos que recibe y avisa al padre cuando se pulsa "Cancelar".
 */

import { MENTOR_COLORS, buildRoomUrl } from "../utils/constants";

export default function BookingTicket({ booking, onCancel }) {
  // Cada instructor tiene su color de línea; si no lo conocemos, usamos el primario.
  const colorLine = MENTOR_COLORS[booking.mentor] || "var(--color-primary)";
  // Sala guardada o, si no hay, una generada a partir del nombre del instructor.
  const roomUrl = booking.room || buildRoomUrl(booking.mentor);

  return (
    <div className="booking-ticket animate-scale-up">
      <div className="booking-ticket__body" style={{ borderLeftColor: colorLine }}>
        <div className="booking-ticket__head">
          <span className="booking-ticket__status">● {booking.status}</span>
          <span className="booking-ticket__time">{booking.time}</span>
        </div>

        <h4 className="booking-ticket__mentor">Tutor: {booking.mentor}</h4>
        <p className="booking-ticket__type">{booking.type}</p>

        <p className="booking-ticket__details">"{booking.details}"</p>

        <div className="booking-ticket__footer">
          <small className="booking-ticket__date">
            Fecha: <strong>{booking.date}</strong>
          </small>
          <div className="booking-ticket__actions">
            <a href={roomUrl} target="_blank" rel="noreferrer" className="booking-ticket__room">
              🔗 Sala Live
            </a>
            <button type="button" className="booking-ticket__cancel" onClick={() => onCancel(booking.id)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
