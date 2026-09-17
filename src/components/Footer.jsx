/**
 * Footer.jsx — Pie de página compartido.
 *
 * Los enlaces del menú navegan por la SPA con <Link />. El pie es oscuro por
 * diseño y acompaña al tema global en todas las páginas.
 */

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Bloque con la marca y el texto institucional. */}
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

          {/* Columna vacía: el grid usa cuatro columnas y esta se queda libre. */}
          <div className="footer-col" />

          {/* Columna "Blog": enlaces a las secciones principales. */}
          <div className="footer-col">
            <h4>Blog</h4>
            <ul>
              <li>
                {/* "Archives" lleva a la lista de artículos de la página principal. */}
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

          {/* Columna de contacto: enlaces directos a email y teléfono. */}
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

      {/* Barra inferior con la licencia y la atribución. */}
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
