// Configuración para Web Workers - GitHub Page Test
// Uso: const worker = new Worker('src/assets/js/web-worker.js');

class TaskManager {
    constructor() {
        this.workers = new Map();
        this.taskQueue = [];
        this.isProcessing = false;
    }
    
    // Ejecutar tarea pesada en worker
    executeHeavyTask(data) {
        return new Promise((resolve, reject) => {
            const worker = new Worker('src/assets/js/web-worker.js');
            
            worker.onmessage = function(e) {
                if (e.data.type === 'HEAVY_CALCULATION_RESULT') {
                    resolve(e.data.result);
                } else if (e.data.type === 'ERROR') {
                    reject(new Error(e.data.error));
                }
                worker.terminate();
            };
            
            worker.onerror = function(error) {
                reject(error);
                worker.terminate();
            };
            
            worker.postMessage({ type: 'HEAVY_CALCULATION', data });
        });
    }
    
    // Procesar datos en worker
    processData(data) {
        return new Promise((resolve, reject) => {
            const worker = new Worker('src/assets/js/web-worker.js');
            
            worker.onmessage = function(e) {
                if (e.data.type === 'DATA_PROCESSING_RESULT') {
                    resolve(e.data.data);
                } else if (e.data.type === 'ERROR') {
                    reject(new Error(e.data.error));
                }
                worker.terminate();
            };
            
            worker.onerror = function(error) {
                reject(error);
                worker.terminate();
            };
            
            worker.postMessage({ type: 'DATA_PROCESSING', data });
        });
    }
}

// Exportar para uso global
window.TaskManager = TaskManager;
