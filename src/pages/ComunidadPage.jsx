/**
 * ComunidadPage.jsx — Página "/comunidad".
 *
 * La sección sigue el tema global: en claro usa fondo y tarjetas claras, y en
 * oscuro recupera el gradiente (html[data-theme="dark"] en style.css).
 */

import { useEffect } from "react";
import MentorBooking from "../components/MentorBooking";

export default function ComunidadPage() {

  // Título de la pestaña para esta página.
  useEffect(() => {
    document.title = "// Comunidad — Coffee-End";
  }, []);

  return (
    <main>
      <section className="comunidad-discord">
        <div className="comunidad-discord__contenedor">
          {/* Cabecera de presentación de la comunidad. */}
          <div className="comunidad-discord__cabecera">
            <span className="comunidad-discord__etiqueta">// Comunidad</span>
            <h1 className="comunidad-discord__titulo">
              Únete a la <span className="comunidad-discord__titulo--resaltado">Comunidad Oficial</span> de Coffee-End
            </h1>
            <p className="comunidad-discord__descripcion">
              No somos simplemente una plataforma de cursos; somos un ecosistema vivo de desarrolladores Front-End
              reunidos en Discord para aprender, compartir dudas, y crecer juntos como mentores y profesionales.
            </p>
          </div>

          {/* Tarjeta con los beneficios y, a la derecha, las estadísticas y el botón. */}
          <div className="comunidad-discord__tarjeta">
            <div className="comunidad-discord__columna-info">
              <h2 className="comunidad-discord__subtitulo">¿Qué vas a encontrar dentro?</h2>

              <ul className="comunidad-discord__detalles">
                <li className="comunidad-discord__detalle-item">
                  <span className="comunidad-discord__icono-check">✓</span>
                  <div>
                    <strong className="comunidad-discord__titulo-detalle">Tutorías Asíncronas y Soporte</strong>
                    <span>Canales de ayuda dedicados con tutores experimentados y compañeros listos para resolver bugs de código.</span>
                  </div>
                </li>
                <li className="comunidad-discord__detalle-item">
                  <span className="comunidad-discord__icono-check">✓</span>
                  <div>
                    <strong className="comunidad-discord__titulo-detalle">Desafíos de Código Semanales</strong>
                    <span>Participa en retos prácticos de diseño responsivo y lógica JS para ganar insignias y ganar experiencia real.</span>
                  </div>
                </li>
                <li className="comunidad-discord__detalle-item">
                  <span className="comunidad-discord__icono-check">✓</span>
                  <div>
                    <strong className="comunidad-discord__titulo-detalle">Networking y Empleo Profesional</strong>
                    <span>Canales exclusivos de bolsas de trabajo, revisión experta de portafolios de diseño y consejos de entrevistas técnicas.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="comunidad-discord__columna-accion">
              <div className="comunidad-discord__estadisticas">
                <span className="comunidad-discord__estado-online">
                  <span className="comunidad-discord__punto"></span> 1.240 En Línea
                </span>
                <span className="comunidad-discord__estado-miembros">● 8.420 Miembros</span>
              </div>

              {/* Acceso directo a Discord (se abre en una pestaña nueva). */}
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="comunidad-discord__enlace-unirse">
                💬 Ingresar al Servidor de Discord
              </a>

              <p className="comunidad-discord__small-text">
                El acceso es 100% gratuito para todos los estudiantes registrados y amantes del código limpio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda de mentorías: reserva y lista de citas guardadas en el navegador. */}
      <MentorBooking />
    </main>
  );
}