#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔧 INSTALADOR DEL MANUAL DE USUARIO
===================================

Script que instala y configura automáticamente el manual de usuario
del sistema de vigilancia vehicular.

Autor: Sistema de Vigilancia Inteligente
Versión: 2.0
"""

import os
import sys
import shutil
import subprocess
from datetime import datetime

class InstaladorManual:
    def __init__(self):
        self.version = "2.0"
        self.fecha_instalacion = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.ruta_actual = os.path.dirname(os.path.abspath(__file__))
        
        # Colores para la consola
        self.colores = {
            'azul': '\033[94m',
            'verde': '\033[92m',
            'amarillo': '\033[93m',
            'rojo': '\033[91m',
            'magenta': '\033[95m',
            'cyan': '\033[96m',
            'blanco': '\033[97m',
            'reset': '\033[0m',
            'negrita': '\033[1m'
        }
        
        self.mostrar_banner()
        self.instalar()
    
    def imprimir(self, texto, color='blanco', negrita=False):
        """Imprime texto con colores y formato"""
        formato = self.colores[color]
        if negrita:
            formato += self.colores['negrita']
        print(f"{formato}{texto}{self.colores['reset']}")
    
    def mostrar_banner(self):
        """Muestra el banner del instalador"""
        banner = f"""
{self.colores['cyan']}{'='*80}
    🔧 INSTALADOR DEL MANUAL DE USUARIO 🔧
    {'='*80}
    
    📋 Sistema de Vigilancia Vehicular con Drones
    👤 Para Usuarios Básicos (No Técnicos)
    🎯 Objetivo: Instalar y configurar el manual automáticamente
    
    📅 Fecha: {self.fecha_instalacion}
    📍 Ruta: {self.ruta_actual}
{self.colores['reset']}
        """
        print(banner)
    
    def instalar(self):
        """Proceso principal de instalación"""
        try:
            self.imprimir("\n🚀 INICIANDO INSTALACIÓN...", 'verde', True)
            self.imprimir("="*40, 'verde')
            
            # Paso 1: Verificar Python
            self.verificar_python()
            
            # Paso 2: Verificar archivos
            self.verificar_archivos()
            
            # Paso 3: Crear estructura de directorios
            self.crear_directorios()
            
            # Paso 4: Crear archivos de configuración
            self.crear_configuracion()
            
            # Paso 5: Crear scripts de acceso rápido
            self.crear_scripts_acceso()
            
            # Paso 6: Verificar instalación
            self.verificar_instalacion()
            
            # Paso 7: Mostrar instrucciones finales
            self.mostrar_instrucciones_finales()
            
        except Exception as e:
            self.imprimir(f"\n❌ ERROR DURANTE LA INSTALACIÓN: {e}", 'rojo', True)
            self.imprimir("🆘 Contacta soporte técnico", 'amarillo')
            sys.exit(1)
    
    def verificar_python(self):
        """Verifica que Python esté instalado correctamente"""
        self.imprimir("\n📋 PASO 1: Verificando Python...", 'azul', True)
        
        try:
            version = sys.version_info
            if version.major >= 3 and version.minor >= 8:
                self.imprimir(f"✅ Python {version.major}.{version.minor}.{version.micro} - OK", 'verde')
            else:
                raise Exception(f"Python {version.major}.{version.minor} no es compatible. Se requiere Python 3.8+")
        except Exception as e:
            self.imprimir(f"❌ Error con Python: {e}", 'rojo')
            raise
    
    def verificar_archivos(self):
        """Verifica que todos los archivos necesarios estén presentes"""
        self.imprimir("\n📋 PASO 2: Verificando archivos...", 'azul', True)
        
        archivos_requeridos = [
            'manual_completo_usuario.py',
            'manual_usuario_sistema_vigilancia.py',
            'ejemplos_visuales_manual.py',
            'demo_manual.py'
        ]
        
        archivos_faltantes = []
        for archivo in archivos_requeridos:
            if os.path.exists(archivo):
                self.imprimir(f"✅ {archivo} - OK", 'verde')
            else:
                archivos_faltantes.append(archivo)
                self.imprimir(f"❌ {archivo} - FALTANTE", 'rojo')
        
        if archivos_faltantes:
            raise Exception(f"Archivos faltantes: {', '.join(archivos_faltantes)}")
    
    def crear_directorios(self):
        """Crea la estructura de directorios necesaria"""
        self.imprimir("\n📋 PASO 3: Creando directorios...", 'azul', True)
        
        directorios = [
            'manual_docs',
            'manual_docs/ejemplos',
            'manual_docs/configuracion',
            'manual_docs/logs'
        ]
        
        for directorio in directorios:
            if not os.path.exists(directorio):
                os.makedirs(directorio)
                self.imprimir(f"✅ Creado: {directorio}", 'verde')
            else:
                self.imprimir(f"ℹ️  Existe: {directorio}", 'amarillo')
    
    def crear_configuracion(self):
        """Crea archivos de configuración"""
        self.imprimir("\n📋 PASO 4: Creando configuración...", 'azul', True)
        
        # Configuración del manual
        config_manual = {
            "version": self.version,
            "fecha_instalacion": self.fecha_instalacion,
            "ruta_instalacion": self.ruta_actual,
            "archivos_principales": {
                "manual_completo": "manual_completo_usuario.py",
                "manual_basico": "manual_usuario_sistema_vigilancia.py",
                "ejemplos_visuales": "ejemplos_visuales_manual.py",
                "demo": "demo_manual.py"
            },
            "configuracion": {
                "python_minimo": "3.8",
                "sistema_operativo": sys.platform,
                "colores_consola": True,
                "modo_interactivo": True
            }
        }
        
        import json
        with open('manual_docs/configuracion/manual_config.json', 'w', encoding='utf-8') as f:
            json.dump(config_manual, f, indent=2, ensure_ascii=False)
        
        self.imprimir("✅ Configuración creada: manual_docs/configuracion/manual_config.json", 'verde')
        
        # Archivo de log de instalación
        log_instalacion = f"""
# LOG DE INSTALACIÓN DEL MANUAL DE USUARIO
# ========================================

Fecha: {self.fecha_instalacion}
Versión: {self.version}
Ruta: {self.ruta_actual}
Sistema Operativo: {sys.platform}
Python: {sys.version}

ARCHIVOS INSTALADOS:
- manual_completo_usuario.py
- manual_usuario_sistema_vigilancia.py
- ejemplos_visuales_manual.py
- demo_manual.py

DIRECTORIOS CREADOS:
- manual_docs/
- manual_docs/ejemplos/
- manual_docs/configuracion/
- manual_docs/logs/

CONFIGURACIÓN:
- Archivo de configuración: manual_docs/configuracion/manual_config.json
- Modo interactivo: Activado
- Colores de consola: Activados

PRÓXIMOS PASOS:
1. Ejecutar: python manual_completo_usuario.py
2. Seguir la guía de inicio rápido
3. Practicar con ejemplos
4. Contactar soporte si es necesario

SOPORTE:
- Email: soporte@vigilancia-vehicular.com
- Teléfono: +1-800-VIGILANCIA
- Sitio web: www.vigilancia-vehicular.com
        """
        
        with open('manual_docs/logs/instalacion.log', 'w', encoding='utf-8') as f:
            f.write(log_instalacion)
        
        self.imprimir("✅ Log creado: manual_docs/logs/instalacion.log", 'verde')
    
    def crear_scripts_acceso(self):
        """Crea scripts de acceso rápido"""
        self.imprimir("\n📋 PASO 5: Creando scripts de acceso rápido...", 'azul', True)
        
        # Script para Windows
        script_windows = f"""@echo off
echo Iniciando Manual de Usuario...
python manual_completo_usuario.py
pause
"""
        
        with open('iniciar_manual.bat', 'w', encoding='utf-8') as f:
            f.write(script_windows)
        
        self.imprimir("✅ Script Windows creado: iniciar_manual.bat", 'verde')
        
        # Script para Linux/macOS
        script_unix = f"""#!/bin/bash
echo "Iniciando Manual de Usuario..."
python3 manual_completo_usuario.py
"""
        
        with open('iniciar_manual.sh', 'w', encoding='utf-8') as f:
            f.write(script_unix)
        
        # Hacer ejecutable en Unix
        if sys.platform != 'win32':
            os.chmod('iniciar_manual.sh', 0o755)
        
        self.imprimir("✅ Script Unix creado: iniciar_manual.sh", 'verde')
        
        # Script de demo
        script_demo = f"""@echo off
echo Iniciando Demo del Manual...
python demo_manual.py
pause
"""
        
        with open('demo_manual.bat', 'w', encoding='utf-8') as f:
            f.write(script_demo)
        
        self.imprimir("✅ Script demo creado: demo_manual.bat", 'verde')
    
    def verificar_instalacion(self):
        """Verifica que la instalación sea correcta"""
        self.imprimir("\n📋 PASO 6: Verificando instalación...", 'azul', True)
        
        verificaciones = [
            ("Archivo principal", "manual_completo_usuario.py"),
            ("Manual básico", "manual_usuario_sistema_vigilancia.py"),
            ("Ejemplos visuales", "ejemplos_visuales_manual.py"),
            ("Demo", "demo_manual.py"),
            ("Configuración", "manual_docs/configuracion/manual_config.json"),
            ("Log de instalación", "manual_docs/logs/instalacion.log"),
            ("Script Windows", "iniciar_manual.bat"),
            ("Script Unix", "iniciar_manual.sh")
        ]
        
        errores = []
        for nombre, archivo in verificaciones:
            if os.path.exists(archivo):
                self.imprimir(f"✅ {nombre} - OK", 'verde')
            else:
                errores.append(f"{nombre} ({archivo})")
                self.imprimir(f"❌ {nombre} - ERROR", 'rojo')
        
        if errores:
            raise Exception(f"Errores en la verificación: {', '.join(errores)}")
        
        self.imprimir("\n🎉 ¡INSTALACIÓN COMPLETADA EXITOSAMENTE!", 'verde', True)
    
    def mostrar_instrucciones_finales(self):
        """Muestra las instrucciones finales"""
        self.imprimir("\n📋 PASO 7: Instrucciones finales", 'azul', True)
        self.imprimir("="*40, 'azul')
        
        instrucciones = f"""
{self.colores['verde']}🎉 ¡INSTALACIÓN COMPLETADA!{self.colores['reset']}

{self.colores['azul']}🚀 CÓMO USAR EL MANUAL:{self.colores['reset']}

{self.colores['verde']}OPCIÓN 1 - Script de acceso rápido:{self.colores['reset']}
• Windows: Doble clic en "iniciar_manual.bat"
• Linux/macOS: ./iniciar_manual.sh

{self.colores['verde']}OPCIÓN 2 - Comando directo:{self.colores['reset']}
• python manual_completo_usuario.py

{self.colores['verde']}OPCIÓN 3 - Demo primero:{self.colores['reset']}
• python demo_manual.py

{self.colores['azul']}📚 ARCHIVOS DISPONIBLES:{self.colores['reset']}
• manual_completo_usuario.py - Manual completo
• manual_usuario_sistema_vigilancia.py - Manual básico
• ejemplos_visuales_manual.py - Ejemplos visuales
• demo_manual.py - Demo del manual

{self.colores['azul']}📁 ESTRUCTURA CREADA:{self.colores['reset']}
• manual_docs/ - Documentación
• manual_docs/configuracion/ - Configuración
• manual_docs/logs/ - Logs del sistema
• iniciar_manual.bat/.sh - Scripts de acceso

{self.colores['verde']}🎯 PRÓXIMOS PASOS:{self.colores['reset']}
1. Ejecutar el manual completo
2. Seguir la guía de inicio rápido
3. Practicar con ejemplos
4. Explorar funcionalidades avanzadas
5. Contactar soporte si es necesario

{self.colores['magenta']}💡 CONSEJOS:{self.colores['reset']}
• Comienza con el demo si eres nuevo
• Usa el manual básico para aprender
• Explora los ejemplos visuales
• No dudes en contactar soporte

{self.colores['cyan']}📞 SOPORTE TÉCNICO:{self.colores['reset']}
• Email: soporte@vigilancia-vehicular.com
• Teléfono: +1-800-VIGILANCIA
• Sitio web: www.vigilancia-vehicular.com
• Horario: Lunes a Viernes 8:00-18:00

{self.colores['amarillo']}¡QUE TENGAS ÉXITO CON TU SISTEMA DE VIGILANCIA! 🚁{self.colores['reset']}
        """
        
        print(instrucciones)
        
        # Preguntar si quiere ejecutar el manual ahora
        try:
            respuesta = input(f"\n{self.colores['verde']}¿Quieres ejecutar el manual ahora? (s/n): {self.colores['reset']}")
            if respuesta.lower() in ['s', 'si', 'sí', 'y', 'yes']:
                self.imprimir("\n🚀 Ejecutando manual completo...", 'verde', True)
                os.system('python manual_completo_usuario.py')
        except KeyboardInterrupt:
            self.imprimir("\n👋 Instalación completada. ¡Hasta luego!", 'amarillo')

def main():
    """Función principal que inicia la instalación"""
    try:
        instalador = InstaladorManual()
    except KeyboardInterrupt:
        print(f"\n\n{chr(27)}[91m❌ Instalación interrumpida por el usuario{chr(27)}[0m")
        print(f"{chr(27)}[93m👋 ¡Hasta luego!{chr(27)}[0m")
    except Exception as e:
        print(f"\n\n{chr(27)}[91m❌ Error durante la instalación: {e}{chr(27)}[0m")
        print(f"{chr(27)}[93m🆘 Contacta soporte técnico{chr(27)}[0m")

if __name__ == "__main__":
    main()
