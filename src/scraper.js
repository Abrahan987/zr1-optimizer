// src/scraper.js

import { CacheManager } from './core/cache.js';
import { ConnectionManager } from './core/connection.js';

/**
 * La clase principal de la librería, que orquesta las optimizaciones.
 */
export class UltraModeScraper {
  constructor() {
    this.cache = new CacheManager();
    this.connectionManager = new ConnectionManager();
    console.log('UltraModeScraper inicializado con los módulos de Caché y Gestión de Conexiones.');
  }

  /**
   * Obtiene el contenido de una URL, utilizando la caché y la piscina de conexiones.
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

    // 2. Si no está en la caché, adquiere una conexión y realiza la petición
    console.log(`[CACHE MISS] '${url}' no encontrado en la caché. Solicitando conexión...`);
    const connection = await this.connectionManager.acquire();
    let content;

    try {
      // 3. Simula la petición de red usando la conexión adquirida
      content = await this.simulateNetworkRequest(url, connection);

      // 4. Almacena la nueva respuesta en la caché
      this.cache.set(url, content);
      console.log(`[CACHE SET] Guardando la respuesta de '${url}' en la caché.`);
    } finally {
      // 5. Libera la conexión para que otros puedan usarla, incluso si hay un error
      this.connectionManager.release(connection);
    }

    return content;
  }

  /**
   * Simula una petición de red con una latencia artificial.
   * @private
   */
  simulateNetworkRequest(url, connection) {
    console.log(`Realizando petición para '${url}' usando '${connection}'...`);
    return new Promise(resolve => {
      // Latencia aleatoria entre 200ms y 700ms
      const latency = Math.random() * 500 + 200;
      setTimeout(() => {
        resolve(`<html><body>Contenido de ${url}</body></html>`);
      }, latency);
    });
  }

  /**
   * Devuelve las estadísticas de la caché.
   */
  getCacheStats() {
    return this.cache.getStats();
  }

  /**
   * Devuelve las estadísticas de la piscina de conexiones.
   */
  getConnectionStats() {
    return this.connectionManager.getStats();
  }
}
