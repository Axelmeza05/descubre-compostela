# 🗺️ Proyecto Mapa Interactivo - Municipio de Compostela

## 📋 Descripción del Proyecto

Este es un mapa interactivo del Municipio de Compostela, Nayarit, que permite a los usuarios explorar diferentes ubicaciones haciendo clic en pins rojos sobre el mapa satelital.

## 📂 Estructura de Carpetas

```
proyecto-compostela/
│
├── index.html              # Página principal con el mapa interactivo
│
├── css/
│   └── styles.css         # Todos los estilos del proyecto
│
├── js/
│   └── map.js             # Lógica del mapa y pins
│
├── images/
│   └── mapa-compostela.png  # Imagen satelital del mapa
│
└── locations/             # Páginas de cada ubicación
    ├── compostela.html    # Página de Compostela (COMPLETA)
    ├── guayabitos.html    # Página de Guayabitos (COMPLETA)
    ├── las-varas.html     # Página de Las Varas (COMPLETA)
    ├── penita.html        # Página de La Peñita (PLANTILLA)
    ├── isla-coral.html    # Página de Isla del Coral (PLANTILLA)
    └── PLANTILLA.html     # Plantilla base para crear nuevas páginas
```

## 🚀 Cómo Usar el Proyecto

### Instalación Local

1. **Descarga todos los archivos** manteniendo la estructura de carpetas
2. **Abre `index.html`** en tu navegador
3. **Haz clic en los pins rojos** para navegar a cada ubicación

### Modificar Páginas de Ubicaciones

Cada página de ubicación se puede editar independientemente:

1. Navega a la carpeta `locations/`
2. Abre el archivo HTML de la ubicación que quieres modificar
3. Edita el contenido entre los tags HTML
4. Guarda y recarga en el navegador

## ✏️ Cómo Editar Páginas de Ubicaciones

### Estructura de una Página

```html
<div class="location-header">
    <h1>[EMOJI] [NOMBRE]</h1>
    <p>[SUBTÍTULO]</p>
</div>

<div class="section">
    <h2>🎯 Lugares de Interés</h2>
    <ul>
        <li>[Emoji] [Descripción]</li>
        <!-- Agregar más items -->
    </ul>
</div>
```

### Ejemplo: Editar Compostela

Abre `locations/compostela.html` y modifica:

```html
<!-- Cambiar el título -->
<h1>🏛️ Compostela</h1>

<!-- Agregar una nueva atracción -->
<li>🎨 Nueva Galería - Arte local contemporáneo</li>

<!-- Agregar un restaurante -->
<li>🍽️ Nuevo Restaurant - Cocina fusión</li>
```

## 🎨 Personalización

### Cambiar Colores

Edita `css/styles.css`:

```css
/* Cambiar color de los pins */
.location-pin path {
    fill: #ef4444;  /* Cambiar este color */
}

/* Cambiar color del header */
.header {
    background: linear-gradient(...);  /* Tu gradiente */
}
```

### Agregar Nuevas Ubicaciones

1. **Edita `js/map.js`** y agrega la ubicación al array:

```javascript
const locations = [
    // ... ubicaciones existentes
    { 
        id: 'nueva-ubicacion', 
        name: 'Nueva Ubicación', 
        x: 50.0,  // Porcentaje horizontal (0-100)
        y: 50.0,  // Porcentaje vertical (0-100)
        important: false 
    }
];
```

2. **Crea la página HTML**:
   - Copia `PLANTILLA.html`
   - Renómbrala a `nueva-ubicacion.html`
   - Edita el contenido

3. **Ajusta las coordenadas** (x, y) hasta que el pin aparezca en el lugar correcto

### Cambiar la Imagen del Mapa

1. Reemplaza `images/mapa-compostela.png` con tu nueva imagen
2. Mantén el mismo nombre O
3. Actualiza la referencia en `index.html`:

```html
<img src="images/TU-NUEVA-IMAGEN.png" ...>
```

## 🔧 Configuración de Pins

### Posicionar Pins Correctamente

Los pins usan coordenadas en **porcentaje** (0-100) relativas a la imagen:

```javascript
{ 
    id: 'compostela', 
    x: 76.8,  // 76.8% desde la izquierda
    y: 40.0,  // 40% desde arriba
    important: true  // true = animación extra
}
```

**Tips para encontrar coordenadas:**
1. Abre la imagen en un editor
2. Identifica el punto exacto
3. Calcula: (posición_pixel / tamaño_total) × 100

Ejemplo:
- Imagen: 1000px de ancho
- Punto: 768px desde la izquierda
- Coordenada X: (768 / 1000) × 100 = 76.8

## 📝 Páginas Completadas vs Plantillas

### ✅ Páginas Completas (Listas para usar)
- `compostela.html` - Información completa
- `guayabitos.html` - Información completa
- `las-varas.html` - Información completa

### 📄 Plantillas (Necesitan editarse)
- `penita.html` - Copiar de PLANTILLA y completar
- `isla-coral.html` - Copiar de PLANTILLA y completar

### Cómo Completar una Plantilla

1. Abre `PLANTILLA.html`
2. Reemplaza todos los `[NOMBRE]`, `[EMOJI]`, etc.
3. Agrega contenido real de la ubicación
4. Guarda con el nombre correcto

## 🌐 Publicar en Internet

### GitHub Pages (Gratis)

1. Sube todo el proyecto a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama y carpeta
4. Tu sitio estará en: `https://tu-usuario.github.io/proyecto/`

### Netlify (Gratis)

1. Arrastra la carpeta completa a Netlify.com
2. Tu sitio estará listo en minutos
3. URL personalizable

## 🐛 Solución de Problemas

### Problema: No se ve el mapa

**Causa:** Imagen no encontrada

**Solución:** 
- Verifica que `mapa-compostela.png` esté en `images/`
- Verifica la ruta en `index.html`

### Problema: Los pins no aparecen

**Causa:** JavaScript no se carga

**Solución:**
- Verifica que `map.js` esté en `js/`
- Abre la consola del navegador (F12) para ver errores

### Problema: Al hacer clic no abre la página

**Causa:** Archivo HTML no existe

**Solución:**
- Verifica que el archivo exista en `locations/`
- Verifica que el `id` en `map.js` coincida con el nombre del archivo

## 📞 Soporte Técnico

Para modificar el proyecto:

1. **HTML:** Para cambiar contenido y estructura
2. **CSS:** Para cambiar diseño y colores  
3. **JavaScript:** Para cambiar comportamiento de pins

## ✨ Características

- ✅ Responsive (funciona en móviles)
- ✅ Pins rojos siempre visibles
- ✅ Animaciones suaves
- ✅ Enlaces directos a páginas
- ✅ Fácil de modificar
- ✅ Sin dependencias externas
- ✅ Código organizado y comentado

## 📊 Ubicaciones Actuales

1. **Compostela** - Cabecera municipal
2. **Rincón de Guayabitos** - Playa turística
3. **Las Varas** - Centro comercial
4. **La Peñita de Jaltemba** - Playa surf
5. **Isla del Coral** - Tour en lancha

---

**Versión:** 1.0
**Última actualización:** Diciembre 2024
**Licencia:** Uso libre para Municipio de Compostela