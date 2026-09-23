import fetch from 'node-fetch';
import { writeFileSync, mkdirSync } from 'fs';

const BASE_URL = 'https://raw.githubusercontent.com/giumontebruno/promo-bancos-py/main/public/promotions.json';

// Mapeo de bancos y sus niveles de tarjeta
const BANKS_CONFIG = {
  'Itaú': {
    levels: ['Personal Bank', 'Clásica', 'Oro', 'Signature', 'Infinite', 'AMEX Platinum'],
    primary: 'Infinite'
  },
  'GNB': {
    levels: ['Clásica', 'Premier'],
    primary: 'Clásica',
    card_types: ['Visa', 'Mastercard']
  },
  'Atlas': {
    levels: ['Clásica', 'Oro', 'Signature', 'Infinite', 'Mastercard Black'],
    primary: 'Clásica'
  },
  'ueno bank': {
    levels: [1, 2, 3, 4, 5],
    primary: 2
  },
  'Continental': {
    levels: ['Clásica', 'Oro', 'Platinum', 'Black'],
    primary: 'Clásica'
  },
  'Familiar': {
    levels: ['Clásica', 'Oro', 'Platinum'],
    primary: 'Clásica'
  },
  'Sudameris': {
    levels: ['Clásica', 'Oro', 'Platinum'],
    primary: 'Clásica'
  },
  'BNF': {
    levels: ['Clásica', 'Oro'],
    primary: 'Clásica'
  },
  'Coop. Universitaria': {
    levels: ['Clásica'],
    primary: 'Clásica'
  },
  'Basa': {
    levels: ['Clásica', 'Oro', 'Platinum'],
    primary: 'Clásica'
  },
  'Banco Río': {
    levels: ['Clásica', 'Oro'],
    primary: 'Clásica'
  },
  'Bancop': {
    levels: ['Clásica', 'Oro'],
    primary: 'Clásica'
  },
  'Interfisa': {
    levels: ['Clásica', 'Oro'],
    primary: 'Clásica'
  },
  'Solar': {
    levels: ['Clásica', 'Oro'],
    primary: 'Clásica'
  },
  'Zeta Banco': {
    levels: ['Clásica'],
    primary: 'Clásica'
  },
  'Financiera Paraguayo Japonesa': {
    levels: ['Clásica', 'Premium'],
    primary: 'Clásica'
  },
  'Finlatina': {
    levels: ['Clásica', 'Oro'],
    primary: 'Clásica'
  },
  'Tu Financiera': {
    levels: ['Clásica'],
    primary: 'Clásica'
  },
  'Cefisa': {
    levels: ['Clásica'],
    primary: 'Clásica'
  },
  'Creditotal': {
    levels: ['Clásica'],
    primary: 'Clásica'
  },
  'Credicard': {
    levels: ['Clásica'],
    primary: 'Clásica',
    note: 'Sello usado por cooperativas'
  },
  'Cabal': {
    levels: ['Clásica'],
    primary: 'Clásica',
    note: 'Sello usado por cooperativas'
  },
  'Panal': {
    levels: ['Clásica'],
    primary: 'Clásica',
    note: 'Sello usado por cooperativas'
  }
};

// Parser de topes desde texto
function parseTopes(text) {
  if (!text) return null;

  const result = {};

  // Buscar tope de compra
  const compraMatch = text.match(/tope.*?compra.*?Gs\.?\s*([\d.,]+)/i);
  if (compraMatch) {
    result.purchase_cap = parseInt(compraMatch[1].replace(/[.,]/g, ''));
  }

  // Buscar tope de reintegro
  const reintegroMatch = text.match(/tope.*?reintegro.*?Gs\.?\s*([\d.,]+)/i);
  if (reintegroMatch) {
    result.refund_cap = parseInt(reintegroMatch[1].replace(/[.,]/g, ''));
  }

  // Buscar mínimo de compra
  const minimoMatch = text.match(/m[íi]nimo.*?compra.*?Gs\.?\s*([\d.,]+)/i);
  if (minimoMatch) {
    result.min_purchase = parseInt(minimoMatch[1].replace(/[.,]/g, ''));
  }

  return Object.keys(result).length > 0 ? result : null;
}

// Normalizar datos
function normalizePromo(promo) {
  const normalized = { ...promo };

  // Parsear topes si no existen
  if (!normalized.caps_and_minimums && normalized.validity) {
    const topes = parseTopes(normalized.validity);
    if (topes) {
      normalized.parsed_caps = topes;
    }
  }

  // Asegurar que percentages sea un array
  if (typeof normalized.percentages === 'string') {
    normalized.percentages = [normalized.percentages];
  }
  if (!Array.isArray(normalized.percentages)) {
    normalized.percentages = [];
  }

  return normalized;
}

async function scrapePromos() {
  try {
    console.log('Descargando promos base...');
    const response = await fetch(BASE_URL);
    let promos = await response.json();

    // Normalizar todas las promos
    promos = promos.map(normalizePromo);

    // Agregar metadata de bancos
    promos = promos.map(p => ({
      ...p,
      bank_config: BANKS_CONFIG[p.bank] || { levels: ['Clásica'] }
    }));

    // Guardar
    mkdirSync('data', { recursive: true });
    writeFileSync('data/promos.json', JSON.stringify(promos, null, 2));

    console.log(`✅ ${promos.length} promos descargadas y normalizadas`);

    // Estadísticas por banco
    const byBank = {};
    promos.forEach(p => {
      if (!byBank[p.bank]) byBank[p.bank] = 0;
      byBank[p.bank]++;
    });

    console.log('\nCobertura por banco:');
    Object.entries(byBank).sort((a, b) => b[1] - a[1]).forEach(([bank, count]) => {
      console.log(`  ${bank}: ${count}`);
    });

    return promos;
  } catch (error) {
    console.error('Error al descargar promos:', error.message);
    process.exit(1);
  }
}

scrapePromos();
