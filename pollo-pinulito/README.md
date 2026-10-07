# Pollo Pinulito — caso académico

Página estática basada en los archivos originales. Conserva el diseño, las recetas, el quiz, los menús y el aviso de que es una simulación universitaria.

## Publicar en GitHub Pages

1. Crea el repositorio **farmaciasacevedo/pollo-pinulito** con visibilidad **Public**.
2. Sube el contenido de esta carpeta a la raíz del repositorio, conservando las carpetas `assets` y `scripts`. `index.html` debe quedar en la raíz, junto a `logo_pinulito.png`, `qr_code.svg` y `qr_codigo_pinulito.png`.
3. Abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama **main**, carpeta **/(root)**, y pulsa **Save**.
6. Espera a que GitHub indique que la página está publicada y utiliza **Visit site**.

Dirección prevista: **https://farmaciasacevedo.github.io/pollo-pinulito/**.

Sube los archivos extraídos del ZIP; subir únicamente el ZIP no publica la página. La carpeta del repositorio debe contener directamente `index.html`, no otra carpeta `pollo-pinulito` por encima. Si el navegador avisa que ya hay un README, este puede reemplazar al README vacío que creó GitHub.

No se necesita instalar nada para publicar: los estilos ya están compilados y el JavaScript está dentro del HTML. `.nojekyll` permite servir directamente los archivos estáticos; si el selector del navegador oculta ese archivo, esta página también funciona con el procesamiento predeterminado porque no usa carpetas con nombres que empiecen por guion bajo ni cabeceras Jekyll.

Guía oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Código QR

Los archivos PNG y SVG apuntan a **https://farmaciasacevedo.github.io/pollo-pinulito/**. El botón de la ficha académica descarga el SVG incluido. El QR abrirá la página una vez que Pages esté publicado.

Si cambias el usuario, el nombre del repositorio o el dominio, actualiza ambos códigos antes de compartirlos. Con Node.js instalado, puedes regenerarlos sin instalar paquetes ni enviar la dirección a un servicio externo:

```powershell
node scripts/generar-qr.cjs https://USUARIO.github.io/REPOSITORIO/
```

También puedes utilizar el auxiliar PowerShell:

```powershell
./scripts/generar-qr.ps1 -Url https://USUARIO.github.io/REPOSITORIO/
```

Los scripts auxiliares son herramientas de mantenimiento y no se ejecutan en GitHub Pages. Se reemplazaron los scripts de prueba adjuntos, que escribían en una ruta de otro equipo y generaban un QR para una dirección distinta.

## Dependencias y alcance

- Tailwind CSS **3.4.17**, la misma versión detectada en la dependencia original, compilado en `assets/tailwind.min.css`. El sitio ya no depende del script de desarrollo de Google ni de otro CDN de estilos.
- Las seis fotografías y la alternativa de la portada siguen alojadas en **Unsplash**, como en el archivo original. Necesitan conexión a internet.
- El logo y ambos formatos del QR son archivos locales con rutas relativas compatibles con el subdirectorio de GitHub Pages.
- La encuesta guarda votos solamente durante la sesión actual de la página. El club, los pedidos, las promociones y los botones de compartir conservan la simulación original; no hay servidor, pagos ni registro real.
- Los enlaces sociales del pie de página son los enlaces generales de ejemplo que venían en el original. No se añadieron perfiles ni teléfonos inventados.
- La copia de texto confirma el éxito y avisa si el navegador no permite usar el portapapeles.

## Cambios realizados

1. Sustitución del script de Tailwind de desarrollo por una hoja de estilos local de la misma versión.
2. Creación y verificación de los QR en PNG y SVG para la dirección prevista de GitHub Pages, con margen blanco para facilitar el escaneo.
3. Corrección de destinos internos de navegación y del enlace de descarga del QR.
4. Adición del icono usando el logo existente y de `.nojekyll`.
5. Manejo de fallos del portapapeles y auxiliares de QR portables.

La dirección prevista no acredita que la página esté publicada; esto se confirma en **Settings → Pages** después de subir los archivos.
