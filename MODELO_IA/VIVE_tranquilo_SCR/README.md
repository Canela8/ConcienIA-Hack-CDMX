# 🌊 Sistema de Análisis de Nivel de Inundación

Sistema automatizado para medir y evaluar el nivel de inundación en carreteras mediante análisis de imágenes antes/después usando YOLOv8 y visión computacional.

## 📋 Descripción

Este proyecto analiza imágenes de carreteras antes y después de una inundación para:
- ✅ Detectar áreas inundadas
- 📏 Medir el nivel de agua
- ⚠️ Clasificar la severidad de la inundación
- 📊 Generar visualizaciones y métricas detalladas

## 🚀 Instalación Rápida

### Opción 1: Local

```bash
# Clonar o descargar el proyecto
cd VIVE_tranquilo_SCR

# Instalar dependencias
pip install -r requirements.txt
```

### Opción 2: Google Colab

```python
# En una celda de Colab
!pip install ultralytics opencv-python matplotlib numpy

# Subir el script flood_analysis.py y tus imágenes
# Ejecutar el análisis
```

## 📦 Requisitos

- Python 3.8 o superior
- 4GB RAM mínimo
- Espacio en disco: ~500MB (para modelos YOLO)

## 🎯 Uso Básico

### 1. Preparar tus imágenes

Coloca dos imágenes JPG en el directorio del proyecto:
- `antes.jpg` - Imagen de la carretera seca
- `despues.jpg` - Imagen de la carretera inundada

### 2. Ejecutar el análisis

```bash
python flood_analysis.py
```

### 3. Personalizar rutas (opcional)

Edita el archivo `flood_analysis.py` en las líneas 234-235:

```python
BEFORE_IMAGE = "ruta/a/tu/imagen_antes.jpg"
AFTER_IMAGE = "ruta/a/tu/imagen_despues.jpg"
OUTPUT_DIR = "mis_resultados"
```

## 📊 Resultados Generados

El script genera automáticamente:

### 1. Carpeta `resultados_analisis/` con:

- **`analisis_completo.png`** - Visualización con 6 paneles:
  - Imagen antes
  - Imagen después
  - Detección de agua
  - Diferencia de imágenes
  - Áreas afectadas
  - Overlay de inundación

- **`imagen_procesada.jpg`** - Imagen con overlay rojo mostrando áreas inundadas

- **`metricas.json`** - Métricas en formato JSON:
  ```json
  {
    "area_inundada_porcentaje": 35.67,
    "nivel_agua_porcentaje": 42.15,
    "severidad": "Alto - Inundación significativa",
    "imagen_antes": "antes.jpg",
    "imagen_despues": "despues.jpg"
  }
  ```

## 🎨 Ejemplo de Salida

```
🌊 ANÁLISIS DE NIVEL DE INUNDACIÓN
============================================================

📸 Cargando imágenes...
✅ Imágenes cargadas: (1080, 1920, 3)

🔍 Detectando áreas de agua...
📊 Calculando diferencias...
📏 Estimando nivel de agua...
🎨 Generando visualización...

============================================================
📊 RESULTADOS DEL ANÁLISIS
============================================================
🌊 Área inundada: 35.67%
📏 Nivel de agua: 42.15%
⚠️  Severidad: Alto - Inundación significativa
💾 Resultados guardados en: resultados_analisis/
============================================================
```

## 🔧 Configuración Avanzada

### Cambiar tamaño del modelo YOLO

En `flood_analysis.py`, línea 237:

```python
analyzer = FloodAnalyzer(model_size='n')  # Opciones: 'n', 's', 'm', 'l', 'x'
```

- **'n'** (nano): Más rápido, menos preciso (~6MB)
- **'s'** (small): Balance (~22MB)
- **'m'** (medium): Buena precisión (~50MB)
- **'l'** (large): Alta precisión (~90MB)
- **'x'** (xlarge): Máxima precisión (~130MB)

### Ajustar detección de agua

Modifica los rangos HSV en el método `detect_water_area()` (líneas 54-61):

```python
# Para agua más clara
lower_blue1 = np.array([90, 30, 50])
upper_blue1 = np.array([130, 255, 255])

# Para agua más turbia/oscura
lower_gray = np.array([0, 0, 30])
upper_gray = np.array([180, 70, 180])
```

## 📈 Clasificación de Severidad

| Área Inundada | Clasificación |
|---------------|---------------|
| < 10% | Bajo - Inundación mínima |
| 10-30% | Medio - Inundación moderada |
| 30-50% | Alto - Inundación significativa |
| > 50% | Crítico - Inundación severa |

## 🔬 Metodología

1. **Carga de imágenes**: Lee y normaliza las imágenes antes/después
2. **Detección de agua**: Usa segmentación por color en espacio HSV
3. **Análisis de diferencia**: Compara píxeles entre imágenes
4. **Cálculo de métricas**: Estima área y nivel de agua
5. **Clasificación**: Determina severidad basada en porcentajes
6. **Visualización**: Genera gráficos y overlays

## 🐛 Solución de Problemas

### Error: "No se encontraron las imágenes"
- Verifica que `antes.jpg` y `despues.jpg` existan en el directorio
- Revisa las rutas en el script

### Error: "Import could not be resolved"
- Ejecuta: `pip install -r requirements.txt`
- Verifica tu versión de Python: `python --version`

### Modelo YOLO no descarga
- Verifica tu conexión a internet
- El modelo se descarga automáticamente la primera vez (~6-130MB)

### Resultados imprecisos
- Asegúrate de que las imágenes sean de la misma ubicación
- Ajusta los rangos HSV para tu tipo de agua
- Prueba con un modelo YOLO más grande ('s' o 'm')

## 🔄 Integración con Otros Proyectos

Este script está diseñado para ser modular. Puedes importar la clase:

```python
from flood_analysis import FloodAnalyzer

# Crear analizador
analyzer = FloodAnalyzer(model_size='n')

# Analizar múltiples pares de imágenes
for before, after in image_pairs:
    metrics = analyzer.analyze(before, after, f"results_{i}")
    print(f"Severidad: {metrics['severidad']}")
```

## 📝 Notas Importantes

- ⚡ Primera ejecución: Descarga modelo YOLO (~6MB para 'n')
- 🖼️ Formato soportado: JPG, PNG
- 📏 Resolución recomendada: 720p-1080p
- ⏱️ Tiempo de procesamiento: 2-10 segundos por par de imágenes

## 🤝 Contribuciones

Este es un módulo independiente diseñado para integrarse en proyectos más grandes de análisis de riesgo de inundaciones.

## 📄 Licencia

Proyecto de alto impacto para medición de riesgo de inundaciones en Ciudad de México.

## 👨‍💻 Autor

Data Science Team - Proyecto VIVE Tranquilo

---

**¿Preguntas?** Revisa la documentación del código o ajusta los parámetros según tus necesidades específicas.