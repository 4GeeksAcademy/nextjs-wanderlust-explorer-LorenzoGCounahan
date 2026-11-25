# Auditoría Técnica y Semántica de UI/UX: Smartbox (`://smartbox.com`)

Este documento desglosa la arquitectura de información, el árbol semántico HTML5 y los patrones de interacción de **Smartbox** (puedes consultar la estructura completa detallada en el documento fuente).

---

## 1. `<header>` — Cabecera Global y Navegación Principal
* **Barra de Anuncios (`<aside>`):** Promociona el código activo `BLACK20` y condiciones de envío gratuito.
* **Barra Utilitaria y Buscador (`<search>`):** Incluye logotipo corporativo, buscador predictivo (`<input type="search">`) y accesos rápidos (B2B, Canjear bono, Iniciar sesión y Carrito).
* **Mega-Menú Taxonómico (`<nav>`):** Organiza la oferta en tres ejes principales: *Experiencias* (Estancias, Bienestar, Gastronomía, Aventura, Motor, Ocio y Cultura), *Ideas regalo* (Destinatarios y ocasiones) y *Regiones* (Ciudades, comunidades y destinos internacionales).

---

## 2. `<main>` — Estructura Semántica del Cuerpo Principal
El contenido principal guía al usuario a través de los siguientes bloques:
* **Hero Banner (`<section>`):** Imagen de fondo en *full-bleed*, titular `<h1>`, subtítulo y CTA principal.
* **Escaparate Filtrable y Explorador Visual:** Pestañas de filtrado rápido y cuadrículas visuales por intención (*Ocasiones*, *Marcas*, *Destinos*).
* **Propuesta de Valor y Proximidad:** Lista semántica con pilares de confianza (pago seguro, flexibilidad) y buscador regional mediante nube de etiquetas.
* **Prueba Social y Formatos:** Carrusel de reseñas verificadas con `<blockquote>` y comparativa interactiva entre caja física y *e-Caja* mediante un flujo de 3 pasos (`<ol>`).
* **Directorio SEO (`<section>`):** Enlaces categorizados por temporada y tendencias.

---

## 3. `<article>` — Anatomía Semántica de una Card (`ExperienceCard`)
Cada tarjeta de experiencia funciona como un componente autónomo (`<article>`) optimizado para escaneo rápido, integrando badges promocionales, cabecera con imagen, valoración, detalles de capacidad y bloque de precios con descuento (puedes ver la maqueta HTML completa en el archivo original).

---

## 4. `<footer>` — Pie de Página Global
* **Newsletter y Soporte:** Formulario de suscripción con `reCAPTCHA` y llamada a la acción para post-venta.
* **Navegación y Legal (`<nav>` / `<small>`):** Enlaces organizados mediante `<details>` y `<summary>` en móvil, insignias de aplicaciones móviles (*App Store*, *Google Play*), pasarelas de pago y condiciones legales de validez.
