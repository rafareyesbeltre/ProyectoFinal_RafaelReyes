/**
 * BookingTicket.jsx — Tarjeta de una cita ya agendada.
 *
 * Solo pinta los datos que recibe y avisa al padre cuando se pulsa "Cancelar".
 */

import { DISCORD_INVITE_URL, MENTOR_COLORS } from "../utils/constants";

export default function BookingTicket({ booking, onCancel }) {
  // Cada instructor tiene su color de línea; si no lo conocemos, usamos el primario.
  const colorLine = MENTOR_COLORS[booking.mentor] || "var(--color-primary)";
  // Todas las sesiones se abren en el mismo servidor de Discord.
  const roomUrl = DISCORD_INVITE_URL;

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
