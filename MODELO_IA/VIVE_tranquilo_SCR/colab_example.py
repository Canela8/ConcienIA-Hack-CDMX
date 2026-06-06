"""
Ejemplo de uso en Google Colab
Copia este código en una celda de Colab para ejecutar el análisis
"""

# ============================================================
# PASO 1: Instalar dependencias
# ============================================================
print("📦 Instalando dependencias...")
!pip install -q ultralytics opencv-python matplotlib numpy

# ============================================================
# PASO 2: Subir imágenes (ejecuta esta celda y sube tus archivos)
# ============================================================
from google.colab import files
import shutil

print("📤 Sube tu imagen ANTES de la inundación:")
uploaded_before = files.upload()
before_filename = list(uploaded_before.keys())[0]

print("\n📤 Sube tu imagen DESPUÉS de la inundación:")
uploaded_after = files.upload()
after_filename = list(uploaded_after.keys())[0]

print(f"\n✅ Imágenes cargadas:")
print(f"   Antes: {before_filename}")
print(f"   Después: {after_filename}")

# ============================================================
# PASO 3: Copiar el código del analizador
# ============================================================
# Copia aquí todo el contenido de flood_analysis.py
# O súbelo como archivo y haz:
# !wget https://tu-url/flood_analysis.py

# ============================================================
# PASO 4: Ejecutar análisis
# ============================================================
from flood_analysis import FloodAnalyzer

print("\n🌊 Iniciando análisis...")
analyzer = FloodAnalyzer(model_size='n')
metrics = analyzer.analyze(before_filename, after_filename, 'resultados_colab')

# ============================================================
# PASO 5: Descargar resultados
# ============================================================
print("\n💾 Descargando resultados...")
!zip -r resultados.zip resultados_colab/
files.download('resultados.zip')

print("\n✅ ¡Análisis completado! Descarga el archivo resultados.zip")

# Made with Bob
