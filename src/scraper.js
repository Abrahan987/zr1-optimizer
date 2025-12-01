// src/scraper.js

import { CacheManager } from './core/cache.js';
import { ConnectionManager } from './core/connection.js';
import { CompressionManager } from './core/compression.js';

/**
 * La clase principal de la librería, que orquesta las optimizaciones.
 */
export class UltraModeScraper {
  constructor() {
    this.cache = new CacheManager();
    this.connectionManager = new ConnectionManager();
    this.compressionManager = new CompressionManager();
    console.log('UltraModeScraper inicializado con los módulos de Caché, Conexiones y Compresión.');
  }

  /**
   * Obtiene el contenido de una URL, aplicando todas las optimizaciones.
   * @param {string} url - La URL de la que se quiere obtener el contenido.
   * @returns {Promise<string>} El contenido de la página.
   */
  async fetch(url) {
    // 1. Revisa la caché primero
    const cachedContent = this.cache.get(url);
    if (cachedContent) {
      console.log(`[CACHE HIT] Obteniendo '${url}' desde la caché.`);
      return cachedContent;
    }

    // 2. Si no está en la caché, adquiere una conexión
    console.log(`[CACHE MISS] '${url}' no encontrado. Solicitando conexión...`);
    const connection = await this.connectionManager.acquire();
    let decompressedContent;

    try {
      // 3. Simula la petición de red, que devuelve una respuesta comprimida
      const compressedResponse = await this.simulateNetworkRequest(url, connection);

      // 4. Descomprime la respuesta
      decompressedContent = this.compressionManager.decompress(compressedResponse);

      // 5. Almacena la respuesta ya descomprimida en la caché
      this.cache.set(url, decompressedContent);
      console.log(`[CACHE SET] Guardando la respuesta de '${url}' en la caché.`);
    } finally {
      // 6. Libera la conexión
      this.connectionManager.release(connection);
    }

    return decompressedContent;
  }

  /**
   * Simula una petición de red que devuelve una respuesta comprimida.
   * @private
   */
  simulateNetworkRequest(url, connection) {
    console.log(`Realizando petición para '${url}' usando '${connection}'...`);
    return new Promise(resolve => {
      const latency = Math.random() * 500 + 200;
      setTimeout(() => {
        const originalContent = `<html><body>Contenido extenso y detallado de la página en ${url} para simular un tamaño considerable. Repetimos: contenido extenso.</body></html>`;
        const { compressedData } = this.compressionManager.compress(originalContent);

        console.log(`Recibida respuesta comprimida para '${url}'.`);
        resolve({ compressedData, originalContent });
      }, latency);
    });
  }

  /** Devuelve las estadísticas de la caché. */
  getCacheStats() {
    return this.cache.getStats();
  }

  /** Devuelve las estadísticas de la piscina de conexiones. */
  getConnectionStats() {
    return this.connectionManager.getStats();
  }

  /** Devuelve las estadísticas de compresión. */
  getCompressionStats() {
    return this.compressionManager.getStats();
  }
}
