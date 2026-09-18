# Blog Coffee-End

## Mucho más que un blog: una comunidad para desarrolladores

Aunque la lectura de artículos es el punto de partida, la intención de Coffee-End es ser un punto de encuentro **de y para desarrolladores de software**. El blog organiza el conocimiento en piezas legibles y bien categorizadas; la sección de comunidad conecta a las personas en torno a un espacio compartido en Discord; las mentorías permiten resolver dudas concretas con un instructor; la newsletter mantiene el vínculo con quien quiere seguir el contenido; y la sección de academia presenta la propuesta formativa. Visto en conjunto, el sitio funciona como un espacio donde se aprende, se comparte y se construye red profesional, no solo como una lista de publicaciones.

## Servicios del sitio web

- **Artículos técnicos.** La página principal lista los artículos del blog y permite **filtrarlos por categoría** (HTML, CSS, JavaScript y Carrera), además de destacar el más relevante del momento.
- **Lectura guiada.** Cada artículo abre una vista de detalle con su contenido completo, un **índice lateral** que resalta la sección visible al hacer scroll, artículos recomendados y una sección de **comentarios** que el lector puede publicar o eliminar.
- **Comunidad.** La sección `/comunidad` invita a entrar al servidor de Discord y ofrece una **agenda de mentorías** donde cualquier persona puede reservar una sesión y ver las citas registradas.
- **Newsletter.** Un formulario sencillo que guarda la suscripción y recuerda el correo en la próxima visita.
- **Academia.** La sección `/about` presenta los beneficios de la formación y un **acordeón de preguntas frecuentes**.

---

## Cómo se cumplen los requisitos de la rúbrica

### Requisitos técnicos

**Componentes y props (Temas 1 y 2).** La interfaz se apoya en **10 componentes reutilizables** dentro de `src/components/` (`NavBar`, `Footer`, `BlogCard`, `FeaturedCard`, `CategoryFilter`, `CommentsSection`, `FaqAccordion`, `BookingForm`, `BookingTicket` y `MentorBooking`), muy por encima del mínimo pedido. La comunicación es siempre por props: los componentes reciben datos y funciones de sus contenedores, y las listas dinámicas se renderizan con `.map()` acompañado de su `key` (los artículos, las categorías, los comentarios, las recomendaciones y las citas).

**Estado y eventos (Tema 3).** El estado que cambia vive en `useState`: el filtro activo, los comentarios de un artículo, el texto del formulario, las reservas de mentoría, el correo de la newsletter o la pregunta abierta del acordeón. Los eventos se manejan con `onClick` (marcar favoritos, cancelar una cita, abrir una pregunta), `onChange` (campos controlados de todos los formularios) y `onSubmit` (comentarios, newsletter y reserva de mentoría). Sobre los arrays en estado hay operaciones reales: los comentarios y las reservas se **agregan** con spread y se **eliminan** con `.filter()`.

**Comunicación entre componentes (Tema 4).** Hay varios casos de _lifting state up_: la categoría seleccionada vive en `HomePage` y `CategoryFilter` solo la recibe y avisa; los comentarios viven en `DetallePage` mientras `CommentsSection` se limita a presentarlos; y la reserva de mentoría coordina `MentorBooking` con `BookingForm` y `BookingTicket`. Esa misma división mantiene separados los componentes de presentación (los formularios y las tarjetas, que no guardan estado propio) de los que contienen la lógica de cada página.

**Hooks y ciclo de vida (Tema 5).** Al montar las vistas se cargan datos con `useEffect` a través del hook `useFetch`, y la interfaz refleja con claridad los **tres estados**: mientras llegan los datos se muestra una rejilla de _skeletons_; si algo falla aparece una caja de error con botón **“Reintentar”**; y cuando todo va bien se pinta la lista real (o el aviso de que no hay resultados). El renderizado condicional es visible en las páginas de inicio y de detalle.

**Hooks avanzados (Tema 6).** El proyecto define **cinco hooks propios** en `src/hooks/`: `useFetch` (peticiones asíncronas con sus estados), `useLocalStorage` (estado persistente), `useScrollSpy` (índice lateral del artículo), `useBookmarks` (favoritos globales) y `useTheme` (tema global). Además, `useMemo` y `useCallback` se usan con justificación: por ejemplo, el listado filtrado de la página principal y el valor del contexto de tema memorizan su resultado, y los manejadores de comentarios conservan su identidad para que `React.memo` evite repintados innecesarios.

**Ruteo (Tema 7).** La app configura **6 rutas** con React Router (`/`, `/blog/:id`, `/comunidad`, `/newsletter`, `/about` y la comodín `*`). La barra de navegación usa `NavLink` y marca visualmente la ruta activa, e incluye una **ruta dinámica** (`/blog/:id`) que recibe el identificador del artículo. Cualquier ruta inexistente cae en una página **404** propia.

**Estado global (Tema 8).** Se usa **Context API** para dos datos globales: el **tema claro/oscuro** (`ThemeProvider`) y la **lista de favoritos** (`BookmarksProvider`), ambos disponibles desde cualquier vista. Redux Toolkit era una opción con puntos extra y no se utilizó; el alcance del estado compartido quedó bien cubierto con contextos.

En cuanto al origen de los datos, el proyecto se resolvió como una **aplicación autónoma “Sin API”**: en lugar de depender de un servicio externo, incorpora su propio **servicio de datos interno** (`src/services/mockApi.js`) que imita el comportamiento de una red real (Promesas con una latencia simulada de ~700 ms). El hook `useFetch` lo consume con el mismo contrato que tendría una petición `fetch` (`data`, `loading`, `error` y `refetch`), así que la interfaz no sabría distinguir uno de otro y conectar más adelante una API pública sería cuestión de cambiar solo esa capa. Finalmente, la **interfaz es coherente entre vistas** y se adapta a móvil, tablet y escritorio, además de cuidar la accesibilidad con etiquetas `aria-label` en la navegación y descripciones `alt` en las imágenes.

---

## Autor y entrega

Proyecto final del curso de React de **Talendig** (CTDS301), desarrollado por **Rafael Reyes**.

- Repositorio: [github.com/rafareyesbeltre/ProyectoFinal_RafaelReyes](https://github.com/rafareyesbeltre/ProyectoFinal_RafaelReyes)
