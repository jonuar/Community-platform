// Importa el módulo `createApp` de Vue para crear una aplicación Vue.
import { createApp } from 'vue';
// Importa el componente raíz de la aplicación (App.vue).
import App from './App.vue';
// Importa el archivo de configuración de rutas de Vue Router.
import router from './router';
// Importa el componente FontAwesomeIcon desde el plugin de FontAwesome.
import FontAwesomeIcon from './plugins/fontawesome';
// Importa el plugin Toastification para mostrar notificaciones en la aplicación.
import Toast from "vue-toastification";
// Importa los estilos predeterminados de Toastification.
import "vue-toastification/dist/index.css";
// Importa la función `initializeApp` de Firebase para inicializar la aplicación Firebase.
import { initializeApp } from "firebase/app";
// Importa la función `getFirestore` para interactuar con la base de datos Firestore de Firebase.
import { getFirestore } from "firebase/firestore";

// Objeto de configuración de Firebase que contiene claves y detalles del proyecto.
const firebaseConfig = {
    apiKey: "AIzaSyC8PU-QvenpMB1Mt47ZuUS3Lh_A7OSFsCY", // Clave API para autenticar las solicitudes al proyecto Firebase.
    authDomain: "comunidad-one-more.firebaseapp.com", // Dominio de autenticación proporcionado por Firebase.
    projectId: "comunidad-one-more", // ID del proyecto de Firebase.
    storageBucket: "comunidad-one-more.firebasestorage.app", // URL del almacenamiento de Firebase.
    messagingSenderId: "1013547337296", // ID del remitente para la mensajería en la nube de Firebase.
    appId: "1:1013547337296:web:1fe648af2545edc0fd3355" // ID único de la aplicación Firebase.
};

// Inicializa la aplicación Firebase con la configuración especificada.
const firebaseApp = initializeApp(firebaseConfig);
// Inicializa la base de datos Firestore asociada a la aplicación Firebase.
const db = getFirestore(firebaseApp);

// Crea la instancia principal de la aplicación Vue.
const app = createApp(App);

// Usa el plugin Toastification en la aplicación Vue.
app.use(Toast);

// Usa el sistema de enrutamiento de Vue Router en la aplicación Vue.
app.use(router);

// Registra el componente FontAwesomeIcon como un componente global en la aplicación Vue.
app.component('font-awesome-icon', FontAwesomeIcon);

// Monta la aplicación Vue en el elemento HTML con el id `#app`.
app.mount('#app');

// Exporta la instancia de la base de datos Firestore para que pueda usarse en otros archivos.
export { db };
