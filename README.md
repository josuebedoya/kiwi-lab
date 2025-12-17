# 1 Projects starts

```bash
    npm install
    npm run dev
```

# Review Project to Finish

## Robots.txt

- You must review the robots.txt file to ensure it is correctly configured for your website's SEO needs.
  Replace the line ``Sitemap: https://site-web.com/sitemap.xml`` but your actual domain name.

## Sitemap.xml.tsx

- You must review the sitemap.xml.tsx file to ensure it is correctly configured for your website
- La estructura que encontramos es la minima para generar un sitemap
- La idea es que alli esten presentes todas las rutas mas importantes del sitio web

Por defecto el arvhivo llama al modelo de ``menu`` de directus para obtener las rutas, si hay otros modelos (post,
productos, categorias, etc) realizar la respectiva consulta para añadirlas al sitemap

Cuando se añada información de otros modelos la idea es añadirlas a la variable ``links`` con la estructura:

```ts
{
  link: '/slug-del-elemento' // Ej: '/about-us', '/productos/zapato-123', etc
  lastmod: '2024-01-01' // Fecha de la ultima modificacion
  // otros si requiere
}
```

## Image Optimization

- Nos aseguramos que las imagenes esten optimizadas para la web, estas mismas no deben superar mas de 3MB de peso
- Utilizar formato webp en lo más posible en caso de las imagenes locales
- Cuando las imgenes son de directus, asegurarse que esten optimizadas y convertidas a webp, deben quedar con el
  formato:

````string
https://directus.com/assets/[image-id]/[image-name].webp?format=webp&height=[xxx]&width=[xxx]
````

las dimensiones de la imagen deben quedar acorde al espacio donde se muestre, el tamaño que se coloca en la query es uno
aproximado para que directus realice la conversion adecuada

## Archivos para eliminar base Proyecto Despues de migracion

- /src/actions
- /src/server/database
- /src/pages/migrations.astro
  <br>
  <br>
** Si tu sitio web no cuenta con buscador o Formularios, Puedes tambien eliminar **
  <br>
  <br>
- /src/components/species/form.astro
- /src/pages/api/form
- /src/pages/api/search

# 🧾 Checklist Completa para un Sitio Web desde Cero

## 🧱 Estructura Básica
- [ ] `<!DOCTYPE html>` y HTML semántico válido
- [ ] `<html lang="es">` definido
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Favicon (`/favicon.ico` o SVG)
- [ ] Archivo **robots.txt** configurado
    - [ ] Incluir referencia a sitemap (`Sitemap: https://tusitio.com/sitemap.xml`)
    - [ ] Permitir/bloquear crawlers específicos
    - [ ] User-agent para bots (Google, Bing, etc.)
- [ ] Archivo **sitemap.xml**
    - [ ] Sitemap de páginas dinámicas
    - [ ] Sitemap de imágenes (opcional)
    - [ ] Sitemap de videos (opcional)
    - [ ] Actualizar automáticamente al publicar contenido
- [ ] Sitemap HTML (opcional)
- [ ] Archivo **404 personalizado**
- [ ] Archivo **500 personalizado**
- [ ] Archivo **Dockerfile** para contenedorización

---

## 📈 SEO Técnico
- [ ] Título `<title>` único y descriptivo por página
- [ ] Meta descripción `<meta name="description">`
- [ ] Encabezados `<h1>`, `<h2>`, `<h3>` jerárquicos
- [ ] URLs limpias y amigables
- [ ] Etiqueta canonical (`<link rel="canonical" href="...">`)

### 📱 Open Graph (OG)
- [ ] `og:title`
- [ ] `og:description`
- [ ] `og:image` (1200x630px mínimo)
- [ ] `og:url`
- [ ] `og:type`
- [ ] `og:site_name`
- [ ] `og:locale` (es_ES, en_US, etc.)

### 𝕏 Twitter Cards
- [ ] `twitter:card` (summary, summary_large_image, app, player)
- [ ] `twitter:title`
- [ ] `twitter:description`
- [ ] `twitter:image`
- [ ] `twitter:creator` (opcional)

### 📋 Meta Tags Adicionales
- [ ] `author` - Autor del contenido
- [ ] `keywords` - Palabras clave (opcional)
- [ ] `robots` - Instrucciones para crawlers (index, follow, etc.)
- [ ] `theme-color` - Color de la barra del navegador
- [ ] `apple-mobile-web-app-capable` - App web en iOS

### 🏗️ Datos Estructurados (JSON-LD)
- [ ] `Schema.org Organization`
- [ ] `Schema.org WebSite`
- [ ] `Schema.org BreadcrumbList`

- [ ] Validar en https://schema.org/validator

### 🌍 Multilenguaje
- [ ] Etiquetas `hreflang` (si es multilenguaje)
- [ ] Atributo `lang` correcto en cada versión

---

## 🧠 Analítica y Seguimiento
- [ ] **Google Tag Manager** instalado
    - [ ] Contenedor GTM creado y verificado
    - [ ] Tags para eventos principales configurados
    - [ ] Disparadores (triggers) establecidos
    - [ ] Variables personalizadas definidas
    - [ ] Plan de medición documentado
- [ ] **Google Analytics 4** conectado (directo o vía GTM)
    - [ ] Propiedad GA4 creada
    - [ ] ID de medición configurado
    - [ ] Eventos personalizados rastreados
    - [ ] Conversiones definidas
    - [ ] Audiencias creadas
- [ ] **Google Search Console** verificado
    - [ ] Sitio verificado por DNS/archivo/meta tag
    - [ ] Sitemap enviado
    - [ ] URLs excluidas si es necesario
    - [ ] Monitorear errores de rastreo
- [ ] **Facebook Pixel** (si aplica)

---

## ⚡ Performance y Optimización
- [ ] Imágenes optimizadas (WebP / AVIF)
- [ ] **Lazy Load** para imágenes y videos
- [ ] CSS y JS minificados
- [ ] Cabeceras de **cache** configuradas:
    - [ ] `Cache-Control`
    - [ ] `ETag`
    - [ ] `Last-Modified`
    - [ ] `Expires`
- [ ] **Critical CSS** optimizado
- [ ] Gzip/Brotli compresión habilitada
- [ ] CDN configurado (si aplica)

---

## ♿ Accesibilidad
- [ ] Atributos `alt` en imágenes descriptivos
- [ ] Contraste de color adecuado (WCAG AA mínimo)
- [ ] Etiquetas `<label for="...">` en formularios
- [ ] Idioma del documento (`lang="es"`)
- [ ] Navegación por teclado funcional
- [ ] Validación WCAG 2.1 AA

---

## 🔒 Seguridad y Formularios
- [ ] **Certificado SSL (HTTPS)**
- [ ] Redirección HTTP → HTTPS
- [ ] **reCAPTCHA** en todos los formularios públicos
    - [ ] Google reCAPTCHA v3 (invisible) O
    - [ ] Google reCAPTCHA v2 ("No soy un robot") O
    - [ ] hCaptcha (privacidad mejorada)
    - [ ] Validación de token en servidor
    - [ ] Configuración de puntuación (v3)
- [ ] **Headers de seguridad** configurados:
    - [ ] `X-Content-Type-Options: nosniff`
    - [ ] `X-Frame-Options: SAMEORIGIN`
    - [ ] `X-XSS-Protection: 1; mode=block`
    - [ ] `Strict-Transport-Security: max-age=31536000`
    - [ ] `Content-Security-Policy`
    - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] No exponer API keys ni datos sensibles
- [ ] Validación en servidor (no solo cliente)

---

## 🐳 Deployement y Contenedorización
- [ ] **Dockerfile** creado
    - [ ] Imagen base apropiada (node:18-alpine, etc.)
    - [ ] Dependencias instaladas correctamente
    - [ ] Build multi-stage (opcional pero recomendado)
    - [ ] Usuario no-root por seguridad
    - [ ] Healthcheck configurado
- [ ] **.dockerignore** configurado
    - [ ] Excluir node_modules, .git, etc.
- [ ] **docker-compose.yml** (opcional)
    - [ ] Servicios principales definidos
    - [ ] Variables de entorno mapeadas
    - [ ] Volúmenes si aplica
    - [ ] Redes configuradas
- [ ] Imagen Docker construida y testeada
- [ ] Publicada en Docker Hub o registro privado
- [ ] CI/CD pipeline configurado (GitHub Actions, etc.)

---

## 🧩 Extras Recomendados
- [ ] Página de **Política de Privacidad**
- [ ] Página de **Términos y Condiciones**
- [ ] Opciones granulares (Analytics, Marketing, etc.)


- [ ] Versión funcional "sin JavaScript" (progressive enhancement)
- [ ] Feed RSS (si aplica)
- [ ] Newsletter signup (si aplica)
- [ ] Breadcrumbs navegacionales
- [ ] Search interno (si hay mucho contenido)

---

## ✅ Testing Final
- [ ] Test en diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Test en dispositivos móviles
- [ ] Test de velocidad (Google PageSpeed Insights)
- [ ] Test de SEO (Semrush, Ahrefs, Moz)
- [ ] Test de seguridad (SSL Labs, Security Headers)
- [ ] Test de accesibilidad (WAVE, Axe)


- [ ] talk.to (si Aplica) integrado y funcionando

