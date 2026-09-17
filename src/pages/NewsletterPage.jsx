/**
 * NewsletterPage.jsx — Página "/newsletter".
 *
 * Formulario de suscripción con persistencia en localStorage:
 *   - El email guardado se precarga en el input al entrar.
 *   - Al enviar se guarda y se muestra el panel de éxito con una pequeña
 *     transición de opacidad (estado `fading`), igual que el estático.
 * La sección responde al tema global: en claro usa fondo claro y tarjeta
 * blanca; en oscuro recupera su gradiente original (html[data-theme="dark"]
 * en style.css).
 *
 * readSavedEmail es una función independiente del componente y se pasa a
 * useState como inicializador perezoso (solo corre una vez, no en cada render).
 * El try/catch evita romper la app si localStorage no está disponible (SSR).
 */

import { useEffect, useState } from "react";
import { NEWSLETTER_STORAGE_KEY } from "../utils/constants";

// Lee el email guardado (vacío si nunca hubo o si el almacenamiento no existe).
function readSavedEmail() {
  try {
    return localStorage.getItem(NEWSLETTER_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export default function NewsletterPage() {
  // Email escrito en el input (precargado con el guardado).
  const [email, setEmail] = useState(readSavedEmail);
  // Email suscrito tras el envío; null mientras no se haya enviado nada.
  const [subscribedEmail, setSubscribedEmail] = useState(null);
  // Controla el fundido (fade) entre formulario y pantalla de éxito.
  const [fading, setFading] = useState(false);

  // Título de pestaña específico de esta página.
  useEffect(() => {
    document.title = "// Newsletter — Coffee-End";
  }, []);

  // Envío: guarda en localStorage, funde el formulario y muestra el éxito.
  function handleSubmit(event) {
    event.preventDefault();

    const emailValue = email.trim();
    if (!emailValue) return;

    localStorage.setItem(NEWSLETTER_STORAGE_KEY, emailValue);

    // Fade-out (250 ms) → intercambio de paneles → fade-in del estado de éxito.
    setFading(true);
    window.setTimeout(() => {
      setSubscribedEmail(emailValue);
      setFading(false);
    }, 250);
  }

  // "Suscribir otra dirección": vacía estado y email guardado para reintentar.
  function handleReset() {
    setEmail("");
    setSubscribedEmail(null);
    setFading(false);
  }

  // Muestra por turnos formulario o panel de éxito según subscribedEmail.
  const formClassName = `flex flex-col gap-6${subscribedEmail ? " display-none" : ""}`;
  const successClassName = `newsletter-centrada__exito${subscribedEmail ? " display-flex" : " display-none"}`;

  return (
    <main>
      <section className="seccion-newsletter">
        <div className="container">
          <div className="newsletter-centrada">
            <span className="newsletter-centrada__etiqueta">// Newsletter</span>
            <h1 className="newsletter-centrada__titulo">Mantente al día con el mejor código</h1>
            <p className="newsletter-centrada__descripcion">
              Únete a más de 10.000 programadores Front-End. Recibe trucos prácticos semanales, tutoriales semánticos de
              CSS/JS, recursos gratis y análisis sin rodeos directamente en tu email.
            </p>

            <div className="newsletter-centrada__tarjeta">
              {/* FORMULARIO DE SUSCRIPCIÓN: email + checkbox de privacidad. */}
              <form
                id="newsletter-form"
                className={formClassName}
                onSubmit={handleSubmit}
                style={{ transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)", opacity: fading ? 0 : 1 }}
              >
                <div>
                  <h3 className="newsletter-centrada__form-titulo">Suscripción Gratuita</h3>
                  <p className="newsletter-centrada__form-subtitulo">
                    Únete de forma limpia. Cero spam, baja con un solo clic cuando lo desees.
                  </p>
                </div>

                <div className="newsletter-centrada__campo-grupo">
                  <input
                    type="email"
                    id="subscriber-email"
                    className="newsletter-centrada__input"
                    placeholder="Introduce tu dirección de correo"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-centrada__boton">
                    Registrarme
                  </button>
                </div>

                <label className="newsletter-centrada__checkbox-label">
                  <input type="checkbox" required className="newsletter-centrada__checkbox" />
                  <span>
                    Acepto la{" "}
                    <a
                      href="#"
                      onClick={() => {
                        // Enlace sin destino en el original; se mantiene el alert
                        // para no añadir una página inexistente.
                        alert("Política de privacidad offline de Coffee-End.");
                        return false;
                      }}
                      className="link-cyan"
                    >
                      Política de Privacidad
                    </a>{" "}
                    y autorizo recibir novedades académicas de código limpio.
                  </span>
                </label>

                <div className="newsletter-centrada__pie">
                  <span>
                    Consultas directas en <strong className="text-white">newsletter@coffee-end.dev</strong>
                  </span>
                  <span className="newsletter-centrada__estado">
                    <span className="newsletter-centrada__punto-estado"></span> SERVICIO ONLINE
                  </span>
                </div>
              </form>

              {/* PANEL DE ÉXITO: visible solo tras un envío válido. */}
              <div
                id="newsletter-success"
                className={successClassName}
                style={{ transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)", opacity: fading ? 0 : 1 }}
              >
                <div className="newsletter-centrada__exito-icono">✓</div>
                <div>
                  <h3 className="newsletter-centrada__exito-titulo">¡Suscripción exitosa!</h3>
                  <p className="newsletter-centrada__exito-desc">
                    Hemos registrado tu email <strong className="text-cyan">{subscribedEmail}</strong>. Comenzarás a
                    recibir el boletín semanal a partir de la próxima edición.
                  </p>
                </div>
                <button type="button" onClick={handleReset} className="newsletter-centrada__exito-boton">
                  Suscribir otra dirección email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}