"""
Utilidades para visualización y generación de reportes
Incluye visualizadores de resultados y generadores de reportes
"""

import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import json
from datetime import datetime
import pandas as pd

class ResultVisualizer:
    """Visualizador de resultados de análisis"""
    
    def __init__(self):
        self.colors = {
            'person': (255, 0, 0),      # Rojo
            'car': (0, 255, 0),         # Verde
            'bus': (0, 0, 255),         # Azul
            'truck': (255, 255, 0),     # Amarillo
            'vegetation': (0, 255, 0),  # Verde
            'soil': (139, 69, 19),      # Marrón
            'water': (0, 255, 255),     # Cian
            'crop': (0, 128, 0),        # Verde oscuro
            'pest': (255, 0, 255)       # Magenta
        }
    
    def draw_detections(self, image: np.ndarray, results, conf_threshold: float = 0.5) -> np.ndarray:
        """Dibuja detecciones en una imagen"""
        if results is None or len(results) == 0:
            return image
        
        result = results[0]  # Tomar el primer resultado
        
        if result.boxes is None:
            return image
        
        # Crear copia de la imagen
        vis_image = image.copy()
        
        for box in result.boxes:
            confidence = float(box.conf[0])
            if confidence < conf_threshold:
                continue
            
            # Obtener coordenadas del bounding box
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy().astype(int)
            
            # Obtener clase
            class_id = int(box.cls[0])
            class_name = result.names[class_id]
            
            # Obtener color
            color = self.colors.get(class_name, (255, 255, 255))
            
            # Dibujar bounding box
            cv2.rectangle(vis_image, (x1, y1), (x2, y2), color, 2)
            
            # Dibujar etiqueta
            label = f"{class_name}: {confidence:.2f}"
            label_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)[0]
            
            # Fondo para la etiqueta
            cv2.rectangle(vis_image, (x1, y1 - label_size[1] - 10), 
                         (x1 + label_size[0], y1), color, -1)
            
            # Texto de la etiqueta
            cv2.putText(vis_image, label, (x1, y1 - 5), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        
        return vis_image
    
    def draw_tracking(self, image: np.ndarray, results, conf_threshold: float = 0.5) -> np.ndarray:
        """Dibuja tracking en una imagen"""
        if results is None or len(results) == 0:
            return image
        
        result = results[0]  # Tomar el primer resultado
        
        if result.boxes is None or result.boxes.id is None:
            return image
        
        # Crear copia de la imagen
        vis_image = image.copy()
        
        for i, box in enumerate(result.boxes):
            confidence = float(box.conf[0])
            if confidence < conf_threshold:
                continue
            
            # Obtener coordenadas del bounding box
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy().astype(int)
            
            # Obtener ID del track
            track_id = int(result.boxes.id[i])
            
            # Obtener clase
            class_id = int(box.cls[0])
            class_name = result.names[class_id]
            
            # Obtener color basado en el ID del track
            color = self._get_track_color(track_id)
            
            # Dibujar bounding box
            cv2.rectangle(vis_image, (x1, y1), (x2, y2), color, 2)
            
            # Dibujar etiqueta con ID
            label = f"ID:{track_id} {class_name}: {confidence:.2f}"
            label_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)[0]
            
            # Fondo para la etiqueta
            cv2.rectangle(vis_image, (x1, y1 - label_size[1] - 10), 
                         (x1 + label_size[0], y1), color, -1)
            
            # Texto de la etiqueta
            cv2.putText(vis_image, label, (x1, y1 - 5), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        
        return vis_image
    
    def draw_segmentation(self, image: np.ndarray, results, conf_threshold: float = 0.4) -> np.ndarray:
        """Dibuja segmentación en una imagen"""
        if results is None or len(results) == 0:
            return image
        
        result = results[0]  # Tomar el primer resultado
        
        if result.masks is None:
            return image
        
        # Crear copia de la imagen
        vis_image = image.copy()
        
        for mask in result.masks:
            confidence = float(mask.conf[0])
            if confidence < conf_threshold:
                continue
            
            # Obtener clase
            class_id = int(mask.cls[0])
            class_name = result.names[class_id]
            
            # Obtener color
            color = self.colors.get(class_name, (255, 255, 255))
            
            # Obtener máscara
            mask_data = mask.data[0].cpu().numpy()
            mask_data = (mask_data * 255).astype(np.uint8)
            
            # Crear máscara de color
            colored_mask = np.zeros_like(vis_image)
            colored_mask[:, :, 0] = color[0]
            colored_mask[:, :, 1] = color[1]
            colored_mask[:, :, 2] = color[2]
            
            # Aplicar máscara con transparencia
            alpha = 0.3
            vis_image = cv2.addWeighted(vis_image, 1 - alpha, colored_mask, alpha, 0)
            
            # Dibujar contorno
            contours, _ = cv2.findContours(mask_data, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            cv2.drawContours(vis_image, contours, -1, color, 2)
        
        return vis_image
    
    def _get_track_color(self, track_id: int) -> Tuple[int, int, int]:
        """Obtiene un color único para un track ID"""
        # Generar color basado en el ID
        np.random.seed(track_id)
        color = np.random.randint(0, 255, 3)
        return tuple(color.astype(int))
    
    def create_summary_visualization(self, results, output_path: str) -> bool:
        """Crea una visualización resumen de los resultados"""
        try:
            # Calcular métricas
            from .model_utils import MetricsCalculator
            calculator = MetricsCalculator()
            
            if not results:
                return False
            
            # Determinar tipo de análisis basado en los resultados
            result = results[0]
            if hasattr(result, 'masks') and result.masks is not None:
                metrics = calculator.calculate_segmentation_metrics(results)
                analysis_type = "Segmentación"
            elif hasattr(result, 'boxes') and result.boxes is not None and result.boxes.id is not None:
                metrics = calculator.calculate_tracking_metrics(results)
                analysis_type = "Tracking"
            else:
                metrics = calculator.calculate_detection_metrics(results)
                analysis_type = "Detección"
            
            # Crear visualización
            fig, axes = plt.subplots(2, 2, figsize=(15, 10))
            fig.suptitle(f'Resumen de Análisis - {analysis_type}', fontsize=16)
            
            # Gráfico de barras de clases
            if 'class_counts' in metrics:
                classes = list(metrics['class_counts'].keys())
                counts = list(metrics['class_counts'].values())
                
                axes[0, 0].bar(classes, counts)
                axes[0, 0].set_title('Detecciones por Clase')
                axes[0, 0].set_xlabel('Clase')
                axes[0, 0].set_ylabel('Cantidad')
                axes[0, 0].tick_params(axis='x', rotation=45)
            
            # Gráfico de confianza
            if 'avg_confidence' in metrics:
                conf_data = [metrics['avg_confidence']]
                axes[0, 1].bar(['Confianza Promedio'], conf_data)
                axes[0, 1].set_title('Confianza Promedio')
                axes[0, 1].set_ylabel('Confianza')
                axes[0, 1].set_ylim(0, 1)
            
            # Gráfico de distribución temporal (si hay múltiples frames)
            if len(results) > 1:
                frame_detections = []
                for result in results:
                    if result.boxes is not None:
                        frame_detections.append(len(result.boxes))
                    else:
                        frame_detections.append(0)
                
                axes[1, 0].plot(frame_detections)
                axes[1, 0].set_title('Detecciones por Frame')
                axes[1, 0].set_xlabel('Frame')
                axes[1, 0].set_ylabel('Detecciones')
            
            # Métricas adicionales
            metrics_text = f"""
            Total de detecciones: {metrics.get('total_detections', 0)}
            Tracks únicos: {metrics.get('unique_tracks', 0)}
            Máscaras totales: {metrics.get('total_masks', 0)}
            """
            
            axes[1, 1].text(0.1, 0.5, metrics_text, transform=axes[1, 1].transAxes,
                           fontsize=12, verticalalignment='center')
            axes[1, 1].set_title('Métricas Adicionales')
            axes[1, 1].axis('off')
            
            plt.tight_layout()
            plt.savefig(output_path, dpi=300, bbox_inches='tight')
            plt.close()
            
            return True
            
        except Exception as e:
            print(f"Error al crear visualización: {e}")
            return False

class ReportGenerator:
    """Generador de reportes"""
    
    def __init__(self):
        self.template_dir = Path("templates")
        self.template_dir.mkdir(exist_ok=True)
    
    def generate_json_report(self, results, metrics: Dict, output_path: str) -> bool:
        """Genera un reporte en formato JSON"""
        try:
            report = {
                "timestamp": datetime.now().isoformat(),
                "analysis_type": self._determine_analysis_type(results),
                "metrics": metrics,
                "summary": self._generate_summary(metrics),
                "recommendations": self._generate_recommendations(metrics)
            }
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2, ensure_ascii=False)
            
            return True
            
        except Exception as e:
            print(f"Error al generar reporte JSON: {e}")
            return False
    
    def generate_html_report(self, results, metrics: Dict, output_path: str) -> bool:
        """Genera un reporte en formato HTML"""
        try:
            analysis_type = self._determine_analysis_type(results)
            summary = self._generate_summary(metrics)
            recommendations = self._generate_recommendations(metrics)
            
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reporte de Análisis - DroneVision</title>
                <style>
                    body {{ font-family: Arial, sans-serif; margin: 40px; }}
                    .header {{ background-color: #f0f0f0; padding: 20px; border-radius: 5px; }}
                    .section {{ margin: 20px 0; }}
                    .metric {{ background-color: #e8f4f8; padding: 10px; margin: 5px 0; border-radius: 3px; }}
                    .recommendation {{ background-color: #fff3cd; padding: 10px; margin: 5px 0; border-radius: 3px; }}
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Reporte de Análisis - DroneVision</h1>
                    <p>Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    <p>Tipo de análisis: {analysis_type}</p>
                </div>
                
                <div class="section">
                    <h2>Resumen</h2>
                    <p>{summary}</p>
                </div>
                
                <div class="section">
                    <h2>Métricas</h2>
                    {self._format_metrics_html(metrics)}
                </div>
                
                <div class="section">
                    <h2>Recomendaciones</h2>
                    {self._format_recommendations_html(recommendations)}
                </div>
            </body>
            </html>
            """
            
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            return True
            
        except Exception as e:
            print(f"Error al generar reporte HTML: {e}")
            return False
    
    def _determine_analysis_type(self, results) -> str:
        """Determina el tipo de análisis basado en los resultados"""
        if not results:
            return "Desconocido"
        
        result = results[0]
        if hasattr(result, 'masks') and result.masks is not None:
            return "Segmentación Agrícola"
        elif hasattr(result, 'boxes') and result.boxes is not None and result.boxes.id is not None:
            return "Seguimiento de Tráfico"
        else:
            return "Detección Urbana"
    
    def _generate_summary(self, metrics: Dict) -> str:
        """Genera un resumen basado en las métricas"""
        if 'total_detections' in metrics:
            return f"Se detectaron {metrics['total_detections']} objetos en total."
        elif 'unique_tracks' in metrics:
            return f"Se rastrearon {metrics['unique_tracks']} vehículos únicos."
        elif 'total_masks' in metrics:
            return f"Se segmentaron {metrics['total_masks']} áreas agrícolas."
        else:
            return "Análisis completado exitosamente."
    
    def _generate_recommendations(self, metrics: Dict) -> List[str]:
        """Genera recomendaciones basadas en las métricas"""
        recommendations = []
        
        if 'avg_confidence' in metrics:
            if metrics['avg_confidence'] < 0.5:
                recommendations.append("La confianza promedio es baja. Considera ajustar los parámetros del modelo.")
        
        if 'total_detections' in metrics:
            if metrics['total_detections'] == 0:
                recommendations.append("No se detectaron objetos. Verifica la calidad del video/imagen.")
            elif metrics['total_detections'] > 100:
                recommendations.append("Se detectaron muchos objetos. Considera usar filtros de confianza más altos.")
        
        if 'unique_tracks' in metrics:
            if metrics['unique_tracks'] > 50:
                recommendations.append("Alto flujo de tráfico detectado. Monitorea la congestión.")
        
        return recommendations
    
    def _format_metrics_html(self, metrics: Dict) -> str:
        """Formatea las métricas para HTML"""
        html = ""
        for key, value in metrics.items():
            if isinstance(value, dict):
                html += f"<div class='metric'><strong>{key}:</strong><br>"
                for sub_key, sub_value in value.items():
                    html += f"&nbsp;&nbsp;{sub_key}: {sub_value}<br>"
                html += "</div>"
            else:
                html += f"<div class='metric'><strong>{key}:</strong> {value}</div>"
        return html
    
    def _format_recommendations_html(self, recommendations: List[str]) -> str:
        """Formatea las recomendaciones para HTML"""
        html = ""
        for rec in recommendations:
            html += f"<div class='recommendation'>{rec}</div>"
        return html
