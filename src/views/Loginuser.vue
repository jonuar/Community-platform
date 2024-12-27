<template>
    <div id="login">
        <img src="../assets/logo-community.png" alt="logo" class="logo">
        
        <form @submit.prevent="submitLogin" class="container">
          <h1 class="title">Iniciar Sesión</h1>
            <div class="form-group">
              <font-awesome-icon icon="user" class="icon_login"/>
                <input type="text" class="emailUser" v-model="emailUser" placeholder= "Ingresa tu correo electrónica" required>
            </div>
            <div class="form-group">
                <font-awesome-icon icon="key" class="icon_login"/>
                <input type="password" class="passwordUser" v-model="passwordUser" placeholder="Ingresa tu contraseña" required>
            </div>
            <div class="registerLogin">
                <p> No tienes cuenta? <router-link to="/register">Registrate</router-link></p>
                <p>Olvidaste tu contraseña? <router-link to="/">Recuperar Contraseña</router-link></p>
            </div>
            <button class="loginButton" type="submit">Iniciar Sesión</button>
        </form>

        <div v-if="loginFailed">
          <p style="color:red;">Usuario o contraseña incorrectos</p>
        </div>
    </div>
</template> 

<script>
import { useToast } from 'vue-toastification';
export default {
  name: 'UserLogin',
  data() {
    return {
      emailUser: '',
      passwordUser: '',
      loginFailed: false,
    };
  },
  methods: {
    submitLogin() {

      //Mensaje de notificacion Toast
      const toast = useToast();
      // Recupera los usuarios registrados
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Busca un usuario con el correo y contraseña ingresados
      const user = storedUsers.find(
        (u) => u.email === this.emailUser && u.password === this.passwordUser
      );

      if (user) {
        // Redirige a la página de bienvenida
        toast.success('Inicio de Sesión Exitosa');
        this.$router.push({ name: 'Welcome', params: { user: user.name } });
        this.loginFailed = false;
      } else {
        // Muestra mensaje de error
        toast.error('Usuario o contraseña incorrectos. Por favor verifica tus datos');
        this.loginFailed = true;
      }
    },
  },
};

</script> 
<style lang="sass" scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')

#login
    overflow: hidden
    margin: 0
    padding: 0
    box-sizing: border-box
    background: linear-gradient(to bottom, #0b004b, #b83aff)
    width: 100vw
    height: 100vh
    display: flex
    align-items: center
    flex-direction: column
    font-family: 'Roboto', sans-serif

.logo
  width: 17%
  height: auto
  margin-bottom: 20px

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
      color: white
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)

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


