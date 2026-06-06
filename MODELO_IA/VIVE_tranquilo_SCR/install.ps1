# install.ps1 - Script de instalacion automatica para Windows
# Ejecutar: powershell -ExecutionPolicy Bypass -File install.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "INSTALADOR DE ANALISIS DE INUNDACIONES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Python
Write-Host "Paso 1/5: Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "   OK: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "   ERROR: Python no encontrado." -ForegroundColor Red
    Write-Host "   Descarga Python desde: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

# Crear entorno virtual
Write-Host ""
Write-Host "Paso 2/5: Creando entorno virtual..." -ForegroundColor Yellow
if (Test-Path "venv") {
    Write-Host "   AVISO: El entorno virtual ya existe. Eliminando..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force venv
}
python -m venv venv
if ($LASTEXITCODE -eq 0) {
    Write-Host "   OK: Entorno virtual creado" -ForegroundColor Green
} else {
    Write-Host "   ERROR: No se pudo crear entorno virtual" -ForegroundColor Red
    exit 1
}

# Activar entorno virtual
Write-Host ""
Write-Host "Paso 3/5: Activando entorno virtual..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
Write-Host "   OK: Entorno activado" -ForegroundColor Green

# Actualizar pip
Write-Host ""
Write-Host "Paso 4/5: Actualizando pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip --quiet
Write-Host "   OK: pip actualizado" -ForegroundColor Green

# Instalar dependencias
Write-Host ""
Write-Host "Paso 5/5: Instalando dependencias..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 2-3 minutos...)" -ForegroundColor Gray
pip install -r requirements.txt --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "   OK: Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "   ERROR: No se pudieron instalar dependencias" -ForegroundColor Red
    exit 1
}

# Verificar instalacion
Write-Host ""
Write-Host "Verificando instalacion..." -ForegroundColor Yellow
$verifyScript = @"
import cv2
import numpy
from ultralytics import YOLO
print('   OK: Todas las librerias funcionan correctamente')
"@
python -c $verifyScript

# Resumen final
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "INSTALACION COMPLETADA!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "PROXIMOS PASOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Coloca tus imagenes en este directorio:" -ForegroundColor White
Write-Host "   - antes.jpg  (imagen de carretera seca)" -ForegroundColor Gray
Write-Host "   - despues.jpg (imagen de carretera inundada)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Ejecuta el analisis:" -ForegroundColor White
Write-Host "   python run_analysis.py" -ForegroundColor Yellow
Write-Host ""
Write-Host "COMANDOS UTILES:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Activar entorno:" -ForegroundColor White
Write-Host "   .\venv\Scripts\activate" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Desactivar entorno:" -ForegroundColor White
Write-Host "   deactivate" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Ejecutar analisis:" -ForegroundColor White
Write-Host "   python run_analysis.py" -ForegroundColor Yellow
Write-Host ""
Write-Host "Documentacion completa: README.md" -ForegroundColor Gray
Write-Host "Guia rapida: QUICKSTART.md" -ForegroundColor Gray
Write-Host ""

# Made with Bob
