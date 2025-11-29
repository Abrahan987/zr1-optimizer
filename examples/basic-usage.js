import '../src/index.js';

console.log('Bot funcionando con ZR1 Optimizer...');

async function exampleOperation() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return 'Operación completada';
}

async function main() {
    for (let i = 0; i < 3; i++) {
        const result = await exampleOperation();
        console.log(`Ejecución ${i + 1}: ${result}`);
    }
}

main().catch(console.error);
