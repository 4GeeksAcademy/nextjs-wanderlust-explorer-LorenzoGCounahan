# Wanderlust Explorer - Next.js Travel Experience Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.3-38B2AC)](https://tailwindcss.com/)

## 📱 Descripción del Proyecto

**Wanderlust Explorer** es una plataforma web interactiva para descubrir, filtrar y guardar experiencias de viaje únicas alrededor del mundo. Desarrollada como MVP para Wanderlust Labs, una startup de travel-tech, la aplicación permite a los usuarios explorar 100 experiencias diferenciadas, aplicar filtros avanzados y gestionar sus favoritos sin recargas de página.

La aplicación cuenta con:
- ✨ **5 páginas principales** con navegación del lado del cliente (CSR)
- 🔍 **Sistema de búsqueda avanzado** con filtros combinables (categoría y destino)
- ❤️ **Gestión de favoritos** con estado React persistente en memoria
- 📱 **Diseño responsivo** optimizado para móvil y escritorio
- 🎨 **UI coherente y moderna** basada en referencias de diseño reales
- 📝 **TypeScript puro** con tipos definidos y validación de datos

---

## 🎯 Funcionalidades Principales

### 🏠 Página de Inicio
- Hero section con imagen destacada
- Botón de navegación al explorador de experiencias
- Propuesta de valor clara

### 🗺️ Explorador (/experiences)
- Cuadrícula de 100 tarjetas de experiencias
- **Búsqueda en tiempo real** por título (case-insensitive)
- **Filtros por categoría**: Adventure, Culture, Food, Wellness, Nature
- **Filtros por destino**: Ciudad + país
- Sincronización de filtros con query parameters de URL
- Mensaje "No se encontraron resultados" cuando corresponde

### 🔍 Detalle de Experiencia (/experiences/[id])
- Información completa de la experiencia
- Lectura del ID desde la URL
- Navegación de vuelta al explorador

### ❤️ Favoritos (/favorites)
- Vista personalizada de experiencias marcadas como favoritas
- Toggle de favoritos mediante icono de corazón
- Gestión de estado con React hooks

### 👤 Perfil (/profile)
- Perfil simulado de usuario
- Contador de favoritos guardados
- Información adicional de usuario

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Next.js** | 16.4.6 | Framework React con App Router |
| **React** | 19.3.0 | Librería UI y gestión de estado |
| **TypeScript** | Latest | Type safety y validación de tipos |
| **Tailwind CSS** | 4.3.3 | Estilos y componentes responsive |
| **ESLint** | 9 | Linting y validación de código |
| **Node.js** | 20+ | Runtime |
| **pnpm** | Latest | Gestor de dependencias |

---

## 📁 Estructura del Proyecto

```
nextjs-wanderlust-explorer-LorenzoGCounahan/
├── README.md                          # Este archivo
├── CONTEXT.md                         # Especificaciones funcionales y requisitos
├── VisualReference/                   # Referencias de diseño (Smartbox)
│   ├── descripcionTecnica.md          # Auditoría técnica de UI/UX
│   ├── www.smartbox.com_es_.png       # Captura visual 1
│   └── www.smartbox.com_es_ (1).png   # Captura visual 2
│
└── nextjs-wanderlust-explorer/        # Raíz del proyecto Next.js
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── eslint.config.mjs
    ├── README.md                      # Documentación del proyecto
    ├── SPECS.md                       # Especificaciones técnicas detalladas
    ├── PLAN.md                        # Plan de desarrollo
    ├── TASKS.md                       # Seguimiento de tareas
    │
    ├── public/                        # Archivos estáticos
    │   └── images/                    # Imágenes públicas
    │
    └── src/
        ├── app/                       # App Router de Next.js
        │   ├── layout.tsx             # Layout raíz
        │   ├── page.tsx               # Página de inicio (/))
        │   ├── experiences/
        │   │   ├── page.tsx           # Explorador (/experiences)
        │   │   └── [id]/
        │   │       └── page.tsx       # Detalle (/experiences/[id])
        │   ├── favorites/
        │   │   └── page.tsx           # Favoritos (/favorites)
        │   └── profile/
        │       └── page.tsx           # Perfil (/profile)
        │
        ├── components/                # Componentes reutilizables
        │   ├── Navbar.tsx             # Barra de navegación
        │   ├── ExperienceCard.tsx      # Tarjeta de experiencia
        │   ├── SearchBar.tsx           # Barra de búsqueda
        │   └── FilterBar.tsx           # Sistema de filtros
        │
        ├── context/                   # Context API (si se usa)
        │   └── FavoritesContext.tsx   # Contexto de favoritos
        │
        ├── hooks/                     # Custom hooks
        │   ├── useExperiences.ts       # Lógica de experiencias y filtrado
        │   ├── useFilters.ts           # Gestión de filtros
        │   └── useFavorites.ts         # Gestión de favoritos
        │
        ├── types/                     # Definiciones de TypeScript
        │   └── Experience.ts           # Interface Experience
        │
        └── data/                      # Datos estáticos
            └── experiences.ts         # Array de 100 experiencias
```

---

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js** 20+
- **pnpm** (gestor de dependencias recomendado)

### Instalación

```bash
# Navegar al directorio del proyecto
cd nextjs-wanderlust-explorer

# Instalar dependencias
pnpm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilación para Producción

```bash
# Build
pnpm build

# Iniciar servidor de producción
pnpm start
```

### Validación y Linting

```bash
# Ejecutar ESLint
pnpm lint

# Validar TypeScript
pnpm exec tsc --noEmit

# Full build validation
pnpm build
```

---

## 🔍 Sistema de Búsqueda y Filtros

### Búsqueda
- **Patrón**: Regex case-insensitive en el título
- **Implementación**: `new RegExp(term, 'i').test(experience.title)`
- **Tiempo real**: Se actualiza mientras el usuario escribe

### Filtros Disponibles
- **Categoría**: Adventure, Culture, Food, Wellness, Nature
- **Destino**: Ciudad + país
- Los filtros se combinan de forma lógica AND
- Se reflejan en los query parameters de la URL

### URL Query Parameters
- **Formato**: `/experiences?search=keyword&category=Adventure&destination=Paris`
- **Sincronización**: Los inputs se prerrellenan al cargar con query params
- **Persistencia**: Los filtros se mantienen en la URL para compartir y bookmark

---

## ❤️ Gestión de Favoritos

### Comportamiento
- **Toggle**: Click en icono de corazón activa/desactiva favorito
- **Indicador Visual**: Icono lleno cuando está en favoritos
- **Restricciones**: Sin persistencia en localStorage (estado en memoria)
- **Acceso**: Vista separada en `/favorites`

### Implementación
- Estado React `useState` a nivel superior
- Propiedades pasadas down a componentes
- Sincronización con página de perfil (contador)

---

## 🎨 Design References

### Referencias Locales (VisualReference/)

La carpeta `VisualReference/` contiene una auditoría técnica y semántica de UI/UX de [Smartbox](https://www.smartbox.com/es), junto con capturas visuales que sirven como fuente de inspiración:

#### Contenidos:

1. **descripcionTecnica.md**
   - Auditoría completa de arquitectura de información
   - Análisis de patrones de interacción
   - Desglose de componentes (header, hero, cards, filtros)
   - Recomendaciones para responsive design

2. **Capturas visuales**
   - Interfaz completa de Smartbox
   - Referencia de grid de tarjetas
   - Componentes de navegación y filtrado
   - Diseño de cards con ratings y precios

#### Decisiones de Diseño Tomadas:

✅ **Grid responsive** de tarjetas con imagen, titulo, descripción y rating
✅ **Navbar sticky** con enlaces a secciones principales
✅ **Búsqueda prominente** en la parte superior del explorador
✅ **Filtros intuitivos** con categorías visuales
✅ **Cards con icono de favorito** destacado en esquina superior
✅ **Mobile-first approach** con breakpoints de Tailwind CSS
✅ **Colores coherentes** y tipografía clara

---

## 📊 Dataset de Experiencias

### Características
- **Cantidad**: 100 experiencias únicas
- **Formato**: Array de TypeScript en `src/data/experiences.ts`
- **Generación**: Creadas con asistencia de IA para contenido realista

### Estructura de Datos (Experience Interface)

```typescript
interface Experience {
  id: string;                    // Identificador único
  title: string;                 // Título de la experiencia
  description: string;           // Descripción detallada
  category: string;              // Adventure | Culture | Food | Wellness | Nature
  destination: string;           // Ciudad + país (ej: "Paris, France")
  price: number;                 // Precio en USD
  rating: number;                // Calificación 1-5
  imageUrl: string;              // URL de imagen placeholder
}
```

---

## 🧩 Componentes Principales

### Navbar
- Navegación principal a todas las páginas
- Indicador visual de ruta activa con `usePathname`
- Responsive (menú hamburguesa en móvil)

### ExperienceCard
- Tarjeta individual de experiencia
- Muestra: imagen, título, destino, precio, rating
- Icono de favorito interactivo
- Link a página de detalle

### SearchBar
- Input controlado para término de búsqueda
- Sincronización con URL query params
- Clear button para limpiar búsqueda

### FilterBar
- Dropdown/botones para filtrar por categoría
- Dropdown/input para filtrar por destino
- Reset de filtros
- Sincronización con URL

---

## 🎣 Hooks Personalizados

### useExperiences
Encapsula la lógica de filtrado y búsqueda:
- Aplica filtros de categoría y destino
- Busca en título con regex
- Combina todos los filtros de forma coherente
- Retorna experiencias filtradas

### useFilters
Gestiona estado de filtros:
- Lectura/escritura de query params
- Sincronización con URL
- Interfaz clara de set/reset

### useFavorites
Maneja el estado de favoritos:
- Toggle de favoritos
- Check si una experiencia es favorita
- Contador de favoritos totales

---

## ✅ Criterios de Evaluación

| Criterio | Estado | Detalles |
|----------|--------|----------|
| **Estructura de Páginas** | ✅ | 5 páginas distintas con CSR |
| **Búsqueda** | ✅ | Regex case-insensitive en título |
| **Filtros** | ✅ | Categoría y destino combinables |
| **Query Params** | ✅ | Sincronización URL ↔️ estado |
| **useEffect** | ✅ | Uso correcto con dependencias |
| **Custom Hooks** | ✅ | 3+ hooks con lógica significativa |
| **TypeScript** | ✅ | Interfaces y tipos definidos |
| **UI Responsiva** | ✅ | Móvil + escritorio |
| **Componentes** | ✅ | División lógica de responsabilidades |
| **Documentación** | ✅ | Referencias de diseño documentadas |

---

## 📚 Documentación Adicional

Dentro del directorio `nextjs-wanderlust-explorer/`:

- **[README.md](./nextjs-wanderlust-explorer/README.md)** - Guía del proyecto
- **[SPECS.md](./nextjs-wanderlust-explorer/SPECS.md)** - Especificaciones técnicas detalladas
- **[PLAN.md](./nextjs-wanderlust-explorer/PLAN.md)** - Plan de desarrollo
- **[TASKS.md](./nextjs-wanderlust-explorer/TASKS.md)** - Seguimiento de tareas

En el directorio raíz:

- **[CONTEXT.md](./CONTEXT.md)** - Requisitos funcionales completos del proyecto

---

## 🔄 Flujo de Desarrollo

1. **Instalación** → Clonar y `pnpm install`
2. **Desarrollo local** → `pnpm dev`
3. **Validación** → `pnpm lint` + `pnpm exec tsc --noEmit`
4. **Build** → `pnpm build` + `pnpm start`

---

## 🤝 Contribuciones

Este proyecto es un MVP desarrollado por **Lorenzo G. Counahan** para [4Geeks Academy](https://4geeks.com/).

---

## 📄 Licencia

Este proyecto está licenciado bajo MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

---

## 🔗 Enlaces Rápidos

- 🌐 **Aplicación en desarrollo**: http://localhost:3000
- 📖 **Documentación completa**: Ver carpeta `/nextjs-wanderlust-explorer`
- 🎨 **Referencias de diseño**: `/VisualReference`
- 📋 **Requisitos funcionales**: `CONTEXT.md`

---

**Última actualización**: 2026-11-25
**Versión**: 1.0.0