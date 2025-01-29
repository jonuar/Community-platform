<template>
  <section id="container">
    <div id="dashboard">
      <div id="left-side">
        <!-- Logo de la comunidad -->
        <img id="logo" src="../assets/logo-community-nospace.png" alt="Logo Comunidad Global One More" />
        <!-- Mensaje de bienvenida con el nombre del usuario -->
        <h1>Bienvenido, {{ userName }}.</h1>

        <!-- Contenedor de los botones del menú -->
        <div id="cont-buttons">
          <!-- Botón para ir al Dashboard -->
          <RouterLink to="/welcome" class="button">
            <button>
              <font-awesome-icon icon="layer-group" class="icon_dashboard" />
              Dashboard
            </button>
          </RouterLink>

          <!-- Botón para ir a la información del usuario -->
          <RouterLink to="/userinfor" class="button">
            <button>
              <font-awesome-icon icon="book" class="icon_dashboard" />
              Información
            </button>
          </RouterLink>

          <!-- <button>
                  <font-awesome-icon icon="bitcoin-sign" class="icon_dashboard" />
                  Comprobante
                </button> -->
          <!-- Botón de configuración (sin funcionalidad añadida aún) -->

          <RouterLink to="/UserConfig" class="button">
            <button>
              <font-awesome-icon icon="gears" class="icon_dashboard" />
              Configuración
            </button>
          </RouterLink>

          <!-- Botón para cerrar sesión -->
          <button class="logoutButton" @click="cerrarSesion">
            <font-awesome-icon icon="arrow-right-from-bracket" class="icon_dashboard" />
            Cerrar Sesión
          </button>
        </div>

        <!-- Menú desplegable RESPONSIVE -->
        <div class="dropdown">
          <div class="dropdown-btn" @click="toggleDropdown">
            <font-awesome-icon icon="bars" class="icon_dashboard" />
          </div>
          <ul class="dropdown-menu" v-if="isDropdownOpen">
            <li>
              <h1 class="dropdown-title">Bienvenido, {{ userName }}.</h1>
            </li>
            <li>
              <router-link to="/Welcome">
                <font-awesome-icon icon="layer-group" class="icon_dashboard" />
                Dashboard
              </router-link>
            </li>

            <li>
              <router-link to="/UserInfor">
                <font-awesome-icon icon="book" class="icon_dashboard" />
                Información
              </router-link>
            </li>

            <li>
              <router-link to="/UserConfig">
                <font-awesome-icon icon="gears" class="icon_dashboard" />
                Configuración
              </router-link>
            </li>
            <li @click="cerrarSesion">
              <font-awesome-icon icon="arrow-right-from-bracket" class="icon_dashboard" />
              Cerrar Sesión
            </li>
            <!-- Botón para cerrar el menú -->
            <button class="close-btn" @click="toggleDropdown">x</button>
          </ul>
        </div>
      </div>

      <div id="right-side">
        <div class="container">
          <!-- Caja 1 -->
          <div class="box">
            <h2>Tron (TRX)</h2>
            <img src="../assets/rederc20.png" alt="Imagen de Activación" />
            <span>TRafaZm2tjapdq4FZ6PfOG7PVi JhmRfRan</span>
          </div>
          <!-- Caja 2 -->
          <div class="box">
            <h2>Ethereum</h2>
            <img src="../assets/rederc20.png" alt="Imagen de Activación" />
            <span>Ox26f78b800160deab0a522ce78 ba32b7519b47e4f</span>
          </div>
          <div class="box-submit">
            <form @submit.prevent="subirImagen">
              <input type="file" accept="image/*" @change="onFileChange" />
              <button type="submit">Enviar</button>
            </form>

          </div>
        </div>
      </div>
    </div>
    <!-- Botón de WhatsApp -->
    <a href="https://wa.me/1234567890" class="whatsapp-button" target="_blank"
      aria-label="Chatea con nosotros en WhatsApp">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
        alt="WhatsApp Logo" />
    </a>
  </section>
</template>

<script>
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { db } from "@/main";
export default {
  name: "WelcomeUser",
  props: ["user"],

  data() {
    return {
      userId: localStorage.getItem("userId"), // Recupera el ID del usuario desde localStorage
      userName: localStorage.getItem("userName"),
      isDropdownOpen: false,
      selectedFile: null,
    };
  },
  methods: {
    async cerrarSesion() {
      const auth = getAuth();
      try {
        await signOut(auth); // Cerrar sesión en Firebase
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("linkTaken"); // Eliminar el enlace tomado del localStorage
        this.$router.replace("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    async subirImagen() {
      if (!this.selectedFile) {
        alert("Por favor, selecciona una imagen.");
        return;
      }
      try {
        // Referencia a Firebase Storage
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `user-images/${this.userId}/comprobante_pago.jpg`
        );

        // Subir la imagen
        const snapshot = await uploadBytes(storageRef, this.selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Guardar la URL en Firestore
        const userDocRef = doc(db, "users", this.userId);
        await updateDoc(userDocRef, { paymentUrl: downloadURL });

        // Actualizar la interfaz
        // this.userImageUrl = downloadURL;
        alert("Imagen subida correctamente.");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Ocurrió un error al subir la imagen.");
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
    // background: linear-gradient(to bottom, #0b004b, #b83aff)
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
            border-radius: 10px 10px 10px 10px
            overflow: auto
            overflow-x: hidden
            @media screen and (max-width: 500px)
                width: 100%
                height: 25%
                overflow: hidden
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
            display: flex
            justify-content: center
            align-items: center
            width: 70%
            height: 100%
            background: white
            border-radius: 0 10px 10px 0
            overflow: auto
            @media screen and (max-width: 500px)
                width: 95%
                display: flex
                flex-direction: column
                justify-content: center
                align-items: center
                overflow: auto
            .container
                display: flex
                justify-content: center
                align-items: center
                flex-wrap: wrap
                gap: 20px
                @media screen and (max-width: 500px)
                    flex-direction: column
                    align-items: center
                    margin-bottom: 50px
                    margin-top: 110%

                .box
                    max-width: 300px
                    padding: 20px
                    border: 1px solid #ddd
                    background: #e1e1ef
                    border-radius: 10px
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                    text-align: center
                    @media screen and (max-width: 500px)
                        width: 80%
                    h2
                        font-size: 1.8rem
                        color: #0704a5
                        margin-bottom: 10px
                    img
                        width: 180px
                        height: 180px
                        margin-bottom: 45px
                        border-radius: 14px
                        @media screen and (max-width: 500px)
                            width: 120px
                            height: 120px
                    span
                        display: block
                        font-weight: bold
                        font-size: 1.2rem
                        margin-bottom: 10px
                        @media screen and (max-width: 500px)
                            font-size: 1rem
                .box-submit
                  width: min(660px, 75%)
                  padding: 20px
                  border: 1px solid #ddd
                  background: #e1e1ef
                  border-radius: 10px
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                  @media screen and (max-width: 500px)
                        width: 80%
                  form
                    display: flex
                    flex-direction: column
                    align-items: center
                    justify-content: center
                    width: 100%
                    input
                      width: 50%
                      padding: 10px
                      margin-bottom: 10px
                      border: 1px solid #ccc
                      border-radius: 5px
                    button
                        padding: 10px 15px
                        background: #4CAF50
                        color: white
                        border: none
                        border-radius: 5px
                        cursor: pointer
                        font-size: 1rem
                        transition: all 0.3s ease
                        width: 30%
                        margin-right: 10px
                        &:hover
                            background: #6a42ff
                            transform: scale(1.05)


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
