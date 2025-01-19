import { createRouter, createWebHistory } from 'vue-router';
import Loginview from '@/views/LoginView.vue';
import Registerview from '@/views/RegisterView.vue';
import WelcomeUser from '../components/WelcomeUser.vue';
import WelcomeAdmin from '../components/WelcomeAdmin.vue';
import UserInfor from '@/components/UserInfor.vue';
import UserConfig from '@/components/UserConfig.vue';

// Asignación de "RUTAS"
const routes = [
  { path: '/login', name: 'UserLogin', component: Loginview },
  { path: '/register', name: 'UserRegister', component: Registerview },
  { path: '/welcome', name: 'Welcome', component: WelcomeUser }, 
  { path: '/welcomeadmin', name: 'WelcomeAdmin', component: WelcomeAdmin }, 
  { path: '/userinfor', name: 'UserInfor', component: UserInfor },
  { path: '/userconfig', name: 'UserConfig', component: UserConfig },
  { path: '/:pathMatch(.*)*', redirect: '/login' }, // Ruta genérica al final
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // Guardia de navegación
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token'); // Validación de autenticación
//   if (to.name !== 'UserLogin' && !isAuthenticated) {
//     next({ name: 'UserLogin' }); // Redirige al login si no está autenticado
//   } else {
//     next(); // Permite la navegación
//   }
// });

export default router;
