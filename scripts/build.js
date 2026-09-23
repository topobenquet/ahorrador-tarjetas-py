import { copyFileSync, mkdirSync } from 'fs';

mkdirSync('public', { recursive: true });

// Copiar promos.json al directorio public
try {
  copyFileSync('data/promos.json', 'public/data.json');
  console.log('✅ data.json copiado a public/');
} catch (e) {
  console.log('⚠️  data.json no existe aún. Ejecuta npm run scrape primero.');
}

console.log('✅ Build completado');
