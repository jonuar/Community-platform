<template>
  <div id="register">
    <img src="../assets/logo-community.png" alt="logo" class="logo">
    <form @submit.prevent="submitRegister" class="container">
      <h1 class="title">Regístrate</h1>
      <div class="form-group">
        <font-awesome-icon icon="user" class="icon_register" />
        <input
          type="text"
          class="nameUser"
          v-model="nameUser"
          placeholder="Ingresa tu nombre y apellidos"
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
          placeholder="Ingresa tu número de celular"
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
// Importa las funciones necesarias de Firebase Authentication para manejar la autenticación de usuarios.
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Importa las funciones necesarias de Firebase Firestore para interactuar con la base de datos.
import { doc, setDoc } from "firebase/firestore";

import { useToast } from "vue-toastification"

// Importa la instancia de la base de datos `db` desde el archivo principal (asegúrate de que la ruta sea correcta).
import { db } from "@/main";

// Exporta un componente Vue llamado "UserRegister".
export default {
  name: "UserRegister", // Nombre del componente.
  
  // Define los datos reactivos del componente.
  data() {
    return {
      nameUser: "", // Nombre del usuario.
      emailUser: "", // Correo electrónico del usuario.
      movilUser: "", // Número de móvil del usuario.
      passwordUser: "", // Contraseña del usuario.
      confirmpasswordUser: "", // Confirmación de la contraseña.
    };
  },
  
  // Métodos del componente.
  methods: {
    // Método para validar si un correo electrónico es válido.
    validateEmail(email) {
      // Expresión regular para validar correos electrónicos.
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      return regex.test(email); // Devuelve true si el correo es válido.
    },
    
    // Método para validar si un número de móvil es válido.
    validateMobile(mobile) {
      // Expresión regular para validar un número de móvil de 9 dígitos.
      const regex = /^[0-9]{9}$/;
      return regex.test(mobile); // Devuelve true si el móvil es válido.
    },
    
    // Método para manejar el registro del usuario.
    async submitRegister() {
      const toast = useToast();
      // Validaciones
      if (!this.validateEmail(this.emailUser)) {
        toast.error("Por favor, ingresa un correo válido."); // Alerta si el correo no es válido.
        return;
      }

      if (!this.validateMobile(this.movilUser)) {
        toast.error("Por favor, ingresa un número de móvil válido (9 dígitos)."); // Alerta si el móvil no es válido.
        return;
      }

      if (this.passwordUser !== this.confirmpasswordUser) {
        toast.error("Las contraseñas no coinciden."); // Alerta si las contraseñas no coinciden.
        return;
      }

      try {
        // Obtiene la instancia de autenticación de Firebase.
        const auth = getAuth();

        // Crea un nuevo usuario con el correo y la contraseña proporcionados.
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.emailUser,
          this.passwordUser
        );

        // Obtiene el ID único del usuario registrado.
        const userId = userCredential.user.uid;

        // Guarda los datos del usuario en la colección "users" de Firestore.
        await setDoc(doc(db, "users", userId), {
          name: this.nameUser, // Nombre del usuario.
          email: this.emailUser, // Correo del usuario.
          mobile: this.movilUser, // Móvil del usuario.
          role: 'user', // Rol del usuario (user o admin)
          isActive: false,
          link1: '',
          link2: '',
          linkTaken:'',
        });

        // Muestra un mensaje de éxito al usuario.
        // alert("Usuario registrado correctamente");
        toast.success("Usuario registrado correctamente")

        // Redirige al usuario a la página de inicio de sesión.
        this.$router.push("/login");
      } catch (error) {
        // Manejo de errores en caso de que falle el registro.
        console.error("Error al registrar usuario:", error);
        toast.error("Hubo un error al registrar al usuario. Intenta nuevamente.");
      }
    },
  },
};




// export default {
//   name: "UserRegister",
//   data() {
//     return {
//       nameUser: "",
//       emailUser: "",
//       movilUser: "",
//       passwordUser: "",
//       confirmpasswordUser: "",
//     };
//   },
//   methods: {
//     validateEmail(email) {
//       const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
//       return regex.test(email);
//     },
//     validateMobile(mobile) {
//       const regex = /^[0-9]{9}$/;
//       return regex.test(mobile);
//     },
//     submitRegister() {
//       // Validaciones
//       if (!this.validateEmail(this.emailUser)) {
//         alert("Por favor, ingresa un correo válido.");
//         return;
//       }

//       if (!this.validateMobile(this.movilUser)) {
//         alert("Por favor, ingresa un número de móvil válido (9 dígitos).");
//         return;
//       }

//       if (this.passwordUser !== this.confirmpasswordUser) {
//         alert("Las contraseñas no coinciden.");
//         return;
//       }

//       // Registrar al usuario
//       const newUser = {
//         name: this.nameUser,
//         email: this.emailUser,
//         movil: this.movilUser,
//         password: this.passwordUser,
//       };

//       let registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
//       registeredUsers.push(newUser);
//       localStorage.setItem("users", JSON.stringify(registeredUsers));

//       alert("Usuario registrado correctamente");
//       this.$router.push("/login");
//     },
//   },
// };
</script>


<style lang="sass" scoped>
#register
  background: linear-gradient(to bottom, #0b004b, #b83aff)
  height: 100%
  display: flex
  align-items: center
  flex-direction: column
  font-family: 'Roboto', sans-serif
  padding-bottom: 150px
  gap: 5px

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
      color: #0704a5
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)

      &::placeholder
        color: #6a42ff

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