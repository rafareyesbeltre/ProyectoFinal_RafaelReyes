/**
 * Footer.jsx — Pie de página compartido.
 *
 * Idéntico al de las plantillas estáticas (archive/blog/about...), pero los
 * enlaces del cursores del estático (alert()) se reemplazan por navegación
 * real de la SPA con <Link />. El footer sigue el tema global: su base es
 * oscura por diseño y en las páginas responde igual en todos los temas.
 */

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Bloque de marca y texto institucional. */}
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">&lt;/&gt;</div>
              <div className="logo-text">
                <span className="logo-title">Blog Coffee-End</span>
                <span className="logo-sub font-mono">
                  Academia de Programación
                </span>
              </div>
            </div>
            <p>
              Estudia programación y desarrollo de software de manera diferente
              en mouredev pro.
            </p>
          </div>

          {/* Columna vacía reservada del grid estático (grid de 4 columnas). */}
          <div className="footer-col" />

          {/* Columna "Blog": ahora conrutas reales en lugar de alert()es. */}
          <div className="footer-col">
            <h4>Blog</h4>
            <ul>
              <li>
                {/* "Archives" se unifica con la lista del blog ("/"). */}
                <Link to="/">Archives</Link>
              </li>
              <li>
                <Link to="/comunidad">Community</Link>
              </li>
              <li>
                <Link to="/newsletter">Newsletter</Link>
              </li>
            </ul>
          </div>

          {/* Columna de contacto académico (enlaces directos mailto/tel). */}
          <div className="footer-col">
            <h4>Contacto Académico</h4>
            <ul>
              <li>
                <a href="mailto:soporte@devacademy.edu">
                  soporte@devacademy.edu
                </a>
              </li>
              <li>
                <a href="tel:+34912345678">+34 9123 45678</a>
              </li>
              <li>
                <a href="#mentorship-form">Reclamos y Admisiones</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior de licencia y atribución. */}
      <div className="footer-bottom">
        <div className="container">
          <span className="footer-bottom-text">
            © 2026 Coffee-End Inc. Todos los derechos formativos reservados.
          </span>
          <span className="footer-bottom-mono font-mono">
            Desarrollado por Rafael Reyes
          </span>
        </div>
      </div>
    </footer>
  );
}
