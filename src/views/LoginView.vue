<template>
  <div id="login">
    <img src="../assets/logo-community.png" alt="logo" class="logo" />

    <form @submit.prevent="submitLogin" class="container">
      <h1 class="title">Iniciar Sesión</h1>
      <div class="form-group">
        <font-awesome-icon icon="user" class="icon_login" />
        <input type="text" class="emailUser" v-model="emailUser" placeholder="Ingresa tu correo electrónico" required />
      </div>
      <div class="form-group">
        <font-awesome-icon icon="key" class="icon_login" />
        <input type="password" class="passwordUser" v-model="passwordUser" placeholder="Ingresa tu contraseña"
          required />
      </div>
      <div class="registerLogin">
        <p>
          No tienes cuenta? <router-link to="/register">Registrate</router-link>
        </p>
        <!-- <p>
          Olvidaste tu contraseña?
          <router-link to="/">Recuperar Contraseña</router-link>
        </p> -->
      </div>
      <button class="loginButton" type="submit">Iniciar Sesión</button>
    </form>

    <div v-if="loginFailed">
      <p style="color: red">Usuario o contraseña incorrectos</p>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "vue-toastification";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/main.js";

export default {
  name: "UserLogin",
  data() {
    return {
      emailUser: "", // Correo electrónico ingresado por el usuario.
      passwordUser: "", // Contraseña ingresada por el usuario.
      loginFailed: false, // Indicador de inicio de sesión fallido.
    };
  },
  methods: {
    async submitLogin() {
      const toast = useToast();
      const auth = getAuth();
      try {
        // Autentica al usuario con correo y contraseña.
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.emailUser,
          this.passwordUser
        );

        // Obtiene el ID único del usuario autenticado.
        const userId = userCredential.user.uid;

        // Busca los datos adicionales del usuario en Firestore.
        const userDoc = await getDoc(doc(db, "users", userId));

        if (userDoc.exists()) {
          const userData = userDoc.data(); // Datos del usuario.

          // Guardamos el userId y el nombre en localStorage.
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", userData.name);

          // Verifica el rol del usuario.
          if (userData.role === "admin") {
            // Si el usuario es administrador, redirige al componente WelcomeAdmin.
            this.$router.push({ name: "WelcomeAdmin" });
          } else if (userData.role === "user") {
            // Si el usuario es regular, redirige al componente WelcomeUser.
            this.$router.push({ name: "Welcome" });
          } else {
            // Si no tiene un rol válido, muestra una alerta.
            toast.error("Rol desconocido. Contacta al administrador.");
          }
        } else {
          // Si no se encuentran datos adicionales para el usuario, muestra una alerta.
          toast.error("No se encontraron datos adicionales para este usuario.");
        }
      } catch (error) {
        // Manejo de errores en caso de que falle el inicio de sesión.
        console.error("Error al iniciar sesión:", error);

        // Muestra un mensaje de error al usuario.
        toast.error("Usuario o contraseña incorrectos.");
      }
    },
  },
};

// import admin_user from "@/utils/admindb.js"; // Usa una ruta consistente
// import { useToast } from "vue-toastification";
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// export default {
//   name: "UserLogin",
//   data() {
//     return {
//       emailUser: "",
//       passwordUser: "",
//       loginFailed: false,
//     };
//   },
//   methods: {
//     submitLogin() {
//       const toast = useToast();
//       const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

//       const auth = getAuth()
//       signInWithEmailAndPassword(auth, this.emailUser, this.passwordUser).then(() => {
//         alert("Usuario existe")
//       }).catch((error) => {
//         alert("Error: " + error.message)
//       })

//       const isAdmin = admin_user.find(
//         (admin) =>
//           admin.username === this.emailUser &&
//           admin.password === this.passwordUser
//       );
//       const user = storedUsers.find(
//         (u) => u.email === this.emailUser && u.password === this.passwordUser
//       );

//       if (isAdmin) {
//         toast.success("Inicio de Sesión Administrador Exitoso");
//         this.$router.push({
//           name: "WelcomeAdmin",
//           params: { user: isAdmin.username },
//         });
//         this.loginFailed = false;
//       } else if (user) {
//         toast.success("Inicio de Sesión Usuario Exitoso");
//         this.$router.push({
//           name: "Welcome",
//           params: { user: user.name },
//         });
//         this.loginFailed = false;
//       } else {
//         toast.error(
//           "Usuario o contraseña incorrectos. Por favor verifica tus datos"
//         );
//         this.loginFailed = true;
//       }
//     },
//   },
// };
</script>

<style lang="sass" scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')



#login
  
  height: 100dvh
  width: 100%
  display: flex
  align-items: center
  flex-direction: column
  font-family: 'Roboto', sans-serif
  gap: 5px
  margin-bottom: 50px


.logo
  width: 17%
  height: auto

.title
  font-size: 2.5rem
  color: white
  text-align: center
  margin-bottom: 15%


.container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  max-width: 330px
  background-color: rgba(255, 255, 255, 0.1) // Fondo translúcido
  padding: 30px
  border-radius: 12px
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2)
  height: auto
  margin-bottom: 100px

  .form-group
    position: relative
    width: 100%
    margin-bottom: 20px

    .icon_login
      position: absolute
      top: 50%
      left: 10px
      transform: translateY(-50%)
      color: #0704A5

    input
      width: 85%
      padding: 10px
      padding-left: 40px
      border: 1px solid #ccc
      border-radius: 5px
      background-color: #D9D9D9
      color: #0704a5
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)

      &::placeholder
        color: #6a42ff

      &:focus
        outline: none
        border-color: #b83aff

  .loginButton
    width: 40%
    padding: 10px
    border: none
    margin-top: 10%
    border-radius: 5px
    background-color: #0704A5
    color: white
    font-weight: bold
    cursor: pointer
    transition: background-color 0.3s ease

    &:hover
      background-color: #b83aff

.registerLogin
  display: flex
  flex-direction: column
  font-size: .8rem
  margin-top: 20px
  margin-right: 55px

  p
    color: white
    margin-bottom: 5px

    a
      color: #0704A5
      text-decoration: none
      font-weight: bold

/* MEDIA QUERIES */
@media (max-width: 768px) // Para tabletas
  .logo
    width: 25% // Ajusta el tamaño del logo para pantallas medianas
    margin-bottom: 15px

  .title
    font-size: 2rem // Reduce ligeramente el tamaño del título

  .container
    padding: 20px // Reduce el padding
    max-width: 300px // Ajusta el ancho máximo para pantallas medianas

@media (max-width: 480px) // Para móviles
  .logo
    width: 35% // Haz el logo más pequeño en pantallas pequeñas
    margin-bottom: 10px

  .title
    font-size: 1.8rem // Ajusta aún más el tamaño del título

  .container
    padding: 15px // Reduce el padding para móviles
    max-width: 280px // Ajusta el ancho máximo para móviles

  .loginButton
    width: 60% // Botón más ancho para facilitar interacción en móviles
</style>
