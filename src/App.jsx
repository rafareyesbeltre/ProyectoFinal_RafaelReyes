/**
 * App.jsx — Raíz de la aplicación.
 *
 * App (exportado)      → envuelve toda la app en el <ThemeProvider />.
 * AppContent (interno) → vive dentro de ese proveedor para poder leer el tema
 *                        global (useTheme) y arma el layout compartido:
 *                          <NavBar /> → navegación fija.
 *                          <Routes /> → las rutas de la SPA.
 *                          <Footer /> → pie compartido.
 *
 * Proveedores de estado global (Context API, Tema 8):
 *   <ThemeProvider />     → tema claro/oscuro (interruptor en la barra).
 *   <BookmarksProvider /> → favoritos guardados en localStorage.
 *
 * Separo App y AppContent porque solo un componente que vive dentro del
 * proveedor puede leer su contexto, y App es quien lo monta. Todas las vistas
 * (incluidas /comunidad y /newsletter) siguen el tema elegido: el header, el
 * footer y cada sección cambian con el data-theme del interruptor.
 */

import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DetallePage from "./pages/DetallePage";
import AboutPage from "./pages/AboutPage";
import ComunidadPage from "./pages/ComunidadPage";
import NewsletterPage from "./pages/NewsletterPage";
import Pagina404 from "./pages/Pagina404";
import ThemeProvider from "./context/ThemeProvider";
import BookmarksProvider from "./context/BookmarksProvider";

// Layout compartido de toda la app (ya puede leer el tema elegido).
function AppContent() {
  return (
    <BookmarksProvider>
      <NavBar />
      <Routes>
        {/* La página de inicio: lista de artículos + artículo destacado. */}
        <Route path="/" element={<HomePage />} />
        {/* La ficha de un artículo concreto. */}
        <Route path="/blog/:id" element={<DetallePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/comunidad" element={<ComunidadPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        {/* Cualquier ruta que no exista carga la página 404. */}
        <Route path="*" element={<Pagina404 />} />
      </Routes>
      <Footer />
    </BookmarksProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}