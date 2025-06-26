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
