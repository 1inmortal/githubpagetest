#!/usr/bin/env python3
"""
Análisis de Dependencias y Enlaces Estáticos en Repositorio
Analiza todos los archivos index.* y genera un mapa completo de conexiones
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
from dataclasses import dataclass
from enum import Enum

class Status(Enum):
    OK = "OK"
    BROKEN = "Broken"
    MISSING = "Missing"

@dataclass
class Connection:
    source_file: str
    reference_type: str  # 'href', 'src', 'import', 'require'
    target_path: str
    current_path: str
    expected_path: str
    status: Status
    line_number: int
    description: str

@dataclass
class IndexFile:
    file_path: str
    file_type: str  # 'html', 'js', 'ts', 'tsx', 'css'
    connections: List[Connection]
    total_connections: int
    broken_connections: int
    missing_files: List[str]

class DependencyAnalyzer:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.index_files: List[IndexFile] = []
        self.all_files: Set[str] = set()
        self.scan_all_files()
    
    def scan_all_files(self):
        """Escanea todos los archivos en el repositorio"""
        for root, dirs, files in os.walk(self.root_path):
            for file in files:
                file_path = Path(root) / file
                self.all_files.add(str(file_path.relative_to(self.root_path)))
    
    def find_index_files(self) -> List[Tuple[str, str]]:
        """Encuentra todos los archivos index.* en el repositorio"""
        index_files = []
        for file_path in self.all_files:
            # Buscar archivos que terminen con index.* o que sean index.*
            if file_path.endswith('/index.html') or file_path.endswith('/index.js') or file_path.endswith('/index.css') or file_path.endswith('/index.ts') or file_path.endswith('/index.tsx') or file_path == 'index.html':
                file_type = file_path.split('.')[-1]
                index_files.append((file_path, file_type))
        return index_files
    
    def analyze_html_file(self, file_path: str) -> List[Connection]:
        """Analiza un archivo HTML y extrae todas las referencias"""
        connections = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Error leyendo {file_path}: {e}")
            return connections
        
        # Patrones para diferentes tipos de referencias
        patterns = [
            # Enlaces HTML
            (r'href=["\']([^"\']+)["\']', 'href'),
            (r'src=["\']([^"\']+)["\']', 'src'),
            # CSS imports
            (r'@import\s+["\']([^"\']+)["\']', 'import'),
            # JavaScript imports
            (r'import\s+["\']([^"\']+)["\']', 'import'),
            (r'require\(["\']([^"\']+)["\']\)', 'require'),
        ]
        
        for pattern, ref_type in patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                target_path = match.group(1)
                line_number = content[:match.start()].count('\n') + 1
                
                # Ignorar URLs externas
                if target_path.startswith(('http://', 'https://', '//', 'data:')):
                    continue
                
                # Determinar la ruta esperada
                file_dir = Path(file_path).parent
                expected_path = str((file_dir / target_path).resolve())
                
                # Verificar si el archivo existe
                status = Status.OK
                if not os.path.exists(expected_path):
                    status = Status.BROKEN
                
                connection = Connection(
                    source_file=file_path,
                    reference_type=ref_type,
                    target_path=target_path,
                    current_path=target_path,
                    expected_path=expected_path,
                    status=status,
                    line_number=line_number,
                    description=f"Referencia {ref_type} en línea {line_number}"
                )
                connections.append(connection)
        
        return connections
    
    def analyze_js_file(self, file_path: str) -> List[Connection]:
        """Analiza un archivo JavaScript/TypeScript y extrae imports/exports"""
        connections = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Error leyendo {file_path}: {e}")
            return connections
        
        # Patrones para imports/exports
        patterns = [
            (r'import\s+.*?from\s+["\']([^"\']+)["\']', 'import'),
            (r'require\(["\']([^"\']+)["\']\)', 'require'),
            (r'import\s+["\']([^"\']+)["\']', 'import'),
        ]
        
        for pattern, ref_type in patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                target_path = match.group(1)
                line_number = content[:match.start()].count('\n') + 1
                
                # Ignorar módulos de node_modules y URLs externas
                if target_path.startswith(('http://', 'https://', '//', 'data:')) or 'node_modules' in target_path:
                    continue
                
                # Determinar la ruta esperada
                file_dir = Path(file_path).parent
                expected_path = str((file_dir / target_path).resolve())
                
                # Verificar si el archivo existe
                status = Status.OK
                if not os.path.exists(expected_path):
                    status = Status.BROKEN
                
                connection = Connection(
                    source_file=file_path,
                    reference_type=ref_type,
                    target_path=target_path,
                    current_path=target_path,
                    expected_path=expected_path,
                    status=status,
                    line_number=line_number,
                    description=f"Import/require en línea {line_number}"
                )
                connections.append(connection)
        
        return connections
    
    def analyze_css_file(self, file_path: str) -> List[Connection]:
        """Analiza un archivo CSS y extrae referencias"""
        connections = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Error leyendo {file_path}: {e}")
            return connections
        
        # Patrones para CSS
        patterns = [
            (r'@import\s+["\']([^"\']+)["\']', 'import'),
            (r'url\(["\']?([^"\']+)["\']?\)', 'url'),
        ]
        
        for pattern, ref_type in patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                target_path = match.group(1)
                line_number = content[:match.start()].count('\n') + 1
                
                # Ignorar URLs externas
                if target_path.startswith(('http://', 'https://', '//', 'data:')):
                    continue
                
                # Determinar la ruta esperada
                file_dir = Path(file_path).parent
                expected_path = str((file_dir / target_path).resolve())
                
                # Verificar si el archivo existe
                status = Status.OK
                if not os.path.exists(expected_path):
                    status = Status.BROKEN
                
                connection = Connection(
                    source_file=file_path,
                    reference_type=ref_type,
                    target_path=target_path,
                    current_path=target_path,
                    expected_path=expected_path,
                    status=status,
                    line_number=line_number,
                    description=f"Referencia CSS en línea {line_number}"
                )
                connections.append(connection)
        
        return connections
    
    def analyze_file(self, file_path: str, file_type: str) -> IndexFile:
        """Analiza un archivo index.* específico"""
        connections = []
        
        if file_type in ['html', 'htm']:
            connections = self.analyze_html_file(file_path)
        elif file_type in ['js', 'ts', 'tsx', 'jsx']:
            connections = self.analyze_js_file(file_path)
        elif file_type == 'css':
            connections = self.analyze_css_file(file_path)
        
        broken_connections = sum(1 for c in connections if c.status == Status.BROKEN)
        missing_files = [c.target_path for c in connections if c.status == Status.BROKEN]
        
        return IndexFile(
            file_path=file_path,
            file_type=file_type,
            connections=connections,
            total_connections=len(connections),
            broken_connections=broken_connections,
            missing_files=missing_files
        )
    
    def analyze_all_index_files(self):
        """Analiza todos los archivos index.* encontrados"""
        index_files = self.find_index_files()
        
        for file_path, file_type in index_files:
            print(f"Analizando: {file_path}")
            index_file = self.analyze_file(file_path, file_type)
            self.index_files.append(index_file)
    
    def generate_report(self) -> Dict:
        """Genera un reporte completo en formato JSON"""
        report = {
            "summary": {
                "total_index_files": len(self.index_files),
                "total_connections": sum(f.total_connections for f in self.index_files),
                "total_broken_connections": sum(f.broken_connections for f in self.index_files),
                "files_with_issues": len([f for f in self.index_files if f.broken_connections > 0])
            },
            "index_files": []
        }
        
        for index_file in self.index_files:
            file_report = {
                "file_path": index_file.file_path,
                "file_type": index_file.file_type,
                "total_connections": index_file.total_connections,
                "broken_connections": index_file.broken_connections,
                "missing_files": index_file.missing_files,
                "connections": []
            }
            
            for connection in index_file.connections:
                conn_report = {
                    "reference_type": connection.reference_type,
                    "target_path": connection.target_path,
                    "current_path": connection.current_path,
                    "expected_path": connection.expected_path,
                    "status": connection.status.value,
                    "line_number": connection.line_number,
                    "description": connection.description
                }
                file_report["connections"].append(conn_report)
            
            report["index_files"].append(file_report)
        
        return report
    
    def generate_fixes(self) -> List[Dict]:
        """Genera sugerencias de corrección automática"""
        fixes = []
        
        for index_file in self.index_files:
            for connection in index_file.connections:
                if connection.status == Status.BROKEN:
                    # Buscar archivos similares que podrían ser el objetivo
                    target_name = Path(connection.target_path).name
                    possible_matches = []
                    
                    for file_path in self.all_files:
                        if Path(file_path).name == target_name:
                            possible_matches.append(file_path)
                    
                    fix = {
                        "file": index_file.file_path,
                        "line": connection.line_number,
                        "current_reference": connection.target_path,
                        "issue": "Archivo no encontrado",
                        "suggestions": possible_matches,
                        "recommended_fix": possible_matches[0] if possible_matches else None
                    }
                    fixes.append(fix)
        
        return fixes

def main():
    """Función principal"""
    print("🔍 Iniciando análisis de dependencias...")
    
    analyzer = DependencyAnalyzer()
    analyzer.analyze_all_index_files()
    
    # Generar reporte
    report = analyzer.generate_report()
    fixes = analyzer.generate_fixes()
    
    # Guardar reporte en JSON
    with open('dependency-analysis-report.json', 'w', encoding='utf-8') as f:
        json.dump({
            "report": report,
            "fixes": fixes
        }, f, indent=2, ensure_ascii=False)
    
    # Generar reporte en formato tabla
    print("\n" + "="*80)
    print("📊 REPORTE DE ANÁLISIS DE DEPENDENCIAS")
    print("="*80)
    
    print(f"\n📈 RESUMEN:")
    print(f"   • Archivos index.* encontrados: {report['summary']['total_index_files']}")
    print(f"   • Total de conexiones: {report['summary']['total_connections']}")
    print(f"   • Conexiones rotas: {report['summary']['total_broken_connections']}")
    print(f"   • Archivos con problemas: {report['summary']['files_with_issues']}")
    
    print(f"\n📁 ARCHIVOS INDEX.* ANALIZADOS:")
    for file_info in report["index_files"]:
        status_icon = "❌" if file_info["broken_connections"] > 0 else "✅"
        print(f"   {status_icon} {file_info['file_path']} ({file_info['file_type']})")
        print(f"      • Conexiones: {file_info['total_connections']}")
        print(f"      • Rotas: {file_info['broken_connections']}")
        
        if file_info["broken_connections"] > 0:
            print(f"      • Archivos faltantes: {', '.join(file_info['missing_files'])}")
    
    print(f"\n🔧 SUGERENCIAS DE CORRECCIÓN:")
    for fix in fixes:
        print(f"   📄 {fix['file']}:{fix['line']}")
        print(f"      • Referencia actual: {fix['current_reference']}")
        if fix['recommended_fix']:
            print(f"      • Sugerencia: {fix['recommended_fix']}")
        else:
            print(f"      • No se encontraron archivos similares")
    
    print(f"\n💾 Reporte completo guardado en: dependency-analysis-report.json")

if __name__ == "__main__":
    main()
