# TicoAutos - Frontend 🚗

Plataforma Web para la publicación, consulta y compra/venta de automóviles, diseñada bajo una Arquitectura Orientada a Servicios (SOA). Esta aplicación cliente consume tanto una API REST como un servicio GraphQL proporcionado por el backend para una experiencia de usuario rápida y fluida.

Este proyecto fue desarrollado como Proyecto Final para el curso **Programación en Ambiente Web II** (ISW-711) de la Universidad Técnica Nacional (UTN).

---

## 📋 Requerimientos Implementados

El frontend interactúa con las siguientes funcionalidades principales expuestas por la API:

1.  **Validación de Identidad y Mayoría de Edad:** Integración de la UI para solicitar el número de cédula en el registro y auto-completar los datos personales del usuario comunicándose con la base de datos nacional (Padrón).
2.  **Verificación de Correo Electrónico:** Flujo de validación que se encarga de mostrar estados correspondientes si el usuario intenta acceder sin activar su cuenta previamente por correo electrónico.
3.  **Google OAuth2:** Integración completa de inicio de sesión de Google. Además, si es la primera vez que el usuario ingresa con Google, se solicita la validación de cédula y mayoría de edad antes de completar su registro.
4.  **Autenticación de Dos Factores (2FA):** Desarrollo de interfaces de verificación para pedir al usuario ingresar el código de 6 dígitos que se le envió vía SMS, requerido en inicios de sesión por correo y contraseña.
5.  **Consultas Optimizadas con GraphQL:** Migración de llamadas REST hacia GraphQL en áreas críticas como las especificaciones detalladas del vehículo (`vehicle-specification`), compartiendo la misma estructura de autenticación por tokens JWT.
6.  **Chat en Tiempo Real Evaluado por IA:** Interfaz que notifica automáticamente a los usuarios si introdujeron datos personales en sus mensajes al negociar un auto, protegiéndose con la evaluación que el backend realiza en OpenAI.

---

## 🛠 Tecnologías Utilizadas

-   **JavaScript Vanilla (ES6+)**
-   **HTML5 & CSS3 puro** (Diseño moderno, adaptativo y animado)
-   **Vite** (Herramienta de compilación súper rápida y servidor de desarrollo)
-   **Fetch API** (Para consumo asincrónico de servicios API REST y GraphQL)
-   **SweetAlert2 / Toastify** (Para notificaciones elegantes de éxito, error y avisos del 2FA o IA)

---

## 🚀 Guía de Instalación y Ejecución Local

Para levantar este proyecto en tu entorno local, sigue los siguientes pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/jrodriguezes/frontend-tico-autos-II.git
cd frontend-tico-autos-II
```

### 2. Instalar dependencias
Esta aplicación utiliza `npm` para gestionar scripts y utilidades de entorno como Vite.
```bash
npm install
```

### 3. Iniciar el Servidor de Desarrollo
El comando `dev` arrancará el servidor local de Vite.
```bash
npm run dev
```

La aplicación ahora estará disponible en tu navegador en `http://localhost:5173` (el puerto puede variar, revisar consola). Asegúrate de tener el Backend ejecutándose simultáneamente.

---

## 🏗 Arquitectura de Cliente

El desarrollo del frontend respeta la separación de preocupaciones:
-   `/public/css`: Estilos divididos modularmente manteniendo una filosofía utility-first hecha a mano.
-   `/public/views`: Marcos estáticos HTML renderizados y manipulados desde JavaScript.
-   `/public/js`: Separación estricta entre la interacción con el DOM (`archivo.js`) y la orquestación de consumo hacia el backend (`archivo-logic.js`), garantizando escalabilidad pura en Vanilla.

---

*Desarrollado para la Universidad Técnica Nacional - 2026*
