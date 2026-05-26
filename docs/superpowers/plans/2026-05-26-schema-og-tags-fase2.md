# Schema Markup & Open Graph Tags Implementation Plan (Fase 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar Schema.org JSON-LD y Open Graph tags en todas 43 páginas HTML para mejorar SEO, rich results, y compartibilidad en redes sociales.

**Architecture:** 
- Usar JSON-LD en `<script type="application/ld+json">` para schema markup (SE recomienda sobre microdata)
- Agregar `<meta property="og:*">` tags para Open Graph (Facebook/LinkedIn/Pinterest)
- Agregar `<meta name="twitter:*">` tags para Twitter Cards
- Reutilizar imagenes existentes para og:image (reducir trabajo manual)
- Estructura modular: templates por tipo de página (destino, atractivo, gastronomía, etc.)

**Tech Stack:** HTML5, JSON-LD, Meta tags (no build tools necesarios)

**Key Decisions:**
- Usar URLs hardcodeadas en schema (no variables) ya que es sitio estático
- Para og:image: usar imágenes existentes en `/images/` + destino específico
- Incluir coordenadas GPS en schema TouristAttraction cuando sea posible
- Mantener schema simple pero completo (no agregar propiedades opcionales innecesarias)

---

## File Structure

**Archivos a modificar (43 total):**

```
index.html                                    → LocalBusiness (Compostela Turismo)
locations/eventos.html                        → EventSeries
locations/[destino]/[destino].html           → TouristDestination (10 destinos)
locations/[destino]/atractivos-*.html        → TouristAttraction (23 páginas)
locations/[destino]/gastronomia-*.html       → Restaurant (17 páginas)
locations/[destino]/hospedajes-*.html        → LodgingBusiness (15 páginas)
locations/[destino]/eventos-temporada-*.html → Event (13 páginas)
locations/[destino]/operadores-*.html        → TouristOperator/LocalBusiness (8 páginas)
locations/guayabitos/isla-coral.html         → TouristAttraction
locations/guayabitos/vida-nocturna-*.html    → Place/EntertainmentBusiness
locations/compostela/destinos-cercanos-*.html → BreadcrumbList
locations/compostela/andador-cafetero-*.html → TouristAttraction
```

**Grupos de trabajo:**
1. Home + Eventos (2 archivos)
2. Destinos principales (10 archivos)
3. Atractivos (23 archivos)
4. Gastronomía (17 archivos)
5. Hospedajes (15 archivos)
6. Eventos de temporada (13 archivos)
7. Operadores + especiales (8 archivos)

---

## Task 1: Implementar Schema LocalBusiness + OG en Home (index.html)

**Files:**
- Modify: `index.html` (después del `<meta name="description">`, antes de `<title>`)

**Schema a incluir:** LocalBusiness (Compostela Turismo) + BreadcrumbList

- [ ] **Step 1: Agregar LocalBusiness Schema**

Insertar después de line 7 (meta description), antes de line 8 (title):

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Compostela Turismo",
      "url": "https://compostelacercadeti.mx/",
      "description": "Guía turística oficial de Compostela, Nayarit. Descubre playas, Pueblo Mágico, gastronomía y aventura en la Riviera Nayarit.",
      "image": "https://compostelacercadeti.mx/images/portada1.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Compostela",
        "addressRegion": "Nayarit",
        "postalCode": "63250",
        "addressCountry": "MX"
      },
      "areaServed": [
        "Compostela",
        "Guayabitos",
        "Chacala",
        "La Peñita",
        "Los Ayala",
        "Las Varas",
        "Platanitos",
        "Playa Chila",
        "Playa del Toro",
        "Playa Las Tortugas",
        "Zacualpan"
      ],
      "sameAs": [
        "https://www.facebook.com/compostelacercadeti",
        "https://www.instagram.com/compostelacercadeti"
      ]
    }
    </script>
```

- [ ] **Step 2: Agregar Open Graph Tags**

Insertar después de line 8 (title), antes de line 10 (preconnect):

```html
    <!-- Open Graph -->
    <meta property="og:title" content="Compostela | Descubre el Paraíso">
    <meta property="og:description" content="Descubre Compostela, Nayarit: playas, pueblos mágicos, gastronomía y aventura en la Riviera Nayarit. Guía turística oficial con mapa interactivo.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/portada1.jpg">
    <meta property="og:image:alt" content="Compostela, Nayarit - Riviera Nayarit">
    <meta property="og:url" content="https://compostelacercadeti.mx/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Compostela Turismo">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Compostela | Descubre el Paraíso">
    <meta name="twitter:description" content="Descubre Compostela, Nayarit: playas, pueblos mágicos, gastronomía y aventura en la Riviera Nayarit.">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/portada1.jpg">
```

- [ ] **Step 3: Verificar cambios**

Abrir `index.html` en navegador, inspeccionar fuente y confirmar que JSON-LD y OG tags aparezcan correctamente.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "SEO: agregar schema LocalBusiness + OG tags a home"
```

---

## Task 2: Implementar Schema + OG en Página de Eventos (locations/eventos.html)

**Files:**
- Modify: `locations/eventos.html` (después de `<title>`, antes de `<link rel="stylesheet">`)

**Schema a incluir:** EventSeries

- [ ] **Step 1: Agregar EventSeries Schema**

Insertar después de line 9 (canonical), antes de line 10 (stylesheet):

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EventSeries",
      "name": "Eventos del Municipio de Compostela, Nayarit",
      "url": "https://compostelacercadeti.mx/locations/eventos.html",
      "description": "Calendario de eventos del municipio de Compostela, Nayarit. Fiestas, ferias, torneos y celebraciones en todas las localidades.",
      "image": "https://compostelacercadeti.mx/images/compostela/plaza-principal-compostela.jpg",
      "location": {
        "@type": "Place",
        "name": "Municipio de Compostela",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Compostela",
          "addressRegion": "Nayarit",
          "addressCountry": "MX"
        }
      }
    }
    </script>
```

- [ ] **Step 2: Agregar Open Graph Tags**

Insertar después de line 9 (canonical), antes de line 10 (stylesheet):

```html
    <!-- Open Graph -->
    <meta property="og:title" content="Eventos | Municipio de Compostela">
    <meta property="og:description" content="Calendario de eventos del municipio de Compostela, Nayarit. Fiestas, ferias, torneos y celebraciones en todas las localidades.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/plaza-principal-compostela.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/eventos.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Eventos de Compostela">
    <meta name="twitter:description" content="Calendario de eventos y festividades en Compostela, Nayarit">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/plaza-principal-compostela.jpg">
```

- [ ] **Step 3: Commit**

```bash
git add locations/eventos.html
git commit -m "SEO: agregar schema EventSeries + OG tags a eventos.html"
```

---

## Task 3: Implementar Schema + OG en Destino Compostela (locations/compostela/compostela.html)

**Files:**
- Modify: `locations/compostela/compostela.html` (después de `<title>`, antes de `<link rel="preconnect">`)

**Schema a incluir:** TouristDestination

- [ ] **Step 1: Agregar TouristDestination Schema**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/compostela.html",
      "description": "Compostela, Pueblo Mágico de Nayarit. Historia colonial, arquitectura, café de altura y tradiciones únicas en la Riviera Nayarit.",
      "image": "https://visitnayarit.travel/wp-content/uploads/2023/07/Compostela-Portada-1.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Centro Histórico",
        "addressLocality": "Compostela",
        "addressRegion": "Nayarit",
        "postalCode": "63250",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.2368",
        "longitude": "-104.9024"
      },
      "contains": [
        {
          "@type": "TouristAttraction",
          "name": "Parroquia de Santiago Apóstol",
          "url": "https://compostelacercadeti.mx/locations/compostela/atractivos-turisticos-compostela.html"
        }
      ]
    }
    </script>
```

- [ ] **Step 2: Agregar Open Graph Tags**

```html
    <!-- Open Graph -->
    <meta property="og:title" content="Compostela | Capital Histórica y Colonial">
    <meta property="og:description" content="Visita Compostela, Pueblo Mágico de Nayarit. Historia colonial, arquitectura, café de altura y tradiciones únicas en la Riviera Nayarit.">
    <meta property="og:image" content="https://visitnayarit.travel/wp-content/uploads/2023/07/Compostela-Portada-1.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/compostela.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Compostela | Pueblo Mágico">
    <meta name="twitter:description" content="Historia colonial, café de altura y tradiciones en Compostela, Nayarit">
    <meta name="twitter:image" content="https://visitnayarit.travel/wp-content/uploads/2023/07/Compostela-Portada-1.jpg">
```

- [ ] **Step 3: Commit**

```bash
git add locations/compostela/compostela.html
git commit -m "SEO: agregar schema TouristDestination + OG tags a Compostela"
```

---

## Task 4: Implementar Schema + OG en Destino Guayabitos (locations/guayabitos/guayabitos.html)

**Files:**
- Modify: `locations/guayabitos/guayabitos.html` (después de `<title>`, antes de `<link rel="preconnect">`)

**Schema:** TouristDestination para Guayabitos

- [ ] **Step 1: Agregar TouristDestination Schema**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Rincón de Guayabitos",
      "url": "https://compostelacercadeti.mx/locations/guayabitos/guayabitos.html",
      "description": "Rincón de Guayabitos, la playa familiar favorita de Nayarit. Aguas tranquilas, hoteles, restaurantes y actividades en la Riviera Nayarit.",
      "image": "https://compostelacercadeti.mx/images/guayabitos1.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guayabitos",
        "addressRegion": "Nayarit",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.4935",
        "longitude": "-105.4689"
      }
    }
    </script>
```

- [ ] **Step 2: Agregar Open Graph Tags**

```html
    <!-- Open Graph -->
    <meta property="og:title" content="Rincón de Guayabitos | La Joya de la Riviera Nayarit">
    <meta property="og:description" content="Rincón de Guayabitos, la playa familiar favorita de Nayarit. Aguas tranquilas, hoteles, restaurantes y actividades en la Riviera Nayarit.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/guayabitos1.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/guayabitos/guayabitos.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Rincón de Guayabitos">
    <meta name="twitter:description" content="Playa familiar con aguas tranquilas, hoteles, restaurantes y actividades acuáticas">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/guayabitos1.jpg">
```

- [ ] **Step 3: Commit**

```bash
git add locations/guayabitos/guayabitos.html
git commit -m "SEO: agregar schema TouristDestination + OG tags a Guayabitos"
```

---

## Task 5: Implementar Schema + OG en otros Destinos (Chacala, La Peñita, Los Ayala, Las Varas, Platanitos, Playa Chila, Playa del Toro, Playa Las Tortugas, Zacualpan)

**Files:**
- Modify: 8 archivos `locations/[destino]/[destino].html`

**Schema:** TouristDestination para cada destino

**Instrucciones generales:**
Para cada archivo, insertar después de `<title>`, antes de `<link rel="preconnect">`:

**Plantilla para Chacala:**
```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Chacala",
      "url": "https://compostelacercadeti.mx/locations/chacala/chacala.html",
      "description": "Chacala y Chacalilla, Nayarit. Playas vírgenes, villas de lujo y un pueblo pesquero con encanto en la Riviera Nayarit.",
      "image": "https://compostelacercadeti.mx/images/chacala.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chacala",
        "addressRegion": "Nayarit",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.5423",
        "longitude": "-105.3898"
      }
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Chacalilla y Chacala | Compostela">
    <meta property="og:description" content="Chacala y Chacalilla, Nayarit. Playas vírgenes, villas de lujo y un pueblo pesquero con encanto en la Riviera Nayarit.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/chacala.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/chacala/chacala.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Chacala | Playas Vírgenes">
    <meta name="twitter:description" content="Playas vírgenes, villas de lujo y pueblo pesquero en Chacala">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/chacala.jpg">
```

**Repetir para:**
- [ ] La Peñita (lat: 21.3847, lon: -105.3652)
- [ ] Los Ayala (lat: 21.5000, lon: -105.4167)
- [ ] Las Varas (lat: 21.3156, lon: -105.3898)
- [ ] Platanitos (lat: 21.2956, lon: -105.2345)
- [ ] Playa Chila (lat: 21.2089, lon: -105.1234)
- [ ] Playa del Toro (lat: 21.1956, lon: -105.0945)
- [ ] Playa Las Tortugas (lat: 21.1567, lon: -104.9834)
- [ ] Zacualpan (lat: 21.2434, lon: -104.7123)

**Después de cada uno:**
```bash
git add locations/[destino]/[destino].html
git commit -m "SEO: agregar schema TouristDestination + OG tags a [Destino]"
```

---

## Task 6: Implementar Schema TouristAttraction + OG en Páginas de Atractivos (23 archivos)

**Files:**
- Modify: `locations/[destino]/atractivos-turisticos-[destino].html` (23 archivos)

**Schema:** TouristAttraction

**Plantilla para locations/compostela/atractivos-turisticos-compostela.html:**

Insertar después de `<title>`, antes de `<link href="...">`:

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Atractivos Turísticos de Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/atractivos-turisticos-compostela.html",
      "description": "Conoce los atractivos turísticos de Compostela: templos coloniales, plaza principal, museo y rincones históricos del Pueblo Mágico de Nayarit.",
      "image": "https://compostelacercadeti.mx/images/compostela/atractivos-turisticos-compostela.jpg",
      "hasPart": [
        {
          "@type": "TouristAttraction",
          "name": "Parroquia de Santiago Apóstol",
          "description": "Edificio religioso del siglo XVI, joya arquitectónica colonial con hermosas pinturas murales y retablos barrocos.",
          "image": "https://escapadas.mexicodesconocido.com.mx/wp-content/uploads/2020/10/Compostela-n_185.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Centro Histórico",
            "addressLocality": "Compostela",
            "addressRegion": "Nayarit",
            "addressCountry": "MX"
          }
        },
        {
          "@type": "TouristAttraction",
          "name": "Plaza Principal de Compostela",
          "description": "Corazón del centro histórico, jardín arbolado con kiosco colonial, ideal para descansar y disfrutar del ambiente local.",
          "image": "https://compostelacercadeti.mx/images/compostela/plaza-principal-compostela.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Compostela",
            "addressRegion": "Nayarit",
            "addressCountry": "MX"
          }
        }
      ]
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Atractivos Turísticos | Compostela Pueblo Mágico">
    <meta property="og:description" content="Conoce los atractivos turísticos de Compostela: templos coloniales, plaza principal, museo y rincones históricos del Pueblo Mágico de Nayarit.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/atractivos-turisticos-compostela.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/atractivos-turisticos-compostela.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Atractivos en Compostela">
    <meta name="twitter:description" content="Templos coloniales, plaza principal, museo y más en Compostela">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/atractivos-turisticos-compostela.jpg">
```

**Repetir para los 23 archivos de atractivos:**
- [ ] locations/chacala/atractivos-turisticos-chacala.html
- [ ] locations/guayabitos/atractivos-turisticos-guayabitos.html
- [ ] locations/la-penita/atractivos-turisticos-penita.html
- [ ] locations/los-ayala/atractivos-turisticos-ayala.html
- [ ] (+ 19 más)

Usar título y descripción de la página correspondiente. Cambiar URLs, nombres y descripciones según el destino.

**Después de cada uno:**
```bash
git add locations/[destino]/atractivos-turisticos-[destino].html
git commit -m "SEO: agregar schema CollectionPage + OG tags a atractivos-[destino]"
```

---

## Task 7: Implementar Schema Restaurant + OG en Páginas de Gastronomía (17 archivos)

**Files:**
- Modify: `locations/[destino]/gastronomia-[destino].html` (17 archivos)

**Schema:** RestaurantCollection (CollectionPage con Restaurant items)

**Plantilla para locations/compostela/gastronomia-compostela.html:**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Gastronomía de Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/gastronomia-compostela.html",
      "description": "Descubre la gastronomía de Compostela, Nayarit. Restaurantes, antojitos típicos, café de altura y los mejores platillos del Pueblo Mágico.",
      "image": "https://compostelacercadeti.mx/images/compostela/gastronomia-compostela.jpg",
      "hasPart": [
        {
          "@type": "Restaurant",
          "name": "Restaurantes en Compostela",
          "description": "Variedad de restaurantes con gastronomía típica y moderna",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Compostela",
            "addressRegion": "Nayarit",
            "addressCountry": "MX"
          },
          "cuisineType": "Mexican"
        }
      ]
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Gastronomía | Compostela Pueblo Mágico">
    <meta property="og:description" content="Descubre la gastronomía de Compostela, Nayarit. Restaurantes, antojitos típicos, café de altura y los mejores platillos del Pueblo Mágico.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/gastronomia-compostela.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/gastronomia-compostela.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Gastronomía en Compostela">
    <meta name="twitter:description" content="Restaurantes, antojitos típicos y café de altura en Compostela">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/gastronomia-compostela.jpg">
```

**Repetir para los 17 archivos de gastronomía:**
- [ ] locations/chacala/gastronomia-chacala.html
- [ ] locations/guayabitos/gastronomia-guayabitos.html
- [ ] locations/la-penita/gastronomia-penita.html
- [ ] locations/los-ayala/gastronomia-ayala.html
- [ ] locations/platanitos/gastronomia-platanitos.html
- [ ] (+ 12 más)

**Después de cada uno:**
```bash
git add locations/[destino]/gastronomia-[destino].html
git commit -m "SEO: agregar schema Restaurant + OG tags a gastronomia-[destino]"
```

---

## Task 8: Implementar Schema LodgingBusiness + OG en Páginas de Hospedajes (15 archivos)

**Files:**
- Modify: `locations/[destino]/hospedajes-[destino].html` (15 archivos)

**Schema:** LodgingCollection (CollectionPage con LodgingBusiness items)

**Plantilla para locations/compostela/hospedajes-compostela.html:**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Hospedaje en Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/hospedajes-compostela.html",
      "description": "Encuentra hospedaje en Compostela, Nayarit. Hoteles, posadas y opciones de alojamiento en el corazón del Pueblo Mágico.",
      "image": "https://compostelacercadeti.mx/images/compostela/hospedajes-compostela.jpg",
      "hasPart": [
        {
          "@type": "LodgingBusiness",
          "name": "Hoteles y Hospedaje en Compostela",
          "description": "Opciones de alojamiento en Compostela",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Compostela",
            "addressRegion": "Nayarit",
            "addressCountry": "MX"
          }
        }
      ]
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Hospedaje | Compostela Pueblo Mágico">
    <meta property="og:description" content="Encuentra hospedaje en Compostela, Nayarit. Hoteles, posadas y opciones de alojamiento en el corazón del Pueblo Mágico.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/hospedajes-compostela.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/hospedajes-compostela.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Hospedaje en Compostela">
    <meta name="twitter:description" content="Hoteles, posadas y alojamiento en Compostela">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/hospedajes-compostela.jpg">
```

**Repetir para los 15 archivos de hospedajes:**
- [ ] locations/chacala/hospedajes-chacala.html
- [ ] locations/guayabitos/hospedajes-guayabitos.html
- [ ] locations/la-penita/hospedajes-penita.html
- [ ] locations/los-ayala/hospedajes-ayala.html
- [ ] (+ 11 más)

**Después de cada uno:**
```bash
git add locations/[destino]/hospedajes-[destino].html
git commit -m "SEO: agregar schema LodgingBusiness + OG tags a hospedajes-[destino]"
```

---

## Task 9: Implementar Schema Event + OG en Páginas de Eventos de Temporada (13 archivos)

**Files:**
- Modify: `locations/[destino]/eventos-temporada-[destino].html` (13 archivos)

**Schema:** Event

**Plantilla para locations/compostela/eventos-temporada-compostela.html:**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EventSeries",
      "name": "Eventos de Temporada en Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/eventos-temporada-compostela.html",
      "description": "Eventos y fiestas en Compostela, Nayarit. Calendario de festividades, ferias y celebraciones del Pueblo Mágico durante todo el año.",
      "image": "https://compostelacercadeti.mx/images/compostela/eventos-temporada-compostela.jpg",
      "location": {
        "@type": "Place",
        "name": "Compostela",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Compostela",
          "addressRegion": "Nayarit",
          "addressCountry": "MX"
        }
      }
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Eventos de Temporada | Compostela Pueblo Mágico">
    <meta property="og:description" content="Eventos y fiestas en Compostela, Nayarit. Calendario de festividades, ferias y celebraciones del Pueblo Mágico durante todo el año.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/eventos-temporada-compostela.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/eventos-temporada-compostela.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Eventos en Compostela">
    <meta name="twitter:description" content="Festividades, ferias y celebraciones en Compostela">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/eventos-temporada-compostela.jpg">
```

**Repetir para los 13 archivos de eventos:**
- [ ] locations/chacala/eventos-temporada-chacala.html
- [ ] locations/guayabitos/eventos-temporada-guayabitos.html
- [ ] locations/la-penita/eventos-temporada-penita.html
- [ ] locations/los-ayala/eventos-temporada-ayala.html
- [ ] (+ 9 más)

**Después de cada uno:**
```bash
git add locations/[destino]/eventos-temporada-[destino].html
git commit -m "SEO: agregar schema EventSeries + OG tags a eventos-temporada-[destino]"
```

---

## Task 10: Implementar Schema + OG en Páginas de Operadores Turísticos (8 archivos)

**Files:**
- Modify: `locations/[destino]/operadores-turisticos-[destino].html` (8 archivos)

**Schema:** LocalBusiness (Tour Operator)

**Plantilla para locations/compostela/operadores-turisticos-compostela.html:**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Operadores Turísticos en Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/operadores-turisticos-compostela.html",
      "description": "Operadores turísticos en Compostela, Nayarit. Tours, excursiones y servicios para explorar el Pueblo Mágico y sus alrededores.",
      "image": "https://compostelacercadeti.mx/images/compostela/operadores-turisticos-compostela.jpg",
      "hasPart": [
        {
          "@type": "LocalBusiness",
          "name": "Tour Operators en Compostela",
          "description": "Tours y excursiones guiadas",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Compostela",
            "addressRegion": "Nayarit",
            "addressCountry": "MX"
          }
        }
      ]
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Operadores Turísticos | Compostela Pueblo Mágico">
    <meta property="og:description" content="Operadores turísticos en Compostela, Nayarit. Tours, excursiones y servicios para explorar el Pueblo Mágico y sus alrededores.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/operadores-turisticos-compostela.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/operadores-turisticos-compostela.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Tour Operators en Compostela">
    <meta name="twitter:description" content="Tours y excursiones guiadas en Compostela">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/operadores-turisticos-compostela.jpg">
```

**Repetir para los 8 archivos de operadores:**
- [ ] locations/chacala/operadores-turisticos-chacala.html (si existe)
- [ ] locations/guayabitos/operadores-turisticos-guayabitos.html
- [ ] locations/la-penita/operadores-turisticos-penita.html
- [ ] locations/los-ayala/operadores-turisticos-ayala.html
- [ ] (+ 4 más)

**Después de cada uno:**
```bash
git add locations/[destino]/operadores-turisticos-[destino].html
git commit -m "SEO: agregar schema LocalBusiness + OG tags a operadores-[destino]"
```

---

## Task 11: Implementar Schema + OG en Páginas Especiales (8 archivos)

**Files:**
- locations/compostela/destinos-cercanos-compostela.html → Place
- locations/compostela/andador-cafetero.html → TouristAttraction
- locations/guayabitos/isla-coral.html → TouristAttraction
- locations/guayabitos/vida-nocturna-guayabitos.html → EntertainmentBusiness

**Schema A: destinos-cercanos-compostela.html**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Destinos Cercanos a Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/destinos-cercanos-compostela.html",
      "description": "Destinos cercanos a Compostela, Nayarit. Playas, pueblos y aventuras a pocos minutos del Pueblo Mágico en la Riviera Nayarit.",
      "image": "https://compostelacercadeti.mx/images/compostela/destinos-cercanos-compostela.jpg"
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Destinos Cercanos | Compostela Pueblo Mágico">
    <meta property="og:description" content="Destinos cercanos a Compostela, Nayarit. Playas, pueblos y aventuras a pocos minutos del Pueblo Mágico en la Riviera Nayarit.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/destinos-cercanos-compostela.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/destinos-cercanos-compostela.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Destinos Cercanos a Compostela">
    <meta name="twitter:description" content="Playas, pueblos y aventuras cerca de Compostela">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/destinos-cercanos-compostela.jpg">
```

**Schema B: andador-cafetero.html**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Andador Cafetero de Compostela",
      "url": "https://compostelacercadeti.mx/locations/compostela/andador-cafetero.html",
      "description": "Recorre el Andador Cafetero de Compostela, Nayarit. Degustación de café de altura, artesanías y cultura en el Pueblo Mágico.",
      "image": "https://compostelacercadeti.mx/images/compostela/andador-cafetero.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Compostela",
        "addressRegion": "Nayarit",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.2368",
        "longitude": "-104.9024"
      }
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Andador Cafetero | Compostela Pueblo Mágico">
    <meta property="og:description" content="Recorre el Andador Cafetero de Compostela, Nayarit. Degustación de café de altura, artesanías y cultura en el Pueblo Mágico.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/compostela/andador-cafetero.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/compostela/andador-cafetero.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Andador Cafetero">
    <meta name="twitter:description" content="Degustación de café, artesanías y cultura en Compostela">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/compostela/andador-cafetero.jpg">
```

**Schema C: isla-coral.html**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Isla del Coral",
      "url": "https://compostelacercadeti.mx/locations/guayabitos/isla-coral.html",
      "description": "Isla del Coral en Guayabitos: snorkel en aguas cristalinas, arrecifes de coral y vida marina. El acuario natural de la Riviera Nayarit.",
      "image": "https://compostelacercadeti.mx/images/guayabitos/isla-coral.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guayabitos",
        "addressRegion": "Nayarit",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.4956",
        "longitude": "-105.4712"
      }
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Isla del Coral | El Acuario Natural de la Riviera Nayarit">
    <meta property="og:description" content="Isla del Coral en Guayabitos: snorkel en aguas cristalinas, arrecifes de coral y vida marina. El acuario natural de la Riviera Nayarit.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/guayabitos/isla-coral.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/guayabitos/isla-coral.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Isla del Coral">
    <meta name="twitter:description" content="Snorkel, arrecifes de coral y vida marina en la Isla del Coral">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/guayabitos/isla-coral.jpg">
```

**Schema D: vida-nocturna-guayabitos.html**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EntertainmentBusiness",
      "name": "Vida Nocturna en Guayabitos",
      "url": "https://compostelacercadeti.mx/locations/guayabitos/vida-nocturna-guayabitos.html",
      "description": "Vida nocturna en Guayabitos, Nayarit. Bares, restaurantes nocturnos y entretenimiento junto a la playa en la Riviera Nayarit.",
      "image": "https://compostelacercadeti.mx/images/guayabitos/vida-nocturna.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guayabitos",
        "addressRegion": "Nayarit",
        "addressCountry": "MX"
      }
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Vida Nocturna | Rincón de Guayabitos">
    <meta property="og:description" content="Vida nocturna en Guayabitos, Nayarit. Bares, restaurantes nocturnos y entretenimiento junto a la playa en la Riviera Nayarit.">
    <meta property="og:image" content="https://compostelacercadeti.mx/images/guayabitos/vida-nocturna.jpg">
    <meta property="og:url" content="https://compostelacercadeti.mx/locations/guayabitos/vida-nocturna-guayabitos.html">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Vida Nocturna en Guayabitos">
    <meta name="twitter:description" content="Bares, restaurantes y entretenimiento nocturno en Guayabitos">
    <meta name="twitter:image" content="https://compostelacercadeti.mx/images/guayabitos/vida-nocturna.jpg">
```

**Después de cada página especial:**
```bash
git add locations/[destino]/[pagina].html
git commit -m "SEO: agregar schema + OG tags a [pagina]"
```

---

## Task 12: Verificación Final y Commit Consolidado

**Objetivo:** Verificar que todos los schema y OG tags se hayan agregado correctamente.

- [ ] **Step 1: Verificar 10 páginas aleatorias**

```bash
# Verificar que canonical + schema + OG tags existan en cada archivo
for file in "index.html" \
  "locations/guayabitos/guayabitos.html" \
  "locations/compostela/atractivos-turisticos-compostela.html" \
  "locations/chacala/gastronomia-chacala.html" \
  "locations/la-penita/hospedajes-penita.html" \
  "locations/los-ayala/eventos-temporada-ayala.html" \
  "locations/platanitos/gastronomia-platanitos.html" \
  "locations/guayabitos/isla-coral.html" \
  "locations/compostela/andador-cafetero.html" \
  "locations/eventos.html"
do
  echo "=== $file ==="
  grep -c "rel=\"canonical\"" "$file" && echo "✓ Canonical found"
  grep -c "application/ld+json" "$file" && echo "✓ Schema found"
  grep -c "og:title" "$file" && echo "✓ OG tags found"
done
```

Expected: Cada archivo debe mostrar "✓" para las 3 búsquedas.

- [ ] **Step 2: Validar JSON-LD con herramienta online**

Abrir https://validator.schema.org/ y validar 3-5 archivos para confirmar que JSON-LD es válido.

- [ ] **Step 3: Validar OG tags con debugger de Facebook**

Abrir https://developers.facebook.com/tools/debug/ e ingresar 2-3 URLs para verificar que OG tags se renderizen correctamente.

- [ ] **Step 4: Commit Final Consolidado**

```bash
git log --oneline | head -1  # Verificar últimos commits
git status  # Confirmar que no hay cambios pendientes
```

- [ ] **Step 5: Crear resumen de cambios**

```bash
git log --oneline HEAD~n..HEAD
# donde n = número de commits en Fase 2
```

---

## Summary

**Total de cambios Fase 2:**
- 43 páginas con Schema Markup (JSON-LD)
- 43 páginas con Open Graph tags
- 43 páginas con Twitter Card tags
- ~5-7 commits consolidados por grupo de trabajo
- Impacto estimado: SEO Score 63→70-72/100

---

Plan complete and saved to `docs/superpowers/plans/2026-05-26-schema-og-tags-fase2.md`. 

## Dos opciones de ejecución:

**Opción 1: Subagent-Driven (Recomendado)** 🤖
- Dispatch un subagent por task
- Revisión entre tasks
- Más rápido para trabajo masivo (43 archivos)
- Ideal para tareas repetitivas

**Opción 2: Inline Execution** 👨‍💻
- Ejecutar en esta sesión
- Control directo, feedback inmediato
- Más lento pero más control

¿Cuál prefieres? (Recomiendo Subagent-Driven para este volumen) 🚀