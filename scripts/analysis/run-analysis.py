#!/usr/bin/env python3
"""
Script principal para ejecutar el análisis completo de dependencias
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def run_command(command, description):
    """Ejecuta un comando y muestra el resultado"""
    print(f"\n🔍 {description}")
    print("=" * 60)
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print("⚠️  Advertencias:")
            print(result.stderr)
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Error ejecutando {command}: {e}")
        return False

def show_menu():
    """Muestra el menú de opciones"""
    print("\n" + "="*60)
    print("🔧 ANÁLISIS DE DEPENDENCIAS - MENÚ PRINCIPAL")
    print("="*60)
    print("1. 🔍 Encontrar todos los archivos index.*")
    print("2. 📊 Analizar archivos index.* principales")
    print("3. 🔧 Aplicar correcciones automáticas")
    print("4. 📋 Ejecutar análisis completo")
    print("5. 📄 Ver reportes generados")
    print("6. ❌ Salir")
    print("="*60)

def show_reports():
    """Muestra los reportes disponibles"""
    reports = [
        "main-index-files-analysis.json",
        "dependency-analysis-report.json", 
        "fixes-applied.json"
    ]
    
    print("\n📄 REPORTES DISPONIBLES:")
    print("="*40)
    
    for report in reports:
        if os.path.exists(report):
            size = os.path.getsize(report)
            print(f"✅ {report} ({size} bytes)")
        else:
            print(f"❌ {report} (no encontrado)")

def run_complete_analysis():
    """Ejecuta el análisis completo"""
    print("\n🚀 INICIANDO ANÁLISIS COMPLETO")
    print("="*60)
    
    steps = [
        ("python find-all-index-files.py", "Encontrando archivos index.*"),
        ("python analyze-main-index-files.py", "Analizando dependencias principales"),
        ("python fix-broken-references.py", "Aplicando correcciones automáticas")
    ]
    
    success_count = 0
    for command, description in steps:
        if run_command(command, description):
            success_count += 1
            print(f"✅ {description} - COMPLETADO")
        else:
            print(f"❌ {description} - FALLÓ")
    
    print(f"\n📊 RESUMEN: {success_count}/{len(steps)} pasos completados exitosamente")
    
    if success_count == len(steps):
        print("🎉 Análisis completo finalizado exitosamente!")
        show_reports()
    else:
        print("⚠️  Algunos pasos fallaron. Revisa los errores arriba.")

def main():
    """Función principal"""
    print("🔧 HERRAMIENTA DE ANÁLISIS DE DEPENDENCIAS")
    print("Versión 1.0 - Análisis de archivos index.*")
    
    while True:
        show_menu()
        
        try:
            choice = input("\nSelecciona una opción (1-6): ").strip()
            
            if choice == "1":
                run_command("python find-all-index-files.py", "Encontrando archivos index.*")
                
            elif choice == "2":
                run_command("python analyze-main-index-files.py", "Analizando dependencias principales")
                
            elif choice == "3":
                run_command("python fix-broken-references.py", "Aplicando correcciones automáticas")
                
            elif choice == "4":
                run_complete_analysis()
                
            elif choice == "5":
                show_reports()
                
            elif choice == "6":
                print("\n👋 ¡Hasta luego!")
                break
                
            else:
                print("❌ Opción inválida. Por favor selecciona 1-6.")
                
        except KeyboardInterrupt:
            print("\n\n👋 Análisis interrumpido por el usuario.")
            break
        except Exception as e:
            print(f"\n❌ Error inesperado: {e}")

if __name__ == "__main__":
    # Cambiar al directorio del script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    main()
