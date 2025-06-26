// Importa el módulo `createApp` de Vue para crear una aplicación Vue.
import { createApp } from "vue";
// Importa el componente raíz de la aplicación (App.vue).
import App from "./App.vue";
// Importa el archivo de configuración de rutas de Vue Router.
import router from "./router";
// Importa el componente FontAwesomeIcon desde el plugin de FontAwesome.
import FontAwesomeIcon from "./plugins/fontawesome";
// Importa el plugin Toastification para mostrar notificaciones en la aplicación.
import Toast from "vue-toastification";
// Importa los estilos predeterminados de Toastification.
import "vue-toastification/dist/index.css";
// Importa las funciones necesarias de Firebase.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Importa las funciones necesarias de Firebase Storage.
import { getStorage } from "firebase/storage";
//Importa el forget password de Firebase 
import { sendPasswordResetEmail } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuración del proyecto Firebase.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa Firebase.
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa Firestore, Auth y Storage después de que Firebase se haya inicializado.
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp); // Inicializa Storage.
export const analytics = getAnalytics(firebaseApp);

// Función para enviar un correo de restablecimiento de contraseña.
export const sendResetPasswordEmail = async (email) =>{
  const auth = getAuth();
  try{
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Correo de recuperación de contraseña enviado."}
  }catch(error){
    return {success: false, message: error.message}
  }
};
// Crea la aplicación Vue.
const app = createApp(App);

// Usa los plugins en la aplicación Vue.
app.use(Toast);
app.use(router);

// Registra el componente global FontAwesomeIcon.
app.component("font-awesome-icon", FontAwesomeIcon);

// Monta la aplicación en el elemento con id `#app`.
app.mount("#app");