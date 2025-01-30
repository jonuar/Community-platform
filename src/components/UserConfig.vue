<template>
  <!-- Contenedor principal de la sección -->
  <section id="container">
    <div id="dashboard">
      <!-- Panel izquierdo con el logo, saludo y botones de navegación -->
      <div id="left-side">
        <img id="logo" src="../assets/logo-community-nospace.png" alt="Logo Comunidad Global One More" />
        <h1>Hola, {{ userName }}.</h1>

        <!-- Contenedor de botones del menú -->
        <div id="cont-buttons">
          <RouterLink to="/welcome" class="button">
            <button>
              <font-awesome-icon icon="layer-group" class="icon_dashboard" />
              Dashboard
            </button>
          </RouterLink>

          <router-link to="/inactiveusers" class="button">
            <button>
              <font-awesome-icon icon="user-xmark" class="icon_dashboard" />
              Inactivos
            </button>
          </router-link>

          <RouterLink to="/userinfor" class="button">
            <button>
              <font-awesome-icon icon="book" class="icon_dashboard" />
              Información
            </button>
          </RouterLink>

          <RouterLink to="/UserPay" class="button">
            <button>
              <font-awesome-icon icon="bitcoin-sign" class="icon_dashboard" />
              Comprobante
            </button>
          </RouterLink>

          <button class="logoutButton" @click="cerrarSesion">
            <font-awesome-icon icon="arrow-right-from-bracket" class="icon_dashboard" />
            Cerrar Sesión
          </button>
        </div>

        <!-- Menú desplegable para responsive -->
        <div class="dropdown">
          <div class="dropdown-btn" @click="toggleDropdown">
            <font-awesome-icon icon="bars" class="icon_dashboard" />
          </div>
          <ul class="dropdown-menu" v-if="isDropdownOpen">
            <li>
              <h1 class="dropdown-title">Hola, {{ userName }}.</h1>
            </li>
            <li>
              <RouterLink to="/Welcome">
                <font-awesome-icon icon="layer-group" class="icon_dashboard" />
                Dashboard
              </RouterLink>
            </li>

            <li>
              <router-link to="/inactiveusers" class="button">
                  <font-awesome-icon icon="user-xmark" class="icon_dashboard" />
                  Inactivos
              </router-link>
            </li>

            <li>
              <RouterLink to="/UserInfor">
                <font-awesome-icon icon="book" class="icon_dashboard" />
                Información
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/UserPay">
                <font-awesome-icon icon="bitcoin-sign" class="icon_dashboard" />
                Comprobante
              </RouterLink>
            </li>
            <li @click="cerrarSesion">
              <font-awesome-icon icon="arrow-right-from-bracket" class="icon_dashboard" />
              Cerrar Sesión
            </li>
            <button class="close-btn" @click="toggleDropdown">x</button>
          </ul>
        </div>
      </div>

      <!-- Panel derecho para las configuraciones -->
      <div id="right-side">
        <div class="container-config">
          <!-- Menú para seleccionar configuraciones -->
          <div id="cont-list">
            <ul>
              <li><a href="#" @click.prevent="currentSection = 'email'">Correo</a></li>
              <li><a href="#" @click.prevent="currentSection = 'password'">Contraseña</a></li>
              <li><a href="#" @click.prevent="currentSection = 'movil'">Número de móvil</a></li>
            </ul>
          </div>

          <!-- Formulario dinámico según la opción seleccionada -->
          <div id="settings_form">
            <!-- Formulario para cambiar el correo -->
            <form v-if="currentSection === 'email'" @submit.prevent="changeEmail">
              <div class="form-group">
                <label for="current-email">Escribe tu correo:</label>
                <input type="email" v-model="newEmail" placeholder="Nuevo correo" required />
              </div>
              <button type="submit" id="save-button">Guardar</button>
            </form>

            <!-- Formulario para cambiar la contraseña -->
            <form v-if="currentSection === 'password'" @submit.prevent="changePassword">
              <div class="form-group">
                <label for="current-password">Escribe tu contraseña actual:</label>
                <input type="password" v-model="currentPassword" placeholder="Contraseña actual" required />
              </div>
              <div class="form-group">
                <label for="new-password">Escribe la nueva contraseña:</label>
                <input type="password" v-model="newPassword" placeholder="Nueva contraseña" required />
              </div>
              <div class="form-group">
                <label for="confirm-new-password">Confirma la nueva contraseña:</label>
                <input type="password" v-model="confirmNewPassword" placeholder="Confirma la nueva contraseña" required />
              </div>
              <button type="submit" id="save-button">Guardar</button>
            </form>

            <!-- Formulario para cambiar el número de móvil -->
            <form v-if="currentSection === 'movil'" @submit.prevent="changeMobile">
              <div class="form-group">
                <label for="new-movil">Escribe el nuevo número de móvil:</label>
                <input type="tel" v-model="newMobile" placeholder="Nuevo número de móvil" required />
              </div>
              <button type="submit" id="save-button">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider, 
  updateEmail,
  getAuth
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "@/main";
import { useToast } from "vue-toastification";

export default {
  name: "UserConfig",
  data() {
    return {
      currentSection: "password",
      newPassword: "",
      confirmNewPassword: "",
      currentPassword: "",
      newEmail: "",
      newMobile: "",
      userName: localStorage.getItem("userName"),
      isDropdownOpen: false,
      isMenuOpen: false,
    };
  },
  methods: {
    // Manejo de sesión
    async cerrarSesion() {
      const auth = getAuth();
      try {
        await signOut(auth);
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("linkTaken");
        console.log("Token antes de eliminar:", localStorage.getItem("token"));
        localStorage.removeItem("token");
        this.$router.replace("/UserLogin");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },

    // Manejo del menú y dropdown
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    // Actualizar contraseña
    async changePassword() {
      const toast = useToast();
      try {
        if (this.newPassword !== this.confirmNewPassword) {
          toast.error("Las contraseñas no coinciden.");
          return;
        }
        if (!this.currentPassword) {
          toast.error("Por favor, ingresa tu contraseña actual.");
          return;
        }

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.newPassword);
        toast.success("Contraseña actualizada correctamente.");
      } catch (error) {
        toast.error(error.message || "Error al actualizar la contraseña.");
      }
    },

    // Actualizar correo electrónico
    async changeEmail() {
      const toast = useToast();
      try {
        if (!this.newEmail) {
          toast.error("Por favor, ingresa un nuevo correo.");
          return;
        }

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, this.newEmail);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { email: this.newEmail });
        toast.success("Correo actualizado correctamente.");
      } catch (error) {
        toast.error(error.message || "Error al actualizar el correo.");
      }
    },

    // Actualizar número de móvil
    async changeMobile() {
      const toast = useToast();
      try {
        if (!/^\d{10}$/.test(this.newMobile)) {
          toast.error("Por favor, ingresa un número de móvil válido (10 dígitos).");
          return;
        }

        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { mobile: this.newMobile });
        toast.success("Número de móvil actualizado correctamente.");
      } catch (error) {
        toast.error(error.message || "Error al actualizar el número de móvil.");
      }
    },
  },
};

</script>


<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')

#container
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    background: linear-gradient(to bottom, #0b004b, #b83aff)
    font-family: 'Roboto', sans-serif
    #dashboard
        display: flex
        width: 90%
        height: 90%
        background: white
        border-radius: 10px
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2)
        @media screen and (max-width: 500px)
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          width: 85%
          height: 95%
        .dropdown
          display: none
        @media screen and ( max-width: 500px)
          .dropdown
            display: block
            position: fixed
            top:5%
            right: 11%
            color: #fff
            border: none
            cursor: pointer
            font-size: 1.9rem
          .dropdown-menu
            position: fixed
            top: 0
            left: 0
            width: 100vw
            height: 100vh
            background-color:rgba(128, 0, 128, 0.9)
            backdrop-filter: blur(10px)
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            list-style: none
            padding: 0
            margin: 0
            z-index: 1000
            color: #b83aff
          .dropdown-menu li
            margin-bottom: 15% 
            color: #fb573b
          .dropdown-menu a
            text-decoration: none
            color: #0704A5
            font-size: 1.8rem
            font-weight: bold
            transition: color 0.3s ease
            &:hover
              color:#b83aff
          .close-btn 
            position: absolute
            top: 5%
            right: 20px
            background-color: transparent
            color: #fb573b
            border: none
            font-size: 2rem
            cursor: pointer
            border-radius: 50%
            padding: 8px
            width: 30px
            height: 30px
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1)
            transition: background-color 0.3s ease
            text-align: center
          .close-btn:hover 
            background-color: #ffcc00
        #left-side
            display: flex
            justify-content: start
            align-items: center
            flex-direction: column
            width: 30%
            height: 100%
            background: #0704A5
            border-radius: 10px 0 0 10px
            overflow: auto
            overflow-x: hidden
            @media screen and (max-width: 500px)
              width: 100% 
              height: 25%
              overflow: hidden
              border-radius: 10px 10px 0 0
            #logo
                width: 30%
                padding-top: 20px
                @media screen and (max-width: 500px)
                  width: 20%
                  padding-top: 10px
            h1
                font-size: 1.5rem
                color: white
                text-align: center
                margin-bottom: 100px
            #cont-buttons
                display: flex
                flex-direction: column
                align-items: center
                width: 100%
                gap: 25px
                margin-bottom: 50px
                .button
                    width: 100%
                    position: relative
                    left: 5%
                button
                    width: 90%
                    height: 50px
                    background: #e1e1ef
                    border-radius: 5px
                    color: #0704A5
                    font-size: 1rem
                    font-weight: 600
                    outline: none
                    cursor: pointer
                    border: none
                    transition: all 0.3s ease-in-out
                    display: flex
                    align-items: center
                    justify-content: center
                    &:hover
                        background: #6a42ff
                        color: white
                        transform: scale(1.05)
                        font-size: 1.1rem
                    .icon_dashboard
                        font-size: 1.7rem
                        position: relative
                        right: 16%
                .logoutButton
                    background: #fb573b
                    color: white
        #right-side
            place-items: center
            width: 70%
            height: 100%
            background: white
            border-radius: 0 10px 10px 0
            padding: 0 10px
            @media screen and (max-width: 500px)
              width: 90%
              display: flex
              flex-direction: column
              justify-content: center
              align-items: center
              overflow: auto
            .container-config
              display: flex 
              justify-content: space-evenly
              align-items: center
              width: 90%
              display: flex
              justify-content: center
              align-items: center
              background: #e1e1ef
              border-radius: 10px
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
              margin-top: 20%
              @media screen and (max-width: 500px)
                width: 100%
                margin-top:0
              
              #cont-list
                margin:40px 0
                width: 45%
                border-radius: 10px
                @media screen and (max-width: 500px)
                  width: 100% 
                  margin: 0px 60px 0 0 
                  
                  
                ul
                    list-style: none
                    margin-top: 20%
                    @media screen and (max-width: 500px)
                      margin-left: auto
  
                    li
                        font-size: 2rem
                        margin-bottom: 30px
                        cursor: pointer
                        font-weight: bold
                        @media screen and (max-width: 650px)
                          font-size: .7rem
                          
                        a
                            color: #0704A5
                            text-decoration: none
                            transition: all 0.3s ease-in-out
                            &:hover
                                color: white
                                @media screen and (max-width: 650px)
                                  font-size: .7rem
              #settings_form
                // display: flex
                // justify-content: center
                width: 45%
                // align-items: center
                // flex-direction: column
                background: #e1e1ef
                @media screen and (max-width: 500px)
                  height: 300px
                .form-group
                    margin-bottom: 20px
                    @media screen and (max-width: 500px)
                      width: 130px
                label
                    display: block
                    margin-bottom: 5px
                    font-weight: bold
                    @media screen and (max-width: 500px)
                      font-size: 0.5rem
                      color: #0704A5
                      margin-top: 20px

                input[type="email"]
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
                    @media screen and (max-width: 500px)
                      width: 50%
                      padding: 5px
                      font-size: 0.5rem
                      
                
                input[type="tel"]
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
                    @media screen and (max-width: 500px)
                      width: 50%
                      padding: 5px
                      font-size: 0.5rem
                input[type="password"]
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
                    @media screen and (max-width: 500px)
                      width: 50%
                      padding: 5px
                      font-size: 0.5rem
                button#save-button
                    display: inline-block
                    left: 11%
                    top: 20px
                    width: 40%
                    padding: 10px
                    background-color: #4CAF50
                    color: #fff
                    border: none
                    border-radius: 5px
                    font-size: 16px
                    cursor: pointer
                    transition: all 0.3s ease-in-out
                    @media screen and (max-width: 500px)
                      font-size: 0.5rem
                      margin-bottom: 20%
                      width: 80%
                      padding: 5px
                    &:hover
                        background-color: #6a42ff

.whatsapp-button
  position: fixed
  bottom: 20px 
  right: 20px 
  width: 60px 
  height: 60px 
  background-color: #25d366 
  border-radius: 50% 
  display: flex
  align-items: center
  justify-content: center
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2)
  cursor: pointer
  transition: transform 0.2s ease, box-shadow 0.2s ease
  z-index: 1000 

  &:hover
    transform: scale(1.1) 
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3)

  img
    width: 40px 
    height: 40px


</style>
