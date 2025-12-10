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

Por defecto el arvhivo llama al modelo de ``menu`` de directus para obtener las rutas, si hay otros modelos (post, productos, categorias, etc) realizar la respectiva consulta para añadirlas al sitemap

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
- Cuando las imgenes son de directus, asegurarse que esten optimizadas y convertidas a webp, deben quedar con el formato:
````string
https://directus.com/assets/[image-id]/[image-name].webp?format=webp&height=[xxx]&width=[xxx]
````
las dimensiones de la imagen deben quedar acorde al espacio donde se muestre, el tamaño que se coloca en la query es uno aproximado para que directus realice la conversion adecuada