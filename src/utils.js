// src/utils.js
export function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}

export function getFirstImage(content) {
    if (!content) return null;
    const match = content.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/);
    return match ? match[1] : null;
}
