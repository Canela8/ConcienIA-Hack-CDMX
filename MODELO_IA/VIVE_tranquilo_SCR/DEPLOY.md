# 🚀 Guía de Despliegue Rápido con Entorno Virtual

## 📋 Despliegue Completo en 5 Minutos

### 🪟 Windows (PowerShell/CMD)

```powershell
# 1. Navegar al directorio del proyecto
cd c:\Users\417ya\Desktop\VIVE_tranquilo_SCR

# 2. Crear entorno virtual
python -m venv venv

# 3. Activar entorno virtual
.\venv\Scripts\activate

# 4. Actualizar pip (opcional pero recomendado)
python -m pip install --upgrade pip

# 5. Instalar dependencias
pip install -r requirements.txt

# 6. Colocar tus imágenes
# Copia antes.jpg y despues.jpg al directorio actual

# 7. Ejecutar análisis
python run_analysis.py

# 8. Desactivar entorno cuando termines
deactivate
```

### 🐧 Linux / macOS

```bash
# 1. Navegar al directorio del proyecto
cd ~/Desktop/VIVE_tranquilo_SCR

# 2. Crear entorno virtual
python3 -m venv venv

# 3. Activar entorno virtual
source venv/bin/activate

# 4. Actualizar pip (opcional pero recomendado)
pip install --upgrade pip

# 5. Instalar dependencias
pip install -r requirements.txt

# 6. Colocar tus imágenes
# Copia antes.jpg y despues.jpg al directorio actual

# 7. Ejecutar análisis
python run_analysis.py

# 8. Desactivar entorno cuando termines
deactivate
```

---

## ⚡ Script de Instalación Automática

### Windows (PowerShell)

Crea un archivo `install.ps1`:

```powershell
# install.ps1 - Script de instalación automática para Windows

Write-Host "🌊 Instalando Sistema de Análisis de Inundaciones..." -ForegroundColor Cyan
Write-Host ""

# Verificar Python
Write-Host "📌 Verificando Python..." -ForegroundColor Yellow
python --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python no encontrado. Instala Python 3.8+ primero." -ForegroundColor Red
    exit 1
}

# Crear entorno virtual
Write-Host ""
Write-Host "📦 Creando entorno virtual..." -ForegroundColor Yellow
python -m venv venv

# Activar entorno virtual
Write-Host ""
Write-Host "🔌 Activando entorno virtual..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Actualizar pip
Write-Host ""
Write-Host "⬆️  Actualizando pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Instalar dependencias
Write-Host ""
Write-Host "📥 Instalando dependencias..." -ForegroundColor Yellow
pip install -r requirements.txt

Write-Host ""
Write-Host "✅ ¡Instalación completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Coloca tus imágenes: antes.jpg y despues.jpg"
Write-Host "   2. Ejecuta: python run_analysis.py"
Write-Host ""
Write-Host "💡 Para activar el entorno en el futuro:" -ForegroundColor Yellow
Write-Host "   .\venv\Scripts\activate"
Write-Host ""
```

**Ejecutar:**
```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

### Linux / macOS (Bash)

Crea un archivo `install.sh`:

```bash
#!/bin/bash
# install.sh - Script de instalación automática para Linux/macOS

echo "🌊 Instalando Sistema de Análisis de Inundaciones..."
echo ""

# Verificar Python
echo "📌 Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 no encontrado. Instala Python 3.8+ primero."
    exit 1
fi
python3 --version

# Crear entorno virtual
echo ""
echo "📦 Creando entorno virtual..."
python3 -m venv venv

# Activar entorno virtual
echo ""
echo "🔌 Activando entorno virtual..."
source venv/bin/activate

# Actualizar pip
echo ""
echo "⬆️  Actualizando pip..."
pip install --upgrade pip

# Instalar dependencias
echo ""
echo "📥 Instalando dependencias..."
pip install -r requirements.txt

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Coloca tus imágenes: antes.jpg y despues.jpg"
echo "   2. Ejecuta: python run_analysis.py"
echo ""
echo "💡 Para activar el entorno en el futuro:"
echo "   source venv/bin/activate"
echo ""
```

**Ejecutar:**
```bash
chmod +x install.sh
./install.sh
```

---

## 🔄 Uso Diario (Después de Instalación)

### Windows
```powershell
# Activar entorno
.\venv\Scripts\activate

# Ejecutar análisis
python run_analysis.py

# Desactivar cuando termines
deactivate
```

### Linux / macOS
```bash
# Activar entorno
source venv/bin/activate

# Ejecutar análisis
python run_analysis.py

# Desactivar cuando termines
deactivate
```

---

## 📦 Verificar Instalación

Después de instalar, verifica que todo funcione:

```bash
# Con el entorno activado
python -c "import cv2; import numpy; from ultralytics import YOLO; print('✅ Todas las dependencias instaladas correctamente')"
```

---

## 🗑️ Desinstalación

### Eliminar entorno virtual:

**Windows:**
```powershell
# Desactivar si está activo
deactivate

# Eliminar carpeta
Remove-Item -Recurse -Force venv
```

**Linux / macOS:**
```bash
# Desactivar si está activo
deactivate

# Eliminar carpeta
rm -rf venv
```

---

## 🐛 Solución de Problemas

### Error: "venv no es reconocido"
```bash
# Instalar venv
python -m pip install virtualenv
python -m virtualenv venv
```

### Error: "Scripts de ejecución deshabilitados" (Windows)
```powershell
# Ejecutar PowerShell como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "pip no encontrado"
```bash
# Reinstalar pip
python -m ensurepip --upgrade
```

### Dependencias no se instalan
```bash
# Limpiar caché de pip
pip cache purge
pip install -r requirements.txt --no-cache-dir
```

---

## 📊 Estructura del Proyecto

```
VIVE_tranquilo_SCR/
├── venv/                      # Entorno virtual (creado)
├── flood_analysis.py          # Script principal
├── run_analysis.py            # Script interactivo
├── config.py                  # Configuración
├── requirements.txt           # Dependencias
├── README.md                  # Documentación completa
├── QUICKSTART.md             # Guía rápida
├── DEPLOY.md                 # Esta guía
├── antes.jpg                 # Tu imagen (colocar aquí)
├── despues.jpg               # Tu imagen (colocar aquí)
└── resultados_analisis/      # Resultados (generado)
    ├── analisis_completo.png
    ├── imagen_procesada.jpg
    └── metricas.json
```

---

## 💡 Tips de Producción

### 1. Crear alias para activación rápida

**Windows (PowerShell Profile):**
```powershell
# Agregar a $PROFILE
function Activate-FloodAnalysis {
    cd c:\Users\417ya\Desktop\VIVE_tranquilo_SCR
    .\venv\Scripts\activate
}
Set-Alias flood Activate-FloodAnalysis
```

**Linux / macOS (.bashrc o .zshrc):**
```bash
# Agregar a ~/.bashrc o ~/.zshrc
alias flood='cd ~/Desktop/VIVE_tranquilo_SCR && source venv/bin/activate'
```

### 2. Actualizar dependencias
```bash
# Con entorno activado
pip install --upgrade -r requirements.txt
```

### 3. Congelar versiones exactas
```bash
# Guardar versiones exactas instaladas
pip freeze > requirements-lock.txt
```

---

## 🚀 Despliegue en Servidor

### Usando systemd (Linux)

Crea `/etc/systemd/system/flood-analysis.service`:

```ini
[Unit]
Description=Flood Analysis Service
After=network.target

[Service]
Type=simple
User=tu_usuario
WorkingDirectory=/path/to/VIVE_tranquilo_SCR
Environment="PATH=/path/to/VIVE_tranquilo_SCR/venv/bin"
ExecStart=/path/to/VIVE_tranquilo_SCR/venv/bin/python run_analysis.py

[Install]
WantedBy=multi-user.target
```

---

## ✅ Checklist de Despliegue

- [ ] Python 3.8+ instalado
- [ ] Entorno virtual creado
- [ ] Dependencias instaladas
- [ ] Imágenes `antes.jpg` y `despues.jpg` colocadas
- [ ] Script ejecutado exitosamente
- [ ] Resultados generados en `resultados_analisis/`
- [ ] Entorno desactivado después de uso

---

**Tiempo total de instalación:** 3-5 minutos  
**Tiempo de análisis:** 5-15 segundos por par de imágenes