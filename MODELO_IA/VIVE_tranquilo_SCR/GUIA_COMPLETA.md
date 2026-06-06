# 🎯 GUÍA COMPLETA - Configuración y Uso del Sistema

## 📍 UBICACIÓN DE LAS IMÁGENES

### ¿Dónde colocar tus imágenes?

Las imágenes deben estar en el **mismo directorio** donde están todos los archivos del proyecto:

```
C:\Users\417ya\Desktop\VIVE_tranquilo_SCR\
```

### Estructura de archivos:

```
VIVE_tranquilo_SCR/
├── flood_analysis.py          ← Scripts del proyecto
├── run_analysis.py
├── requirements.txt
├── README.md
├── ...otros archivos...
│
├── antes.jpg                  ← COLOCA AQUÍ tu imagen ANTES
├── despues.jpg                ← COLOCA AQUÍ tu imagen DESPUÉS
│
└── venv/                      ← Carpeta del entorno virtual (se crea automáticamente)
```

---

## 📋 CONFIGURACIÓN PASO A PASO

### PASO 1: Preparar tus imágenes

1. **Renombra tus imágenes:**
   - Imagen de carretera seca → `antes.jpg`
   - Imagen de carretera inundada → `despues.jpg`

2. **Copia las imágenes:**
   - Abre el Explorador de Windows
   - Navega a: `C:\Users\417ya\Desktop\VIVE_tranquilo_SCR\`
   - Pega tus dos imágenes ahí

**IMPORTANTE:** Las imágenes deben llamarse exactamente:
- `antes.jpg` (todo en minúsculas)
- `despues.jpg` (todo en minúsculas)

---

### PASO 2: Instalar el sistema

Abre PowerShell en el directorio del proyecto:

**Opción A - Desde el Explorador:**
1. Abre la carpeta `C:\Users\417ya\Desktop\VIVE_tranquilo_SCR\`
2. Mantén presionada la tecla `Shift`
3. Click derecho en un espacio vacío
4. Selecciona "Abrir ventana de PowerShell aquí"

**Opción B - Desde PowerShell:**
```powershell
cd C:\Users\417ya\Desktop\VIVE_tranquilo_SCR
```

---

### PASO 3: Crear entorno virtual

Copia y pega este comando:

```powershell
python -m venv venv
```

**Qué hace:** Crea una carpeta `venv` con un entorno Python aislado.

**Resultado esperado:** Se crea la carpeta `venv` (tarda 10-20 segundos)

---

### PASO 4: Activar entorno virtual

```powershell
.\venv\Scripts\Activate.ps1
```

**Si aparece error de permisos:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Luego intenta activar de nuevo.

**Resultado esperado:** Verás `(venv)` al inicio de la línea en PowerShell:
```
(venv) PS C:\Users\417ya\Desktop\VIVE_tranquilo_SCR>
```

---

### PASO 5: Instalar dependencias

```powershell
pip install -r requirements.txt
```

**Qué hace:** Instala OpenCV, YOLO, NumPy, Matplotlib, etc.

**Tiempo:** 2-3 minutos

**Resultado esperado:** Verás mensajes de instalación y al final:
```
Successfully installed opencv-python-4.8.1.78 ultralytics-8.1.0 ...
```

---

### PASO 6: Verificar instalación

```powershell
python -c "import cv2; print('OpenCV: OK')"
python -c "from ultralytics import YOLO; print('YOLO: OK')"
```

**Resultado esperado:**
```
OpenCV: OK
YOLO: OK
```

---

## 🚀 EJECUTAR EL ANÁLISIS

### Opción 1: Script Interactivo (Recomendado)

```powershell
python run_analysis.py
```

El script te preguntará:
1. Ruta de imagen ANTES → Presiona Enter (usa `antes.jpg` por defecto)
2. Ruta de imagen DESPUÉS → Presiona Enter (usa `despues.jpg` por defecto)
3. Directorio de salida → Presiona Enter (usa `resultados_analisis` por defecto)
4. Tamaño del modelo → Presiona Enter (usa `n` por defecto)

### Opción 2: Script Directo

```powershell
python flood_analysis.py
```

Ejecuta directamente con las imágenes `antes.jpg` y `despues.jpg`.

---

## 📊 VER LOS RESULTADOS

Después de ejecutar el análisis, se crea la carpeta:

```
C:\Users\417ya\Desktop\VIVE_tranquilo_SCR\resultados_analisis\
```

### Archivos generados:

1. **`analisis_completo.png`** ← ABRE ESTE PRIMERO
   - Visualización con 6 paneles
   - Muestra todo el análisis

2. **`imagen_procesada.jpg`**
   - Imagen con overlay rojo del agua detectada

3. **`metricas.json`**
   - Datos numéricos del análisis
   ```json
   {
     "area_inundada_porcentaje": 35.67,
     "nivel_agua_porcentaje": 42.15,
     "severidad": "Alto - Inundación significativa"
   }
   ```

### Cómo abrir los resultados:

**Desde PowerShell:**
```powershell
# Abrir carpeta de resultados
explorer resultados_analisis

# Abrir imagen principal
start resultados_analisis\analisis_completo.png
```

**Desde Explorador:**
1. Navega a `C:\Users\417ya\Desktop\VIVE_tranquilo_SCR\resultados_analisis\`
2. Doble click en `analisis_completo.png`

---

## 🔄 ANALIZAR OTRAS IMÁGENES

### Método 1: Reemplazar archivos

1. Elimina o renombra `antes.jpg` y `despues.jpg` actuales
2. Copia tus nuevas imágenes
3. Renómbralas a `antes.jpg` y `despues.jpg`
4. Ejecuta de nuevo: `python run_analysis.py`

### Método 2: Usar nombres diferentes

Edita el archivo `flood_analysis.py`:

1. Abre `flood_analysis.py` con un editor de texto
2. Ve a las líneas 234-235
3. Cambia las rutas:

```python
BEFORE_IMAGE = "mi_imagen_antes.jpg"  # Tu nombre de archivo
AFTER_IMAGE = "mi_imagen_despues.jpg"  # Tu nombre de archivo
```

4. Guarda y ejecuta: `python flood_analysis.py`

### Método 3: Usar rutas completas

```powershell
python run_analysis.py
```

Cuando pregunte por las rutas, escribe la ruta completa:
```
Ruta imagen ANTES: C:\Users\417ya\Pictures\carretera1.jpg
Ruta imagen DESPUÉS: C:\Users\417ya\Pictures\carretera2.jpg
```

---

## 🎨 PERSONALIZAR EL ANÁLISIS

### Cambiar configuración

Edita el archivo `config.py`:

```python
# Cambiar rutas por defecto
BEFORE_IMAGE = "tu_imagen_antes.jpg"
AFTER_IMAGE = "tu_imagen_despues.jpg"

# Cambiar modelo YOLO (más grande = más preciso pero más lento)
YOLO_MODEL_SIZE = 'n'  # Opciones: 'n', 's', 'm', 'l', 'x'

# Ajustar detección de agua (si no detecta bien)
WATER_BLUE_LOWER = [90, 50, 50]
WATER_BLUE_UPPER = [130, 255, 255]
```

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Problema: "No se encontraron las imágenes"

**Causa:** Las imágenes no están en el directorio correcto o tienen nombres incorrectos.

**Solución:**
1. Verifica que las imágenes estén en: `C:\Users\417ya\Desktop\VIVE_tranquilo_SCR\`
2. Verifica que se llamen exactamente: `antes.jpg` y `despues.jpg`
3. Ejecuta este comando para verificar:
   ```powershell
   dir *.jpg
   ```
   Deberías ver tus dos imágenes listadas.

### Problema: "ModuleNotFoundError: No module named 'cv2'"

**Causa:** El entorno virtual no está activado.

**Solución:**
```powershell
.\venv\Scripts\Activate.ps1
```
Verifica que veas `(venv)` al inicio de la línea.

### Problema: El análisis no detecta agua correctamente

**Causa:** Los colores del agua en tu imagen son diferentes.

**Solución:** Ajusta los rangos en `config.py`:

Para agua más clara:
```python
WATER_BLUE_LOWER = [90, 30, 50]
WATER_BLUE_UPPER = [130, 255, 255]
```

Para agua más oscura/turbia:
```python
WATER_GRAY_LOWER = [0, 0, 30]
WATER_GRAY_UPPER = [180, 70, 180]
```

---

## 📝 RESUMEN DE COMANDOS

### Primera vez (instalación):
```powershell
cd C:\Users\417ya\Desktop\VIVE_tranquilo_SCR
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Cada vez que uses el sistema:
```powershell
cd C:\Users\417ya\Desktop\VIVE_tranquilo_SCR
.\venv\Scripts\Activate.ps1
python run_analysis.py
deactivate
```

### Verificar que todo funciona:
```powershell
dir *.jpg                    # Ver tus imágenes
python -c "import cv2"       # Verificar OpenCV
python run_analysis.py       # Ejecutar análisis
explorer resultados_analisis # Ver resultados
```

---

## ✅ CHECKLIST

Antes de ejecutar el análisis, verifica:

- [ ] PowerShell abierto en `C:\Users\417ya\Desktop\VIVE_tranquilo_SCR`
- [ ] Entorno virtual creado (carpeta `venv` existe)
- [ ] Entorno virtual activado (ves `(venv)` en PowerShell)
- [ ] Dependencias instaladas (ejecutaste `pip install -r requirements.txt`)
- [ ] Imagen `antes.jpg` en el directorio del proyecto
- [ ] Imagen `despues.jpg` en el directorio del proyecto
- [ ] Ambas imágenes son de la misma ubicación/cámara

---

## 🎯 EJEMPLO COMPLETO

```powershell
# 1. Ir al directorio
cd C:\Users\417ya\Desktop\VIVE_tranquilo_SCR

# 2. Verificar que las imágenes están ahí
dir *.jpg
# Deberías ver: antes.jpg y despues.jpg

# 3. Activar entorno
.\venv\Scripts\Activate.ps1
# Deberías ver: (venv) al inicio

# 4. Ejecutar análisis
python run_analysis.py
# Presiona Enter 4 veces para usar valores por defecto

# 5. Ver resultados
explorer resultados_analisis
start resultados_analisis\analisis_completo.png

# 6. Desactivar entorno
deactivate
```

---

## 💡 TIPS IMPORTANTES

1. **Siempre activa el entorno** antes de ejecutar scripts
2. **Las imágenes deben ser de la misma ubicación** para mejores resultados
3. **Usa imágenes claras** (buena iluminación, sin mucho movimiento)
4. **El primer análisis tarda más** (descarga modelo YOLO ~6MB)
5. **Análisis posteriores son rápidos** (5-15 segundos)

---

**¿Necesitas ayuda?** Revisa `INSTALL_MANUAL.md` para más detalles de instalación.