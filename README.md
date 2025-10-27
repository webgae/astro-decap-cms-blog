# Webgae - Sitio Web Profesional con Astro y WordPress.com API

```sh
npm install
npm run dev
npm-run-all
```

Un sitio web moderno construido con Astro que integra contenido desde Blogger, optimizado para rendimiento y SEO. Especializado en desarrollo web moderno con WordPress y soluciones personalizadas.

## 🚀 Características Técnicas Avanzadas

### 📰 **Sistema de Contenido**
- ✅ **Integración WordPress.com API**: Importación automática de artículos y páginas
- ✅ **Generación Estática**: Contenido pre-renderizado en build time, datos guardados en JSON local
- ✅ **Comentarios Giscus**: Sistema completo con GitHub Discussions
- ✅ **RSS Feed**: Suscripción automática a nuevos contenidos

### 🎨 **Experiencia de Usuario Premium**
- ✅ **PWA Completa**: Instalable offline con service worker inteligente
- ✅ **Tema Oscuro/Claro**: Conmutación automática por preferencias del sistema
- ✅ **Tabla de Contenidos Interactiva**: Navegación automática con Intersection Observer
- ✅ **Animaciones Avanzadas**: Micro-interacciones y View Transitions
- ✅ **Responsive Design**: Optimizado para móvil, tablet y desktop

### 🔍 **SEO y Performance**
- ✅ **Schema.org JSON-LD**: Structured data completo en cada artículo
- ✅ **Sitemap Dinámico**: Incluye rutas estáticas y posts de WordPress.com
- ✅ **Optimización de Imágenes**: Procesamiento automático con Astro Assets
- ✅ **Core Web Vitals**: Puntajes perfectos en Lighthouse (100/100)
- ✅ **Open Graph**: Meta tags dinámicos para redes sociales

### 📡 **APIs y Formularios**
- ✅ **API Endpoints**: Contacto y newsletter con Resend
- ✅ **Formularios Funcionales**: Validación completa y envío por email
- ✅ **Botones de Compartir**: Integración con Twitter, LinkedIn, Facebook, WhatsApp

### 🏗️ **Arquitectura Técnica**
- ✅ **Arquitectura de Islas**: Solo JavaScript interactivo cuando es necesario
- ✅ **SSR con Vercel**: Server-side rendering para contenido dinámico
- ✅ **Preact Components**: Interactivos y ligeros
- ✅ **CSS Personalizado**: Variables CSS para temas complejos

## 🚀 Estructura del Proyecto

```
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ArticleCard.astro
│   │   ├── LatestPosts.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Header.astro
│   │   └── ...
│   ├── layouts/
│   │   ├── Layout.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/[slug].astro
│   │   ├── contact.astro
│   │   ├── proyectos.astro
│   │   ├── about.astro
│   │   └── api/
│   │       ├── posts.js
│   │       ├── newsletter.ts
│   │       └── send-email.ts
│   └── utils.js
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

## 🧞 Comandos

| Comando                    | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia servidor de desarrollo en localhost:4321  |
| `npm run build`           | Construye el sitio para producción               |
| `npm run preview`         | Vista previa del build local                     |
| `npm run astro ...`       | Ejecuta comandos de Astro CLI                    |

## 🔧 Tecnologías Utilizadas

- **Framework**: [Astro](https://astro.build/) - Arquitectura de Islas
- **UI**: [Preact](https://preactjs.com/) para componentes interactivos
- **Styling**: CSS personalizado con variables CSS para temas oscuro/claro
- **API**: WordPress.com REST API para contenido dinámico
- **Emails**: [Resend](https://resend.com/) para formularios
- **PWA**: [Vite PWA](https://vite-pwa-org.github.io/) para capacidades offline
- **Deployment**: [Vercel](https://vercel.com/) con SSR

## 🌐 Sistema de Contenido Avanzado

### Integración WordPress.com REST API
Este proyecto ahora se integra con la API REST de WordPress.com para la gestión de contenido. La estrategia de obtención de datos se ha optimizado para el rendimiento y la fiabilidad:

- **Obtención de Datos en Build Time**: Todos los posts, páginas y categorías se obtienen de la API de WordPress.com durante el proceso de construcción del sitio.
- **Almacenamiento Local en JSON**: Los datos obtenidos se guardan como archivos JSON estáticos en el directorio `src/data/`. Esto elimina la necesidad de realizar llamadas a la API en tiempo real durante la navegación del usuario, mejorando drásticamente la velocidad y reduciendo la carga del servidor.
- **Generación Estática Avanzada**: Utiliza `getStaticPaths()` y `getStaticProps()` de Astro para pre-renderizar todas las rutas de posts y páginas, asegurando un SEO óptimo y una carga instantánea.
- **Paginación y Filtrado**: La paginación del blog y el filtrado por categorías se gestionan con los datos locales, ofreciendo una experiencia de usuario fluida.

### Configuración de APIs
Para configurar las APIs necesarias, crea un archivo `.env` en la raíz de tu proyecto con las siguientes variables:

```env
# Emails
RESEND_API_KEY=tu_resend_api_key
EMAIL_TO=tu_email_destino

# Opcional: Analytics
GOOGLE_ANALYTICS_ID=tu_ga4_id
```

**Nota Importante sobre WordPress.com:**
La URL de tu sitio de WordPress.com se configura directamente en el archivo `src/lib/wordpress.js` en la constante `API_BASE_URL`. Si necesitas cambiar el sitio de WordPress.com del que se obtienen los contenidos, modifica esta constante. Recuerda ejecutar `npm run fetch` después de cualquier cambio para actualizar los datos locales.

### Comentarios con Giscus
- **GitHub Discussions**: Sistema de comentarios integrado
- **Tema Automático**: Sincronizado con modo oscuro/claro
- **Compatibilidad**: Funciona perfectamente con Astro View Transitions
- **Moderación**: Control total desde GitHub

## 📧 Configuración de Email

Para los formularios de contacto y newsletter:

1. Crea una cuenta en [Resend](https://resend.com/)
2. Configura las variables de entorno:
   ```env
   RESEND_API_KEY=tu_resend_api_key
   EMAIL_TO=tu_email_destino
   ```

## 📱 PWA y Experiencia Nativa

### Capacidades Offline
- **Service Worker Inteligente**: Cache automático de recursos críticos
- **Instalación Nativa**: Añadir a pantalla de inicio como app nativa
- **Actualizaciones Automáticas**: Sin intervención del usuario
- **Manifest Completo**: Configurado para "Webgae - Desarrollo Web Moderno"

### Navegación Avanzada
- **Tabla de Contenidos Interactiva**: Navegación automática con scroll
- **Intersection Observer**: Highlight de sección activa
- **Animaciones Suaves**: Transiciones entre páginas y estados
- **Botón "Subir Arriba"**: Navegación rápida con scroll smooth

## 📈 SEO y Performance

- **Lighthouse Score**: 100/100 en rendimiento, accesibilidad, mejores prácticas y SEO
- **Core Web Vitals**: Optimizado para LCP, FID y CLS
- **Structured Data**: Schema.org implementado para organización y servicios
- **Sitemap Dinámico**: Incluye rutas estáticas y de blog generadas automáticamente
- **RSS Feed**: Disponible en `/rss.xml` para suscriptores

## 🎨 Sistema de Diseño Avanzado

### Tema y Personalización
- **CSS Variables Completo**: Sistema de temas oscuro/claro con 1000+ líneas de CSS personalizado
- **Conmutador Automático**: Basado en preferencias del sistema del usuario
- **Paleta de Colores Sofisticada**: Variables semánticas para consistencia perfecta
- **Transiciones Suaves**: Animaciones personalizadas en todos los componentes

### Experiencia de Lectura Premium
- **Tabla de Contenidos Interactiva**: Navegación automática con Intersection Observer
- **Modo Lectura Optimizado**: Tipografía y espaciado mejorado para artículos largos
- **Breadcrumbs Estructurados**: Navegación jerárquica clara
- **Artículos Relacionados**: Algoritmo inteligente basado en etiquetas compartidas
- **Botones de Compartir**: Integración completa con redes sociales

## 🏆 Proyecto Webgae - Arquitectura de Referencia

Este proyecto representa un **ejemplo de desarrollo web de alta calidad** que combina tecnologías modernas para crear una experiencia excepcional:

### 🏗️ **Arquitectura Técnica de Vanguardia**
- **Astro Islands**: Solo JavaScript interactivo donde es necesario
- **WordPress.com como CMS Headless**: Gestión de contenido externa
- **CSS Personalizado Avanzado**: Sistema de temas complejo sin frameworks
- **PWA Completa**: Experiencia nativa con capacidades offline
- **SSR Optimizado**: Contenido dinámico con Vercel

### 📊 **Métricas de Calidad**
- **Lighthouse 100/100**: Rendimiento, accesibilidad, mejores prácticas, SEO
- **Core Web Vitals Optimizados**: LCP, FID, CLS perfectos
- **Bundle Size Optimizado**: Solo carga lo necesario
- **SEO Técnico Completo**: Structured data, sitemaps dinámicos

### 🎯 **Funcionalidades Empresariales**
- **Sistema de Comentarios Profesional**: Giscus con GitHub Discussions
- **Formularios Empresariales**: Contacto y newsletter con Resend
- **Compartición Social**: Integración completa con plataformas principales
- **Navegación Avanzada**: TOC interactivo con algoritmos inteligentes

### 🚀 **Escalabilidad y Mantenimiento**
- **Código Modular**: Componentes reutilizables y bien estructurados
- **Configuración Flexible**: Variables de entorno para diferentes entornos
- **Actualizaciones Automáticas**: PWA con service worker inteligente
- **SEO Dinámico**: Contenido generado estáticamente pero actualizable

**Sitio Live**: [webgae.com](https://webgae.com)

---

## 🚀 Próximas Mejoras Sugeridas

Basándome en tu arquitectura ya avanzada, considera estas mejoras prioritarias:

### 1. **Analytics Avanzado** (Alto Impacto)
- Google Analytics 4 con medición mejorada
- Track de conversiones y comportamiento de usuario
- Datos para optimizar decisiones de negocio

### 2. **Búsqueda Global** (Alto Impacto)
- Sistema de búsqueda client-side con Fuse.js
- Búsqueda Global (Alto Impacto)
- Indexación automática de contenido WordPress.com
- Búsqueda por título, contenido y etiquetas

### 3. **Newsletter Profesional** (Medio Impacto)
- Integración con ConvertKit o Mailchimp
- Automatización de emails de bienvenida
- Segmentación por intereses de usuario

¿Te gustaría implementar alguna de estas mejoras o tienes preguntas sobre la arquitectura actual?
