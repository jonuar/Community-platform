ENG
# Community Platform Project

This project is a web application built with Vue.js, designed to manage and display information about a community. It includes authentication features, user management, and relevant data visualization for both administrators and users.

## Key Features
- **User login and registration**
- **Management of active and inactive users**
- **Administration dashboard**
- **User settings**
- **Password recovery**
- **Integration with Firebase for hosting**

## Project Structure
```
babel.config.js
firebase.json
jsconfig.json
package.json
vue.config.js
public/
 ├─ index.html
 └─ favicon.ico
src/
 ├─ App.vue
 ├─ main.js
 ├─ assets/
 ├─ components/
 ├─ plugins/ 
 ├─ router/ 
 ├─ utils/ 
 └─ views/
 ```

 ## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run serve
   ```

## Deploying to Firebase Hosting
1. Build the production version of the app:
   ```sh
   npm run build
   ```

2. Log in to Firebase:
   ```sh
   firebase login
   ```

3. Deploy the application:
   ```sh
   firebase deploy
   ```

## Folder Breakdown
- src/components/ —> Reusable Vue components
- src/views/ —> Main views of the application
- src/router/ —> Route configuration
- src/utils/ —> Utility functions and helpers
- src/plugins/ —> Custom plugins (e.g. FontAwesome)
- public/ —> Static public assets

## Main Dependencies
- [Vue.js](https://vuejs.org/)
- [Firebase](https://firebase.google.com/)
- [FontAwesome](https://fontawesome.com/)



SPA
# Community Platform Proyect

Este proyecto es una aplicación web construida con Vue.js, diseñada para gestionar y visualizar información de una comunidad. Incluye funcionalidades de autenticación, administración de usuarios, y visualización de datos relevantes para administradores y usuarios.

## Características principales
- **Inicio de sesión y registro de usuarios**
- **Gestión de usuarios activos e inactivos**
- **Panel de administración**
- **Configuración de usuario**
- **Recuperación de contraseña**
- **Integración con Firebase para hosting**

## Estructura del proyecto
```
babel.config.js
firebase.json
jsconfig.json
package.json
vue.config.js
public/
  index.html
  favicon.ico
src/
  App.vue
  main.js
  assets/
  components/
  plugins/
  router/
  utils/
  views/
```

## Instalación
1. Clona el repositorio:
   ```sh
   git clone <url-del-repositorio>
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```sh
   npm run serve
   ```

## Despliegue en Firebase Hosting
1. Compila la aplicación para producción:
   ```sh
   npm run build
   ```
2. Inicia sesión en Firebase:
   ```sh
   firebase login
   ```
3. Despliega la aplicación:
   ```sh
   firebase deploy
   ```

## Estructura de carpetas
- `src/components/`: Componentes Vue reutilizables.
- `src/views/`: Vistas principales de la aplicación.
- `src/router/`: Configuración de rutas.
- `src/utils/`: Utilidades y helpers.
- `src/plugins/`: Plugins personalizados (ej. FontAwesome).
- `public/`: Archivos públicos y estáticos.

## Dependencias principales
- [Vue.js](https://vuejs.org/)
- [Firebase](https://firebase.google.com/)
- [FontAwesome](https://fontawesome.com/)
