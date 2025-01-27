<template>
    <section id="container">
    <div id="dashboard">
        <div id="left-side">
            <img
            id="logo"
            src="../assets/logo-community-nospace.png"
            alt="Logo Comunidad Global One More"
          />
            <h1>Bienvenido, {{ userName }}.</h1>
            <div id="cont-buttons">
              
                <RouterLink to="/welcome" class="button">
                    <button>
                    <font-awesome-icon icon= "layer-group" class="icon_dashboard" />
                    Dashboard
                    </button>
                </RouterLink>

                <!-- <button>
                <font-awesome-icon icon="book" class="icon_dashboard" />
                Información
                </button> -->

          <router-link to="/UserPay" class="button">
            <button>
              <font-awesome-icon icon="bitcoin-sign" class="icon_dashboard" />
              Comprobante
            </button>
          </router-link>

                <RouterLink to="/UserConfig" class="button">
                    <button>
                    <font-awesome-icon icon="gears" class="icon_dashboard" />
                    Configuración
                    </button>
                </RouterLink> 

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

              <!-- <li>
                <router-link to="/UserInfor">
                  <font-awesome-icon icon="book" class="icon_dashboard" />
                  Información
                </router-link>
              </li> -->

              <li>
                <router-link to="/UserPay">
                  <font-awesome-icon icon="bitcoin-sign" class="icon_dashboard" />
                  Comprobante
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
              <button class="close-btn" @click="toggleDropdown">
                x
              </button>
            </ul>
          </div>

        <!-- Seccion de la derecha -->
        </div>
        <div id="right-side">
        <!-- Contenedor de la información vídeos & pdf de la comunidad -->
            <h1 class="title_info">Material </h1>
        <section class="cards-container">
  <!-- Card 1: Video YouTube -->
  
  <div class="card">
    <h2>Video 1</h2>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"  
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>

  <!-- Card 2: Video YouTube -->
  <div class="card">
    <h2>Video 2</h2>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"  
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
<!-- Card 3: Video YouTube -->
<div class="card">
    <h2>Video 3</h2>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"  
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>


  <!-- Card 3: Imagen para descargar PDF -->
  <div class="card">
    <h2>Descargar PDF 1</h2>
    <a href="https://www.example.com/yourfile.pdf" download>
      <img
        src="https://via.placeholder.com/300x200.png?text=PDF+1"  
        alt="Descargar PDF"
        class="card-image"
      />
    </a>
  </div>

  <!-- Card 4: Imagen para descargar PDF -->
  <div class="card">
    <h2>Descargar PDF 2</h2>
    <a href="https://www.example.com/yourfile2.pdf" download>
      <img
        src="https://via.placeholder.com/300x200.png?text=PDF+2" 
        alt="Descargar PDF"
        class="card-image"
      />
    </a>
  </div>

  <!-- Card 5: Imagen para descargar PDF -->
  <div class="card">
    <h2>Descargar PDF 3</h2>
    <a href="https://www.example.com/yourfile2.pdf" download>
      <img
        src="https://via.placeholder.com/300x200.png?text=PDF+2" 
        alt="Descargar PDF"
        class="card-image"
      />
    </a>
  </div>
</section>

        </div>
    </div>
    <!-- Botón de WhatsApp -->
    <a href="https://wa.me/1234567890" class="whatsapp-button" target="_blank" aria-label="Chatea con nosotros en WhatsApp">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WhatsApp Logo">
    </a>
    </section>
</template>

<script>
export default {
    name: "WelcomeUser",
    methods: {
    cerrarSesion() {
    // Elimina el token del localStorage
        console.log("Token antes de eliminar:", localStorage.getItem("token"));
        localStorage.removeItem("token");

    // Redirige al login
        console.log("Redirigiendo a /UserLogin");
        this.$router.replace("/UserLogin");  // Reemplaza la ruta actual en lugar de añadirla al historial
        },
        toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    },
    data(){
      return{
        userName: localStorage.getItem("userName"),
        isDropdownOpen: false,
      }
    }
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
              border-radius: 10px 10px 10px 10px
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
            @media screen and (max-width: 500px)
              width: 90%
              display: flex
              flex-direction: column
              justify-content: center
              align-items: center
              overflow: auto
            #cont-list
                width: 50%
                height: 80%
                background: #e1e1ef
                border-radius: 10px
                margin: 40px
            #cont-squares
                display: flex
                justify-content: center
                align-items: center
                gap: 40px
                flex-direction: column
                width: 50%
                height: 80%
                #cont-up
                    width: 80%
                    height: 100%
                    background: #e1e1ef
                    border-radius: 10px
                #cont-down
                    width: 80%
                    height: 100%
                    background: #e1e1ef
                    border-radius: 10px

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


//Estilos para las cards
.title_info
  text-align: center
  position: fixed
  top: 17%
  left: 62%
  transform: translateX(-50%)
  color: #0704A5
  font-size: 2.5rem

.cards-container
  display: grid 
  grid-template-columns: repeat(3, 1fr)
  gap: 3%
  margin-top: 13%
  margin-right: 4%
  @media screen and (max-width: 500px)
    grid-template-columns: 1fr 
    height: 90%
  

.card
  width: 260px
  border: 1px solid #ddd
  border-radius: 10px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  overflow: hidden
  background-color: #0704A5
  @media screen and (max-width: 500px)
    width: 300px
    height: 340px

.card h2
  padding: 10px
  text-align: center
  color: white
  background-color: #0704A5
  margin: 0

.card iframe
  width: 100%
  height: 200px
  @media screen and (max-width: 650px)
  height: 85%

.card-image
  width: 100%
  height: auto
  border-top: 1px solid #ddd

.card a
  text-decoration: none
  color: white

.card a:hover .card-image
  opacity: 0.8

  @media screen and (max-width: 500px)
.title_info
  display: none
</style>
