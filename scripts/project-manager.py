#!/usr/bin/env python3
"""
🎯 SISTEMA MAESTRO DE GESTIÓN DEL PROYECTO
==========================================

Este script centraliza la gestión de todos los aspectos del proyecto:
- Seguridad
- Rendimiento
- Mantenimiento
- Reportes

Autor: Sistema de Gestión Central
Versión: 1.0.0
"""

import sys
import argparse
from pathlib import Path
from datetime import datetime

# Importar los gestores consolidados
from security_manager import SecurityManager
from performance_manager import PerformanceManager
from maintenance_manager import MaintenanceManager

class ProjectManager:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path)
        self.security_manager = SecurityManager(root_path)
        self.performance_manager = PerformanceManager(root_path)
        self.maintenance_manager = MaintenanceManager(root_path)

    def run_security_audit(self) -> bool:
        """Ejecuta auditoría de seguridad completa"""
        print("🛡️  EJECUTANDO AUDITORÍA DE SEGURIDAD")
        print("=" * 50)
        return self.security_manager.run_full_audit()

    def run_performance_optimization(self) -> bool:
        """Ejecuta optimización de rendimiento completa"""
        print("⚡ EJECUTANDO OPTIMIZACIÓN DE RENDIMIENTO")
        print("=" * 50)
        return self.performance_manager.run_full_optimization()

    def run_maintenance(self) -> bool:
        """Ejecuta mantenimiento completo"""
        print("🔧 EJECUTANDO MANTENIMIENTO")
        print("=" * 50)
        return self.maintenance_manager.run_full_maintenance()

    def run_full_pipeline(self) -> bool:
        """Ejecuta pipeline completo de gestión"""
        print("🚀 INICIANDO PIPELINE COMPLETO DE GESTIÓN")
        print("=" * 60)
        print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"📁 Proyecto: {self.root_path}")
        print("=" * 60)
        
        # Ejecutar todas las tareas
        security_ok = self.run_security_audit()
        performance_ok = self.run_performance_optimization()
        maintenance_ok = self.run_maintenance()
        
        # Resumen final
        print("\n" + "=" * 60)
        print("📊 RESUMEN FINAL DEL PIPELINE")
        print("=" * 60)
        print(f"🛡️  Seguridad: {'✅ Completada' if security_ok else '❌ Falló'}")
        print(f"⚡ Rendimiento: {'✅ Completada' if performance_ok else '❌ Falló'}")
        print(f"🔧 Mantenimiento: {'✅ Completado' if maintenance_ok else '❌ Falló'}")
        
        overall_success = security_ok and performance_ok and maintenance_ok
        print(f"\n🎯 Pipeline: {'✅ Exitoso' if overall_success else '❌ Falló'}")
        
        return overall_success

def main():
    """Función principal con argumentos de línea de comandos"""
    parser = argparse.ArgumentParser(description='Sistema Maestro de Gestión del Proyecto')
    parser.add_argument('--security', action='store_true', help='Ejecutar solo auditoría de seguridad')
    parser.add_argument('--performance', action='store_true', help='Ejecutar solo optimización de rendimiento')
    parser.add_argument('--maintenance', action='store_true', help='Ejecutar solo mantenimiento')
    parser.add_argument('--full', action='store_true', help='Ejecutar pipeline completo')
    parser.add_argument('--path', type=str, default='.', help='Ruta del proyecto (default: .)')
    
    args = parser.parse_args()
    
    # Si no se especifica ninguna opción, ejecutar pipeline completo
    if not any([args.security, args.performance, args.maintenance, args.full]):
        args.full = True
    
    project_manager = ProjectManager(args.path)
    
    try:
        if args.security:
            success = project_manager.run_security_audit()
        elif args.performance:
            success = project_manager.run_performance_optimization()
        elif args.maintenance:
            success = project_manager.run_maintenance()
        elif args.full:
            success = project_manager.run_full_pipeline()
        
        if success:
            print("\n🎉 ¡Operación completada exitosamente!")
            sys.exit(0)
        else:
            print("\n⚠️  La operación no se completó correctamente")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Operación cancelada por el usuario")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
