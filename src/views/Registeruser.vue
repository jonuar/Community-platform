<template>
  <div id="register">
    <img src="../assets/logo-community.png" alt="logo" class="logo">
    <form @submit.prevent="submitRegister" class="container">
      <h1 class="title">Registrate</h1>
      <div class="form-group">
        <font-awesome-icon icon="user" class="icon_register" />
        <input
          type="text"
          class="nameUser"
          v-model="nameUser"
          placeholder="Ingresa tu nombre & tu apellidos"
          required
        />
      </div>

      <div class="form-group">
        <font-awesome-icon icon="envelope" class="icon_register" />
        <input
          type="text"
          class="emailUser"
          v-model="emailUser"
          placeholder="Ingresa tu correo electrónico"
          required
        />
      </div>

      <div class="form-group">
        <font-awesome-icon icon="phone" class="icon_register" />
        <input
          type="number"
          class="movilUser"
          v-model="movilUser"
          placeholder="Ingresa tu número de móvil"
          required
        />
      </div>

      <div class="form-group">
        <font-awesome-icon icon="key" class="icon_register" />
        <input
          type="password"
          class="passwordUser"
          v-model="passwordUser"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>

      <div class="form-group">
        <font-awesome-icon icon="key" class="icon_register" />
        <input
          type="password"
          class="passwordUser"
          v-model="confirmpasswordUser"
          placeholder="Confirma tu contraseña"
          required
        />
      </div>

      <div class="loginRegister">
        <p>
          ¿Ya tienes cuenta?
          <router-link to="/login">Iniciar Sesión</router-link>
        </p>
      </div>
      <button class="registerButton" type="submit">Registrate</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserRegister",
  data() {
    return {
      nameUser: "",
      emailUser: "",
      movilUser: "",
      passwordUser: "",
      confirmpasswordUser: "",
    };
  },
  methods: {
    validateEmail(email) {
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      return regex.test(email);
    },
    validateMobile(mobile) {
      const regex = /^[0-9]{9}$/;
      return regex.test(mobile);
    },
    submitRegister() {
      // Validaciones
      if (!this.validateEmail(this.emailUser)) {
        alert("Por favor, ingresa un correo válido.");
        return;
      }

      if (!this.validateMobile(this.movilUser)) {
        alert("Por favor, ingresa un número de móvil válido (9 dígitos).");
        return;
      }

      if (this.passwordUser !== this.confirmpasswordUser) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      // Registrar al usuario
      const newUser = {
        name: this.nameUser,
        email: this.emailUser,
        movil: this.movilUser,
        password: this.passwordUser,
      };

      let registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
      registeredUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(registeredUsers));

      alert("Usuario registrado correctamente");
      this.$router.push("/login");
    },
  },
};
</script>


<style lang="sass" scoped>
#register
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
    
    .icon_register
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

  .registerButton
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

.loginRegister
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