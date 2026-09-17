/**
 * NavBar.jsx — Barra de navegación principal, compartida por todas las vistas.
 *
 * El menú tiene 4 enlaces (Blog, Community, Newsletter, About Us). "Blog" apunta
 * a "/" y usa end=true: solo se marca como activo en la raíz, no en subrutas
 * como /blog/:id.
 *
 * El header sigue SIEMPRE el tema global (ThemeContext): en claro es blanco y en
 * oscuro lo oscurecen los overrides html[data-theme="dark"] de style.css.
 */

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// Lista de enlaces; `end` indica si el enlace solo está activo con la ruta
// exacta (necesario para "/").
const NAV_ITEMS = [
  { to: "/", label: "Blog", end: true },
  { to: "/comunidad", label: "Community", end: false },
  { to: "/newsletter", label: "Newsletter", end: false },
  { to: "/about", label: "About Us", end: false },
];

export default function NavBar() {
  // Controla el menú hamburguesa en móviles (añade mobile-menu-open al header).
  const [menuOpen, setMenuOpen] = useState(false);

  // El tema global (Tema 8): toggleTheme alterna entre claro y oscuro.
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Clase condicional del header según el estado del menú.
  const headerClass = menuOpen ? "mobile-menu-open" : "";

  // Esta función le da a NavLink la clase a usar: "active" solo si está pulsado.
  function linkClassName({ isActive }) {
    return ["nav-link", isActive ? "active" : ""].join(" ").trim();
  }

  return (
    <header className={headerClass}>
      <div className="container">
        {/* Logotipo: la marca enlaza siempre a la página principal. */}
        <Link to="/" className="logo">
          <div className="logo-icon">&lt;/&gt;</div>
          <div className="logo-text">
            <span className="logo-title">Blog Coffee-End</span>
          </div>
        </Link>

        <nav className="navbar" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClassName}
              end={item.end}
              // Al pulsar un enlace se cierra el menú móvil (si estaba abierto).
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {/* Interruptor de tema claro/oscuro (estado global de la app). */}
          <button
            type="button"
            className={`theme-toggle-btn${isDarkTheme ? " theme-toggle-btn-dark" : ""}`}
            onClick={toggleTheme}
            aria-label={isDarkTheme ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            title={isDarkTheme ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {isDarkTheme ? "☀️" : "🌙"}
          </button>
          {/* Botón de Discord (enlace externo de ejemplo). */}
          <a href="#" className="btn btn-primary">
            Discord
          </a>
        </div>

        {/* Botón hamburguesa: abre y cierra el menú móvil. */}
        <button
          className="mobile-toggle"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}