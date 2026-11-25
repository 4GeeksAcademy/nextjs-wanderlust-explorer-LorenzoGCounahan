# TASKS.md — Lista de Tareas

> **Proyecto:** Wanderlust Explorer MVP  
> **Formato:** TXXX — Código de tarea secuencial  
> **Estado:** `[ ]` pendiente / `[X]` completada

---

## Fase 1: Base de la Aplicación

- [X] **T001** — Crear componente `src/components/Navbar.tsx`
  - Barra de navegación con enlaces a: Home, Explorador, Favoritos, Perfil
  - Usar `usePathname()` para resaltar el enlace activo
  - Diseño responsive: menú hamburguesa en móvil, horizontal en escritorio
  - Incluir logo "Wanderlust Explorer"

- [X] **T002** — Actualizar `src/app/layout.tsx`
  - Importar y renderizar Navbar
  - Actualizar metadatos (título: "Wanderlust Explorer")
  - Estructura: `<body>` con Navbar + `<main>` contenedor

- [X] **T003** — Actualizar `src/app/globals.css`
  - Mantener `@import "tailwindcss"` y `@theme inline`
  - Ajustar estilos base para body (fondo blanco, texto oscuro)

- [X] **T004** — Crear página Home `src/app/page.tsx`
  - Sección hero con título llamativo y subtítulo
  - Botón CTA "Explorar experiencias" que navega a `/experiences`
  - Diseño responsive mobile-first

---

## Fase 2: Custom Hook de Filtrado

- [X] **T005** — Crear `src/hooks/useExperiences.ts`
  - Custom hook con filtros combinados en AND: búsqueda textual, categoría, precio máximo, rating mínimo
  - Búsqueda case-insensitive por título, descripción y destino
  - Filtro por categoría con valor 'All' para mostrar todas
  - Retorna `experiences`, `filters`, `updateFilter`, `resetFilters`

---

## Fase 3: Componentes de UI

- [X] **T006** — Crear componente `src/components/ExperienceCard.tsx`
  - Props: `experience: Experience`, `isFavorite: boolean`, `onToggleFavorite: (id: string) => void`
  - Mostrar: imagen, título, precio (€), rating (★), categoría con color
  - Icono de corazón (toggle SVG) para favoritos
  - Enlace a `/experiences/[id]`
  - Diseño de tarjeta con sombra, border radius, hover effect

- [X] **T007** — Crear componente `src/components/SearchBar.tsx`
  - Input de búsqueda con icono de lupa SVG
  - Placeholder descriptivo
  - Control controlado (value/onChange)

- [X] **T008** — Crear componente `src/components/FilterBar.tsx`
  - Botones de categoría con emojis: Todas, Aventura, Cultura, Gastronomía, Bienestar, Naturaleza
  - Slider de precio máximo (0–500 €)
  - Selector de rating mínimo (dropdown)
  - Botón "Limpiar filtros" cuando hay filtros activos

---

## Fase 4: Páginas de la Aplicación

- [X] **T009** — Crear página Explorador `src/app/experiences/page.tsx`
  - Grid responsive de ExperienceCards (1 col móvil, 2 tablet, 3-4 escritorio)
  - Integrar SearchBar, FilterBar y useExperiences
  - Mostrar "Sin resultados" si no hay coincidencias con botón para limpiar filtros
  - Usa `useFavorites()` del contexto en lugar de props

- [X] **T010** — Crear página Detalle `src/app/experiences/[id]/page.tsx`
  - Leer ID desde `params.id`
  - Mostrar: imagen grande, título, descripción completa, categoría, destino, precio, rating
  - Botón toggle de favorito
  - Breadcrumb (Inicio / Experiencias / Título)
  - Botón "Volver a experiencias"
  - Usa `useFavorites()` del contexto

- [X] **T011** — Crear página Favoritos `src/app/favorites/page.tsx`
  - Grid de ExperienceCards filtrado por IDs favoritos
  - Mensaje "No tienes favoritos aún" con enlace a explorar
  - Usa `useFavorites()` del contexto

- [X] **T012** — Crear página Perfil `src/app/profile/page.tsx`
  - Avatar simulado con emoji 🧑‍✈️
  - Nombre "Viajero Wanderlust"
  - Estadísticas: total experiencias, favoritos, categoría favorita
  - Enlaces a explorar y ver favoritos
  - Usa `useFavorites()` del contexto

---

## Fase 5: Gestión de Estado de Favoritos

- [X] **T013** — Implementar estado de favoritos con Context
  - Crear `src/context/FavoritesContext.tsx` con `FavoritesProvider` y `useFavorites()`
  - Envolver layout con `<FavoritesProvider>`
  - Estado compartido entre todas las páginas sin prop drilling
  - Sin persistencia (no localStorage)

---

## Fase 6: Documentación

- [X] **T014** — Actualizar `README.md` con documentación del proyecto
  - Descripción del proyecto y stack tecnológico
  - Estructura del proyecto completa
  - Instrucciones de instalación y ejecución
  - Scripts disponibles y referencias a SPECS.md, PLAN.md, TASKS.md, AGENTS.md

---

## Verificación Final

- [X] **T015** — Verificar compilación TypeScript
  - Ejecutar `npx tsc --noEmit` — **0 errores**

- [X] **T016** — Verificar funcionamiento en desarrollo
  - Ejecutar `pnpm dev` — **Server ready en 409ms en http://localhost:3000**