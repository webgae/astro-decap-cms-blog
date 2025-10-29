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

1.  **Limpieza:** Se eliminaron todos los archivos y configuraciones relacionados con Decap CMS.
2.  **Configuración de DatoCMS:**
    *   Se creó una cuenta y un proyecto en DatoCMS.
    *   Se definió el modelo de contenido `Post` (o `Article`) con campos como `title`, `slug`, `body`, `coverImage`, `_firstPublishedAt`.
    *   Se creó un post de prueba y se publicó en DatoCMS.
    *   Se obtuvo el `Read-only API token` de DatoCMS y se añadió al archivo `.env` como `DATO_API_TOKEN`.
    *   Se añadió `PUBLIC_DATO_API_URL=https://graphql.datocms.com/` al archivo `.env`.
3.  **Adaptación del Código Astro:**
    *   Las páginas `src/pages/blog/[slug].astro` y `src/pages/blog/[...page].astro` han sido modificadas para:
        *   Conectarse a la API GraphQL de DatoCMS.
        *   Usar el `DATO_API_TOKEN` para la autorización.
        *   Adaptarse a la estructura de datos de DatoCMS (sin el objeto `attributes` anidado).
        *   Convertir la fecha (`_firstPublishedAt`) a un objeto `Date` para el componente `FormattedDate`.
        *   Manejar la paginación correctamente.
        *   Se han movido las definiciones de `DATO_API_URL` y `DATO_API_TOKEN` dentro de las funciones `getStaticPaths` y el cuerpo del componente para resolver problemas de ámbito.

### **Problema Actual (Pendiente de Solución):**

Actualmente, la página principal del blog (`/blog`) está mostrando un error en la consola (y posiblemente en la página) relacionado con la obtención del conteo de posts de DatoCMS:

`TypeError: Cannot read properties of undefined (reading 'count')`

Esto indica que la respuesta de DatoCMS para la consulta `_allPostsMeta` no está devolviendo la estructura esperada, o que hay un problema de permisos con el token.

### **Próximo Paso:**

El siguiente paso es depurar este error. Necesitamos ver la respuesta exacta que DatoCMS está enviando para la consulta `_allPostsMeta`.

---

## 🚀 Despliegue en Vercel

Este proyecto está configurado para un despliegue sencillo en [Vercel](https://vercel.com/).

1.  **Conecta tu repositorio:** En Vercel, importa tu repositorio de GitHub.
2.  **Configuración automática:** Vercel debería detectar automáticamente que es un proyecto Astro y configurar los comandos de build.
3.  **Variables de Entorno:** Asegúrate de configurar `DATO_API_TOKEN` (y `PUBLIC_DATO_API_URL` si la usas) en el panel de Vercel.

---