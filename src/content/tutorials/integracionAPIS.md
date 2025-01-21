---
title: "Integración de APIs con Astro y TypeScript"
pubDate: "Jan 26 2025"
heroImg: "/images/placeholder-post-3.png"
tags: ["astro", "typescript"]
---

## Configuración Inicial

### Instalación de dependencias

```bash
npm create astro@latest my-astro-api-project
cd my-astro-api-project
npm install @astrojs/ts-plugin
```

### Configuración de TypeScript

```typescript
// tsconfig.json
{
  "extends": "astro/tsconfig.json",
  "compilerOptions": {
    "strictNullChecks": true,
    "allowJs": true
  }
}
```

## Definición de Tipos

### Interfaces para Datos de API

```typescript
// src/types/api.ts
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type { User, Post };
```

## Métodos de Integración

### 1. Fetch en Componentes Astro

```astro
---
// src/pages/users.astro
import type { User } from '../types/api';

const response = await fetch('https://api.ejemplo.com/users');
const users: User[] = await response.json();
---

<ul>
  {users.map((user) => (
    <li>{user.name} - {user.email}</li>
  ))}
</ul>
```

### 2. API Endpoints

```typescript
// src/pages/api/users.json.ts
import type { APIRoute } from "astro";
import type { User } from "../../types/api";

export const get: APIRoute = async () => {
  try {
    const response = await fetch("https://api.ejemplo.com/users");
    const users: User[] = await response.json();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error al obtener usuarios",
      }),
      {
        status: 500,
      }
    );
  }
};
```

### 3. Servicios Reutilizables

```typescript
// src/services/api.ts
import type { User, Post } from "../types/api";

export class APIService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`);
    if (!response.ok) throw new Error("Error fetching users");
    return response.json();
  }

  async getPostsByUser(userId: number): Promise<Post[]> {
    const response = await fetch(`${this.baseUrl}/posts?userId=${userId}`);
    if (!response.ok) throw new Error("Error fetching posts");
    return response.json();
  }
}
```

## Manejo de Errores y Loading States

```astro
---
// src/pages/posts/[userId].astro
import { APIService } from '../services/api';
import type { Post } from '../types/api';

const { userId } = Astro.params;
const api = new APIService('https://api.ejemplo.com');

let posts: Post[] = [];
let error: string | null = null;

try {
  posts = await api.getPostsByUser(Number(userId));
} catch (e) {
  error = e instanceof Error ? e.message : 'Error desconocido';
}
---

<div>
  {error ? (
    <p class="error">{error}</p>
  ) : (
    <ul>
      {posts.map(post => (
        <li>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )}
</div>
```

## Middleware y Autenticación

```typescript
// src/middleware/auth.ts
import type { APIContext } from "astro";

export async function authMiddleware({ request }: APIContext) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Verificar token
  try {
    // Lógica de verificación
    return null; // Continuar con la solicitud
  } catch {
    return new Response("Invalid token", { status: 403 });
  }
}
```

## Cache y Optimización

```typescript
// src/utils/cache.ts
export class APICache<T> {
  private cache: Map<string, { data: T; timestamp: number }>;
  private ttl: number;

  constructor(ttlSeconds: number = 300) {
    this.cache = new Map();
    this.ttl = ttlSeconds * 1000;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }
}
```

## Integración con Environment Variables

```env
# .env
API_KEY=tu_api_key
API_BASE_URL=https://api.ejemplo.com
```

```typescript
// src/config/env.ts
export const ENV = {
  apiKey: import.meta.env.API_KEY,
  apiBaseUrl: import.meta.env.API_BASE_URL,
} as const;
```

## Testing

```typescript
// src/services/__tests__/api.test.ts
import { describe, it, expect, vi } from "vitest";
import { APIService } from "../api";

describe("APIService", () => {
  it("should fetch users successfully", async () => {
    const mockUsers = [{ id: 1, name: "Test User", email: "test@test.com" }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    });

    const api = new APIService("https://api.test.com");
    const users = await api.getUsers();

    expect(users).toEqual(mockUsers);
  });
});
```

## Mejores Prácticas

1. **Tipado Estricto**

   - Utilizar `strictNullChecks` en tsconfig
   - Definir interfaces para todas las respuestas de API
   - Usar tipos de utilidad de TypeScript cuando sea necesario

2. **Manejo de Errores**

   - Implementar manejo de errores consistente
   - Crear tipos personalizados para errores
   - Usar try/catch en operaciones asíncronas

3. **Optimización**

   - Implementar estrategias de caché
   - Usar loading states
   - Manejar rate limiting

4. **Seguridad**
   - Validar datos de entrada
   - Implementar autenticación/autorización
   - Sanitizar datos de salida

## Conclusión

La integración de APIs con Astro y TypeScript proporciona una base sólida para construir aplicaciones web modernas y tipadas. La combinación de la generación estática de Astro con el sistema de tipos de TypeScript permite crear aplicaciones robustas y mantenibles.
