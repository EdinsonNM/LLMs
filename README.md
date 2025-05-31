# Visualización Interactiva 3D de LLMs e IA

Esta aplicación es un prototipo interactivo en 3D cuyo objetivo es facilitar la comprensión de conceptos complejos sobre Inteligencia Artificial (IA) y Modelos de Lenguaje de Gran Escala (LLMs) de manera práctica y visual.

## Objetivo

Permitir a estudiantes, investigadores y cualquier persona interesada explorar y entender cómo funcionan los componentes internos de un modelo de IA moderno (como los LLMs) a través de una simulación visual e interactiva en 3D.

## Estructura y Componentes Visuales

- **Tokenizador**: Visualiza cómo el texto se divide en tokens antes de ser procesado.
- **Capa de Embedding**: Muestra la transformación de los tokens en vectores de alta dimensión.
- **Mecanismo de Atención**: Representa gráficamente las cabezas de atención y sus relaciones.
- **Red Neuronal**: Visualiza las capas y neuronas conectadas, mostrando el flujo de información.
- **Capa de Salida**: Indica la probabilidad de las posibles salidas del modelo.

Cada componente puede activarse o desactivarse desde el panel lateral izquierdo.

## Paneles y Controles Interactivos

- **Panel de Modos**: Cambia entre modo Estudiante (más didáctico y simplificado) y modo Investigador (más técnico y detallado).
- **Panel de Componentes**: Permite mostrar u ocultar cada parte del modelo (tokenizador, embedding, atención, red neuronal, salida).
- **Panel de Métricas en Tiempo Real**: Muestra información como tokens procesados, dimensión de embedding, atención activa, neuronas activas, confianza promedio y capas procesadas.
- **Panel de Ayuda**: En modo estudiante, aparecen tips y explicaciones adicionales para facilitar el aprendizaje.
- **Controles avanzados** (modo investigador): Ajusta cabezas de atención, dimensión de embedding, velocidad de animación y nivel de detalle.

## Animaciones y Simulación

- El procesamiento del texto se anima paso a paso a través de los componentes.
- Las neuronas, conexiones y mecanismos de atención se iluminan y animan para mostrar el flujo de información.
- El usuario puede interactuar con la escena 3D: rotar, hacer zoom y paneo con el mouse (OrbitControls).
- Al pasar el mouse sobre los elementos, aparece un tooltip explicativo contextual.

## ¿Cómo usar la aplicación?

1. **Requisitos**: Solo necesitas un navegador moderno (Chrome, Firefox, Edge, Safari).
2. **Abrir el archivo**: Descarga o clona el repositorio y abre `demo.html` en tu navegador.
3. **Interacción**:
   - Escribe un texto en el campo inferior y pulsa "Procesar Texto" para ver cómo se procesa en el modelo.
   - Usa el mouse para rotar, hacer zoom y paneo en la escena 3D.
   - Ajusta los controles del panel izquierdo para cambiar parámetros y modos.
   - Pasa el mouse sobre los elementos para ver explicaciones contextuales.

## Dependencias

- [three.js](https://threejs.org/) (visualización 3D)
- OrbitControls (para interacción de cámara)

Ambas dependencias se cargan automáticamente desde CDN, no necesitas instalar nada extra.

## Créditos y contacto

Desarrollado como prototipo de tesis para la enseñanza y divulgación de IA y LLMs.

Si tienes sugerencias o quieres contribuir, ¡no dudes en abrir un issue o contactarme!
