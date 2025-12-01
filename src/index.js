// src/index.js
import { UltraModeScraper } from './scraper.js';

// Muestra el mensaje de inicio
console.log('SCRAPER BY ABRAHAN-M OPTIMIZAR TU BOT');
console.log('-----------------------------------------');

const scraper = new UltraModeScraper();

// --- Demostración de todas las optimizaciones ---
async function demo() {
  console.log('--- Iniciando demostración ---');

  const url = 'https://ejemplo.com/pagina-grande';

  console.log('\n--- Primera Petición (Usa Conexión y Descompresión) ---');
  await scraper.fetch(url);

  console.log('\n--- Segunda Petición (Debería usar la Caché) ---');
  await scraper.fetch(url);

  console.log('-----------------------------------------');
}

// Función para mostrar el reporte de optimización
const mostrarReporteDeOptimizacion = () => {
  const cacheStats = scraper.getCacheStats();
  const connStats = scraper.getConnectionStats();
  const compStats = scraper.getCompressionStats();

  console.log(`[${new Date().toLocaleTimeString()}] Reporte de optimización:`);
  console.log('  Módulo de Caché:');
  console.log(`    - Aciertos: ${cacheStats.hits}, Fallos: ${cacheStats.misses}, Tasa: ${cacheStats.hitRate}`);
  console.log('  Módulo de Conexiones:');
  console.log(`    - Disponibles: ${connStats.available}, Activas: ${connStats.active}`);
  console.log('  Módulo de Compresión:');
  console.log(`    - Ahorro total: ${compStats.bytesSaved} bytes, Tasa de ahorro: ${compStats.savingRate}`);
  console.log('-----------------------------------------');
};

// Ejecuta la demo y luego empieza a monitorizar
demo().then(() => {
  console.log("\nMonitorizando el rendimiento... El primer reporte será en 10 minutos.");

  const DIEZ_MINUTOS_EN_MS = 10 * 60 * 1000;
  setInterval(mostrarReporteDeOptimizacion, DIEZ_MINUTOS_EN_MS);
});
