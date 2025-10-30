// src/utils.js
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Reemplaza espacios con -
        .replace(/[^\w\-]+/g, '') // Elimina caracteres no válidos
        .replace(/\-\-+/g, '-') // Reemplaza múltiples - con uno solo
        .replace(/^-+/, '') // Elimina - del inicio
        .replace(/-+$/, ''); // Elimina - del final
}

export function getFirstImage(content) {
    if (!content) return null;
    const match = content.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/);
    return match ? match[1] : null;
}
