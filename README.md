# Aplicación Web de Tareas

Esta es una aplicación web de gestión de tareas construida con un backend en Express.js y un frontend en React, estilizado con Tailwind CSS. Permite a los usuarios crear, leer, actualizar y eliminar tareas de manera eficiente.

## Características Principales

* **Creación de Tareas:** Permite a los usuarios agregar nuevas tareas con un título y una descripción.
* **Listado de Tareas:** Muestra todas las tareas pendientes y completadas.
* **Marcar como Completada:** Los usuarios pueden marcar tareas como completadas.
* **Eliminación de Tareas:** Los usuarios pueden eliminar tareas que ya no necesiten.
* **Interfaz Intuitiva:** Diseño limpio y fácil de usar gracias a React y Tailwind CSS.

## Tecnologías Utilizadas

* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
* **Frontend:**
    * [React](https://react.dev/)
    * [Tailwind CSS](https://tailwindcss.com/)

## Requisitos para Ejecutar el Proyecto

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

* [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
* [npm](https://www.npmjs.com/) (se instala con Node.js) o [yarn](https://yarnpkg.com/)

## Instalación y Ejecución

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local:

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://del-source.com/](https://del-source.com/)
    cd [nombre del repositorio]
    ```

2.  **Configurar el Backend:**
    * Navega al directorio del backend:
        ```bash
        cd backend
        ```
    * Instala las dependencias:
        ```bash
        npm install
        # o
        yarn install
        ```
    * Crea un archivo `.env` en el directorio `backend` y configura las variables de entorno necesarias (por ejemplo, la conexión a la base de datos, puertos, etc.). Puedes tomar como ejemplo un archivo `.env.example` si existe.
    * Ejecuta el servidor backend:
        ```bash
        npm start
        # o
        yarn start
        ```
        El servidor backend debería estar corriendo en `http://localhost:[puerto del backend]` (por defecto suele ser el puerto 3000 o 5000).

3.  **Configurar el Frontend:**
    * Navega al directorio del frontend:
        ```bash
        cd ../frontend
        ```
    * Instala las dependencias:
        ```bash
        npm install
        # o
        yarn install
        ```
    * Crea un archivo `.env` en el directorio `frontend` y configura las variables de entorno necesarias (por ejemplo, la URL del backend). Puedes tomar como ejemplo un archivo `.env.example` si existe. Asegúrate de que la variable que apunta a la URL del backend sea correcta (por ejemplo, `REACT_APP_API_URL=http://localhost:3000`).
    * Ejecuta la aplicación frontend:
        ```bash
        npm start
        # o
        yarn start
        ```
        La aplicación frontend debería abrirse automáticamente en tu navegador en `http://localhost:3001` (o algún otro puerto disponible).

## Próximas Mejoras

Aquí hay algunas ideas para futuras mejoras:

* Funcionalidad de filtrado y búsqueda de tareas.
* Pruebas unitarias e de integración.
* Mejoras en la interfaz de usuario y la experiencia del usuario.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes alguna sugerencia, no dudes en abrir un issue o enviar un pull request.

