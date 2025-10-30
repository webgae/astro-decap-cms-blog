const DATO_API_URL = 'https://graphql.datocms.com/';
const DATO_API_TOKEN = import.meta.env.DATO_API_TOKEN;

/**
 * Realiza una consulta a la API GraphQL de DatoCMS.
 * @param {string} query La consulta GraphQL a ejecutar.
 * @param {object} [variables] Las variables para la consulta.
 * @returns {Promise<any>} Los datos de la respuesta.
 * @throws {Error} Si la consulta falla o devuelve errores.
 */
export async function fetchDatoCMS({ query, variables }) {
  const response = await fetch(DATO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${DATO_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.error("!!        ERRORES DESDE DATOCMS API         !!");
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.error(JSON.stringify(result.errors, null, 2));
    console.error("----------------------------------------------");
    console.error("Query que falló:");
    console.error(query);
    console.error("----------------------------------------------");
    throw new Error('La consulta a DatoCMS falló. Revisa la consola del servidor para ver los detalles.');
  }

  if (!result.data) {
    console.error('No se recibieron datos de DatoCMS:', result);
    throw new Error('No se recibieron datos de la API. Verifica la query y los permisos del token.');
  }

  return result.data;
}

/**
 * Genera una URL optimizada para una imagen de DatoCMS.
 * @param {object} params
 * @param {string} params.src La URL original de la imagen.
 * @param {number} [params.width] El ancho deseado de la imagen.
 * @param {number} [params.height] La altura deseada de la imagen.
 * @param {('blur' | 'crop' | 'fit' | 'fill' | 'max')} [params.fit='crop'] El modo de ajuste de la imagen.
 * @param {('jpg' | 'png' | 'webp' | 'avif' | 'gif')} [params.format='webp'] El formato de salida.
 * @returns {string} La URL optimizada de la imagen.
 */
export function getOptimizedImageUrl({ src, width, height, fit = 'crop', format = 'webp' }) {
  if (!src) {
    // Devuelve una imagen de marcador de posición o una cadena vacía si no hay src
    return 'https://www.datocms-assets.com/placeholder.jpg'; // O ajusta según tus necesidades
  }

  const url = new URL(src);
  if (width) url.searchParams.set('w', String(width));
  if (height) url.searchParams.set('h', String(height));
  url.searchParams.set('fit', fit);
  url.searchParams.set('fm', format);
  url.searchParams.set('auto', 'compress'); // Compresión automática

  return url.toString();
}