"""
Archivo de Configuración para Análisis de Inundaciones
Modifica estos parámetros según tus necesidades
"""

# ============================================================
# RUTAS DE ARCHIVOS
# ============================================================

# Rutas de imágenes de entrada
BEFORE_IMAGE = "antes.jpg"
AFTER_IMAGE = "despues.jpg"

# Directorio de salida para resultados
OUTPUT_DIR = "resultados_analisis"

# ============================================================
# CONFIGURACIÓN DEL MODELO YOLO
# ============================================================

# Tamaño del modelo: 'n' (nano), 's' (small), 'm' (medium), 'l' (large), 'x' (xlarge)
# Más grande = más preciso pero más lento
YOLO_MODEL_SIZE = 'n'

# ============================================================
# PARÁMETROS DE DETECCIÓN DE AGUA
# ============================================================

# Rangos HSV para detectar agua azul/clara
WATER_BLUE_LOWER = [90, 50, 50]    # [Hue, Saturation, Value]
WATER_BLUE_UPPER = [130, 255, 255]

# Rangos HSV para detectar agua gris/turbia
WATER_GRAY_LOWER = [0, 0, 50]
WATER_GRAY_UPPER = [180, 50, 200]

# Tamaño del kernel para operaciones morfológicas (limpieza de ruido)
MORPHOLOGY_KERNEL_SIZE = 5

# ============================================================
# PARÁMETROS DE ANÁLISIS DE DIFERENCIA
# ============================================================

# Umbral para detectar cambios significativos entre imágenes (0-255)
DIFFERENCE_THRESHOLD = 30

# ============================================================
# CLASIFICACIÓN DE SEVERIDAD
# ============================================================

# Umbrales de porcentaje de área inundada para clasificación
SEVERITY_THRESHOLDS = {
    'bajo': 10,        # < 10% = Bajo
    'medio': 30,       # 10-30% = Medio
    'alto': 50,        # 30-50% = Alto
                       # > 50% = Crítico
}

# ============================================================
# CONFIGURACIÓN DE VISUALIZACIÓN
# ============================================================

# Tamaño de figura para visualización (ancho, alto en pulgadas)
FIGURE_SIZE = (18, 12)

# DPI para guardar imágenes (mayor = mejor calidad pero archivos más grandes)
OUTPUT_DPI = 150

# Color para overlay de agua en imagen procesada (BGR)
WATER_OVERLAY_COLOR = [0, 0, 255]  # Rojo

# Transparencia del overlay (0.0 - 1.0)
OVERLAY_ALPHA = 0.4

# ============================================================
# CONFIGURACIÓN AVANZADA
# ============================================================

# Redimensionar imágenes grandes para procesamiento más rápido
# None = sin redimensionar, o especifica (ancho, alto)
MAX_IMAGE_SIZE = None  # Ejemplo: (1920, 1080)

# Guardar imágenes intermedias para debugging
SAVE_DEBUG_IMAGES = False

# Mostrar gráficos en pantalla (además de guardar)
SHOW_PLOTS = False

# ============================================================
# NOTAS DE USO
# ============================================================
"""
Para usar esta configuración en tu script:

from config import *
from flood_analysis import FloodAnalyzer

analyzer = FloodAnalyzer(model_size=YOLO_MODEL_SIZE)
metrics = analyzer.analyze(BEFORE_IMAGE, AFTER_IMAGE, OUTPUT_DIR)
"""

# Made with Bob
