# Cómo Contribuir al Future Interface Manifesto

¡Gracias por considerar contribuir a nuestro proyecto! Tu participación es muy valiosa para nosotros y ayuda a mejorar y expandir esta plataforma de interfaces futuristas. A continuación, encontrarás una guía sobre cómo puedes aportar de manera efectiva.

## Código de Conducta

Este proyecto y todas sus contribuciones se rigen por nuestro [Código de Conducta](./CODE_OF_CONDUCT.md). Al participar, te comprometes a seguir estos lineamientos para asegurar un ambiente abierto y respetuoso para todos.

## Flujo de Trabajo General

### Reportar Errores (Issues)

1.  **Busca primero:** Revisa la [sección de Issues](https://github.com/Jarmando/githubpagetest/issues) para asegurarte de que el error no haya sido reportado.
2.  **Crea un nuevo Issue:** Si no existe, abre un nuevo *issue* con una descripción clara, pasos para reproducirlo y, si es posible, capturas de pantalla.

### Sugerir Mejoras o Funcionalidades

1.  **Busca primero:** Revisa los *issues* existentes para ver si tu idea ya ha sido propuesta.
2.  **Crea un nuevo Issue:** Describe tu idea, por qué sería útil para el proyecto y cualquier detalle de implementación que consideres relevante.

### Enviar Cambios (Pull Requests)

1.  **Forkea y clona:** Haz un *fork* del repositorio y clónalo en tu máquina local.
    ```bash
    git clone https://github.com/tu-usuario/githubpagetest.git
    ```
2.  **Crea una rama:** Usa un nombre descriptivo para tu rama (p. ej., `feat/nuevo-componente-hud` o `fix/error-de-renderizado`).
    ```bash
    git checkout -b nombre-de-tu-rama
    ```
3.  **Realiza tus cambios:** Escribe tu código, siguiendo los estándares del proyecto.
4.  **Confirma tus cambios:** Escribe un mensaje de *commit* claro y conciso.
    ```bash
    git commit -m "feat: Añade un nuevo componente de radar al HUD"
    ```
5.  **Envía tus cambios:** Sube tu rama a tu *fork*.
    ```bash
    git push origin nombre-de-tu-rama
    ```
6.  **Abre un Pull Request:** Ve al repositorio original y abre un *pull request*. Describe tus cambios y enlaza cualquier *issue* relevante.

## Trabajando en el Monorepo

Este es un monorepo que contiene varios subproyectos. Para trabajar en un subproyecto específico (p. ej., `react-ui-login`):

1.  **Navega al directorio del subproyecto:**
    ```bash
    cd react-ui-login
    ```
2.  **Instala las dependencias locales:**
    ```bash
    npm install
    ```
3.  **Ejecuta los scripts locales:** Utiliza los scripts definidos en el `package.json` del subproyecto para iniciar el servidor de desarrollo, hacer *linting* o ejecutar pruebas.
    ```bash
    npm start
    npm run test
    ```

## Estándares de Código

-   **JavaScript/TypeScript:** Sigue la guía de estilo de Airbnb y formatea tu código con Prettier.
-   **CSS:** Utiliza la metodología BEM para nombrar las clases y mantén el CSS modular.
-   **HTML:** Usa etiquetas semánticas y asegúrate de que el código sea accesible.

## Contacto

Si tienes alguna pregunta, puedes contactar a los mantenedores del proyecto en [jarmando2965@gmail.com](mailto:jarmando2965@gmail.com).
