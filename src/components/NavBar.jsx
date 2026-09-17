/**
 * NavBar.jsx — Barra de navegación principal compartida por todas las vistas.
 *
 * Los 5 enlaces estáticos (Blog, Archives, Community, Newsletter, About Us)
 * se unifican en 4 rutas de la SPA: "Blog" absorbe Archives de la web original.
 * Por eso el item "Blog" apunta a "/" y tiene end=true (solo se marca activo
 * en la raíz y no en subrutas como /blog/:id).
 *
 * El header sigue SIEMPRE el tema global (ThemeContext): en claro es blanco y
 * en oscuro lo oscurecen los overrides html[data-theme="dark"] de style.css.
 */

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// Mapa de enlaces: `end` indica si el enlace solo está activo cuando la ruta
// coincide de forma exacta (necesario para "/").
const NAV_ITEMS = [
  { to: "/", label: "Blog", end: true },
  { to: "/comunidad", label: "Community", end: false },
  { to: "/newsletter", label: "Newsletter", end: false },
  { to: "/about", label: "About Us", end: false },
];

export default function NavBar() {
  // Controla el menú hamburguesa en móviles (clase mobile-menu-open del header).
  const [menuOpen, setMenuOpen] = useState(false);

  // Tema global (Context API, Tema 8): toggleTheme alterna light/dark.
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Clase condicional del header según el menú abierto;
  // filter(Boolean) descarta las cadenas vacías antes de unirlas.
  const headerClass = menuOpen ? "mobile-menu-open" : "";

  // NavLink recibe esta función para calcular sus clases: recibe un objeto
  // { isActive } y devuelve la clase correspondiente.
  function linkClassName({ isActive }) {
    return ["nav-link", isActive ? "active" : ""].join(" ").trim();
  }

  return (
    <header className={headerClass}>
      <div className="container">
        {/* Logotipo: toda la palabra/marca enlaza siempre a la home ("/"). */}
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
          {/* Toggle de tema claro/oscuro (dato global del ThemeContext). */}
          <button
            type="button"
            className={`theme-toggle-btn${isDarkTheme ? " theme-toggle-btn-dark" : ""}`}
            onClick={toggleTheme}
            aria-label={isDarkTheme ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            title={isDarkTheme ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {isDarkTheme ? "☀️" : "🌙"}
          </button>
          {/* CTA de Discord (enlace externo placeholder igual que el estático). */}
          <a href="#" className="btn btn-primary">
            Discord
          </a>
        </div>

        {/* Toggle hamburguesa: alterna la clase mobile-menu-open del header. */}
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