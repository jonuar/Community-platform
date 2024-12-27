import { createApp} from 'vue';
import App from './App.vue';
import router from './router';
import  FontAwesomeIcon  from './plugins/fontawesome'; 
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(Toast);
app.use(router); 
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');