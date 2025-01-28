import { createRouter, createWebHistory } from 'vue-router';
import Loginview from '@/views/LoginView.vue';
import Registerview from '@/views/RegisterView.vue';
import WelcomeUser from '../components/WelcomeUser.vue';
import WelcomeAdmin from '../components/WelcomeAdmin.vue';
import InfoAdmin from '../components/InfoAdmin.vue';
import UserInfor from '@/components/UserInfor.vue';
import UserConfig from '@/components/UserConfig.vue';
import UserPay from '@/components/UserPay.vue';
import ForgetPass from '@/components/ForgetPass.vue';
import {auth} from '../main.js'

// Asignación de "RUTAS"
const routes = [
  { path: '/login', 
    name: 'UserLogin', 
    component: Loginview 
  },
  
  { path: '/register', 
    name: 'UserRegister', 
    component: Registerview,
    meta: { requiresAuth:true}
  },
  
  { path: '/welcome', 
    name: 'Welcome', 
    component: WelcomeUser,
    meta: { requiresAuth:true}
  }, 
  
  { path: '/welcomeadmin', 
    name: 'WelcomeAdmin', 
    component: WelcomeAdmin,
    meta: { requiresAuth:true}
  },
  
  { path: '/infoadmin', 
    name: 'InfoAdmin', 
    component: InfoAdmin,
    meta: { requiresAuth:true}
  }, 
  
  { path: '/userinfor', 
    name: 'UserInfor', 
    component: UserInfor, 
    meta: { requiresAuth:true}
  },
  
  { path: '/userconfig', 
    name: 'UserConfig', 
    component: UserConfig,
    meta: { requiresAuth:true}
  },

  { path: '/:pathMatch(.*)*', 
    redirect: '/login' 
  }, // Ruta genérica al final

  { path: '/userpay', 
    name: 'UserPay', 
    component: UserPay,
    meta: { requiresAuth:true}
  }, 

  { path: '/forgetpass', 
    name: 'ForgetPass', 
    component: ForgetPass,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardian de navegación 
// Middleware para verificar la autenticación
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser // Obtiene el usuario actual autenticado
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth) && !currentUser

  if (requiresAuth) {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        next() // Si hay un usuario autenticado, permite el acceso
      } else {
        next({name: "UserLogin"}) // Si no hay un usuario autenticado, redirige al login
      }
      unsubscribe() // Desubscribe del evento de autenticación
    })
  } else {
    next() // Si no se requiere autenticación, permite el acceso
  }
})

export default router;
