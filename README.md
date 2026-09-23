# 💰 Ahorrador de Tarjetas PY

Tu comparador inteligente de beneficios bancarios en Paraguay. Encuentra los mejores descuentos y calcula exactamente cuánto ahorras.

🔗 **URL en vivo**: https://tu-usuario.github.io/ahorrador-tarjetas-py/

## Características

✅ **Onboarding intuitivo** - Selecciona tus bancos y niveles de tarjeta  
✅ **Dashboard personalizado** - Recomendaciones basadas en tus tarjetas  
✅ **Lo mejor para hoy** - Promos vigentes para cada día  
✅ **Calculadora de ahorro real** - Incluye topes y límites  
✅ **Resumen mensual estimado** - Ahorra basado en tus gastos  
✅ **Datos actualizados diariamente** - Scraping automático vía GitHub Actions  

## Cobertura

- 🏦 22+ bancos y financieras
- 💳 Todos los niveles de tarjeta
- 🏪 2,000+ promociones
- 📍 Categorías: Supermercados, Combustible, Restaurantes, Farmacias, Casa, etc.

## Estructura

```
ahorrador-tarjetas-py/
├── public/
│   ├── index.html          # Aplicación web
│   └── .nojekyll           # Para GitHub Pages
├── scripts/
│   └── scraper.js          # Descarga y parsea promos
├── data/
│   └── promos.json         # JSON de promos (generado)
├── .github/
│   └── workflows/
│       └── scrape.yml      # GitHub Actions - corre diario
└── README.md
```

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Ejecutar scraper
npm run scrape

# Los datos se guardan en data/promos.json
# Abre public/index.html en tu navegador
```

## Cómo deployar en GitHub Pages

1. Fork o crea un nuevo repo
2. Sube este código
3. Ve a Settings → Pages
4. Selecciona "Deploy from a branch"
5. Branch: `main`, Folder: `public/`
6. ¡Listo! Accede a `https://tu-usuario.github.io/ahorrador-tarjetas-py/`

## Monetización (Roadmap)

- **Dashboard para bancos** - Visualiza qué da la competencia (USD 500-2k/mes)
- **Integración con APIs** - Conexión directa a datos bancarios
- **Suscripción premium** - Control de topes consumidos (Gs. 15k/mes)
- **Alertas personalizadas** - Notificaciones de nuevas promos

## Fuente de datos

- **Base**: [promo-bancos-py](https://github.com/giumontebruno/promo-bancos-py) - 2,195 promos scrapeadas diariamente
- **Nuevos emisores**: Scrapers propios que se agregan continuamente

## Contribuir

Las mejoras son bienvenidas. Abre un issue o PR.

## Licencia

MIT - Úsalo libremente

---

Hecho en 🇵🇾 por amantes de los buenos descuentos
