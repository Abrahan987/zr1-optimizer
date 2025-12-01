// src/core/compression.js

/**
 * Gestiona la compresión y descompresión de datos para reducir el
 * tamaño de las transferencias de red.
 */
export class CompressionManager {
  constructor() {
    this.stats = {
      bytesSaved: 0,
      originalBytes: 0,
      compressedBytes: 0,
    };
  }

  /**
   * Simula la compresión de datos.
   * @param {string} data - Los datos originales (ej. HTML).
   * @returns {{compressedData: string, originalSize: number, compressedSize: number}}
   */
  compress(data) {
    const originalSize = Buffer.byteLength(data, 'utf8');
    // Simula una compresión reduciendo el tamaño a un 70% (un valor realista)
    const compressedData = `COMPRIMIDO(${data.substring(0, Math.floor(data.length * 0.3))}...)`;
    const compressedSize = Buffer.byteLength(compressedData, 'utf8');

    return { compressedData, originalSize, compressedSize };
  }

  /**
   * Simula la descompresión de datos y actualiza las estadísticas.
   * @param {{compressedData: string, originalContent: string}} response - La respuesta de red simulada.
   * @returns {string} Los datos descomprimidos.
   */
  decompress(response) {
    const { compressedData, originalContent } = response;
    const originalSize = Buffer.byteLength(originalContent, 'utf8');
    const compressedSize = Buffer.byteLength(compressedData, 'utf8');
    const saved = originalSize - compressedSize;

    if (saved > 0) {
      this.stats.bytesSaved += saved;
      this.stats.originalBytes += originalSize;
      this.stats.compressedBytes += compressedSize;
      console.log(`[COMPRESIÓN] Descomprimido. Ahorro: ${saved} bytes.`);
    }

    return originalContent;
  }

  /**
   * Devuelve las estadísticas de compresión.
   * @returns {{bytesSaved: number, originalBytes: number, compressedBytes: number, savingRate: string}}
   */
  getStats() {
    const savingRate = this.stats.originalBytes > 0
      ? ((this.stats.bytesSaved / this.stats.originalBytes) * 100).toFixed(2)
      : 0;

    return {
      ...this.stats,
      savingRate: `${savingRate}%`,
    };
  }
}
