# PLAN.md — Plan de Ejecución

> **Documento:** Plan de trabajo para Wanderlust Explorer MVP  
> **Basado en:** SPECS.md (especificaciones) y CONTEXT.md (contexto del proyecto)  
> **Propósito:** Definir el orden de ejecución, dependencias y enfoque de implementación  
> **Nota:** Las tareas operativas se gestionan en documento aparte (TASKS.md)

---

## 1. Principios de Ejecución

- **Sin gestión de estado externa:** Todo el estado usa `useState` nativo, pasado como props o custom hooks
- **Sin persistencia:** No se usa localStorage ni almacenamiento externo
- **Navegación cliente:** Uso de `<Link>` de Next.js para evitar recargas completas entre rutas
- **Tipado estricto:** TypeScript en todos los archivos, usando la interfaz `Experience` definida
- **Tailwind CSS v4:** Estilos con la sintaxis `@import "tailwindcss"` y `@theme inline`
- **Sin dependencias adicionales:** Solo las incluidas en `create-next-app`

---

## 2. Estado Actual del Proyecto

### Completado
- [x] Inicialización con create-next-app (TypeScript + Tailwind + App Router + src-dir)
- [x] Repositorio público en GitHub
- [x] `src/types/Experience.ts` — interfaz del modelo de datos
- [x] `src/data/experiences.ts` — dataset de 100 experiencias con fotos Unsplash
- [x] `SPECS.md` — documento de especificaciones
- [x] `PLAN.md` — este documento

### Pendiente de implementar
- [ ] Componentes: Navbar, ExperienceCard, SearchBar, FilterBar
- [ ] Páginas: Home, Explorador, Detalle, Favoritos, Perfil
- [ ] Custom hooks: useExperiences (y opcionalmente useFilters)
- [ ] Sistema de favoritos con useState y props
- [ ] Búsqueda con regex + filtros por categoría y destino
- [ ] Sincronización de filtros con query params en la URL
- [ ] Diseño responsive completo
- [ ] Documentación en README con Design References

---

## 3. Fases de Implementación

Cada fase agrupa archivos relacionados que pueden construirse de forma secuencial.  
El orden respeta las **dependencias** entre módulos.

### Fase 1: Base de la Aplicación

**Dependencias previas:** Ninguna (todo lo anterior ya está completado).

| Archivo | Depende de |
|---|---|
| `src/components/Navbar.tsx` | — |
| `src/app/layout.tsx` (actualizar) | Navbar |
| `src/app/globals.css` (actualizar) | — |
| `src/app/page.tsx` (Home) | — |

**Descripción:**  
Establecer la estructura visual base: layout global con Navbar funcional, estilos globales y página Home con hero section y CTA. El Navbar debe mostrar enlace activo con `usePathname()` y ser responsive (menú hamburguesa en móvil).

---

### Fase 2: Custom Hook de Filtrado

**Dependencias previas:** Fase 1 (estructura base)

| Archivo | Depende de |
|---|---|
| `src/hooks/useExperiences.ts` | `Experience` type |

**Descripción:**  
Crear el custom hook `useExperiences` que encapsula la lógica de filtrado. Recibe el array completo de experiencias y los parámetros de filtro (search, category, destination). Aplica:
- Filtro por título con regex case-insensitive: `new RegExp(term, 'i').test(experience.title)`
- Filtro por categoría (comparación exacta)
- Filtro por destino (coincidencia parcial en ciudad o país, case-insensitive)
- Los filtros se combinan de forma independiente

---

### Fase 3: Componentes de UI

**Dependencias previas:** Fase 2 (useExperiences)

| Archivo | Depende de |
|---|---|
| `src/components/ExperienceCard.tsx` | `Experience` type |
| `src/components/SearchBar.tsx` | — |
| `src/components/FilterBar.tsx` | — |

**Descripción:**  
Construir los componentes de presentación:

- **ExperienceCard:** Tarjeta individual con imagen, título, descripción truncada, precio, rating visual (estrellas), categoría, icono de favorito toggle, enlace a detalle. Props: `experience: Experience`, `isFavorite: boolean`, `onToggleFavorite: (id: string) => void`.
- **SearchBar:** Input con icono de lupa que actualiza el query param `?search=...`. Se prerrellena desde la URL al cargar.
- **FilterBar:** Selector de categoría (botones o dropdown) y selector de destino (dropdown). Ambos actualizan query params. Incluye botón para limpiar filtros. Se prerrellenan desde la URL.

---

### Fase 4: Páginas de la Aplicación

**Dependencias previas:** Fase 2 (useExperiences) y Fase 3 (componentes)

| Archivo | Depende de |
|---|---|
| `src/app/experiences/page.tsx` | SearchBar, FilterBar, ExperienceCard, useExperiences |
| `src/app/experiences/[id]/page.tsx` | ExperienceCard (o renderizado propio), Experience type |
| `src/app/favorites/page.tsx` | ExperienceCard, favoritos como props |
| `src/app/profile/page.tsx` | Favoritos (contador) |

**Descripción:**  
Implementar las 4 páginas restantes:

- **Explorador (`/experiences`):** Grid de tarjetas con búsqueda y filtros. Los query params `?search=`, `?category=`, `?destination=` se sincronizan con los inputs. Muestra "No se encontraron resultados" si no hay coincidencias.
- **Detalle (`/experiences/[id]`):** Página dinámica que lee el ID de `params.id`. Muestra información completa. Actualiza el título del documento con `useEffect`. Incluye botón de volver.
- **Favoritos (`/favorites`):** Grid con las experiencias marcadas como favoritas. Muestra "No tienes favoritos aún" si está vacío.
- **Perfil (`/profile`):** Avatar y nombre simulados, bio simulada, contador de favoritos.

---

### Fase 5: Gestión de Estado Global (Favoritos)

**Dependencias previas:** Fase 4 (páginas listas para recibir props)

**Descripción:**  
Implementar el estado de favoritos como `useState` en el nivel superior (layout o un wrapper) y pasarlo como props a todas las páginas que lo necesiten. El array de favoritos contiene los IDs de las experiencias marcadas. Las funciones `toggleFavorite(id)` y el estado `favorites` se distribuyen mediante props a los componentes y páginas.

No hay persistencia (no localStorage). Al recargar la página, los favoritos se pierden.

---

### Fase 6: Documentación y Diseño

**Dependencias previas:** Fase 5 (aplicación funcional)

| Archivo | Depende de |
|---|---|
| `README.md` (actualizar) | — |

**Descripción:**  
Completar el README.md con:
- Descripción del proyecto
- Stack tecnológico
- Instrucciones de instalación y ejecución
- Sección "Design References" con:
  - Referencias de Smartbox desde `VisualReference/`
  - 2-3 interfaces reales adicionales encontradas por el equipo
  - Justificación de decisiones de diseño tomadas de estas referencias

---

## 4. Mapa de Dependencias

```
Fase 1 (Layout + Navbar + Home)
    │
    ▼
Fase 2 (useExperiences hook)
    │
    ▼
Fase 3 (ExperienceCard, SearchBar, FilterBar)
    │
    ▼
Fase 4 (Páginas: Explorador, Detalle, Favoritos, Perfil)
    │
    ▼
Fase 5 (Estado de favoritos: useState + props)
    │
    ▼
Fase 6 (Documentación README)
```

---

## 5. Enfoque Técnico por Componente

### Navbar
- `'use client'` (necesita `usePathname()`)
- Enlaces con `<Link>` de Next.js
- Detección de ruta activa con `usePathname()`
- Menú responsive: hamburguesa en móvil, enlaces horizontales en escritorio

### ExperienceCard
- Componente cliente o servidor según necesidad
- Corazón de favorito como botón independiente que no navega
- Rating mostrado como estrellas (★) o número
- Precio formateado con símbolo €
- Imagen con `width` y `height` fijos o contenedor con aspect ratio

### SearchBar
- `'use client'` (necesita hooks de Next.js)
- Usa `useSearchParams()` y `useRouter()` para leer/escribir query params
- Input controlado con valor inicial desde la URL

### FilterBar
- `'use client'`
- Selectores que actualizan `?category=` y `?destination=`
- Lista de destinos extraída del dataset (valores únicos)
- Botón "Limpiar filtros" que resetea los query params

### useExperiences (custom hook)
- Función pura de filtrado (sin efectos secundarios)
- Parámetros: `experiences: Experience[], search: string, category: string, destination: string`
- Retorno: `Experience[]` filtrado
- Lógica:
  1. Si hay `search`, filtrar por título con regex case-insensitive
  2. Si hay `category`, filtrar por categoría (case-insensitive)
  3. Si hay `destination`, filtrar por destino con coincidencia parcial (case-insensitive)
  4. Los 3 filtros se aplican en conjunto (AND)

### Favoritos
- Estado: `useState<string[]>([])` en el layout o componente wrapper
- `toggleFavorite(id: string)`: agrega o remueve el ID del array
- Se pasa como prop `favorites` y `onToggleFavorite` a páginas y componentes

### Query Params
- Lectura: `useSearchParams()` de Next.js
- Escritura: `useRouter().replace()` o `useRouter().push()` con la nueva URL
- Sincronización: al cambiar un filtro o búsqueda, se actualiza la URL
- Inicialización: al cargar la página, los inputs se prerrellenan desde los query params existentes

---

## 6. Referencias Visuales

Las referencias visuales de Smartbox en `VisualReference/` se usarán para orientar las decisiones de diseño:
- **Header:** Barra de búsqueda prominente + accesos rápidos
- **Mega-menú:** Adaptado como sistema de categorías (Adventure, Culture, Food, Wellness, Nature)
- **ExperienceCard:** Imagen, título, descripción, rating, precio, favorito
- **Explorador visual:** Grid filtrable con botones de categoría
- **Responsividad:** Enfoque mobile-first

Adicionalmente, se documentarán 2-3 interfaces externas en el README durante la Fase 6.

---

## 7. Criterios de Éxito

Al completar todas las fases, la aplicación debe cumplir:

1. **5 páginas navegables** sin recarga completa (cliente-side)
2. **Búsqueda funcional** con regex case-insensitive sobre el título
3. **Filtros independientes** (categoría y destino) combinables con la búsqueda
4. **Query params en URL** sincronizados con inputs y resultados
5. **Prerrellenado** de inputs y resultados al cargar con query params existentes
6. **useEffect** usado correctamente (sin bucles infinitos)
7. **Custom hook** useExperiences encapsulando lógica de filtrado
8. **Favoritos** con toggle visual y estado gestionado con useState + props
9. **Componentes** con división lógica y tipos TypeScript
10. **Responsive** (móvil + escritorio) con coherencia visual
11. **Mensajes** "No se encontraron resultados" y "No tienes favoritos aún"
12. **Documentación** con Design References en README

---

## 8. Notas Adicionales

- La Fase 1 (layout) está parcialmente iniciada: el layout.tsx ya importa Navbar, pero el componente Navbar aún no existe. Ninguna fase depende estrictamente de Fase 1 para comenzar, pero el orden secuencial es el recomendado.
- Las Fases 3 y 4 tienen dependencia cruzada con Fase 5 (favoritos), por lo que los componentes deben recibir `isFavorite` y `onToggleFavorite` como props desde el principio, aunque el estado se implemente formalmente en Fase 5.
- No se requiere estado de carga porque los datos son locales.
- No se requieren tests automatizados para este MVP.