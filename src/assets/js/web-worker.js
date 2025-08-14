// Web Worker para tareas pesadas - GitHub Page Test
// Este worker se ejecuta en un hilo separado para evitar bloquear el hilo principal

self.onmessage = function(e) {
    const { type, data } = e.data;
    
    switch (type) {
        case 'HEAVY_CALCULATION':
            // Ejecutar cálculos pesados aquí
            const result = performHeavyCalculation(data);
            self.postMessage({ type: 'HEAVY_CALCULATION_RESULT', result });
            break;
            
        case 'DATA_PROCESSING':
            // Procesar datos grandes aquí
            const processedData = processData(data);
            self.postMessage({ type: 'DATA_PROCESSING_RESULT', data: processedData });
            break;
            
        default:
            self.postMessage({ type: 'ERROR', error: 'Tipo de tarea no reconocido' });
    }
};

function performHeavyCalculation(data) {
    // Implementar cálculos pesados aquí
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        result += Math.sqrt(data[i]) * Math.PI;
    }
    return result;
}

function processData(data) {
    // Implementar procesamiento de datos aquí
    return data.map(item => ({
        ...item,
        processed: true,
        timestamp: Date.now()
    }));
}
