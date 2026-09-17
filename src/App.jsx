/**
 * App.jsx — Componente raíz de la aplicación.
 *
 * Estructura:
 *   App (exportado)      → envuelve todo en <ThemeProvider />.
 *   AppContent (interno) → vive DENTRO del provider, por lo que ya puede
 *                          consumir el ThemeContext (useTheme) y compone el
 *                          layout compartido:
 *                            <NavBar /> → navegación fija.
 *                            <Routes /> → enrutado de la SPA.
 *                            <Footer /> → pie compartido.
 *
 * Proveedores de estado global (Context API, Tema 8):
 *   <ThemeProvider />     → dato global "tema claro/oscuro" (toggle en NavBar).
 *   <BookmarksProvider /> → favoritos con persistencia en localStorage.
 *
 * La separación App/AppContent es necesaria: leer el ThemeContext requiere un
 * componente descendiente del proveedor, y App es precisamente quien lo monta.
 * Todas las vistas (incluidas /comunidad y /newsletter) siguen el tema global:
 * el header, el footer y cada sección responden al data-theme del toggle.
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

// Layout real de la aplicación (consumidor del ThemeContext).
function AppContent() {
  return (
    <BookmarksProvider>
      <NavBar />
      <Routes>
        {/* Página principal: listado de artículos + artículo destacado. */}
        <Route path="/" element={<HomePage />} />
        {/* Detalle de artículo: blog.html?id=... pasa a ser /blog/:id */}
        <Route path="/blog/:id" element={<DetallePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/comunidad" element={<ComunidadPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        {/* Cualquier ruta no definida renderiza la página 404. */}
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