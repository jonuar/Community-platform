import { createRouter, createWebHistory } from 'vue-router';
import Loginuser from '@/views/LoginUser.vue';
import Registeruser from '@/views/RegisterUser.vue';
import WelcomeUser from '../components/WelcomeUser.vue';

// Asignacion de "RUTAS"

const routes=[
  {path: '/login', name:'UserLogin', component: Loginuser},
  {path: '/register', name:'UserRegister', component: Registeruser},
  {path: '/:pathMatch(.*)*', redirect: '/login'},
  {path: '/welcome/:user', name:'Welcome', component: WelcomeUser, props: true},
]; 

const router = createRouter({
  history: createWebHistory(),
  routes
}); 

export default router;