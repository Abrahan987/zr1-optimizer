// src/core/connection.js

/**
 * Gestiona una piscina de conexiones de red para reutilizarlas
 * y reducir la latencia de establecer nuevas conexiones.
 */
export class ConnectionManager {
  constructor(maxConnections = 5) {
    this.maxConnections = maxConnections;
    this.pool = new Set();
    this.activeConnections = new Set();

    // Inicializa la piscina con "conexiones" simuladas
    for (let i = 1; i <= maxConnections; i++) {
      this.pool.add(`Conexión-${i}`);
    }
  }

  /**
   * Solicita una conexión disponible de la piscina.
   * Si no hay ninguna disponible, esperará hasta que una se libere.
   * @returns {Promise<string>} El ID de la conexión adquirida.
   */
  acquire() {
    return new Promise((resolve) => {
      const checkForConnection = () => {
        if (this.pool.size > 0) {
          const connection = this.pool.values().next().value;
          this.pool.delete(connection);
          this.activeConnections.add(connection);
          console.log(`[CONEXIÓN] Adquirida '${connection}'. Disponibles: ${this.pool.size}`);
          resolve(connection);
        } else {
          // Si no hay conexiones, espera un poco y vuelve a intentar.
          setTimeout(checkForConnection, 50);
        }
      };
      checkForConnection();
    });
  }

  /**
   * Libera una conexión y la devuelve a la piscina.
   * @param {string} connection - El ID de la conexión a liberar.
   */
  release(connection) {
    if (this.activeConnections.has(connection)) {
      this.activeConnections.delete(connection);
      this.pool.add(connection);
      console.log(`[CONEXIÓN] Liberada '${connection}'. Disponibles: ${this.pool.size}`);
    }
  }

  /**
   * Devuelve las estadísticas de la piscina de conexiones.
   * @returns {{available: number, active: number, total: number}}
   */
  getStats() {
    return {
      available: this.pool.size,
      active: this.activeConnections.size,
      total: this.maxConnections,
    };
  }
}
