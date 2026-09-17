/**
 * AboutPage.jsx — Página institucional "/about" (antes about.html).
 *
 * Dos secciones:
 *   1. Bento-grid de ventajas (why-section, estática, solo HTML/CSS).
 *   2. Acordeón de preguntas frecuentes (FaqAccordion reutilizable),
 *      alimentado por el array FAQ_ITEMS definido aquí abajo.
 *
 * En el estático el acordeón gestionaba la clase active y el max-height con
 * JS manual; ahora lo hace el componente FaqAccordion.
 */

import { useEffect } from "react";
import FaqAccordion from "../components/FaqAccordion";

// Contenido de las Preguntas Frecuentes (textos literales del estático).
const FAQ_ITEMS = [
  {
    q: "¿Qué incluye la academia?",
    a: "La academia incluye cursos, retos, proyectos prácticos, certificados y comunidad. Para acceder necesitas tener activo un plan mensual, trimestral o anual.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, por supuesto. Puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario sin cargos adicionales ni preguntas.",
  },
  {
    q: "¿Para qué nivel es la academia?",
    a: "Nuestros contenidos abarcan desde niveles principiantes sin conocimientos previos en maquetación, hasta programadores intermedios y avanzados que buscan perfeccionar manipulación del DOM y asincronismo.",
  },
  {
    q: "¿Qué diferencia hay con el contenido gratuito de YouTube?",
    a: "A diferencia de tutoriales sueltos en YouTube, aquí dispones de una ruta estructurada paso a paso, ejercicios interactivos con validación técnica, retos evaluados por instructores senior y mentorías diagnósticas 1-a-1.",
  },
  {
    q: "¿Tendré tiempo para completar los cursos?",
    a: "¡Sí! Una vez matriculado en un plan activo, puedes estudiar a tu propio ritmo. Las lecciones están grabadas de forma concisa y directa para maximizar el tiempo de estudio.",
  },
  {
    q: "¿Incluye certificados?",
    a: "Sí. Al completar y defender los proyectos obligatorios de cada ruta de aprendizaje, recibirás una certificación oficial firmada por nuestros instructores senior de Coffee-End.",
  },
  {
    q: "¿Si dejo de estar suscrito, pierdo acceso al contenido de la academia?",
    a: "Dejas de acceder de forma activa a los contenidos multimedia del catálogo y al soporte personalizado, pero las postulaciones registradas en tu base local LocalStorage continuarán activas por siempre.",
  },
  {
    q: "¿Se actualizará el contenido de la academia?",
    a: "Constantemente actualizamos las clases para adaptarnos a las últimas especificaciones de la W3C, buenas prácticas de desarrollo y estándares de ES2026.",
  },
  {
    q: "¿Cómo funciona el soporte en Discord?",
    a: "Contamos con canales exclusivos para alumnos organizados por temas (HTML, CSS, JavaScript). Los tutores senior responden en un plazo promedio menor a 24 horas hábiles.",
  },
  {
    q: "¿Qué beneficios incluye el plan anual?",
    a: "El acceso anual con precio bonificado, mentorías preferenciales con instructores, sesiones de diseño de porfolio personalizadas y acceso prioritario a todas las actualizaciones del curso.",
  },
];

export default function AboutPage() {
  // Título de pestaña específico de esta página.
  useEffect(() => {
    document.title = "// About Us — Coffee-End";
  }, []);

  return (
    <main>
      {/* SECCIÓN BENTO: ventajas de la academia (contenido estático). */}
      <section className="bento-section" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">// Acerca de</span>
            <h2 className="section-title">¿Por qué estudiar en Coffee-End?</h2>
            <p className="section-subtitle">
              Hemos diseñado un modelo educativo optimizado para maximizar la asimilación técnica en menor tiempo.
            </p>
          </div>

          <div className="bento-grid">
            <div className="bento-card col-span-2">
              <div>
                <div className="bento-icon">🛡</div>
                <h3 className="bento-title">Estructura Curricular Basada en Proyectos Reales</h3>
                <p className="bento-desc">
                  Nada de teoría abstracta sin fin. En cada bloque académico construirás clones funcionales, páginas
                  validadas semánticamente por la W3C, y aplicaciones que podrás añadir a tu porfolio profesional desde
                  el primer día.
                </p>
              </div>
              <div className="bento-tags">
                <span className="bento-tag">W3C Standard</span>
                <span className="bento-tag">100% Práctico</span>
                <span className="bento-tag font-mono">Lighthouse 100/100</span>
              </div>
            </div>

            <div className="bento-card bento-dark">
              <div>
                <div className="bento-icon">⚡</div>
                <h3 className="bento-title">Soporte Express de Dudas Técnicas</h3>
                <p className="bento-desc">
                  ¿Te quedaste atrapado en un bucle infinito o un bug de CSS Grid? Nuestro canal asíncrono responde tus
                  dudas de manera ágil con explicaciones de código claras.
                </p>
              </div>
              <div className="bento-tags">
                <span className="bento-tag">24hs Answer</span>
                <span className="bento-tag">Tutor Senior</span>
              </div>
            </div>

            <div className="bento-card">
              <div>
                <div className="bento-icon">📑</div>
                <h3 className="bento-title">Certificación Oficial</h3>
                <p className="bento-desc">
                  Cada curso culmina con la defensa de un proyecto web. Obtén un certificado validado criptográficamente
                  para respaldar tu dominio técnico.
                </p>
              </div>
              <div className="bento-tags">
                <span className="bento-tag">Blockchain Verified</span>
                <span className="bento-tag">LinkedIn Ready</span>
              </div>
            </div>

            <div className="bento-card col-span-2">
              <div>
                <div className="bento-icon">💡</div>
                <h3 className="bento-title">Incentivo de Formulación JSON y Persistencia Local</h3>
                <p className="bento-desc">
                  Valoramos la ingeniería de datos en navegadores. Todos nuestros formularios académicos están conectados
                  a interfaces de almacenamiento LocalStorage para que audites cómo se parsean y parsean estructuras de
                  datos complejas.
                </p>
              </div>
              <div className="bento-tags">
                <span className="bento-tag">Web Storage API</span>
                <span className="bento-tag">JSON Schemas</span>
                <span className="bento-tag font-mono">JS Native Engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN FAQ: acordeón reutilizable con los items anteriores. */}
      <section className="faq-accordion-section" id="faq-section">
        <div className="container container-faq-custom">
          <div className="section-header faq-header-custom">
            <span className="section-tag faq-tag-custom">Preguntas frecuentes</span>
            <h2 className="section-title faq-title-custom">Preguntas antes de unirte</h2>
            <p className="section-subtitle faq-subtitle-custom">
              Lo esencial para decidir con tranquilidad si la academia encaja contigo.
            </p>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>
    </main>
  );
}