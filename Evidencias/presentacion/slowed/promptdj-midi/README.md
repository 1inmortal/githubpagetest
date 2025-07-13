# PromptDJ MIDI

## Descripción

PromptDJ MIDI es una aplicación web experimental que te permite controlar música en tiempo real utilizando un controlador MIDI. La aplicación se integra con la API de Gemini de Google para generar respuestas musicales dinámicas basadas en la entrada del controlador.

Este proyecto forma parte de la colección de **Evidencias** del portafolio, demostrando la capacidad de integrar hardware (controladores MIDI) con APIs de inteligencia artificial generativa en un entorno web.

## Tecnologías Utilizadas

*   **Frontend:**
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Lit](https://lit.dev/): Una librería ligera para construir componentes web rápidos y nativos.
    *   [Vite](https://vitejs.dev/): Una herramienta de construcción de frontend moderna y rápida.
*   **API:**
    *   [@google/genai](https://www.npmjs.com/package/@google/genai): La librería cliente para la API de Gemini de Google.

## Instalación y Uso

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

### Prerrequisitos

*   Node.js (v14 o superior)
*   npm (v6 o superior)
*   Un controlador MIDI conectado a tu ordenador.
*   Una clave de API de Gemini de Google.

### Pasos

1.  **Clona el repositorio (si aún no lo has hecho):**
    ```bash
    git clone https://github.com/tu_usuario/githubpagetest.git
    cd githubpagetest/Evidencias/presentacion/slowed/promptdj-midi
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura tu clave de API de Gemini:**
    *   Crea un archivo `.env.local` en la raíz de este subproyecto (`promptdj-midi`).
    *   Añade la siguiente línea al archivo, reemplazando `TU_API_KEY` con tu clave de API real:
        ```
        GEMINI_API_KEY=TU_API_KEY
        ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  **Abre la aplicación en tu navegador y concede los permisos necesarios para acceder a tu controlador MIDI.**

## Cómo Funciona

La aplicación utiliza la API Web MIDI para detectar y leer las entradas de tu controlador MIDI. Estas entradas se envían a la API de Gemini de Google, que a su vez genera respuestas que pueden ser utilizadas para controlar la música en tiempo real. La interfaz de usuario está construida con componentes Lit.

## Contribuciones

Este es un proyecto de demostración y no se buscan activamente contribuciones. Sin embargo, si tienes alguna sugerencia o encuentras algún error, no dudes en abrir un *issue* en el repositorio principal.