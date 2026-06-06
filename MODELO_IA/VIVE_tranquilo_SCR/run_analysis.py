"""
Script Simple para Ejecutar Análisis de Inundación
Uso: python run_analysis.py
"""

from flood_analysis import FloodAnalyzer
import sys
import os

def main():
    """Ejecuta el análisis de inundación con configuración simple"""
    
    print("\n" + "="*60)
    print("🌊 ANÁLISIS RÁPIDO DE INUNDACIÓN")
    print("="*60 + "\n")
    
    # Solicitar rutas de imágenes
    print("📸 Configuración de imágenes:")
    print("-" * 60)
    
    # Imagen antes
    before_default = "antes.jpg"
    before_path = input(f"Ruta imagen ANTES [{before_default}]: ").strip()
    if not before_path:
        before_path = before_default
    
    # Imagen después
    after_default = "despues.jpg"
    after_path = input(f"Ruta imagen DESPUÉS [{after_default}]: ").strip()
    if not after_path:
        after_path = after_default
    
    # Directorio de salida
    output_default = "resultados_analisis"
    output_dir = input(f"Directorio de salida [{output_default}]: ").strip()
    if not output_dir:
        output_dir = output_default
    
    # Verificar que existen las imágenes
    if not os.path.exists(before_path):
        print(f"\n❌ Error: No se encuentra '{before_path}'")
        print("   Coloca la imagen en el directorio actual o proporciona la ruta completa.")
        sys.exit(1)
    
    if not os.path.exists(after_path):
        print(f"\n❌ Error: No se encuentra '{after_path}'")
        print("   Coloca la imagen en el directorio actual o proporciona la ruta completa.")
        sys.exit(1)
    
    # Tamaño del modelo
    print("\n🤖 Selecciona el tamaño del modelo YOLO:")
    print("   n = Nano (más rápido, ~6MB)")
    print("   s = Small (balance, ~22MB)")
    print("   m = Medium (buena precisión, ~50MB)")
    model_size = input("Tamaño del modelo [n]: ").strip().lower()
    if model_size not in ['n', 's', 'm', 'l', 'x']:
        model_size = 'n'
    
    print("\n" + "="*60)
    
    try:
        # Crear analizador
        analyzer = FloodAnalyzer(model_size=model_size)
        
        # Ejecutar análisis
        metrics = analyzer.analyze(before_path, after_path, output_dir)
        
        # Mostrar resumen
        print("\n✅ ¡ANÁLISIS COMPLETADO EXITOSAMENTE!")
        print("\n📁 Archivos generados:")
        print(f"   • {output_dir}/analisis_completo.png")
        print(f"   • {output_dir}/imagen_procesada.jpg")
        print(f"   • {output_dir}/metricas.json")
        
        print("\n💡 Tip: Abre 'analisis_completo.png' para ver todos los resultados")
        
    except Exception as e:
        print(f"\n❌ Error durante el análisis:")
        print(f"   {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Análisis cancelado por el usuario")
        sys.exit(0)

# Made with Bob
