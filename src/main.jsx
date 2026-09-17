/**
 * main.jsx — Punto de entrada de la aplicación.
 *
 * Arranca React sobre el contenedor #root de index.html y monta la app completa:
 *   1. BrowserRouter → gestiona las rutas de la SPA con URLs limpias.
 *   2. App           → el layout compartido: barra de navegación, páginas y pie.
 *
 * Hemos omitido <StrictMode> a propósito: en desarrollo React ejecuta hoy los
 * efectos dos veces y eso consumiría "en silencio" la clave coffee_end_mock_error
 * del primer montaje, impidiendo mostrar el estado de error del Tema 5.
 *
 * Aquí también se importa el CSS global del proyecto (style.css).
 */

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import App from "./App.jsx";

// Toma el contenedor de #root y monta ahí toda la aplicación React.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
