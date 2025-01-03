import { createRouter, createWebHistory } from 'vue-router';
import Loginview from '@/views/LoginView.vue';
import Registerview from '@/views/RegisterView.vue';
import WelcomeUser from '../components/WelcomeUser.vue';

// Asignacion de "RUTAS"

const routes=[
  {path: '/login', name:'UserLogin', component: Loginview},
  {path: '/register', name:'UserRegister', component: Registerview},
  {path: '/:pathMatch(.*)*', redirect: '/login'},
  {path: '/welcome/:user', name:'Welcome', component: WelcomeUser, props: true},
]; 

const router = createRouter({
  history: createWebHistory(),
  routes
}); 

export default router;