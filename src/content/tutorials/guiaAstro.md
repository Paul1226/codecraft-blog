---
title: "Guía Completa de Astro: Proyectos Estáticos y Dinámicos"
pubDate: "Jan 22 2025"
heroImg: "/images/placeholder-post-1.jpg"
tags: ["astro", "fullStack", "webPerformance"]
---

## Introducción

Astro es un framework web moderno que permite crear sitios web rápidos y orientados al contenido. Su arquitectura única permite desarrollar tanto sitios estáticos como dinámicos, aprovechando el poder de la generación estática (SSG) y el renderizado del lado del servidor (SSR).

## Instalación y Configuración

### Crear un nuevo proyecto

```bash
# Usando NPM
npm create astro@latest

# Usando Yarn
yarn create astro

# Usando PNPM
pnpm create astro@latest

```

### Estructura básica del proyecto

```
├── src/
│ ├── components/
│ ├── layouts/
│ ├── pages/
│ └── styles/
├── public/
├── astro.config.mjs
└── package.json
```

## Proyectos Estáticos (SSG)

### Características principales

- Generación de HTML en tiempo de construcción
- SEO optimizado
- Rendimiento excepcional
- Despliegue simplificado

### Ejemplo de página estática

```astro
---
// src/pages/index.astro
const posts = await Astro.glob('../content/blog/*.md');
---

<html>
  <head>
    <title>Mi Blog</title>
  </head>
  <body>
    <h1>Posts Recientes</h1>
    <ul>
      {posts.map(post => (
        <li>
          <a href={post.url}>{post.frontmatter.title}</a>
        </li>
      ))}
    </ul>
  </body>
</html>
```

## Proyectos Dinámicos (SSR)

### Habilitando SSR

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: nodeAdapter(), // O el adaptador de tu elección
});
```

### Ejemplo de endpoint dinámico

```astro
---
// src/pages/api/datos.json.js
export async function get({ params, request }) {
  return {
    body: JSON.stringify({
      mensaje: "¡Hola desde la API!",
      timestamp: new Date().toISOString()
    })
  };
}
---
```

### Ejemplo de página dinámica

```astro
---
// src/pages/productos/[id].astro
export async function getStaticPaths() {
  const productos = await obtenerProductos();

  return productos.map(producto => ({
    params: { id: producto.id },
    props: { producto }
  }));
}

const { producto } = Astro.props;
---
<Layout title={producto.nombre}>
  <h1>{producto.nombre}</h1>
  <p>{producto.descripcion}</p>
  <p>Precio: ${producto.precio}</p>
</Layout>
```

## Componentes Islas (Islands Architecture)

### Creando componentes interactivos

```astro
---
// src/components/Contador.jsx
import { useState } from 'react';

export default function Contador() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}
---

<div>
  <Contador client:load />
</div>

```

## Optimización y Rendimiento

### Estrategias de carga

- client:load - Carga inmediata
- client:idle - Carga cuando el navegador está inactivo
- client:visible - Carga cuando es visible
- client:media - Carga basada en media queries
- client:only - Solo renderizado en el cliente

### Configuración de Image Optimization

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
```

## Despliegue

### Build para producción

```bash
npm run build
```

### Opciones de despliegue

- Netlify
- Vercel
- Cloudflare Pages
- Deno Deploy
- Docker

### Configuración para SSR

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  adapter: vercel(),
});
```

## Buenas Prácticas

### Optimización de SEO

```astro
---
import { SEO } from 'astro-seo';
---

<head>
  <SEO
    title="Mi Sitio Web"
    description="Una descripción detallada de mi sitio"
    openGraph={{
      basic: {
        title: "Mi Sitio Web",
        type: "website",
        image: "https://misitio.com/og-image.jpg",
      }
    }}
  />
</head>
```

### Manejo de datos

- Usar **getStaticPaths()** para rutas dinámicas en SSG
- Implementar cache en endpoints dinámicos
- Utilizar Content Collections para contenido estructurado

### Seguridad

- Implementar CORS en endpoints
- Validar datos de entrada
- Usar CSP headers
- Mantener dependencias actualizadas

## Conclusión

Astro es una herramienta versátil que permite crear tanto sitios estáticos como dinámicos con un excelente rendimiento. La elección entre SSG y SSR dependerá de los requisitos específicos del proyecto, teniendo en cuenta factores como la frecuencia de actualización del contenido, la necesidad de interactividad y los requisitos de SEO.
