---
title: "Consejos para optimizar el SEO en proyectos con Astro"
pubDate: "Jan 28 2025"
heroImg: "/images/placeholder-post-6.png"
tags: ["astro", "next", "svelte"]
---

## Configuración Inicial

### Instalación del integrador SEO

```bash
# Instalar astro-seo
npm install astro-seo

# O usando yarn
yarn add astro-seo

# O usando pnpm
pnpm add astro-seo
```

### Configuración Básica

```astro
---
// src/layouts/Layout.astro
import { SEO } from 'astro-seo';

const { title, description } = Astro.props;
---
<html lang="es">
  <head>
    <SEO
      title={title}
      description={description}
      openGraph={{
        basic: {
          title: title,
          type: "website",
          image: "https://tudominio.com/og-image.jpg",
        }
      }}
      twitter={{
        creator: "@tuusuario",
        card: "summary_large_image",
      }}
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Metaetiquetas Esenciales

### Configuración de metaetiquetas

```astro
---
// src/components/MetaTags.astro
const { title, description, image, url } = Astro.props;
---
<!-- SEO básico -->
<title>{title}</title>
<meta name="description" content={description}>
<link rel="canonical" href={url}>

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content={url}>
<meta property="og:title" content={title}>
<meta property="og:description" content={description}>
<meta property="og:image" content={image}>

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content={url}>
<meta name="twitter:title" content={title}>
<meta name="twitter:description" content={description}>
<meta name="twitter:image" content={image}>
```

## Optimización de Contenido

### Estructura de Encabezados

```astro
<h1 class="text-4xl font-bold">Título Principal</h1>
<h2 class="text-2xl font-semibold">Subtítulo Importante</h2>
<h3 class="text-xl">Sección Detallada</h3>
```

### URLs Amigables

```typescript
// src/pages/blog/[...slug].astro
export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: {
      slug: post.slug
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, ""),
    },
    props: { post },
  }));
}
```

## Rendimiento y Core Web Vitals

### Optimización de Imágenes

```astro
---
import { Image } from '@astrojs/image';
---
<Image
  src={import('../assets/imagen.jpg')}
  alt="Descripción detallada"
  width={800}
  height={600}
  format="webp"
  loading="lazy"
/>
```

### Configuración de Font Loading

```astro
<link
  rel="preload"
  href="/fonts/tu-fuente.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>
```

## Sitemap y Robots.txt

### Generación de Sitemap

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tudominio.com",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
```

### Configuración de robots.txt

```text
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://tudominio.com/sitemap.xml
```

## Schema Markup

### Implementación de JSON-LD

```astro
---
// src/components/SchemaOrg.astro
const {
  type = 'WebPage',
  name,
  description
} = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": type,
  "name": name,
  "description": description,
  "url": Astro.url.href,
})} />
```

## Optimización de Enlaces

### Enlaces Internos

```astro
<a href="/blog" class="text-blue-600 hover:underline">
  Blog
</a>
```

### Enlaces Externos

```astro
<a
  href="https://ejemplo.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Recurso Externo
</a>
```

## Monitoreo y Análisis

### Implementación de Analytics

```astro
---
// src/components/Analytics.astro
---
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID');
</script>
```

## Mejores Prácticas

### 1. Velocidad de Carga

- Minimizar CSS y JavaScript
- Optimizar imágenes
- Implementar lazy loading
- Utilizar CDN para assets

### 2. Contenido

- Crear contenido único y valioso
- Mantener el contenido actualizado
- Usar keywords naturalmente
- Implementar breadcrumbs

### 3. Mobile First

- Diseño responsive
- Pruebas en múltiples dispositivos
- Optimizar tiempo de carga móvil

### 4. Técnicas Avanzadas

- Implementar PWA
- Usar service workers
- Configurar HTTP caching
- Optimizar Core Web Vitals

## Lista de Verificación SEO

1. **Metaetiquetas Básicas**

   - [ ] Title único y descriptivo
   - [ ] Meta description
   - [ ] Canonical URL
   - [ ] Viewport meta tag

2. **Estructura**

   - [ ] Jerarquía de encabezados correcta
   - [ ] URLs amigables
   - [ ] Navegación clara
   - [ ] Breadcrumbs

3. **Contenido**

   - [ ] Contenido original
   - [ ] Keywords relevantes
   - [ ] Textos alternativos en imágenes
   - [ ] Enlaces internos optimizados

4. **Técnico**
   - [ ] Sitemap.xml
   - [ ] Robots.txt
   - [ ] Schema markup
   - [ ] SSL/HTTPS

## Conclusión

La optimización SEO en Astro requiere una combinación de:

- Implementación técnica correcta
- Contenido de calidad
- Monitoreo constante
- Actualización regular

La ventaja de Astro en SEO radica en su capacidad de generar HTML estático y optimizado por defecto, lo que resulta en sitios más rápidos y mejor indexados.
