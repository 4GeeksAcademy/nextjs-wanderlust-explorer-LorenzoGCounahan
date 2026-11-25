# SPECS.md — Wanderlust Explorer

> **Versión:** 1.0.0  
> **Proyecto:** Wanderlust Explorer — MVP para Wanderlust Labs  
> **Fecha:** Noviembre 2026

---

## 1. Resumen del Proyecto

Wanderlust Explorer es una aplicación web interactiva construida con **React + Next.js (App Router)** que permite a los usuarios descubrir, buscar, filtrar y guardar experiencias de viaje únicas alrededor del mundo. Se trata de un **MVP (Producto Mínimo Viable)** para la startup travel-tech **Wanderlust Labs**.

---

## 2. Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | 16.4.6 | Framework React con App Router |
| React | 19.3.0 | Librería de UI |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | 4.3.3 | Estilos utilitarios |
| ESLint | ^9 | Linter |
| create-next-app | — | CLI de inicialización |

### Flags de inicialización
```
npx create-next-app@latest nextjs-wanderlust-explorer
  --typescript
  --tailwind
  --eslint
  --app
  --src-dir
  --import-alias "@/*"
```

### Restricciones Técnicas
- ❌ **NO** usar librerías externas de gestión de estado (Redux, Zustand, etc.)
- ✅ Todo el estado con `useState` nativo de React
- ✅ Estado pasado mediante **props** o **custom hooks**
- ❌ **NO** se requiere persistencia (localStorage fuera del alcance)

---

## 3. Arquitectura de la Aplicación

### 3.1 Enrutamiento (App Router)

| Ruta | Página | Propósito |
|---|---|---|
| `/` | Home | Hero section + CTA a /experiences |
| `/experiences` | Explorador | Grid de 100 tarjetas + búsqueda + filtros |
| `/experiences/[id]` | Detalle | Contenido completo de una experiencia |
| `/favorites` | Favoritos | Experiencias marcadas como favoritas |
| `/profile` | Perfil | Perfil de usuario simulado + contador |

### 3.2 Estructura de Archivos

```
nextjs-wanderlust-explorer/
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css              # Estilos globales Tailwind
│   │   ├── layout.tsx               # Layout raíz + Navbar
│   │   ├── page.tsx                 # Home (hero)
│   │   ├── experiences/
│   │   │   ├── page.tsx             # Explorador (grid + filtros)
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Detalle de experiencia
│   │   ├── favorites/
│   │   │   └── page.tsx             # Favoritos
│   │   └── profile/
│   │       └── page.tsx             # Perfil
│   ├── components/
│   │   ├── Navbar.tsx               # Navegación global
│   │   ├── ExperienceCard.tsx       # Tarjeta de experiencia
│   │   ├── SearchBar.tsx            # Barra de búsqueda
│   │   └── FilterBar.tsx            # Filtros de categoría y destino
│   ├── hooks/
│   │   ├── useExperiences.ts        # Custom hook para filtrado
│   │   └── useFilters.ts            # (opcional) Hook de filtros
│   ├── data/
│   │   └── experiences.ts           # Array de 100 experiencias
│   └── types/
│       └── Experience.ts            # Interfaz Experience
├── VisualReference/                 # Referencias de diseño Smartbox
├── CONTEXT.md                       # Contexto del proyecto
├── SPECS.md                         # Este documento
└── README.md                        # Documentación + Design References
```

---

## 4. Modelo de Datos

### 4.1 Interfaz Experience

```typescript
interface Experience {
  id: string;          // Formato: 'exp-001'
  title: string;       // Título de la experiencia
  description: string; // Descripción breve (1-2 frases)
  category: 'Adventure' | 'Culture' | 'Food' | 'Wellness' | 'Nature';
  destination: string; // Formato: 'Ciudad, País'
  price: number;       // En EUR
  rating: number;      // Escala 1-5
  imageUrl: string;    // URL de foto real (Unsplash)
}
```

### 4.2 Dataset

- **Cantidad:** 100 experiencias
- **Formato:** TypeScript array en `src/data/experiences.ts`
- **Origen:** Generado con IA
- **Imágenes:** Fotos reales desde Unsplash
- **Distribución de categorías:** ~20 por categoría (Adventure, Culture, Food, Wellness, Nature)
- **Destinos:** Principalmente europeos (España, Italia, Francia, Suiza, Croacia, Noruega, etc.) con algunos internacionales

---

## 5. Especificaciones Funcionales

### 5.1 Páginas

#### Home (`/`)
- Sección hero con título llamativo y subtítulo
- Imagen de fondo o elemento visual atractivo
- Botón CTA "Explorar experiencias" que navega a `/experiences`
- Diseño responsive mobile-first

#### Explorador (`/experiences`)
- Grid responsive de tarjetas de experiencia (1 col en móvil, 2 en tablet, 3-4 en escritorio)
- Barra de búsqueda en la parte superior
- Filtros de categoría y destino
- Query params en la URL sincronizados con filtros activos
- Mensaje "No se encontraron resultados" cuando no hay coincidencias

#### Detalle (`/experiences/[id]`)
- Obtiene el ID desde `params.id` (Next.js App Router)
- Muestra: imagen grande, título, descripción completa, categoría, destino, precio, rating
- Botón de volver a experiencias
- Icono de favorito (toggle)
- Actualiza el título del documento con `useEffect`

#### Favoritos (`/favorites`)
- Lista/grid de experiencias marcadas como favoritas
- Mensaje "No tienes favoritos aún" si la lista está vacía
- Opción de navegar a `/experiences` para descubrir

#### Perfil (`/profile`)
- Avatar y nombre de usuario simulados
- Bio simulada
- Contador de experiencias favoritas guardadas
- Estadísticas simples (número de favoritos)

### 5.2 Búsqueda

- Filtra experiencias cuyo **título** coincida con el término de búsqueda
- Implementación con regex case-insensitive:
  ```typescript
  new RegExp(term, 'i').test(experience.title)
  ```
- Se combina correctamente con los filtros de categoría y destino
- Almacenada en query param `?search=...`

### 5.3 Filtros

| Filtro | Tipo | Valores | Query Param |
|---|---|---|---|
| Categoría | Dropdown / Botones | Adventure, Culture, Food, Wellness, Nature | `?category=adventure` |
| Destino | Dropdown / Búsqueda | Ciudades y países del dataset | `?destination=Croatia` |

- Filtros independientes entre sí
- Se combinan correctamente con la búsqueda
- Al cargar la página con query params existentes:
  - Los inputs se prerrellenan con esos valores
  - Los resultados aparecen ya filtrados

### 5.4 Favoritos

- Icono de corazón (toggle) en cada `ExperienceCard`
- Al hacer clic: se activa/desactiva el favorito
- El icono cambia visualmente (corazón lleno vs. vacío)
- Estado gestionado con `useState` en el nivel superior
- Props pasadas hacia abajo a componentes hijos
- Sin persistencia (no localStorage)

---

## 6. Componentes

### 6.1 Navbar
- Presente en todas las páginas (en `layout.tsx`)
- Enlaces a: Home, Explorador, Favoritos, Perfil
- Estilo de enlace activo usando `usePathname()`
- Diseño responsive: menú hamburguesa en móvil
- Logo "Wanderlust Explorer"

### 6.2 ExperienceCard
- Props: `experience`, `isFavorite`, `onToggleFavorite`
- Muestra: imagen, título, descripción (truncada), precio, rating (estrellas), categoría
- Corazón de favorito toggle
- Enlace a `/experiences/[id]`
- Diseño de tarjeta con sombra y hover effect
- Responsive: se adapta al contenedor del grid

### 6.3 SearchBar
- Input de búsqueda con icono de lupa
- Actualiza el query param `?search=...` en la URL
- Se prerrellena desde la URL al cargar
- Debounce o actualización inmediata

### 6.4 FilterBar
- Selector de categoría (dropdown o grupo de botones)
- Selector de destino (dropdown)
- Ambos actualizan los query params correspondientes
- Se prerrellenan desde la URL al cargar
- Botón para limpiar todos los filtros

---

## 7. Hooks Personalizados

### 7.1 `useExperiences` (obligatorio)
- Ubicación: `src/hooks/useExperiences.ts`
- Recibe el array completo de experiencias
- Recibe los parámetros de filtro (search, category, destination)
- Retorna las experiencias filtradas según los criterios aplicados
- Lógica de filtrado encapsulada (regex para búsqueda, comparación para categoría y destino)

### 7.2 `useFilters` (opcional)
- Gestiona el estado de los filtros activos
- Sincroniza con los query params de la URL
- Proporciona funciones para actualizar/limpiar filtros

### 7.3 `useEffect`
- Uso obligatorio en al menos un componente
- Ejemplos de uso:
  - Sincronizar resultados filtrados cuando cambian query params
  - Actualizar el título del documento en la página de detalle
- Arrays de dependencias correctos (evitar bucles infinitos)

---

## 8. UI / UX

### 8.1 Diseño
- **Responsive:** Mobile-first (móvil + tablet + escritorio)
- **Coherencia visual** entre todas las páginas
- **Navegación cliente** (sin recargas completas entre rutas)
- **Tailwind CSS** para todos los estilos

### 8.2 Referencias de Diseño
- **Smartbox (smartbox.com):** Auditoría de UI/UX en `VisualReference/descripcionTecnica.md`
  - Anatomía de ExperienceCard
  - Sistema de filtrado y explorador visual
  - Navegación con mega-menú
  - Header con búsqueda prominente
- Se documentarán 2-3 referencias externas adicionales en el README

### 8.3 Mensajes de Estado
- **Sin resultados:** "No se encontraron resultados"
- **Sin favoritos:** "No tienes favoritos aún"
- **Carga:** (no aplica, datos locales)

---

## 9. Criterios de Evaluación

| # | Criterio | Descripción |
|---|---|---|
| 1 | **Estructura de Páginas** | 5+ páginas con navegación cliente |
| 2 | **Búsqueda** | Regex case-insensitive por título |
| 3 | **Filtros** | Independientes, combinables con búsqueda, reflejados en URL |
| 4 | **URL Query Params** | Sincronización bidireccional (URL → inputs, inputs → URL) |
| 5 | **Hooks** | useEffect correcto, useState para favoritos, custom hook |
| 6 | **Componentes** | División lógica, sin monolitos, tipos TypeScript |
| 7 | **UI y Responsividad** | Mobile + desktop, coherencia visual, mensajes sin resultados |
| 8 | **Documentación** | Design References en README |

---

## 10. Entregables

- [x] Proyecto inicializado con create-next-app
- [x] Repositorio público en GitHub
- [x] Dataset de 100 experiencias (`src/data/experiences.ts`)
- [x] Interfaz Experience (`src/types/Experience.ts`)
- [ ] Componentes: Navbar, ExperienceCard, SearchBar, FilterBar
- [ ] Páginas: Home, Explorador, Detalle, Favoritos, Perfil
- [ ] Custom hooks: useExperiences (mínimo 1)
- [ ] Sistema de favoritos funcional
- [ ] Búsqueda y filtros con query params
- [ ] Diseño responsive completo
- [ ] Documentación en README con Design References

---

## 11. Notas y Consideraciones

- La persistencia de favoritos **no es requerida** (no localStorage)
- El dataset se genera con asistente de IA
- Toda la lógica de filtrado debe estar en custom hooks
- No se permiten librerías externas de estado
- Las imágenes son URLs de Unsplash con formato `w=800&q=80`
- Los precios están en EUR con escala 1-5 para rating