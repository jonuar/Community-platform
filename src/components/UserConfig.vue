<template>
    <section id="container">
    <div id="dashboard">
        <div id="left-side">
            <img
            id="logo"
            src="../assets/logo-community-nospace.png"
            alt="Logo Comunidad Global One More"
          />
            <h1>Bienvenido, {{ user }}.</h1>
            <div id="cont-buttons">
                <RouterLink to="/WelcomeUser" class="button">
                    <button>
                    <font-awesome-icon icon= "layer-group" class="icon_dashboard" />
                    Dashboard
                    </button>
                </RouterLink>

                <RouterLink to="/UserInfor" class="button">
                    <button>
                    <font-awesome-icon icon="book" class="icon_dashboard" />
                    Información
                    </button>
                </RouterLink>

                <button>
                <font-awesome-icon icon="gears" class="icon_dashboard" />Configuración
                </button>
                
                
            <button class="logoutButton" @click="cerrarSesion">
                <font-awesome-icon icon="arrow-right-from-bracket" class="icon_dashboard" />
                Cerrar Sesión
            </button>
            </div>
        <!-- Seccion de la derecha -->
        </div>
        <div id="right-side">
            <!-- Seccion de Configuración del usuario  -->
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
    props: ["user"],
    methods: {
      cerrarSesion() {
    // Elimina el token del localStorage
        console.log("Token antes de eliminar:", localStorage.getItem("token"));
        localStorage.removeItem("token");

    // Redirige al login
        console.log("Redirigiendo a /UserLogin");
        this.$router.replace("/UserLogin");  // Reemplaza la ruta actual en lugar de añadirla al historial
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
        width: 80%
        height: 80%
        background: white
        border-radius: 10px
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2)
        #left-side
            display: flex
            justify-content: start
            align-items: center
            flex-direction: column
            width: 30%
            height: 100%
            background: #0704A5
            border-radius: 10px 0 0 10px
            #logo
                width: 30%
                padding-top: 20px
            h1
                font-size: 2rem
                color: white
                text-align: center
                margin-bottom: 100px
            #cont-buttons
                display: flex
                flex-direction: column
                align-items: center
                width: 100%
                gap: 25px
                
                .button
                    width: 100%
                    margin-left: 105px
                
                button
                    width: 80%
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

</style>
  