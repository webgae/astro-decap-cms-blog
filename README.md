# Astro Blog con Decap CMS

Este es un blog moderno construido con Astro, utilizando Decap CMS para la gestión de contenido. Optimizado para rendimiento y SEO, y diseñado para ser desplegado en Vercel.

## 🚀 Comandos Esenciales

| Comando           | Acción                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Instala las dependencias                         |
| `npm run dev`     | Inicia el servidor de desarrollo en localhost:4321 |
| `npm run build`   | Construye el sitio para producción               |
| `npm run preview` | Vista previa del build local                     |
| `npm run cms`     | Inicia el servidor local de Decap CMS (para desarrollo) |

## 📝 Gestión de Contenido con Decap CMS

Este proyecto utiliza [Decap CMS](https://decapcms.org/) para la gestión de contenido, con GitHub como backend.

### Configuración Local de Decap CMS

Para usar Decap CMS en tu entorno de desarrollo local:

1.  Asegúrate de que `local_backend: true` esté configurado en `public/admin/config.yml`.
2.  Inicia el servidor de desarrollo de Astro: `npm run dev`.
3.  En otra terminal, inicia el servidor de Decap CMS: `npm run cms`.
4.  Accede al panel de administración en `http://localhost:4321/admin/`.

### Configuración de Decap CMS para Vercel (Producción)

Para que Decap CMS funcione con tu sitio desplegado en Vercel, necesitas configurar una aplicación OAuth de GitHub:

1.  **Crea una Aplicación OAuth en GitHub:**
    *   Ve a la configuración de tu cuenta de GitHub (o de tu organización) > **Developer settings > OAuth Apps**.
    *   Haz clic en **"New OAuth App"**.
    *   **Application name:** Un nombre descriptivo (ej. "Decap CMS para mi blog en Vercel").
    *   **Homepage URL:** La URL de tu sitio desplegado en Vercel (ej. `https://tu-app-vercel.vercel.app`).
    *   **Authorization callback URL:** `https://tu-app-vercel.vercel.app/admin/`.
    *   GitHub te proporcionará un **Client ID**.

2.  **Actualiza `public/admin/config.yml`:**
    Añade el `client_id` de tu aplicación OAuth de GitHub en la sección `backend` de tu `public/admin/config.yml`:

    ```yaml
    backend:
      name: github
      repo: tu-usuario/tu-repositorio # Asegúrate de que sea tu repositorio
      branch: main # O la rama que uses
      client_id: TU_CLIENT_ID_DE_GITHUB # <-- ¡Añade aquí tu Client ID!
    ```
    **Importante:** Reemplaza `tu-usuario/tu-repositorio` con el nombre real de tu repositorio y `TU_CLIENT_ID_DE_GITHUB` con el Client ID que obtuviste de GitHub.

### Reflejando Cambios de Decap CMS en Local

Cuando realizas cambios en Decap CMS (ya sea en local o en el panel desplegado) y estos se guardan en GitHub, para verlos en tu servidor de desarrollo local:

1.  Abre tu terminal en la raíz del proyecto.
2.  Ejecuta `git pull origin main` (o la rama correspondiente) para descargar los cambios.
3.  Reinicia tu servidor de desarrollo: `npm run dev`.

## 🚀 Despliegue en Vercel

Este proyecto está configurado para un despliegue sencillo en [Vercel](https://vercel.com/).

1.  **Conecta tu repositorio:** En Vercel, importa tu repositorio de GitHub.
2.  **Configuración automática:** Vercel debería detectar automáticamente que es un proyecto Astro y configurar los comandos de build.
3.  **Variables de Entorno:** Si tu proyecto utiliza variables de entorno (ej. `RESEND_API_KEY`), configúralas en el panel de Vercel.

## 🛠️ Solución de Problemas Comunes

*   **Permisos de Decap CMS:** Si Decap CMS no puede guardar cambios, verifica que la aplicación OAuth de GitHub tenga los permisos adecuados en la configuración de tu organización de GitHub.
*   **Contenido en Texto Plano:** Si el contenido de los posts se muestra sin formato HTML, asegúrate de que `src/pages/blog/[slug].astro` esté usando `entry.rendered.html` correctamente.
*   **Imágenes no cargan:** Verifica que las rutas de las imágenes sean correctas y que `BlogPost.astro` use `heroImage.src`.

---