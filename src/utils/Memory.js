import os from 'os';

export class Memory {
    static detectMemoryLimit() {
        try {
            const mem = process.memoryUsage();
            const totalMemory = os.totalmem();
            return Math.min(mem.heapTotal * 0.3, totalMemory * 0.15, 150 * 1024 * 1024);
        } catch {
            return 80 * 1024 * 1024;
        }
    }

    static getCpuCores() {
        return Math.max(1, os.cpus().length);
    }

    static getMemoryUsage() {
        return process.memoryUsage();
    }

    static hasMemoryPressure() {
        const usage = this.getMemoryUsage();
        return usage.heapUsed / usage.heapTotal > 0.75;
    }

    static cleanTemporaryMemory() {
        if (global.gc) {
            global.gc();
        }
    }
}
