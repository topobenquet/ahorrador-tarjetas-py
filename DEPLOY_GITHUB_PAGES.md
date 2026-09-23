# 🚀 Cómo Deployar en GitHub Pages

## Opción 1: Crear un repo nuevo (Recomendado)

### Paso 1: Crear repo en GitHub
1. Ve a https://github.com/new
2. Nombre: `ahorrador-tarjetas-py`
3. Descripción: "Comparador inteligente de beneficios bancarios en Paraguay"
4. Público
5. **NO** inicialices con README (déjalo vacío)
6. Click en "Create repository"

### Paso 2: Subir archivos
```bash
# En tu terminal, dentro de la carpeta ahorrador-tarjetas-py/
git init
git add .
git commit -m "Initial commit: Ahorrador de tarjetas PY"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ahorrador-tarjetas-py.git
git push -u origin main
```

### Paso 3: Configurar GitHub Pages
1. Ve a tu repo → Settings
2. Scroll a "Pages" (lado izquierdo)
3. En "Source" selecciona:
   - **Branch**: `main`
   - **Folder**: `public`
4. Click en "Save"

### Paso 4: Esperar 1-2 minutos
GitHub va a generar tu sitio. Cuando esté listo, verás la URL:
```
https://tu-usuario.github.io/ahorrador-tarjetas-py/
```

---

## Opción 2: Usar tu repo existente

Si ya tienes un repo, solo:

```bash
# 1. Descargar el tar.gz
# 2. Extraer en tu repo
tar -xzf ahorrador-tarjetas-py.tar.gz

# 3. Copiar archivos
cp -r ahorrador-tarjetas-py/* tu-repo/

# 4. Push
git add .
git commit -m "Add ahorrador de tarjetas"
git push

# 5. Settings → Pages → main / public folder
```

---

## Verificar que está online

Una vez deployado:
- Visita tu URL
- Abre la consola (F12)
- No debe haber errores
- Las promos deben cargar desde GitHub

---

## GitHub Actions (Scraping automático)

El repo incluye un workflow que:
- ✅ Corre automáticamente cada día a las 12:00 UTC
- ✅ Descarga nuevas promos
- ✅ Hace push automático

**Para activarlo:**
1. Ve a Actions en tu repo
2. Si pide permisos, haz click en "I understand..."
3. Listo, corre automático de ahí en adelante

---

## Troubleshooting

### "Page build warning"
- Ignora, es normal
- Asegúrate que public/ tiene index.html

### "Promos no cargan"
- Abre F12 → Console
- Verifica que `https://raw.githubusercontent.com/...` sea accesible
- Si no, revisa tu conexión

### "GitHub Actions no corre"
- Ve a Actions → Workflows
- Haz click en "scrape.yml"
- Botón "Run workflow" para probar

---

## Dominios personalizados (Opcional)

Si quieres `tudominio.com` en lugar de `github.io`:

1. Ve a Settings → Pages
2. En "Custom domain" ingresa `tudominio.com`
3. Configura tu registrador DNS con el CNAME:
   ```
   tu-usuario.github.io
   ```

---

## ¿Necesitas ayuda?

- GitHub Pages docs: https://docs.github.com/en/pages
- Issues del proyecto: Abre un issue en el repo

---

Esto es todo lo que necesitas. El sitio estará vivo en ~2 minutos. 🎉
