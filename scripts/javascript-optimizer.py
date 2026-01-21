#!/usr/bin/env python3
"""
Script de Optimización de JavaScript - GitHub Page Test
Optimiza JavaScript para reducir TBT (Total Blocking Time) y tareas largas del hilo principal
"""

import os
import re
import json
import shutil
from pathlib import Path
from typing import Dict, List, Set, Tuple
from datetime import datetime
import logging

class JavaScriptOptimizer:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.optimization_log = []
        self.files_modified = 0
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Archivos JavaScript principales a optimizar
        self.js_files = {
            "main.js": "src/assets/js/main.js",
            "inicio.js": "src/assets/js/inicio.js",
            "secciones.js": "src/assets/js/secciones.js",
            "form-data-security.js": "src/assets/js/form-data-security.js",
            "localStorage-migration.js": "src/assets/js/localStorage-migration.js"
        }
        
        # Patrones de optimización para reducir TBT
        self.optimization_patterns = {
            "long_tasks": [
                r'for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*(\w+)\s*\.\s*length\s*;\s*i\+\+\)',
                r'forEach\s*\(\s*function\s*\([^)]*\)\s*\{[^}]*\}\s*\)',
                r'setInterval\s*\(\s*function\s*\([^)]*\)\s*\{[^}]*\}\s*,\s*\d+\)',
                r'setTimeout\s*\(\s*function\s*\([^)]*\)\s*\{[^}]*\}\s*,\s*\d+\)'
            ],
            "dom_manipulation": [
                r'document\.getElementById\s*\(\s*[\'"][^\'"]*[\'"]\s*\)',
                r'document\.querySelector\s*\(\s*[\'"][^\'"]*[\'"]\s*\)',
                r'document\.querySelectorAll\s*\(\s*[\'"][^\'"]*[\'"]\s*\)',
                r'innerHTML\s*=',
                r'innerText\s*='
            ],
            "event_listeners": [
                r'addEventListener\s*\(\s*[\'"][^\'"]*[\'"]\s*,\s*function\s*\([^)]*\)\s*\{[^}]*\}\s*\)',
                r'onclick\s*=',
                r'onmouseover\s*=',
                r'onmouseout\s*='
            ]
        }
    
    def create_js_backup(self) -> bool:
        """Crear respaldo de archivos JavaScript"""
        try:
            backup_dir = self.root_path / "backup_javascript_optimization"
            if backup_dir.exists():
                shutil.rmtree(backup_dir)
            backup_dir.mkdir(exist_ok=True)
            
            for js_name, js_path in self.js_files.items():
                src_path = self.root_path / js_path
                if src_path.exists():
                    shutil.copy2(src_path, backup_dir / js_name)
            
            self.logger.info(f"✅ Respaldo de JavaScript creado: {backup_dir}")
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Error creando respaldo: {e}")
            return False
    
    def analyze_javascript_complexity(self, file_path: Path) -> Dict:
        """Analizar la complejidad de un archivo JavaScript"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            analysis = {
                "file_path": str(file_path),
                "total_lines": len(content.split('\n')),
                "total_size_bytes": len(content),
                "long_tasks_count": 0,
                "dom_manipulations": 0,
                "event_listeners": 0,
                "potential_issues": []
            }
            
            # Contar patrones problemáticos
            for pattern_type, patterns in self.optimization_patterns.items():
                for pattern in patterns:
                    matches = re.findall(pattern, content, re.MULTILINE | re.DOTALL)
                    if pattern_type == "long_tasks":
                        analysis["long_tasks_count"] += len(matches)
                    elif pattern_type == "dom_manipulation":
                        analysis["dom_manipulations"] += len(matches)
                    elif pattern_type == "event_listeners":
                        analysis["event_listeners"] += len(matches)
            
            # Identificar problemas potenciales
            if analysis["long_tasks_count"] > 5:
                analysis["potential_issues"].append("🚨 Muchas tareas largas detectadas")
            
            if analysis["dom_manipulations"] > 10:
                analysis["potential_issues"].append("🎯 Muchas manipulaciones del DOM")
            
            if analysis["event_listeners"] > 15:
                analysis["potential_issues"].append("🔗 Muchos event listeners")
            
            return analysis
            
        except Exception as e:
            self.logger.error(f"❌ Error analizando {file_path}: {e}")
            return {}
    
    def optimize_javascript_file(self, file_path: Path) -> bool:
        """Optimizar un archivo JavaScript específico"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            optimized_content = content
            optimizations_made = False
            
            # 1. Optimizar bucles for
            # Convertir for tradicional a for...of cuando sea posible
            for_loop_pattern = r'for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*(\w+)\s*\.\s*length\s*;\s*i\+\+\)\s*\{([^}]*)\}'
            for_loop_matches = re.findall(for_loop_pattern, optimized_content, re.MULTILINE | re.DOTALL)
            
            for array_name, loop_body in for_loop_matches:
                if 'i' in loop_body and f'{array_name}[i]' in loop_body:
                    new_loop = f'for (const item of {array_name}) {{\n{loop_body.replace(f"{array_name}[i]", "item")}\n}}'
                    optimized_content = optimized_content.replace(f'for (let i = 0; i < {array_name}.length; i++) {{\n{loop_body}\n}}', new_loop)
                    optimizations_made = True
                    self.logger.info(f"   🔄 Bucle for optimizado en {file_path.name}")
            
            # 2. Optimizar event listeners
            # Convertir event listeners inline a addEventListener
            onclick_pattern = r'onclick\s*=\s*[\'"]([^\'"]*)[\'"]'
            onclick_matches = re.findall(onclick_pattern, optimized_content)
            
            for onclick_code in onclick_matches:
                if onclick_code.strip():
                    # Crear un ID único para el elemento
                    element_id = f"element_{hash(onclick_code) % 10000}"
                    new_code = f'addEventListener("click", function() {{ {onclick_code} }})'
                    optimized_content = optimized_content.replace(f'onclick="{onclick_code}"', f'id="{element_id}"')
                    # Agregar el event listener al final del archivo
                    optimized_content += f'\n// Event listener optimizado\ndocument.getElementById("{element_id}").{new_code};'
                    optimizations_made = True
                    self.logger.info(f"   🔄 Event listener optimizado en {file_path.name}")
            
            # 3. Optimizar manipulaciones del DOM
            # Agrupar múltiples cambios del DOM
            dom_changes = re.findall(r'document\.getElementById\s*\(\s*[\'"]([^\'"]*)[\'"]\s*\)', optimized_content)
            if len(dom_changes) > 5:
                # Crear un fragmento para agrupar cambios
                fragment_code = '\n// Fragmento para optimizar cambios del DOM\nconst fragment = document.createDocumentFragment();'
                optimized_content = fragment_code + '\n' + optimized_content
                optimizations_made = True
                self.logger.info(f"   🔄 Fragmento DOM agregado en {file_path.name}")
            
            # 4. Eliminar código muerto y comentarios
            # Eliminar comentarios de una línea
            optimized_content = re.sub(r'//.*$', '', optimized_content, flags=re.MULTILINE)
            
            # Eliminar comentarios multilínea
            optimized_content = re.sub(r'/\*.*?\*/', '', optimized_content, flags=re.DOTALL)
            
            # Eliminar líneas en blanco múltiples
            optimized_content = re.sub(r'\n\s*\n', '\n', optimized_content)
            
            # Eliminar espacios en blanco al final de las líneas
            optimized_content = re.sub(r'[ \t]+$', '', optimized_content, flags=re.MULTILINE)
            
            # Si se hicieron optimizaciones, escribir el archivo
            if len(optimized_content) != len(original_content) or optimizations_made:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(optimized_content)
                
                size_saved = len(original_content) - len(optimized_content)
                if size_saved > 0:
                    self.logger.info(f"   ✅ {file_path.name}: {round(size_saved/1024, 2)} KB ahorrados")
                
                self.optimization_log.append({
                    "file": file_path.name,
                    "optimizations_made": optimizations_made,
                    "size_saved_bytes": size_saved,
                    "timestamp": datetime.now().isoformat()
                })
                
                self.files_modified += 1
                return True
            
            return False
            
        except Exception as e:
            self.logger.error(f"❌ Error optimizando {file_path}: {e}")
            return False
    
    def create_web_workers_config(self) -> bool:
        """Crear configuración para Web Workers para tareas pesadas"""
        try:
            web_worker_content = """// Web Worker para tareas pesadas - GitHub Page Test
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
"""
            
            worker_path = self.root_path / "src" / "assets" / "js" / "web-worker.js"
            worker_path.parent.mkdir(exist_ok=True)
            
            with open(worker_path, 'w', encoding='utf-8') as f:
                f.write(web_worker_content)
            
            self.logger.info("✅ Web Worker creado para tareas pesadas")
            
            # Crear archivo de configuración para usar el worker
            worker_config = """// Configuración para Web Workers - GitHub Page Test
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
"""
            
            config_path = self.root_path / "src" / "assets" / "js" / "task-manager.js"
            with open(config_path, 'w', encoding='utf-8') as f:
                f.write(worker_config)
            
            self.logger.info("✅ Task Manager creado para gestión de workers")
            
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Error creando Web Workers: {e}")
            return False
    
    def run_optimization(self) -> bool:
        """Ejecutar optimización completa de JavaScript"""
        self.logger.info("🚀 Iniciando optimización de JavaScript...")
        
        # Crear respaldo
        if not self.create_js_backup():
            self.logger.error("❌ No se pudo crear respaldo. Abortando optimización.")
            return False
        
        # Analizar complejidad de archivos JavaScript
        self.logger.info("🔍 Analizando complejidad de archivos JavaScript...")
        
        total_issues = 0
        for js_name, js_path in self.js_files.items():
            file_path = self.root_path / js_path
            if file_path.exists():
                analysis = self.analyze_javascript_complexity(file_path)
                if analysis:
                    self.logger.info(f"   📊 {js_name}:")
                    self.logger.info(f"      - Líneas: {analysis['total_lines']}")
                    self.logger.info(f"      - Tareas largas: {analysis['long_tasks_count']}")
                    self.logger.info(f"      - Manipulaciones DOM: {analysis['dom_manipulations']}")
                    self.logger.info(f"      - Event listeners: {analysis['event_listeners']}")
                    
                    if analysis['potential_issues']:
                        for issue in analysis['potential_issues']:
                            self.logger.info(f"      - {issue}")
                            total_issues += 1
        
        self.logger.info(f"\n📋 Total de problemas potenciales: {total_issues}")
        
        # Optimizar archivos JavaScript
        self.logger.info("\n🔧 Optimizando archivos JavaScript...")
        
        for js_name, js_path in self.js_files.items():
            file_path = self.root_path / js_path
            if file_path.exists():
                self.optimize_javascript_file(file_path)
        
        # Crear configuración de Web Workers
        self.create_web_workers_config()
        
        # Generar reporte
        self.generate_optimization_report()
        
        return self.files_modified > 0
    
    def generate_optimization_report(self):
        """Generar reporte de optimización de JavaScript"""
        report = {
            "optimization_summary": {
                "timestamp": datetime.now().isoformat(),
                "files_modified": self.files_modified,
                "optimization_log": self.optimization_log
            }
        }
        
        # Guardar reporte
        report_path = self.root_path / "reports" / f"javascript-optimization_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_path.parent.mkdir(exist_ok=True)
        
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        # Mostrar resumen
        self.logger.info("\n📊 RESUMEN DE OPTIMIZACIÓN DE JAVASCRIPT:")
        self.logger.info(f"   ✏️ Archivos modificados: {self.files_modified}")
        self.logger.info(f"   📄 Reporte guardado: {report_path}")
        
        if self.files_modified > 0:
            self.logger.info("✅ Optimización de JavaScript completada exitosamente!")
        else:
            self.logger.info("ℹ️ No se encontraron archivos para optimizar")

def main():
    """Función principal"""
    print("🔧 OPTIMIZADOR DE JAVASCRIPT - GitHub Page Test")
    print("=" * 60)
    
    optimizer = JavaScriptOptimizer()
    
    print("\n🚀 Ejecutando optimización de JavaScript...")
    success = optimizer.run_optimization()
    
    if success:
        print("\n✅ Optimización de JavaScript completada exitosamente!")
        print("📋 Revisa el reporte generado para más detalles.")
    else:
        print("\nℹ️ No se encontraron archivos para optimizar.")
        print("📋 Revisa el reporte generado para más detalles.")

if __name__ == "__main__":
    main()
