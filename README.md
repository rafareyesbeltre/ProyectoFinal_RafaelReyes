# Blog Coffee-End

Blog Coffee-End es una aplicación web de una sola página (SPA) construida con React y Vite. Reúne artículos técnicos de desarrollo front-end, una comunidad activa en Discord, mentorías agendables y una newsletter, con una interfaz coherente y un tema claro/oscuro que el usuario puede cambiar y conservar entre visitas. Toda la aplicación funciona en el navegador: no hay backend ni base de datos.

---

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

**Comunicación entre componentes (Tema 4).** Hay varios casos de *lifting state up*: la categoría seleccionada vive en `HomePage` y `CategoryFilter` solo la recibe y avisa; los comentarios viven en `DetallePage` mientras `CommentsSection` se limita a presentarlos; y la reserva de mentoría coordina `MentorBooking` con `BookingForm` y `BookingTicket`. Esa misma división mantiene separados los componentes de presentación (los formularios y las tarjetas, que no guardan estado propio) de los que contienen la lógica de cada página.

**Hooks y ciclo de vida (Tema 5).** Al montar las vistas se cargan datos con `useEffect` a través del hook `useFetch`, y la interfaz refleja con claridad los **tres estados**: mientras llegan los datos se muestra una rejilla de *skeletons*; si algo falla aparece una caja de error con botón **“Reintentar”**; y cuando todo va bien se pinta la lista real (o el aviso de que no hay resultados). El renderizado condicional es visible en las páginas de inicio y de detalle.

**Hooks avanzados (Tema 6).** El proyecto define **cinco hooks propios** en `src/hooks/`: `useFetch` (peticiones asíncronas con sus estados), `useLocalStorage` (estado persistente), `useScrollSpy` (índice lateral del artículo), `useBookmarks` (favoritos globales) y `useTheme` (tema global). Además, `useMemo` y `useCallback` se usan con justificación: por ejemplo, el listado filtrado de la página principal y el valor del contexto de tema memorizan su resultado, y los manejadores de comentarios conservan su identidad para que `React.memo` evite repintados innecesarios.

**Ruteo (Tema 7).** La app configura **6 rutas** con React Router (`/`, `/blog/:id`, `/comunidad`, `/newsletter`, `/about` y la comodín `*`). La barra de navegación usa `NavLink` y marca visualmente la ruta activa, e incluye una **ruta dinámica** (`/blog/:id`) que recibe el identificador del artículo. Cualquier ruta inexistente cae en una página **404** propia.

**Estado global (Tema 8).** Se usa **Context API** para dos datos globales: el **tema claro/oscuro** (`ThemeProvider`) y la **lista de favoritos** (`BookmarksProvider`), ambos disponibles desde cualquier vista. Redux Toolkit era una opción con puntos extra y no se utilizó; el alcance del estado compartido quedó bien cubierto con contextos.

### Requisitos funcionales

La aplicación tiene **múltiples vistas navegables sin recargar la página**, todas bajo el mismo layout de barra de navegación y pie. Incluye un **CRUD parcial** de crear y eliminar sobre dos colecciones reales (comentarios y reservas de mentoría), y **persiste los datos en `localStorage`** para que sobrevivan al recargar. El **filtrado dinámico** de la lista de artículos se resuelve con el filtro por categorías.

En cuanto al origen de los datos, el proyecto se resolvió como una **aplicación autónoma “Sin API”**: en lugar de depender de un servicio externo, incorpora su propio **servicio de datos interno** (`src/services/mockApi.js`) que imita el comportamiento de una red real (Promesas con una latencia simulada de ~700 ms). El hook `useFetch` lo consume con el mismo contrato que tendría una petición `fetch` (`data`, `loading`, `error` y `refetch`), así que la interfaz no sabría distinguir uno de otro y conectar más adelante una API pública sería cuestión de cambiar solo esa capa. Finalmente, la **interfaz es coherente entre vistas** y se adapta a móvil, tablet y escritorio, además de cuidar la accesibilidad con etiquetas `aria-label` en la navegación y descripciones `alt` en las imágenes.

---

## Tecnologías

- **React 19** con componentes funcionales y hooks.
- **Vite 8** como empaquetador y servidor de desarrollo.
- **React Router 7** para las rutas de la SPA (misma API de rutas declarativas que la v6 pedida en clase).
- **Context API** para el estado global.
- **CSS puro** con variables de diseño, modo oscuro y estilos responsivos (sin frameworks).
- **Oxlint** para el análisis estático del código.

## Instalación y scripts

Requiere Node.js 20 o superior.

```bash
npm install     # instala las dependencias
npm run dev     # levanta el servidor de desarrollo
npm run build   # genera la versión de producción en dist/
npm run preview # sirve localmente la versión compilada
npm run lint    # revisa el código con Oxlint
```

## Estructura del proyecto

```text
src/
├── components/   ← componentes reutilizables (tarjetas, formularios, navbar…)
├── context/      ← proveedores y contextos globales (tema y favoritos)
├── data/         ← artículos completos, posts resumidos y comentarios semilla
├── hooks/        ← custom hooks (useFetch, useLocalStorage, useScrollSpy…)
├── pages/        ← una página por ruta (inicio, detalle, comunidad…)
├── services/     ← servicio de datos asíncrono (mockApi)
├── utils/        ← constantes globales y utilidades de presentación
├── App.jsx       ← layout compartido y configuración de rutas
├── main.jsx      ← punto de entrada (monta React y el router)
└── style.css     ← estilos globales (variables, modo oscuro y responsive)
```

## Rutas

| Ruta         | Vista           | Contenido                                                        |
| ------------ | --------------- | ---------------------------------------------------------------- |
| `/`          | `HomePage`      | Artículos, destacado y filtro por categoría.                     |
| `/blog/:id`  | `DetallePage`   | Artículo completo, índice lateral, recomendados y comentarios.   |
| `/comunidad` | `ComunidadPage` | Acceso a Discord y agenda de reserva de mentorías.               |
| `/newsletter`| `NewsletterPage`| Formulario de suscripción.                                       |
| `/about`     | `AboutPage`     | Información de la academia y preguntas frecuentes.               |
| `*`          | `Pagina404`     | Página de ruta no encontrada.                                    |

## Persistencia de datos

Aunque no hay servidor, todo lo que el usuario produce se conserva en el navegador mediante `localStorage`. Estas son las claves utilizadas:

| Clave de `localStorage`             | Qué guarda                                                |
| ----------------------------------- | --------------------------------------------------------- |
| `coffee_end_theme`                  | Tema elegido (claro u oscuro).                            |
| `devacademy_blog_bookmarks`         | Artículos marcados como favoritos.                        |
| `coffee_end_newsletter_email`       | Correo suscrito a la newsletter.                          |
| `coffee_end_comments_<id>`          | Comentarios de cada artículo (la clave incluye su id).    |
| `devacademy_mentorship_bookings`    | Citas de mentoría agendadas.                              |
| `coffee_end_mock_error`             | Interruptor para forzar un error en la capa de datos.     |

## Datos de la aplicación

Los artículos, las recomendaciones, los comentarios de ejemplo y los catálogos del formulario de mentoría viven en `src/data/` y `src/utils/constants.js`. El servicio `src/services/mockApi.js` los entrega de forma asíncrona y devuelve copias, de modo que ningún componente modifique la fuente original.

Para ver de cerca el estado de error del flujo de datos, basta con ejecutar esto en la consola del navegador: la siguiente petición fallará una vez y la interfaz mostrará la pantalla de error con su botón para reintentar.

```js
localStorage.setItem("coffee_end_mock_error", "1");
```

## Autor y entrega

Proyecto final del curso de React de **Talendig** (CTDS301), desarrollado por **Rafael Reyes**.

- Repositorio: [github.com/rafareyesbeltre/ProyectoFinal_RafaelReyes](https://github.com/rafareyesbeltre/ProyectoFinal_RafaelReyes)
