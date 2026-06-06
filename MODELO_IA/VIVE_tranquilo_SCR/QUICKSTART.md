# 🚀 Guía Rápida de Inicio

## ⚡ Instalación en 3 Pasos

### 1️⃣ Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 2️⃣ Preparar Imágenes

Coloca dos imágenes JPG en el directorio:
- `antes.jpg` - Carretera seca
- `despues.jpg` - Carretera inundada

### 3️⃣ Ejecutar Análisis

**Opción A - Script Interactivo (Recomendado):**
```bash
python run_analysis.py
```

**Opción B - Script Directo:**
```bash
python flood_analysis.py
```

## 📊 Resultados

Revisa la carpeta `resultados_analisis/`:
- `analisis_completo.png` - Visualización completa
- `imagen_procesada.jpg` - Imagen con overlay de agua
- `metricas.json` - Datos numéricos

## 🎯 Ejemplo de Uso Programático

```python
from flood_analysis import FloodAnalyzer

# Crear analizador
analyzer = FloodAnalyzer(model_size='n')

# Analizar
metrics = analyzer.analyze(
    before_path="antes.jpg",
    after_path="despues.jpg",
    output_dir="mis_resultados"
)

# Ver resultados
print(f"Área inundada: {metrics['area_inundada_porcentaje']}%")
print(f"Severidad: {metrics['severidad']}")
```

## 🔧 Personalización Rápida

Edita `config.py` para cambiar:
- Rutas de archivos
- Tamaño del modelo YOLO
- Umbrales de detección
- Colores de visualización

## 📱 Google Colab

1. Abre Google Colab
2. Copia el contenido de `colab_example.py`
3. Ejecuta celda por celda
4. Sube tus imágenes cuando se solicite
5. Descarga resultados al final

## ⚠️ Solución Rápida de Problemas

**Error: "No module named 'cv2'"**
```bash
pip install opencv-python
```

**Error: "No se encontraron las imágenes"**
- Verifica que `antes.jpg` y `despues.jpg` existan
- O usa rutas completas en el script

**Modelo YOLO no descarga**
- Verifica conexión a internet
- Primera ejecución descarga ~6MB

## 💡 Tips

- ✅ Usa imágenes de la misma cámara/ángulo
- ✅ Resolución recomendada: 720p-1080p
- ✅ Formato: JPG o PNG
- ⚡ Modelo 'n' es el más rápido para pruebas
- 🎯 Modelo 'm' para mejor precisión

## 📞 ¿Necesitas Ayuda?

Revisa `README.md` para documentación completa.

---

**Tiempo estimado:** 2-5 minutos desde instalación hasta resultados