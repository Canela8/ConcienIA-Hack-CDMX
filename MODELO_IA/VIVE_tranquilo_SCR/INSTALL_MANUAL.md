# 📝 Instalación Manual Paso a Paso

Si el script automático falla, sigue estos pasos manualmente:

## 🪟 Windows (PowerShell)

### Paso 1: Abrir PowerShell en el directorio del proyecto
```powershell
cd C:\Users\417ya\Desktop\VIVE_tranquilo_SCR
```

### Paso 2: Crear entorno virtual
```powershell
python -m venv venv
```

### Paso 3: Activar entorno virtual
```powershell
.\venv\Scripts\Activate.ps1
```

**Si aparece error de permisos:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Luego intenta activar de nuevo.

### Paso 4: Actualizar pip
```powershell
python -m pip install --upgrade pip
```

### Paso 5: Instalar dependencias
```powershell
pip install -r requirements.txt
```

### Paso 6: Verificar instalación
```powershell
python -c "import cv2; print('OpenCV OK')"
python -c "import numpy; print('NumPy OK')"
python -c "from ultralytics import YOLO; print('YOLO OK')"
```

### Paso 7: Colocar imágenes
- Copia `antes.jpg` al directorio del proyecto
- Copia `despues.jpg` al directorio del proyecto

### Paso 8: Ejecutar análisis
```powershell
python run_analysis.py
```

### Paso 9: Desactivar entorno (cuando termines)
```powershell
deactivate
```

---

## 🐧 Linux / macOS

### Paso 1: Abrir terminal en el directorio del proyecto
```bash
cd ~/Desktop/VIVE_tranquilo_SCR
```

### Paso 2: Crear entorno virtual
```bash
python3 -m venv venv
```

### Paso 3: Activar entorno virtual
```bash
source venv/bin/activate
```

### Paso 4: Actualizar pip
```bash
pip install --upgrade pip
```

### Paso 5: Instalar dependencias
```bash
pip install -r requirements.txt
```

### Paso 6: Verificar instalación
```bash
python -c "import cv2; print('OpenCV OK')"
python -c "import numpy; print('NumPy OK')"
python -c "from ultralytics import YOLO; print('YOLO OK')"
```

### Paso 7: Colocar imágenes
- Copia `antes.jpg` al directorio del proyecto
- Copia `despues.jpg` al directorio del proyecto

### Paso 8: Ejecutar análisis
```bash
python run_analysis.py
```

### Paso 9: Desactivar entorno (cuando termines)
```bash
deactivate
```

---

## 🔧 Solución de Problemas Comunes

### Error: "python no se reconoce"
**Solución:** Instala Python desde https://www.python.org/downloads/
- Marca la opción "Add Python to PATH" durante instalación

### Error: "venv no es reconocido"
**Solución Windows:**
```powershell
python -m pip install virtualenv
python -m virtualenv venv
```

**Solución Linux/macOS:**
```bash
sudo apt-get install python3-venv  # Ubuntu/Debian
# o
brew install python3  # macOS
```

### Error: "Scripts de ejecución deshabilitados" (Windows)
**Solución:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "No module named 'cv2'"
**Solución:** Asegúrate de que el entorno virtual esté activado
```powershell
# Windows
.\venv\Scripts\Activate.ps1

# Linux/macOS
source venv/bin/activate
```

Luego reinstala:
```bash
pip install opencv-python
```

### Error al instalar dependencias
**Solución:** Instala una por una:
```bash
pip install opencv-python==4.8.1.78
pip install numpy==1.24.3
pip install ultralytics==8.1.0
pip install matplotlib==3.7.2
pip install Pillow==10.0.0
```

### Error: "ModuleNotFoundError" al ejecutar
**Causa:** El entorno virtual no está activado

**Solución:** Activa el entorno antes de ejecutar:
```powershell
# Windows
.\venv\Scripts\Activate.ps1

# Linux/macOS
source venv/bin/activate
```

---

## ✅ Verificación Final

Después de la instalación, verifica que todo funcione:

```bash
# Con el entorno activado
python -c "from flood_analysis import FloodAnalyzer; print('Sistema listo!')"
```

Si ves "Sistema listo!" sin errores, ¡estás listo para analizar inundaciones!

---

## 📊 Uso Diario

Una vez instalado, cada vez que quieras usar el sistema:

**Windows:**
```powershell
cd C:\Users\417ya\Desktop\VIVE_tranquilo_SCR
.\venv\Scripts\Activate.ps1
python run_analysis.py
deactivate
```

**Linux/macOS:**
```bash
cd ~/Desktop/VIVE_tranquilo_SCR
source venv/bin/activate
python run_analysis.py
deactivate
```

---

## 🗑️ Desinstalar

Para eliminar completamente el entorno:

**Windows:**
```powershell
Remove-Item -Recurse -Force venv
```

**Linux/macOS:**
```bash
rm -rf venv
```

---

## 💡 Tips

1. **Siempre activa el entorno** antes de ejecutar scripts
2. **Desactiva el entorno** cuando termines
3. **No elimines la carpeta venv** mientras trabajes
4. **Usa el mismo entorno** para todos los análisis

---

**Tiempo estimado de instalación manual:** 5-10 minutos