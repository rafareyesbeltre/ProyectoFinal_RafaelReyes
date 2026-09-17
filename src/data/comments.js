/**
 * comments.js — Comentarios de ejemplo para la sección "Comentarios".
 *
 * buildSeedComments(articleId) prepara 2 comentarios únicos por artículo (los
 * ids llevan el id del artículo para no chocar). Es una función pura que
 * simula el contenido previo; a partir de ahí la lista la gestiona
 * DetallePage y se guarda en localStorage.
 */

export function buildSeedComments(articleId) {
  return [
    {
      id: `${articleId}_seed_1`,
      author: "Lucía Ferrer",
      date: "Hace 2 horas",
      text: "Excelente artículo. Me aclaró por fin la diferencia entre microtareas y macrotareas; lo apliqué al renderizado de mi tabla de datos y noté la fluidez.",
    },
    {
      id: `${articleId}_seed_2`,
      author: "Marcos Vitale",
      date: "Hace 1 día",
      text: "Muy completo. ¿Algún tutorial recomendado para profundizar en los ejemplos que mencionáis al final?",
    },
  ];
}