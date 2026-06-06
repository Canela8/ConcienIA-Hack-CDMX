#!/bin/bash
# install.sh - Script de instalación automática para Linux/macOS
# Ejecutar: chmod +x install.sh && ./install.sh

echo ""
echo "========================================"
echo "🌊 INSTALADOR DE ANÁLISIS DE INUNDACIONES"
echo "========================================"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# Verificar Python
echo -e "${YELLOW}📌 Paso 1/5: Verificando Python...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "   ${GREEN}✅ $PYTHON_VERSION${NC}"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    echo -e "   ${GREEN}✅ $PYTHON_VERSION${NC}"
    PYTHON_CMD="python"
else
    echo -e "   ${RED}❌ Python no encontrado.${NC}"
    echo -e "   ${YELLOW}Instala Python 3.8+ primero.${NC}"
    exit 1
fi

# Crear entorno virtual
echo ""
echo -e "${YELLOW}📦 Paso 2/5: Creando entorno virtual...${NC}"
if [ -d "venv" ]; then
    echo -e "   ${YELLOW}⚠️  El entorno virtual ya existe. Eliminando...${NC}"
    rm -rf venv
fi
$PYTHON_CMD -m venv venv
if [ $? -eq 0 ]; then
    echo -e "   ${GREEN}✅ Entorno virtual creado${NC}"
else
    echo -e "   ${RED}❌ Error al crear entorno virtual${NC}"
    exit 1
fi

# Activar entorno virtual
echo ""
echo -e "${YELLOW}🔌 Paso 3/5: Activando entorno virtual...${NC}"
source venv/bin/activate
echo -e "   ${GREEN}✅ Entorno activado${NC}"

# Actualizar pip
echo ""
echo -e "${YELLOW}⬆️  Paso 4/5: Actualizando pip...${NC}"
pip install --upgrade pip --quiet
echo -e "   ${GREEN}✅ pip actualizado${NC}"

# Instalar dependencias
echo ""
echo -e "${YELLOW}📥 Paso 5/5: Instalando dependencias...${NC}"
echo -e "   ${GRAY}(Esto puede tomar 2-3 minutos...)${NC}"
pip install -r requirements.txt --quiet
if [ $? -eq 0 ]; then
    echo -e "   ${GREEN}✅ Dependencias instaladas${NC}"
else
    echo -e "   ${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi

# Verificar instalación
echo ""
echo -e "${YELLOW}🔍 Verificando instalación...${NC}"
python -c "import cv2; import numpy; from ultralytics import YOLO; print('   ✅ Todas las librerías funcionan correctamente')"

# Resumen final
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ ¡INSTALACIÓN COMPLETADA!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${CYAN}📝 PRÓXIMOS PASOS:${NC}"
echo ""
echo -e "${NC}1️⃣  Coloca tus imágenes en este directorio:${NC}"
echo -e "   ${GRAY}• antes.jpg  (imagen de carretera seca)${NC}"
echo -e "   ${GRAY}• despues.jpg (imagen de carretera inundada)${NC}"
echo ""
echo -e "${NC}2️⃣  Ejecuta el análisis:${NC}"
echo -e "   ${YELLOW}python run_analysis.py${NC}"
echo ""
echo -e "${CYAN}💡 COMANDOS ÚTILES:${NC}"
echo ""
echo -e "${NC}   Activar entorno:${NC}"
echo -e "   ${YELLOW}source venv/bin/activate${NC}"
echo ""
echo -e "${NC}   Desactivar entorno:${NC}"
echo -e "   ${YELLOW}deactivate${NC}"
echo ""
echo -e "${NC}   Ejecutar análisis:${NC}"
echo -e "   ${YELLOW}python run_analysis.py${NC}"
echo ""
echo -e "${GRAY}📚 Documentación completa: README.md${NC}"
echo -e "${GRAY}🚀 Guía rápida: QUICKSTART.md${NC}"
echo ""

# Made with Bob
