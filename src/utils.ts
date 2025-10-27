// Función para crear un "slug" amigable para la URL a partir de un texto
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Reemplaza espacios con -
    .replace(/[^\w-]+/g, '') // Elimina caracteres no válidos
    .replace(/--+/g, '-') // Reemplaza múltiples - con uno solo
    .replace(/^-+/, '') // Elimina - del inicio
    .replace(/-+$/, ''); // Elimina - del final
}

// Función para extraer la primera imagen del contenido HTML
export function getFirstImage(htmlContent: string) {
    if (!htmlContent) return null;
    const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
}