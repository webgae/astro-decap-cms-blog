# Astro Blog con DatoCMS

Este es un blog moderno construido con Astro, ahora utilizando DatoCMS para la gestión de contenido. Optimizado para rendimiento y SEO, y diseñado para ser desplegado en Vercel.

---

## 🚀 Comandos Esenciales

| Comando           | Acción                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Instala las dependencias                         |
| `npm run dev`     | Inicia el servidor de desarrollo en localhost:4321 |
| `npm run build`   | Construye el sitio para producción               |
| `npm run preview` | Vista previa del build local                     |

---

## 📝 Estado Actual del Proyecto: Integración con DatoCMS

Hemos migrado la gestión de contenido de Decap CMS a DatoCMS para una experiencia de edición online más fluida y sin los problemas de autenticación de Git.

### **Progreso Realizado:**

*   **Limpieza:** Se eliminaron todos los archivos y configuraciones relacionados con Decap CMS.
*   **Configuración de DatoCMS:**
    *   Se creó una cuenta y un proyecto en DatoCMS.
    *   Se definió el modelo de contenido `Articulo` con campos como `titulo`, `contenidoPost`, `imagen`, `_firstPublishedAt`, `categorias` y `metadescription` (como "Single-line String").
    *   Se creó un post de prueba y se publicó en DatoCMS.
    *   Se obtuvo el `Read-only API token` de DatoCMS y se añadió al archivo `.env` como `DATO_API_TOKEN`.
*   **Adaptación y Mejoras del Código Astro:**
    *   Las páginas `src/pages/blog/[slug].astro` y `src/pages/blog/[...page].astro` han sido refactorizadas para:
        *   Conectarse a la API GraphQL de DatoCMS.
        *   Usar el `DATO_API_TOKEN` para la autorización.
        *   Adaptarse a la estructura de datos de DatoCMS (sin el objeto `attributes` anidado).
        *   Convertir la fecha (`_firstPublishedAt`) a un objeto `Date` para el componente `FormattedDate`.
        *   Manejar la paginación de forma robusta con `paginate`.
        *   Asegurar que los artículos nuevos se generen correctamente tras una reconstrucción del sitio.
    *   **SEO:**
        *   El campo `metadescription` de DatoCMS se utiliza ahora para las meta descripciones de los artículos, con una lógica de fallback inteligente que genera un extracto del contenido si no está presente.
    *   **Estilos:**
        *   Los bloques de código (`<pre><code>`) y el código en línea (`<code>`) han sido estilizados para una mejor legibilidad y presentación.
        *   El botón de suscripción en el footer ha sido mejorado visualmente para resaltar.
    *   **Funcionalidad:**
        *   Se ha añadido un buscador interactivo a la página principal del blog para filtrar artículos por título en tiempo real.
        *   La función `slugify` ha sido unificada en `src/utils.js` para asegurar la consistencia en la generación de URLs.
        *   Las páginas de categorías (`src/pages/blog/categorias/[id].astro`) ahora muestran los artículos usando el componente `ArticleCard` y tienen un espaciado mejorado.
        *   Los enlaces legales del footer se muestran consistentemente en todas las páginas del blog.

---

## 🚀 Despliegue en Vercel

Este proyecto está configurado para un despliegue sencillo en [Vercel](https://vercel.com/).

1.  **Conecta tu repositorio:** En Vercel, importa tu repositorio de GitHub.
2.  **Configuración automática:** Vercel debería detectar automáticamente que es un proyecto Astro y configurar los comandos de build.
3.  **Variables de Entorno:** Asegúrate de configurar `DATO_API_TOKEN` (y `PUBLIC_DATO_API_URL` si la usas) en el panel de Vercel.

---