export class TimerOptimizer {
    constructor() {
        this.originalSetTimeout = global.setTimeout;
        this.originalSetInterval = global.setInterval;
        this.originalSetImmediate = global.setImmediate;
    }

    enable() {
        global.setTimeout = (fn, delay, ...args) => {
            const safeDelay = Math.max(delay, 8);
            return this.originalSetTimeout(fn, safeDelay, ...args);
        };

        global.setInterval = (fn, delay, ...args) => {
            const safeDelay = Math.max(delay, 40);
            return this.originalSetInterval(fn, safeDelay, ...args);
        };

        global.setImmediate = (fn, ...args) => {
            return this.originalSetImmediate(fn, ...args);
        };
    }

    disable() {
        global.setTimeout = this.originalSetTimeout;
        global.setInterval = this.originalSetInterval;
        global.setImmediate = this.originalSetImmediate;
    }
}
