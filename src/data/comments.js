/**
 * comments.js — Comentarios semilla de la sección "Comentarios".
 *
 * buildSeedComments(articleId) devuelve 2 comentarios iniciales únicos por
 * artículo (los ids se prefijan con el id del artículo para no colisionar).
 * Es una función pura que simula el "primer contenido" que vería un usuario
 * antes de que añada los suyos; después la lista se gestiona en estado de
 * DetallePage y se persiste en localStorage.
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