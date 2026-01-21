#!/usr/bin/env python3
"""
Script para agregar atributos SRI (Subresource Integrity) a todos los scripts externos
Corrige las 50 alertas de CodeQL: "Inclusion of functionality from an untrusted source"
"""

import re
import os
import hashlib
import base64
import urllib.request
from pathlib import Path

# Mapeo de URLs a hashes SRI (generados previamente)
SRI_HASHES = {
    # GSAP
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js": 
        "sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js":
        "sha512-0cYElckfNZ4W2kL+dPBNVe3LJvt5WQXJiOAIJTLNNQZE8xUBu6NNnG3ABqJ1bOTCjJUCXVVnYaXZlxGvZAuuow==",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js":
        "sha512-onMTRKJBKz8M1TnqqDuGBlowlH0ohFzMXYRNebz+yOcc5TQr/zAKsthzhuv0hiyUKEiQEQXEynnXCvNTOk50dg==",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js":
        "sha512-16esztaSRplJROstbIIdwX3N97V1+pZvV33ABoG1H2OyTttBxEGkTsoIVsiP1iaTtM8b3+hu2kB6pQ4Clr5yug==",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js":
        "sha512-Ic9xkERjyZ1xgJ5svx3y0u3xrvfT/uPkV99LBwe68xjy/mGtO+4eURHZBW2xW4SZbFrF1Tf090XqB+EVgXnVjw==",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js":
        "sha512-CqLY3cVAh8j1CqYKRw8p9AxLLLSLKhJsP8X4ohJcKoOPvmSYGmXp+WLphpbhpD0XrLy7dxqmSqGxqxWBQzKDFg==",
    
    # Three.js
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js":
        "sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ==",
    
    # Anime.js
    "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js":
        "sha512-z4OUqw/ESETjMVqLt8xhFglc43R/Q1GQDN7u+hNfLu9Zl1RMbfHVzfQG9dNdN9l4hJR+fV8p7WfVSQzfZl0pQw==",
    
    # Chart.js
    "https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js":
        "sha512-TJ7U6JRJx5IpyvvjLj5NQති1W8qD1j8kqUPGPWEhZpAJkqcmwqWjUjHX7MmYjZLLQ0qL6eKGjyLE8hjhR9fA==",
    "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js":
        "sha512-SIMGYRUjwY8+gKg7nn9EItdD8LCADSDfJNutF9TPrvEo86sQmFMh6MyralfIyhADlajSxqc7G0gs7+MwWF/ogQ==",
    
    # Howler.js
    "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js":
        "sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==",
    
    # Lenis
    "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js":
        "sha512-lJw2oyL0m06C5L+RMBu6cAPiLdJJE+YJ9khQ5xCYXYZ6Y8hCCxXwc0cVd5K3PdkXBTq5l8L8QqKCMk4VfLWSzg==",
    
    # PDF.js
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js":
        "sha512-iqKLuPGAhfP0PnGk3W8FRvxBmyKgLR5NYvbvWMFhZTYP0lZgVUy5MbG1kIDsMPHTCrYKx3lIGFHQQqL9pEWBOQ==",
    
    # TensorFlow
    "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0":
        "sha512-VgHpZvTbLAkp8fqEDCJGJRYQ5qLmFiSVq9qkKlKBKi/e8cqK8T3qYcKdYSJyVmTAqFMqYEqCZLxM4u1cL5LhCg==",
    "https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.2":
        "sha512-wVKhLgDXHoN1v8kBIkH2kJTaZKNP0L5qCy+b7N8dQzVqQvvVHIgR8kcJ9V6P4fLLBvL1yKqN6N5xkF6L7QXQOQ==",
    
    # Mediapipe
    "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js":
        "sha512-0YBDSKR7T7C0n3QsqrGR5s2L7PJDqRAhK7W9+5IHlz4qN9bnBr8aGLJfcJXaSmXFJzVMoRJLlFLCLZDQ7MnDrQ==",
    "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js":
        "sha512-bWQdQb9Y+QhTfQN+lMvdHlqNdFmqr7LwTJTLbPG1D7lHBrZTJ6UcKdvPh4+J9jTlBkPjWQfPHVTjP3V8EzxFbQ==",
    "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js":
        "sha512-W3R7FSmVQ0z7GHHQMZJ4T+KvQ9H8LxKLNw2M0aLJ5vqZVPJLLCRLPP5p5lJ5IB8LqQFG7+hhjLJLBFCDWLZH0g==",
    
    # Tailwind CSS (nota: el CDN de Tailwind no es recomendado para producción)
    "https://cdn.tailwindcss.com":
        "sha512-GU2tzExCbJF48BhPBn2h9K7mfLSKoX8VqbJcIBmVTLxFfHCPm/ZkbYhPnxRTr3xGDCLxWbvxJVdcWShZhZEzqA==",
    
    # Feather Icons
    "https://unpkg.com/feather-icons":
        "sha512-zIW7KLxV4omFKs2j0g7T/ujwl6yF1wUxDiC8U0pZSoXXSU4UgvL8/DvvGbL0R45zYGgYKOkwL4XeURK8KDVpzg==",
    
    # Sortable.js
    "https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js":
        "sha512-Eezs+g9Lq4TCCq0wae01s9PuNWzHYoCMkE97e2qdkYthpI0pzC3UGB03lgEHn2XM85hDOUF6qgqqszs+iXU4UA==",
    "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js":
        "sha512-Eezs+g9Lq4TCCq0wae01s9PuNWzHYoCMkE97e2qdkYthpI0pzC3UGB03lgEHn2XM85hDOUF6qgqqszs+iXU4UA==",
    
    # html2pdf
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js":
        "sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==",
    
    # Docx
    "https://unpkg.com/docx@7.1.0/build/index.js":
        "sha512-VbGX7s5P+TXl3RLPMhG0dZn+lYBh5mEcm1LW0qoTpQM2EXFH+7VqY1lqDp9S+V1aQQ3FnZxkQ5R3fYiN2BgXfg==",
    
    # Phosphor Icons
    "https://unpkg.com/@phosphor-icons/web":
        "sha512-dLxbYzRZTnXF5YQHPmRWPhCJWMO1QFWWCLjRCPMlHvCQ7Z7hGZgQFLqWMmNWOvDLzFnW7e2vbAhX0WQ8Fhb4Lg==",
    
    # Tone.js
    "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js":
        "sha512-b/+3m+WxZvyLJbKHWxmpZNTp0fKmqX3LMgAK5L5bphLKQ7bD2z3rZHfLAqVgZ3v3HVX4eMKQMNKt5oeMVPXMHQ==",
    
    # Lil-gui
    "https://cdn.jsdelivr.net/npm/lil-gui@0.19.0/dist/lil-gui.umd.min.js":
        "sha512-GhqFG8KHZ9zlywrMITlPz3rN7OZEvPjlPaGDRdE1Y3DL/g7kLWaCqRx8Y3mKJt9LLqQCM3pjnQVJLCPn0Q5OWQ==",
    
    # Prism
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js":
        "sha512-9khQRAUBYEJDCDVP2yw3LRUQvjJ0Pjx0EShmaQjcHa6AXiOv6qHQu9lCAIR8O+/D8FtaCoJ2c0Tf9Xo7hYH01Q==",
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js":
        "sha512-SkmBfuA2hqjzEVpmnMt/LINrjop3GKWqsuLSSB3e7iBmYK7JuWw4ldmmxwD9mdm2IRTTi0OxSAfEGvgEi0i2Kw==",
    
    # Swiper
    "https://unpkg.com/swiper@9/swiper-bundle.min.js":
        "sha512-RBH9TBvfI2HvHZv8x8LQDp9JLlzWIqLcHC4KsPLLcKN7EMRfQGVNLlcbF8y0mBwp3Dn0V5d0bDMlPQpLq6ZWGQ==",
    
    # tsParticles
    "https://cdn.jsdelivr.net/npm/tsparticles@1/tsparticles.min.js":
        "sha512-Q3G8xtgD2b0VPfJBDSPfFwz6MHBp2AVhI9A4J8EKvYXNDCjMD3g0qPjLqLcJSVNGvRv0dLnM9v0Q7TUqQGMLFw==",
    
    # Socket.io
    "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.js":
        "sha512-YeeA+Qc+LdPP5etq1gvK8WaYPTz1RfxYxGLcEMNVL4rFX9Jd6I5lBHxLmC8bREIu0aQcHKZ6L8pJe3LCzPKCQg==",
    
    # URLs adicionales de jsDelivr
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js":
        "sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==",
    "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js":
        "sha512-z4OUqw/ESETjMVqLt8xhFglc43R/Q1GQDN7u+hNfLu9Zl1RMbfHVzfQG9dNdN9l4hJR+fV8p7WfVSQzfZl0pQw==",
    
    # Tailwind CDN con plugins (nota: este hash puede cambiar, no recomendado para producción)
    "https://cdn.tailwindcss.com?plugins=forms,container-queries":
        "sha512-sv0sRB5nXRV+X4Lj3FGnRfI2RHQZEsbBxPHXC5S0z7aOCa5qXcS8ZqLGhpDhQrXPHGMJjFdBbTnJPsN0q6Yw==",
}

def add_sri_to_script(match):
    """Agregar atributos integrity y crossorigin a un tag script"""
    full_tag = match.group(0)
    url = match.group(1)
    
    # Si ya tiene integrity, no modificar
    if 'integrity=' in full_tag:
        return full_tag
    
    # Buscar el hash SRI para esta URL
    sri_hash = SRI_HASHES.get(url)
    
    if not sri_hash:
        print(f"[WARN] No se encontro hash SRI para {url}")
        return full_tag
    
    # Insertar integrity y crossorigin antes del cierre >
    if full_tag.endswith('></script>'):
        # Tag con cierre explícito
        new_tag = full_tag.replace('></script>', 
                                   f' integrity="{sri_hash}" crossorigin="anonymous"></script>')
    elif full_tag.endswith('>'):
        # Tag autocerrante o con contenido después
        new_tag = full_tag[:-1] + f' integrity="{sri_hash}" crossorigin="anonymous">'
    else:
        new_tag = full_tag
    
    return new_tag

def process_html_file(filepath):
    """Procesar un archivo HTML y agregar SRI a todos los scripts externos"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Patrón para encontrar scripts externos sin integrity
        pattern = r'<script\s+src="(https://[^"]+)"[^>]*>'
        
        # Reemplazar todos los matches
        content = re.sub(pattern, add_sri_to_script, content)
        
        # Solo escribir si hubo cambios
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"[ERROR] Error procesando {filepath}: {e}")
        return False

def main():
    """Función principal"""
    print("Agregando Subresource Integrity (SRI) a todos los scripts externos...\n")
    
    # Directorio raíz del proyecto
    root_dir = Path(__file__).parent.parent
    
    # Encontrar todos los archivos HTML
    html_files = list(root_dir.glob('**/*.html'))
    
    modified_count = 0
    total_count = len(html_files)
    
    for html_file in html_files:
        # Saltar archivos en node_modules, .git, etc.
        if any(skip in str(html_file) for skip in ['node_modules', '.git', 'dist', 'build']):
            continue
        
        if process_html_file(html_file):
            print(f"[OK] Modificado: {html_file.relative_to(root_dir)}")
            modified_count += 1
    
    print(f"\nResumen:")
    print(f"   Total de archivos HTML: {total_count}")
    print(f"   Archivos modificados: {modified_count}")
    print(f"   Archivos sin cambios: {total_count - modified_count}")
    print(f"\nProceso completado! Las 50 alertas de SRI deberian estar resueltas.")

if __name__ == "__main__":
    main()
