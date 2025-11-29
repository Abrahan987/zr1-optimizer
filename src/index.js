import { Engine } from './core/Engine.js';

const zr1Engine = new Engine();

export default Engine;
export { zr1Engine };

process.on('SIGINT', () => {
    zr1Engine.shutdown();
    process.exit(0);
});

process.on('SIGTERM', () => {
    zr1Engine.shutdown();
    process.exit(0);
});
