# CONTEXT.md - Wanderlust Explorer

## 🎯 Descripción del Proyecto

**Wanderlust Explorer** es una aplicación interactiva con React y Next.js para descubrir y guardar experiencias únicas alrededor del mundo. Se trata de un MVP para Wanderlust Labs, una startup de travel-tech.

La aplicación es multipágina donde los usuarios pueden explorar, buscar y filtrar experiencias sin recargar la página.

---

## 📋 Especificaciones Funcionales

### 🗂️ Páginas Requeridas

1. **Home ( / )**
   - Sección hero
   - Botón que navega a /experiences

2. **Explorador ( /experiences )**
   - Muestra 100 tarjetas de experiencias en una cuadrícula
   - Contiene barra de búsqueda
   - Contiene filtros de categoría y destino
   - Muestra mensaje "No se encontraron resultados" si los filtros no devuelven ningún resultado

3. **Detalle ( /experiences/[id] )**
   - Lee el ID desde la URL
   - Muestra el contenido completo de la experiencia

4. **Favoritos ( /favorites )**
   - Muestra solo las experiencias marcadas como favoritas

5. **Perfil ( /profile )**
   - Perfil de usuario simulado
   - Contador de favoritos guardados

---

## 🔍 Búsqueda y Filtros

### Comportamiento de la Búsqueda
- Filtra experiencias cuyo **título** coincida con el término buscado
- Usa una **regex case-insensitive**: `new RegExp(term, 'i').test(experience.title)`
- El filtro por categoría y destino funciona de forma **independiente**
- Se combinan correctamente con la búsqueda

### Parámetros en URL
- Los filtros activos y el término de búsqueda se almacenan como **query parameters** en la URL
- Formato esperado: `/experiences?search=vela&category=adventure&destination=Croatia`
- Usa `useSearchParams` y `usePathname` de Next.js
- Al cargar la página con query params existentes, los inputs de búsqueda y filtros deben **prerrellenarse** con esos valores
- Los resultados deben estar **ya filtrados** al cargar

### Filtros Disponibles
- **Categoría**: Adventure, Culture, Food, Wellness, Nature (dropdown o grupo de botones)
- **Destino**: Filtra por ciudad o país (dropdown o búsqueda)

---

## 📊 Dataset

### Características del Array
- **Cantidad**: 100 experiencias generadas con IA
- **Formato**: TypeScript array guardado en `src/data/experiences.ts`

### Estructura de cada Experiencia (Experience Interface)
Cada objeto debe tener como mínimo:
- `id`: Identificador único
- `title`: Título de la experiencia
- `description`: Descripción de la experiencia
- `category`: Una de las cinco categorías (Adventure, Culture, Food, Wellness, Nature)
- `destination`: Ciudad + país
- `price`: Precio de la experiencia
- `rating`: Calificación
- `imageUrl`: Placeholder de imagen

---

## ❤️ Funcionalidad de Favoritos

### Comportamiento
- Icono de corazón (toggle) en cada tarjeta de experiencia
- Los favoritos se activan o desactivan al hacer clic en el icono
- El icono reflejará visualmente si la experiencia está en favoritos o no

### Gestión de Estado
- Los favoritos se guardan en un `useState` de nivel superior
- Se pasan hacia abajo como **props** donde sea necesario
- **No se requiere persistencia** (localStorage está fuera del alcance)

---

## 🧩 Componentes Requeridos

Crear como mínimo estos componentes:
- `ExperienceCard`: Tarjeta individual de experiencia
- `SearchBar`: Barra de búsqueda
- `FilterBar`: Sistema de filtros (categoría y destino)
- `Navbar`: Barra de navegación (presente en todas las páginas)

### Comportamiento de Componentes
- **Navbar**: Debe mostrar estilos de enlace activo usando `usePathname`

---

## 🎣 Hooks Requeridos

### useEffect
- Debe usarse correctamente con arrays de dependencias adecuados
- Evitar bucles infinitos y dependencias faltantes
- Uso obligatorio en al menos un componente (ej: sincronizar resultados filtrados cuando cambien query params, o actualizar el título del documento en la página de detalle)

### Custom Hooks (mínimo 1)
- Crear al menos un **custom hook** con significado
- Ejemplos: `useExperiences`, `useFilters`
- Encapsular la lógica de filtrado

---

## 🎨 Requisitos de UI y Responsividad

- La app debe ser **responsiva** (móvil + escritorio)
- Debe ser **visualmente coherente** entre páginas
- Navegación del lado del cliente (sin recargas completas de página entre rutas)
- Uso de **Tailwind CSS** para estilos

---

## 🔒 Restricciones Técnicas

⚠️ **IMPORTANTE**: 
- **NO usar** librerías externas de gestión de estado (Redux, Zustand, etc.)
- Todo el estado debe vivir en `useState` nativo de React
- El estado se pasa mediante **props** o **custom hooks**

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS
- **CLI de inicialización**: create-next-app

### Configuración de create-next-app
```
npx create-next-app@latest nextjs-wanderlust-explorer
--typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

---

## 📁 Estructura de Archivos Esperada

```
nextjs-wanderlust-explorer/
├── src/
│   ├── data/
│   │   └── experiences.ts (array de 100 experiencias)
│   ├── components/
│   │   ├── ExperienceCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterBar.tsx
│   │   └── Navbar.tsx
│   ├── hooks/
│   │   ├── useExperiences.ts (o similar custom hook)
│   │   └── useFilters.ts (o similar)
│   ├── types/
│   │   └── Experience.ts (interface Experience)
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx (Home)
│       ├── experiences/
│       │   ├── page.tsx (Explorador)
│       │   └── [id]/
│       │       └── page.tsx (Detalle)
│       ├── favorites/
│       │   └── page.tsx
│       └── profile/
│           └── page.tsx
├── README.md (con Design References)
└── CONTEXT.md (este archivo)
```

---

## 📚 Design References

### Referencias Locales (carpeta VisualReference)

La carpeta `VisualReference/` contiene una **auditoría técnica y semántica de UI/UX** de Smartbox (`smartbox.com`), junto con capturas visuales que sirven como fuente de inspiración para el diseño de Wanderlust Explorer.

#### Contenidos de la Carpeta VisualReference:

1. **descripcionTecnica.md**
   - Auditoría completa de la arquitectura de información y árbol semántico HTML5
   - Análisis de patrones de interacción de Smartbox
   - Desglose de componentes:
     - `<header>`: Cabecera, barra utilitaria y mega-menú taxonómico
     - `<main>`: Hero banner, escaparate filtrable, explorador visual, prueba social
     - `<article>`: Anatomía de tarjeta de experiencia (ExperienceCard)
     - `<footer>`: Pie de página con newsletter y navegación legal

2. **www.smartbox.com_es_.png** y **www.smartbox.com_es_ (1).png**
   - Capturas visuales de la interfaz de Smartbox
   - Referencias visuales para:
     - Diseño de grid de tarjetas de experiencias
     - Sistema de filtrado y búsqueda
     - Componentes de navegación (Navbar, Mega-menú)
     - Cards de experiencia con valoración y precios
     - Hero banner y secciones principales

#### Elementos de Inspiración a Considerar:

- **Estructura de Header**: Barra de búsqueda prominente con accesos rápidos (Navbar con enlace a Favoritos y Perfil)
- **Mega-menú Taxonómico**: Sistema de categorías (Adventure, Culture, Food, Wellness, Nature)
- **Card (ExperienceCard)**: Imagen destacada, título, descripción, rating, precio, icono de favorito
- **Filtrable y Explorador Visual**: Pestañas o botones de filtrado rápido por categoría y destino
- **Propuesta de Valor**: Comunicar confianza en la plataforma
- **Responsividad**: Mobile-first approach con adaptación clara entre dispositivos

### Requisito Documentación

Además de las referencias locales, **buscar 2-3 interfaces reales adicionales** que admiren y que encajen con la estética esperada:
- UI de descubrimiento limpia con tarjetas
- Barra de búsqueda prominente
- Sistema de filtros intuitivo

**Documentación**: Añadir una sección `## Design References` en el README.md con:
- Enlaces a las interfaces de referencia externas
- Capturas o referencias de Smartbox (desde VisualReference/)
- Justificación de decisiones de diseño tomadas de estas referencias

---

## ✅ Criterios de Evaluación

La aplicación será evaluada en:

1. **Estructura de Páginas**: Al menos 5 páginas distintas con navegación del lado del cliente (sin recargas completas)

2. **Búsqueda**: 
   - Filtra resultados por título usando coincidencia con regex
   - Case-insensitive

3. **Filtros**:
   - Categoría y destino funcionan de forma independiente
   - Se combinan correctamente con la búsqueda
   - Se reflejan en la URL como query params

4. **URL Query Params**:
   - Los filtros activos y término de búsqueda están en la URL
   - Al cargar con query params existentes, los inputs están prerrellenados
   - Los resultados ya están filtrados

5. **Hooks**:
   - `useEffect` usado correctamente con arrays de dependencias adecuados
   - Sin bucles infinitos ni dependencias faltantes
   - `useState` para gestionar favoritos y pasarse correctamente como props
   - Al menos un custom hook encapsulando lógica con significado

6. **Componentes**:
   - División lógica (ningún fichero contiene toda la app)
   - Tipos e interfaces de TypeScript definidos y usados consistentemente

7. **UI y Responsividad**:
   - Responsiva (móvil + escritorio)
   - Visualmente coherente entre páginas
   - Mensaje "No se encontraron resultados" cuando corresponde

8. **Documentación**:
   - Referencias de diseño documentadas en el README

---

## ⚠️ Notas Importantes

- La persistencia de favoritos entre recargas de página **NO se evalúa**
- El uso de localStorage está **fuera del alcance** de este proyecto
- El dataset de experiencias debe generarse con un asistente de código con IA
- El dataset se guarda como fichero TypeScript local

---

## 🚀 Próximos Pasos para Iniciar

1. Crear nuevo proyecto con create-next-app (TypeScript + Tailwind + App Router + src-dir)
2. Crear repositorio público en GitHub
3. Conectar proyecto local al repositorio
4. Generar el dataset de 100 experiencias
5. Definir la interface Experience en TypeScript
6. Comenzar con la estructura de páginas y componentes

