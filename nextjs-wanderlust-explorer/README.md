# Wanderlust Explorer

Aplicación web para descubrir, filtrar y guardar experiencias de viaje. Incluye 100 experiencias y cinco páginas: inicio, explorador, detalle, favoritos y perfil.

## Funcionalidades

- Búsqueda por título con expresión regular case-insensitive.
- Filtros de categoría y destino combinables con la búsqueda y sincronizados con la URL.
- Favoritos con estado React en memoria, sin persistencia local.
- Detalle de experiencia, perfil simulado y navegación adaptable.
- Cuadrícula responsive de tarjetas con descripción, destino, precio y valoración.

## Stack

- Next.js 16.4.6 con App Router
- React 19.3.0 y TypeScript
- Tailwind CSS 4.3.3
- ESLint 9

## Inicio rápido

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000). Para validar el proyecto:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Design References

Las referencias de diseño son los materiales locales de [`VisualReference`](../VisualReference/descripcionTecnica.md), no una lista adicional de sitios externos. La auditoría de Smartbox informa la estructura del explorador, el filtrado y la anatomía de las tarjetas. Las capturas originales están aquí:

![Captura de referencia Smartbox](../VisualReference/www.smartbox.com_es_.png)

![Segunda captura de referencia Smartbox](../VisualReference/www.smartbox.com_es_%20(1).png)

De estas referencias se toman la prioridad visual de la búsqueda y las categorías, una cuadrícula de experiencias fácil de recorrer y tarjetas con imagen, información resumida y valoración. La navegación móvil y los controles de filtro se adaptan al alcance de este MVP.

## Documentación del proyecto

- [CONTEXT.md](../CONTEXT.md): contexto y requisitos funcionales.
- [SPECS.md](./SPECS.md): especificaciones detalladas y criterios de evaluación.
- [PLAN.md](./PLAN.md): plan de trabajo.
- [TASKS.md](./TASKS.md): seguimiento de tareas.
