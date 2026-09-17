/**
 * articles.js — Base de datos extendida de los artículos completos.
 */
export const ARTICLES_DATABASE = {
  "featured_dom_asincrono": {
    title: "El Futuro del DOM Asíncrono en ES2026: Manejo Limpio de State y Microtasks",
    category: "JavaScript Destacado",
    author: "Lucas Garmendia",
    date: "Hace 3 días",
    readTime: "8 min de lectura",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        title: "1. El Problema: El bloqueo recurrente del hilo principal en UI pesadas",
        content: "<p>A medida que las aplicaciones web modernas (vía interfaces ricas) crecen en volumen de nodos, el manejo tradicional del DOM produce cuellos de botella severos. Cada vez que realizamos modificaciones masivas o reordenamos listas dinámicas de miles de ítems, el navegador entra en ciclos pesados de Recalcular Estilo y Reflow (Layout).</p><p>Este bloqueo de milisegundos destruye la fluidez visual a 60 FPS, causando saltos desagradables y reduciendo crucialmente la interactividad de la aplicación. En entornos profesionales, este es un error de diseño inadmisible.</p>"
      },
      {
        title: "2. Las Microtareas (Microtasks) y el Event Loop en profundidad",
        content: "<p>Para entender el descarte y renderizado moderno, debemos sumergirnos en la diferencia crucial entre las Macrotareas (como setTimeout o setInterval) y las Microtareas (Promise.then, queueMicrotask y MutationObserver).</p><p>Las microtareas se ejecutan inmediatamente después del código síncrono actual y antes de que el navegador proceda con la siguiente fase de pintura o renderizado de cuadros. Al segmentar lógicamente nuestras actualizaciones del DOM dentro de colas de microtareas limpias, podemos consolidar operaciones múltiples antes de entregar el control al render engine.</p>"
      },
      {
        title: "3. El Nuevo Estándar ES2026 y la gestión atómica del State",
        content: "<p>Con la llegada de las propuestas maduras de ECMA para el ciclo ES2026, recibimos herramientas nativas para la mutación atómica del DOM. Esto permite que el motor JS consolide el estado mutado y posponga la reconciliación real del árbol representativo.</p><p>La API de Scheduler integrada con prioridades lógicas de ejecución nos ofrece un control inaudito sobre la ejecución. Ya no dependemos de librerías externas pesadas ni de hacks subjetivos como requestIdleCallback para salvaguardar la interactividad total del navegador.</p>"
      },
      {
        title: "4. Estructurando fragmentos del DOM asíncronos y desacoplados",
        content: "<p>Aprenderemos a crear fragmentos virtuales desacoplados del DOM raíz por medio de DocumentFragment optimizados. Al poblar de forma diferida e incremental cada sub-sección del HTML en memoria y volcarla de un solo golpe al árbol real, limitamos el impacto visual a un único ciclo de composición.</p><p>Este patrón arquitectónico se conoce como 'Double Buffering' (doble búfer) en desarrollo de juegos, pero su implementación en el DOM de 2026 utilizando bucles generadores asíncronos es asombrosamente limpia y legible.</p>"
      },
      {
        title: "5. Ejemplos Prácticos paso a paso de optimización recursiva",
        content: "<p>A continuación, analizamos un fragmento modelo de código optimizado de vanguardia para la carga asíncrona segmentada:</p><pre style='background: var(--color-light); border: 1.5px solid var(--color-border); padding: 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; color: var(--color-dark); margin-bottom: 20px; overflow-x: auto;'>\nasync function renderInChunks(container, items) {\n  const chunkSize = 100;\n  for (let i = 0; i < items.length; i += chunkSize) {\n    const frag = document.createDocumentFragment();\n    items.slice(i, i + chunkSize).forEach(data => {\n      const element = document.createElement('div');\n      element.textContent = data.title;\n      frag.appendChild(element);\n    });\n    \n    // Ceder el hilo principal para mantener 60 FPS\n    await new Promise(resolve => requestAnimationFrame(resolve));\n    container.appendChild(frag);\n  }\n}</pre><p>Con este bloque conceptual, garantizamos de forma absoluta un scroll y una respuesta táctil instantánea en teléfonos móviles económicos durante renderizados ruidosos.</p>"
      },
      {
        title: "6. El Futuro del DOM: Virtualización nativa y Web Workers",
        content: "<p>¿Qué nos depara la segunda mitad de la década? La adopción masiva de Shadow DOM modular combinada con procesos de cómputo reactivo pesados ejecutados íntegramente dentro de Web Workers en segundo plano.</p><p>DevAcademy prepara a sus alumnos en estos paradigmas exactos para que lideren la arquitectura de software. Conectar hilos paralelos de cómputo directamente con el flujo de microtareas de UI es la habilidad mejor cotizada hoy en el ecosistema internacional de desarrollo Front-End.</p>"
      }
    ]
  },
  "art_1": {
    title: "El arte del CSS Grid Asimétrico: Más allá del wireframe clásico",
    category: "CSS3 & Layouts",
    author: "Elena Caro",
    date: "Hace 5 días",
    readTime: "6 min de lectura",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        title: "1. El Problema: El aburrido y predecible layout de rejilla simétrica",
        content: "<p>Durante años, el diseño web ha estado encadenado a columnas rígidas y simétricas heredadas de frameworks como Bootstrap o de la maquetación clásica en papel. El diseño simétrico es útil para la legibilidad formal, pero carece de ritmo visual y alma de marca.</p><p>Crear interfaces verdaderamente vanguardistas requiere romper la cuadrícula tradicional sin sacrificar la jerarquía tipográfica ni la estructura lógica de los elementos.</p>"
      },
      {
        title: "2. Bases del CSS Grid moderno: Entendiendo grid-template-areas",
        content: "<p>La propiedad <code>grid-template-areas</code> es el secreto mejor guardado para maquetar interfaces complejas rápidamente. Nos permite definir un mapa visual del diseño directamente en el CSS utilizando palabras comunes como 'cabecera', 'lateral' y 'principal'.</p><p>Esta abstracción facilita la reestructuración del sitio en dispositivos móviles con apenas un par de líneas dentro de nuestros Media Queries, garantizando un control granular absoluto.</p>"
      },
      {
        title: "3. El poder imbatible de CSS Subgrid para maquetaciones alineadas",
        content: "<p>Por mucho tiempo, los elementos hijos directos de un contenedor Grid eran los únicos que podían alinearse a sus pistas. Con la llegada de CSS Subgrid (totalmente soportado hoy), las tarjetas internas y los elementos nietos pueden adoptar el esqueleto compartido de su contenedor padre.</p><p>Esto nos permite alinear pies de tarjeta de diferentes bloques simétricamente a pesar de que el texto de descripción de cada una tenga alturas variables.</p>"
      },
      {
        title: "4. Creando un bento-grid interactivo asimétrico y orgánico",
        content: "<p>El estilo 'Bento Box' (popularizado por Apple y Microsoft) combina rectángulos de distintas proporciones formando mosaicos balanceados. Para que sea verdaderamente orgánico, debemos programar variaciones sutiles de padding, así como bordes redondeados pronunciados.</p><p>Hacer dinámico este Bento agregando transiciones al hacer hover enriquece la experiencia, transformando elementos planos en módulos táctiles sumamente estimulantes.</p>"
      },
      {
        title: "5. Controlando el flujo implícito con grid-auto-flow: dense",
        content: "<p>¿Qué ocurre cuando añadimos tarjetas dinámicamente y quedan espacios vacíos por culpa de anchos asimétricos? Usar <code>grid-auto-flow: dense</code> le indica al navegador que busque elementos más pequeños más adelante e intente 'rellenar' los huecos huérfanos del diseño.</p><p>Esta técnica automatiza la compactación del layout, eliminando la necesidad de cálculos complejos de JavaScript en tiempo de ejecución.</p>"
      },
      {
        title: "6. Resumen y mejores prácticas de rendimiento en Rejillas",
        content: "<p>Para finalizar, recuerda limitar el uso inoperante de anchos elásticos extremos que fuercen repintados masivos al rediseñar la ventana. Utiliza <code>minmax()</code> inteligente y limita el número total de celdas virtuales activas.</p><p>Practicar la asimetría controlada elevará de inmediato tus habilidades, separándote de programadores juniors estancados en plantillas prediseñadas.</p>"
      }
    ]
  },
  "art_2": {
    title: "HTML5 Semántico en 2026: Por qué los buscadores odian tu exceso de divs",
    category: "HTML5 Semántico",
    author: "Sofía Domínguez",
    date: "Hace 1 semana",
    readTime: "5 min de lectura",
    image: "https://images.unsplash.com/photo-1621839673705-663739e72952?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        title: "1. El Problema: El 'Div Soup' y la pérdida absoluta del contexto web",
        content: "<p>El abuso de etiquetas <code>&lt;div&gt;</code> genéricas para estructurar páginas web es uno de los mayores problemas arqueológicos en el front-end moderno. Cuando todo tu HTML está compuesto de divs anidados, los robots de los buscadores (Googlebot, Bing) no pueden distinguir el contenido vital de los menús o anuncios secundarios.</p><p>Esto diluye la relevancia semántica de tus palabras clave y perjudica destructivamente tu posicionamiento orgánico en buscadores (SEO).</p>"
      },
      {
        title: "2. Las etiquetas de sección clave de HTML5: article, section, aside",
        content: "<p>Es imperativo saber trazar límites claros: <code>&lt;article&gt;</code> se reserva para contenido autoincluido e independiente que tendría sentido leer aislado (como una noticia o post). <code>&lt;section&gt;</code> agrupa zonas temáticamente alineadas del documento acompañadas siempre de su propio encabezado.</p><p>Por otro lado, <code>&lt;aside&gt;</code> aloja información de apoyo, widgets o publicidad relacionada que no interrumpe el hilo rector del artículo.</p>"
      },
      {
        title: "3. Accesibilidad nativa (a11y) y el árbol de accesibilidad",
        content: "<p>El navegador genera un 'Árbol de Accesibilidad' paralelo al DOM orientado exclusivamente a lectores de pantalla para personas con discapacidad visual. Utilizar marcas semánticas adecuadas proporciona de manera automática roles nativos a los elementos.</p><p>Esto evita tener que inyectar redundancias pesadas mediante atributos ARIA, logrando código más ágil, estándar y fácil de auditar por reguladores oficiales.</p>"
      },
      {
        title: "4. Las novedades en jerarquía de encabezados de cara al W3C",
        content: "<p>El debate histórico sobre la presencia de múltiples etiquetas <code>&lt;h1&gt;</code> ha sido resuelto formalmente por los consorcios internacionales. La recomendación oficial es clara: estructura tu contenido de forma lineal ascendente estricta.</p><p>Un solo <code>&lt;h1&gt;</code> actúa como el núcleo unificado de cada post, ramificándose de manera pura y jerarquizada en subtemas mapeados con h2, h3 e inferiores.</p>"
      },
      {
        title: "5. Casos prácticos de mala semántica vs. maquetación profesional",
        content: "<p>Comparemos un mal contra un excelente ejemplo técnico:</p><pre style='background: var(--color-light); border: 1.5px solid var(--color-border); padding: 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; color: var(--color-dark); margin-bottom: 20px; overflow-x: auto;'>\n<!-- INCORRECTO: Sin peso semántico -->\n<div class='mi-tarjeta-blog'>\n  <div class='mi-titulo'>JavaScript Moderno</div>\n</div>\n\n<!-- CORRECTO: Semántica rigurosa -->\n<article class='blog-card'>\n  <h3 class='card-title'>JavaScript Moderno</h3>\n</article></pre><p>Con este único ajuste estructural, mejoras exponencialmente el rastreo y parseo de bots empresariales.</p>"
      },
      {
        title: "6. El impacto cuantificable de la semántica en conversiones de negocio",
        content: "<p>Finalmente, un código limpio es motor de ventas. Las páginas que adoptan HTML5 semántico absoluto experimentan un incremento directo en la velocidad de indexación y un menor costo por clic en campañas de posicionamiento pago.</p><p>Maquetar con rigor y respeto por los estándares es lo que diferencia a un programador de un verdadero arquitecto especializado de interfaces.</p>"
      }
    ]
  },
  "art_3": {
    title: "Estrategia Definitiva para Dominar Promesas y Async/Await en JS",
    category: "JavaScript",
    author: "Lucas Garmendia",
    date: "Hace 2 semanas",
    readTime: "7 min de lectura",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        title: "1. El Problema: El temido Callback Hell asíncrono",
        content: "<p>En los inicios de JavaScript, gestionar operaciones de entrada y salida asíncronas requería anidar funciones de retorno (callbacks). Al intentar encadenar múltiples peticiones API u operaciones de base de datos consecutivas, el código se volvía rápidamente indescifrable.</p><p>Este patrón caótico, apodado 'Callback Hell' o Pirámide de la Perdición, dificultaba enormemente la depuración y hacía colapsar proyectos enteros.</p>"
      },
      {
        title: "2. La anatomía de una Promesa y sus tres estados sagrados",
        content: "<p>Las Promesas introdujeron una abstracción limpia representando valores futuros. Toda promesa transita rigurosamente entre tres estados inmutables: <code>Pending</code> (pendiente de resolución), <code>Fulfilled</code> (ejecutada con éxito) y <code>Rejected</code> (fallida con un error controlado).</p><p>Al dominar esta máquina de estados, el desarrollador recupera el control secuencial de su arquitectura asíncrona de manera predecible.</p>"
      },
      {
        title: "3. La revolución de Async/Await: Azúcar sintáctico elegante",
        content: "<p>La incorporación de las palabras clave <code>async</code> y <code>await</code> en el estándar ES2017 transformó la forma de codificar JavaScript. Permite escribir flujos asíncronos con una apariencia de código secuencial síncrono clásico.</p><p>Esto simplifica notablemente la lectura para humanos, eliminando los molestos bloques encadenados de <code>.then()</code> y aclarando la jerarquía interna.</p>"
      },
      {
        title: "4. Control de errores exhaustivo con bloques Try/Catch",
        content: "<p>Uno de los errores más comunes al migrar de promesas clásicas a async/await es olvidar el control de errores. Cuando una promesa await falla, lanza una excepción de ejecución normal de JS.</p><p>Envolver estos llamados en estructuras <code>try/catch</code> nos permite centralizar el tratamiento de anomalías de red, caídas de servidor y caídas síncronas sin interrumpir el flujo del usuario.</p>"
      },
      {
        title: "5. Optimización extrema con Promise.all y ejecuciones paralelas",
        content: "<p>Errores gravísimos de rendimiento ocurren al encadenar múltiples 'await' secuenciales consecutivos independientes entre sí. Esto duplica o triplica innecesariamente el tiempo de espera global del cliente (efecto Cascada o Waterfall).</p><pre style='background: var(--color-light); border: 1.5px solid var(--color-border); padding: 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; color: var(--color-dark); margin-bottom: 20px; overflow-x: auto;'>\n// MALO: Bloquea secuencialmente\nconst a = await fetchA();\nconst b = await fetchB();\n\n// BUENO: Paralelismo veloz\nconst [resA, resB] = await Promise.all([fetchA(), fetchB()]);</pre><p>Mediante Promise.all la descarga se efectúa en paralelo, reduciendo drásticamente el tiempo de carga a la mitad.</p>"
      },
      {
        title: "6. Conclusión formativa: Pensar de forma asíncrona y reactiva",
        content: "<p>Dominar la asincronía en JavaScript es la piedra angular para programar en cualquier framework moderno (React, Vue, Node). Comprender cómo opera el Event Loop, junto con el correcto paralelismo de tareas, distingue a un desarrollador promedio de un estratega técnico excepcional.</p>"
      }
    ]
  },
  "art_4": {
    title: "Guía de Optimización Crítica: Consigue un 100 absoluto en Google Lighthouse",
    category: "SEO & Rendimiento",
    author: "Carlos Pérez",
    date: "Hace 2 semanas",
    readTime: "10 min de lectura",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        title: "1. El Problema: El coste millonario de una web lenta",
        content: "<p>En el comercio y los servicios digitales, cada milisegundo cuenta. Estudios revelan que retrasos insignificantes en la carga de una interfaz incrementan las tasas de abandono de usuarios en un 20% promedio.</p><p>Las aplicaciones sobrecargadas con scripts e imágenes gigantes alejan a los clientes potenciales y disminuyen inmediatamente la tasa de conversión.</p>"
      },
      {
        title: "2. Métricas vitales de Google Core Web Vitals (LCP, INP, CLS)",
        content: "<p>Google califica la calidad de tu experiencia digital en base a tres métricas cruciales: El <strong>Largest Contentful Paint (LCP)</strong> mide la velocidad de carga visual principal. El <strong>Interaction to Next Paint (INP)</strong> evalúa la interactividad general táctil. Y el <strong>Cumulative Layout Shift (CLS)</strong> penaliza saltos inesperados de elementos durante la carga.</p><p>Alinear el desarrollo de software a estas métricas es vital para alcanzar posiciones codiciadas del buscador.</p>"
      },
      {
        title: "3. Reducción drástica de Render-Blocking Resources",
        content: "<p>Los archivos CSS y librerías externas enlazadas de forma clásica bloquean activamente el renderizado del navegador, obligándolo a descargar y compilar todo el bloque antes de mostrar la primera línea útil al usuario.</p><p>La estrategia correcta consiste en extraer el 'Critical CSS' esencial para la primera vista superior, inyectarlo en línea (inline) dentro de un <code>&lt;style&gt;</code> directo del HTML, y diferir la carga del resto de hojas mediante atributos async y defer en scripts.</p>"
      },
      {
        title: "4. Tratamiento de imágenes: Compresión máxima con WebP y AVIF",
        content: "<p>Las imágenes PNG y JPEG sin procesar son responsables del 70% del peso muerto de los sitios web. Utilizar formatos modernos como WebP o AVIF reduce el tamaño de almacenamiento en un promedio de 60-80% manteniendo la calidad intacta.</p><p>Además, aplicar el atributo nativo <code>loading='lazy'</code> evita que el navegador gaste ancho de banda descargando recursos gráficos que aún permanecen ocultos bajo la primera pantalla de scroll de la terminal.</p>"
      },
      {
        title: "5. Fuentes tipográficas con font-display: swap",
        content: "<p>Un problema molesto de carga son las pantallas en blanco iniciales antes de descargar la fuente de Google Fonts. El uso sistemático de la propiedad CSS <code>font-display: swap</code> soluciona este fallo instantáneamente.</p><p>Le indica al navegador que use una fuente del sistema como sustituto inmediato durante la descarga remota y que la reemplace suavemente cuando esté lista, garantizando legibilidad instantánea.</p>"
      },
      {
        title: "6. Monitoreo constante y automatización en el flujo de Git",
        content: "<p>Para finalizar, la optimización nunca debe ser un hito aislado. Integra auditorías periódicas automatizadas en tu tubería de integración continua (CI/CD) para salvaguardar el rendimiento en cada actualización.</p><p>El riguroso respeto por la optimización de Lighthouse es una de las marcas de la casa que enseñamos y auditamos con exigencia en DevAcademy.</p>"
      }
    ]
  },
  "art_5": {
    title: "Accesibilidad Web Completa (a11y): De la teoría a la certificación WCAG 2.2",
    category: "HTML5 Semántico",
    author: "Sofía Domínguez",
    date: "Hace 3 semanas",
    readTime: "6 min de lectura",
    image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        title: "1. El Problema: Una internet excluyente para millones",
        content: "<p>A pesar de los avances tecnológicos, gran parte de la web sigue siendo inutilizable para personas con discapacidades sensoriales, cognitivas o motrices. Diseñar interfaces ciegas a los requisitos de accesibilidad restringe los derechos civiles digitales y limita el éxito comercial.</p><p>Asegurar la total accesibilidad es una responsabilidad legal, cívica y ética para cualquier programador en el mundo.</p>"
      },
      {
        title: "2. Principios Fundamentales del Estándar WCAG (POUR)",
        content: "<p>La guía mundial WCAG se sostiene sobre cuatro pilares inamovibles (POUR): Interfaces que sean <strong>Perceptibles</strong> (con texto alternativo e información visual clara), <strong>Operables</strong> (manejables mediante teclado sin obstáculos), <strong>Comprensibles</strong> (con lenguaje y flujos lógicos simples), e <strong>Robustas</strong> (compatibles con una amplia gama de tecnologías asistivas y navegadores).</p>"
      },
      {
        title: "3. El manejo estricto del foco de teclado en modales y diálogos",
        content: "<p>Uno de los mayores fallos de usabilidad ocurre al abrir ventanas o menús modales interactivos: el lector o teclado del navegador se queda 'atrapado' debajo del modal. Es necesario programar un bloqueo dinámico de foco ('Focus Trap').</p><p>Al cerrar el modal, el foco debe regresar exactamente al botón original que detonó la acción, evitando extraviar al usuario en la inmensidad de la página.</p>"
      },
      {
        title: "4. Paletas de color accesibles y contraste de alto contraste contrast-ratio",
        content: "<p>La legibilidad del texto requiere contrastes definidos. El nivel de conformidad 'AA' exige una relación de contraste mínima de <strong>4.5:1</strong> para textos regulares y 3:1 para títulos significativos de tamaño grande.</p><p>Ignorar esto dificulta la lectura para personas con fatiga visual o en entornos de sol extremo, degradando la usabilidad global.</p>"
      },
      {
        title: "5. Buenas prácticas del uso exacto de Atributos ARIA",
        content: "<p>La regla de oro de ARIA según los consorcios de accesibilidad de Internet es: <i>'La mejor herramienta ARIA es no usar ARIA en absoluto'</i>. Siempre es preferible recurrir a etiquetas nativas con peso semántico.</p><p>Inyectar atributos complejos como <code>aria-live</code> o `role='button'` innecesariamente en divs produce comportamientos erráticos, pesados y difíciles de depurar.</p>"
      },
      {
        title: "6. El ecosistema de Auditorías: Herramientas recomendadas",
        content: "<p>Finalmente, utiliza herramientas de análisis estático como Axe DevTools e integra auditorías mediante teclado ciego como parte de tus procesos de aseguramiento de calidad.</p><p>Lograr un código inclusivo, validado y con certificación WCAG 2.2 es el pináculo de la responsabilidad ingenieril que impartimos en la escuela.</p>"
      }
    ]
  },
  "art_6": {
    title: "Cómo armar un Porfolio Senior que despierte el interés de reclutadores tech",
    category: "Orientación Profesional",
    author: "Lucas Garmendia",
    date: "Hace 1 mes",
    readTime: "9 min de lectura",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
    sections: [
      {
        title: "1. El Problema: El mar de porfolios idénticos y sin sustancia",
        content: "<p>La mayoría de los desarrolladores juniors cometen el error de rellenar sus porfolios con los mismos proyectos calcados de tutoriales estándar (una calculadora, un clon de Netflix sin terminar o listas ToDo vacías).</p><p>Los reclutadores y líderes técnicos senior de empresas internacionales identifican estos clones a los tres segundos de escaneo, descartando carpetas sin valor intelectual genuino.</p>"
      },
      {
        title: "2. Diseñar basándose en Casos de Estudio reales y tangibles",
        content: "<p>Un reclutador busca soluciones inteligentes de negocio, no simples piezas de software aisladas. Enseña cómo identificaste el cuello de botella original de carga, cuáles eran los objetivos esperados, tu proceso paso a paso de desarrollo, las dificultades del transcurso y la resolución definitiva.</p><p>Acompañar cada proyecto de un completo 'Case Study' con gráficas de rendimiento triplica de inmediato tu valor de contratación laboral.</p>"
      },
      {
        title: "3. La jerarquía de repositorios del perfil de GitHub profesional",
        content: "<p>Tu perfil de GitHub es tu verdadera carta de presentación escolar. Configura adecuadamente el archivo README de perfil, ancla tus mejores proyectos de código abierto bien organizados y prioriza la limpieza absoluta en la historia de confirmación de cambios (commits).</p><p>Este nivel describe de forma elocuente tu disciplina táctica y pulcritud para acoplarte a flujos complejos de trabajo ágiles de equipos experimentados.</p>"
      },
      {
        title: "4. Expresando tus habilidades de forma honesta, sobria y literal",
        content: "<p>Huye sistemáticamente de barra de porcentajes de lenguaje poco realistas (como '85% JavaScript'). La ingeniería de software requiere sobriedad. Explica claramente en qué entornos pusiste en marcha las tecnologías, tus integraciones exitosas con backends y tus certificaciones legítimas.</p><p>El vocabulario profesional robusto es tu mejor herramienta para demostrar maestría y ganar el respeto de evaluadores.</p>"
      },
      {
        title: "5. Ejemplos de READMEs excelentes para tus proyectos de bandera",
        content: "<p>Asegúrate de que cada repositorio cuente con las siguientes pautas claras:</p><pre style='background: var(--color-light); border: 1.5px solid var(--color-border); padding: 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; color: var(--color-dark); margin-bottom: 20px; overflow-x: auto;'>\n# Nombre del Proyecto\n- **¿Qué resuelve?**: Propósito literal.\n- **Librerías principales**: React, Vite, Node.\n- **Instrucciones rápidas**: npm run dev.\n- **Demostración**: Enlace público.</pre><p>Este orden demuestra consideración por otros desarrolladores que necesiten ejecutar, depurar o extender tus códigos.</p>"
      },
      {
        title: "6. Estrategia y técnicas clave para destacar en Entrevistas Técnicas",
        content: "<p>Para cerrar, la mejor porfolio no compensará miedos o debilidades lógicas. Practica resolver retos algorítmicos en voz alta con mentores, aclara con naturalidad lo que desconoces de forma constructiva, y asume el reto formativo como un camino infinito de mejora integral.</p><p>DevAcademy incluye simulacros de reclutamiento y revisión personalizada de porfolios para propulsar carreras seniores hacia el posicionamiento internacional.</p>"
      }
    ]
  }
};
