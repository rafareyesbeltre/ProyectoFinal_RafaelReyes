/**
 * main.jsx — Punto de entrada de la aplicación React.
 *
 * Arranca el renderizado de React sobre el nodo #root de index.html y monta
 * la SPA completa. Estructura de arranque:
 *   1. BrowserRouter → provee el enrutado de react-router-dom (rutas limpias).
 *   2. App           → layout global: NavBar, rutas y Footer.
 *
 * Sin <StrictMode> a propósito: en desarrollo React 19 ejecuta los efectos dos
 * veces y eso "consumiría" en silencio la clave coffee_end_mock_error del
 * primer montaje (cancelado), impidiendo demostrar el estado de error del
 * Tema 5. Este proyecto es una SPA estática demo; no necesita esas
 * comprobaciones extra.
 *
 * Aquí también se importa de forma global el CSS del proyecto (style.css),
 * portado y depurado desde el proyecto estático T4_RafaelReyes.
 */

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import App from "./App.jsx";

// Busca el contenedor raíz definido en index.html y monta React dentro de él.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
