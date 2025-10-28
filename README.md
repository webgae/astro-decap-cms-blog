# Astro Blog con Decap CMS

Este es un blog moderno construido con Astro, utilizando Decap CMS para la gestión de contenido. Optimizado para rendimiento y SEO, y diseñado para ser desplegado en Vercel.

## 📝 Flujo de Trabajo con Decap CMS y Cloudinary

Para crear y gestionar contenido con imágenes optimizadas:

1.  **Crea/Edita un Post en Decap CMS:**
    *   Accede a `http://localhost:4321/admin/` (o la URL de tu sitio desplegado).
    *   Crea o edita un post. Al subir imágenes, estas se guardarán automáticamente en Cloudinary.
    *   Publica el post.

2.  **Aprueba los Cambios en GitHub:**
    *   Decap CMS creará una Pull Request (PR) en tu repositorio de GitHub.
    *   Ve a GitHub, revisa la PR y haz "Merge" para integrar los cambios en la rama `main`.

3.  **Sincroniza tu Proyecto Local:**
    *   Abre tu terminal en la raíz del proyecto.
    *   Ejecuta `git pull` para descargar los nuevos posts y cambios a tu máquina local.
    *   Tu servidor de desarrollo de Astro (`npm run dev`) debería detectar los cambios y actualizar tu sitio.

---

## 🚀 Comandos Esenciales

| Comando           | Acción                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Instala las dependencias                         |
| `npm run dev`     | Inicia el servidor de desarrollo en localhost:4321 |
| `npm run build`   | Construye el sitio para producción               |
| `npm run preview` | Vista previa del build local                     |
| `npm run cms`     | Inicia el servidor local de Decap CMS (para desarrollo) |

## 📝 Gestión de Contenido con Decap CMS: Mini-Tutorial

Este proyecto utiliza [Decap CMS](https://decapcms.org/) para la gestión de contenido, con GitHub como backend.

### 1. Acceso al Panel de Administración (Login)

Para acceder al panel de administración de Decap CMS:

1.  **Inicia tu servidor de desarrollo de Astro:** Abre tu terminal en la raíz del proyecto y ejecuta `npm run dev`.
2.  **Inicia el servidor de Decap CMS:** En *otra* terminal, ejecuta `npm run cms`.
3.  **Navega al panel:** Abre tu navegador y ve a `http://localhost:4321/admin/`.
4.  **Autenticación:** Se te pedirá que te autentiques. Dependiendo de tu configuración (local o desplegada), esto se hará a través de:
    *   **Local:** Si `local_backend: true` está activo, accederás directamente.
    *   **GitHub:** Si estás usando el backend de GitHub, serás redirigido a GitHub para autorizar la aplicación.

### 2. Configuración de Aplicaciones OAuth de GitHub

Para que Decap CMS pueda interactuar con tu repositorio de GitHub (guardar cambios, etc.), necesita una aplicación OAuth de GitHub. Se recomienda tener una para desarrollo local y otra para producción (Vercel).

#### a) Para Desarrollo Local (localhost)

1.  **Ve a GitHub:** Inicia sesión en GitHub y ve a la configuración de tu cuenta (o de tu organización) > **Developer settings > OAuth Apps**.
2.  **Crea una Nueva App:** Haz clic en **"New OAuth App"**.
3.  **Detalles de la Aplicación:**
    *   **Application name:** Un nombre descriptivo (ej. "Decap CMS Local Dev").
    *   **Homepage URL:** `http://localhost:4321` (o el puerto que use tu servidor de desarrollo de Astro).
    *   **Authorization callback URL:** `http://localhost:4321/admin/`.
4.  **Obtén el Client ID:** GitHub te proporcionará un **Client ID**.

#### b) Para Producción (Vercel)

1.  **Ve a GitHub:** Inicia sesión en GitHub y ve a la configuración de tu cuenta (o de tu organización) > **Developer settings > OAuth Apps**.
2.  **Crea una Nueva App:** Haz clic en **"New OAuth App"**.
3.  **Detalles de la Aplicación:**
    *   **Application name:** Un nombre descriptivo (ej. "Decap CMS Vercel Prod").
    *   **Homepage URL:** La URL de tu sitio desplegado en Vercel (ej. `https://tu-app-vercel.vercel.app`).
    *   **Authorization callback URL:** `https://tu-app-vercel.vercel.app/admin/`.
4.  **Obtén el Client ID:** GitHub te proporcionará un **Client ID**.

### 3. Configuración de `public/admin/config.yml`

Una vez que tengas los Client IDs, debes configurar tu `config.yml`:

*   **Para Desarrollo Local:**
    Asegúrate de que la sección `backend` tenga `local_backend: true`. No necesitas añadir el `client_id` aquí si usas el backend local.

    ```yaml
    backend:
      name: github # Aunque uses local_backend, el nombre del backend principal sigue siendo GitHub
      repo: tu-usuario/tu-repositorio
      branch: main
    local_backend: true # <-- Activa esto para desarrollo local
    ```

*   **Para Producción (Vercel):**
    Añade el `client_id` de tu aplicación OAuth de GitHub para Vercel en la sección `backend` de tu `public/admin/config.yml`. **Recuerda que `local_backend: true` debe estar desactivado o eliminado para producción.**

    ```yaml
    backend:
      name: github
      repo: tu-usuario/tu-repositorio # Asegúrate de que sea tu repositorio
      branch: main # O la rama que uses
      client_id: TU_CLIENT_ID_DE_GITHUB_VERCEL # <-- ¡Añade aquí tu Client ID de Vercel!
    ```
    **Importante:** Reemplaza `tu-usuario/tu-repositorio` con el nombre real de tu repositorio y `TU_CLIENT_ID_DE_GITHUB_VERCEL` con el Client ID que obtuviste de GitHub para Vercel.

### 4. Reflejando Cambios de Decap CMS en Local

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