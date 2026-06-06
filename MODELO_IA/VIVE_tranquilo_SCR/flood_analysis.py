"""
Script de Análisis de Nivel de Inundación
Compara imágenes antes/después para medir el nivel de agua en carreteras
Autor: Data Science Team
"""

import cv2
import numpy as np
from ultralytics import YOLO
import matplotlib.pyplot as plt
from pathlib import Path
import json

class FloodAnalyzer:
    """Analizador de nivel de inundación usando YOLOv8 y visión computacional"""
    
    def __init__(self, model_size='n'):
        """
        Inicializa el analizador
        Args:
            model_size: Tamaño del modelo YOLO ('n', 's', 'm', 'l', 'x')
        """
        print(f"🔄 Cargando modelo YOLOv8{model_size}...")
        self.model = YOLO(f'yolov8{model_size}-seg.pt')
        print("✅ Modelo cargado exitosamente")
        
    def load_images(self, before_path, after_path):
        """Carga las imágenes antes y después"""
        self.img_before = cv2.imread(before_path)
        self.img_after = cv2.imread(after_path)
        
        if self.img_before is None or self.img_after is None:
            raise ValueError("❌ Error al cargar las imágenes. Verifica las rutas.")
        
        # Redimensionar si es necesario para que coincidan
        if self.img_before.shape != self.img_after.shape:
            h, w = self.img_before.shape[:2]
            self.img_after = cv2.resize(self.img_after, (w, h))
        
        print(f"✅ Imágenes cargadas: {self.img_before.shape}")
        return self.img_before, self.img_after
    
    def detect_water_area(self, image):
        """Detecta áreas de agua usando segmentación de color"""
        # Convertir a HSV para mejor detección de agua
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Rangos para detectar agua (tonos azules/grises)
        # Rango 1: Azul oscuro
        lower_blue1 = np.array([90, 50, 50])
        upper_blue1 = np.array([130, 255, 255])
        
        # Rango 2: Gris (agua turbia)
        lower_gray = np.array([0, 0, 50])
        upper_gray = np.array([180, 50, 200])
        
        # Crear máscaras
        mask_blue = cv2.inRange(hsv, lower_blue1, upper_blue1)
        mask_gray = cv2.inRange(hsv, lower_gray, upper_gray)
        
        # Combinar máscaras
        water_mask = cv2.bitwise_or(mask_blue, mask_gray)
        
        # Aplicar operaciones morfológicas para limpiar
        kernel = np.ones((5, 5), np.uint8)
        water_mask = cv2.morphologyEx(water_mask, cv2.MORPH_CLOSE, kernel)
        water_mask = cv2.morphologyEx(water_mask, cv2.MORPH_OPEN, kernel)
        
        return water_mask
    
    def calculate_difference(self):
        """Calcula la diferencia entre imágenes antes/después"""
        # Convertir a escala de grises
        gray_before = cv2.cvtColor(self.img_before, cv2.COLOR_BGR2GRAY)
        gray_after = cv2.cvtColor(self.img_after, cv2.COLOR_BGR2GRAY)
        
        # Calcular diferencia absoluta
        diff = cv2.absdiff(gray_before, gray_after)
        
        # Aplicar umbral
        _, thresh = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)
        
        # Limpiar ruido
        kernel = np.ones((5, 5), np.uint8)
        thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
        
        return diff, thresh
    
    def estimate_water_level(self, water_mask):
        """Estima el nivel de agua en la imagen"""
        h, w = water_mask.shape
        
        # Encontrar contornos del agua
        contours, _ = cv2.findContours(water_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if not contours:
            return 0, 0, "Sin inundación"
        
        # Encontrar el contorno más grande (área principal de agua)
        largest_contour = max(contours, key=cv2.contourArea)
        
        # Calcular área de agua
        water_area = cv2.contourArea(largest_contour)
        total_area = h * w
        water_percentage = (water_area / total_area) * 100
        
        # Encontrar el punto más alto del agua (menor valor Y)
        if len(largest_contour) > 0:
            top_point = min(largest_contour, key=lambda x: x[0][1])
            water_level_pixels = h - top_point[0][1]
            water_level_percentage = (water_level_pixels / h) * 100
        else:
            water_level_percentage = 0
        
        # Clasificar severidad
        if water_percentage < 10:
            severity = "Bajo - Inundación mínima"
        elif water_percentage < 30:
            severity = "Medio - Inundación moderada"
        elif water_percentage < 50:
            severity = "Alto - Inundación significativa"
        else:
            severity = "Crítico - Inundación severa"
        
        return water_percentage, water_level_percentage, severity
    
    def analyze(self, before_path, after_path, output_dir='results'):
        """
        Análisis completo de inundación
        Args:
            before_path: Ruta de imagen antes de inundación
            after_path: Ruta de imagen después de inundación
            output_dir: Directorio para guardar resultados
        """
        print("\n" + "="*60)
        print("🌊 ANÁLISIS DE NIVEL DE INUNDACIÓN")
        print("="*60)
        
        # Crear directorio de salida
        Path(output_dir).mkdir(exist_ok=True)
        
        # Cargar imágenes
        print("\n📸 Cargando imágenes...")
        self.load_images(before_path, after_path)
        
        # Detectar agua en imagen después
        print("\n🔍 Detectando áreas de agua...")
        water_mask = self.detect_water_area(self.img_after)
        
        # Calcular diferencia
        print("📊 Calculando diferencias...")
        diff, thresh = self.calculate_difference()
        
        # Estimar nivel de agua
        print("📏 Estimando nivel de agua...")
        water_pct, level_pct, severity = self.estimate_water_level(water_mask)
        
        # Crear visualización
        print("🎨 Generando visualización...")
        self.visualize_results(water_mask, diff, thresh, water_pct, level_pct, severity, output_dir)
        
        # Guardar métricas
        metrics = {
            'area_inundada_porcentaje': round(water_pct, 2),
            'nivel_agua_porcentaje': round(level_pct, 2),
            'severidad': severity,
            'imagen_antes': before_path,
            'imagen_despues': after_path
        }
        
        metrics_path = f"{output_dir}/metricas.json"
        with open(metrics_path, 'w', encoding='utf-8') as f:
            json.dump(metrics, f, indent=4, ensure_ascii=False)
        
        # Mostrar resultados
        print("\n" + "="*60)
        print("📊 RESULTADOS DEL ANÁLISIS")
        print("="*60)
        print(f"🌊 Área inundada: {water_pct:.2f}%")
        print(f"📏 Nivel de agua: {level_pct:.2f}%")
        print(f"⚠️  Severidad: {severity}")
        print(f"💾 Resultados guardados en: {output_dir}/")
        print("="*60 + "\n")
        
        return metrics
    
    def visualize_results(self, water_mask, diff, thresh, water_pct, level_pct, severity, output_dir):
        """Genera visualización completa de resultados"""
        fig, axes = plt.subplots(2, 3, figsize=(18, 12))
        fig.suptitle('Análisis de Nivel de Inundación', fontsize=16, fontweight='bold')
        
        # Imagen antes
        axes[0, 0].imshow(cv2.cvtColor(self.img_before, cv2.COLOR_BGR2RGB))
        axes[0, 0].set_title('Antes de la Inundación', fontsize=12, fontweight='bold')
        axes[0, 0].axis('off')
        
        # Imagen después
        axes[0, 1].imshow(cv2.cvtColor(self.img_after, cv2.COLOR_BGR2RGB))
        axes[0, 1].set_title('Después de la Inundación', fontsize=12, fontweight='bold')
        axes[0, 1].axis('off')
        
        # Máscara de agua
        axes[0, 2].imshow(water_mask, cmap='Blues')
        axes[0, 2].set_title('Detección de Agua', fontsize=12, fontweight='bold')
        axes[0, 2].axis('off')
        
        # Diferencia
        axes[1, 0].imshow(diff, cmap='hot')
        axes[1, 0].set_title('Diferencia de Imágenes', fontsize=12, fontweight='bold')
        axes[1, 0].axis('off')
        
        # Umbral de diferencia
        axes[1, 1].imshow(thresh, cmap='gray')
        axes[1, 1].set_title('Áreas Afectadas', fontsize=12, fontweight='bold')
        axes[1, 1].axis('off')
        
        # Overlay de agua sobre imagen
        overlay = self.img_after.copy()
        overlay[water_mask > 0] = [0, 0, 255]  # Rojo para agua
        result = cv2.addWeighted(self.img_after, 0.6, overlay, 0.4, 0)
        axes[1, 2].imshow(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
        axes[1, 2].set_title('Overlay de Inundación', fontsize=12, fontweight='bold')
        axes[1, 2].axis('off')
        
        # Agregar texto con métricas
        metrics_text = f"""
        MÉTRICAS DE INUNDACIÓN
        
        Área Inundada: {water_pct:.2f}%
        Nivel de Agua: {level_pct:.2f}%
        Severidad: {severity}
        """
        fig.text(0.5, 0.02, metrics_text, ha='center', fontsize=11, 
                bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
        
        plt.tight_layout(rect=[0, 0.05, 1, 0.96])
        
        # Guardar visualización
        output_path = f"{output_dir}/analisis_completo.png"
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        print(f"✅ Visualización guardada: {output_path}")
        
        # Guardar imagen con overlay
        overlay_path = f"{output_dir}/imagen_procesada.jpg"
        cv2.imwrite(overlay_path, result)
        print(f"✅ Imagen procesada guardada: {overlay_path}")
        
        plt.close()


def main():
    """Función principal para ejecutar el análisis"""
    print("\n🌊 SISTEMA DE ANÁLISIS DE INUNDACIONES")
    print("="*60)
    
    # Configuración
    BEFORE_IMAGE = "antes.jpg"  # Cambia por tu ruta
    AFTER_IMAGE = "despues.jpg"  # Cambia por tu ruta
    OUTPUT_DIR = "resultados_analisis"
    
    try:
        # Crear analizador
        analyzer = FloodAnalyzer(model_size='n')  # 'n' es el más rápido
        
        # Ejecutar análisis
        metrics = analyzer.analyze(BEFORE_IMAGE, AFTER_IMAGE, OUTPUT_DIR)
        
        print("✅ Análisis completado exitosamente!")
        
    except FileNotFoundError as e:
        print(f"\n❌ Error: No se encontraron las imágenes.")
        print(f"   Asegúrate de tener 'antes.jpg' y 'despues.jpg' en el directorio actual")
        print(f"   O modifica las rutas en el script (líneas 234-235)")
    except Exception as e:
        print(f"\n❌ Error durante el análisis: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()

# Made with Bob
