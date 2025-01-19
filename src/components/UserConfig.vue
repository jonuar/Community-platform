<template>
    <!-- Contenedor principal de la sección -->
    <section id="container">
      <!-- Dashboard que incluye el menú lateral y el contenido derecho -->
      <div id="dashboard">
        <!-- Panel izquierdo con el logo, saludo y botones de navegación -->
        <div id="left-side">
          <!-- Logo de la comunidad -->
          <img
            id="logo"
            src="../assets/logo-community-nospace.png"
            alt="Logo Comunidad Global One More"
          />
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
            <RouterLink to="/UserInfor" class="button">
              <button>
                <font-awesome-icon icon="book" class="icon_dashboard" />
                Información
              </button>
            </RouterLink>
  
            <!-- Botón de configuración (sin funcionalidad añadida aún) -->
            <button>
              <font-awesome-icon icon="gears" class="icon_dashboard" />Configuración
            </button>
  
            <!-- Botón para cerrar sesión -->
            <button class="logoutButton" @click="cerrarSesion">
              <font-awesome-icon
                icon="arrow-right-from-bracket"
                class="icon_dashboard"
              />
              Cerrar Sesión
            </button>
          </div>
        </div>
  
        <!-- Panel derecho que muestra las opciones de configuración -->
        <div id="right-side">
          <h1 class="title_info">Configuración</h1>
  
          <!-- Menú para seleccionar la configuración deseada -->
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
            <form v-if="currentSection === 'email'" id="change-email-form">
              <div class="form-group">
                <label for="current-email">Escribe tu correo:</label>
                <input
                  type="email"
                  id="current-email"
                  name="current-email"
                  placeholder="Correo actual"
                  required
                />
              </div>
              <div class="form-group">
                <label for="new-email">Escribe el nuevo correo:</label>
                <input
                  type="email"
                  id="new-email"
                  name="new-email"
                  placeholder="Nuevo correo"
                  required
                />
              </div>
              <div class="form-group">
                <label for="confirm-new-email">Confirma tu nuevo correo:</label>
                <input
                  type="email"
                  id="confirm-new-email"
                  name="confirm-new-email"
                  placeholder="Confirma el nuevo correo"
                  required
                />
              </div>
              <button type="submit" id="save-button">Guardar</button>
            </form>
  
            <!-- Formulario para cambiar la contraseña -->
            <form v-if="currentSection === 'password'" id="change-password-form">
              <div class="form-group">
                <label for="current-password">Escribe tu contraseña:</label>
                <input
                  type="password"
                  id="current-password"
                  name="current-password"
                  placeholder="Contraseña actual"
                  required
                />
              </div>
              <div class="form-group">
                <label for="new-password">Escribe la nueva contraseña:</label>
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  placeholder="Nueva contraseña"
                  required
                />
              </div>
              <div class="form-group">
                <label for="confirm-new-password">Confirma la nueva contraseña:</label>
                <input
                  type="password"
                  id="confirm-new-password"
                  name="confirm-new-password"
                  placeholder="Confirma la nueva contraseña"
                  required
                />
              </div>
              <button type="submit" id="save-button">Guardar</button>
            </form>
  
            <!-- Formulario para cambiar el número de móvil -->
            <form v-if="currentSection === 'movil'" id="change-movil-form">
              <div class="form-group">
                <label for="current-movil">Escribe tu número de móvil:</label>
                <input
                  type="tel"
                  id="current-movil"
                  name="current-movil"
                  placeholder="Número de móvil actual"
                  required
                />
              </div>
              <div class="form-group">
                <label for="new-movil">Escribe el nuevo número de móvil:</label>
                <input
                  type="tel"
                  id="new-movil"
                  name="new-movil"
                  placeholder="Nuevo número de móvil"
                  required
                />
              </div>
              <button type="submit" id="save-button">Guardar</button>
            </form>
          </div>
        </div>
  
        <!-- Botón flotante de WhatsApp para contacto -->
        <a
          href="https://wa.me/1234567890"
          class="whatsapp-button"
          target="_blank"
          aria-label="Chatea con nosotros en WhatsApp"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
            alt="WhatsApp Logo"
          />
        </a>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "WelcomeUser", // Nombre del componente
    props: ["user"], // Propiedad que recibe el nombre del usuario desde el padre
    data() {
      return {
        currentSection: null, // Sección activa para mostrar el formulario correspondiente
        userName: localStorage.getItem("userName")
      };
    },
    methods: {
      cerrarSesion() {
        // Método para cerrar sesión
        console.log("Token antes de eliminar:", localStorage.getItem("token")); // Mostrar el token actual en consola
        localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
        console.log("Redirigiendo a /UserLogin"); // Confirmación en consola
        this.$router.replace("/UserLogin"); // Redirigir al usuario a la página de login
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
                width: 30%
                height: 40%
                background: #e1e1ef
                border-radius: 10px
                margin: 40px
                position: relative
                left: -120px
                top: 10%
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                ul
                    list-style: none
                    margin-top: 20%
                    
                    li
                        font-size: 2rem
                        margin-bottom: 30px
                        cursor: pointer
                        font-weight: bold
                        a
                            color: #0704A5
                            text-decoration: none
                            transition: all 0.3s ease-in-out
                            &:hover
                                color: white
                                font-size: 2.3rem
            #settings_form
                display: flex
                justify-content: center
                align-items: center
                flex-direction: column
                width: 30%
                height: 60%
                background: #e1e1ef
                border-radius: 10px
                margin: 40px
                position: relative
                left: -100px
                top:80px
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                
                .form-group
                    margin-bottom: 15px
                
                label
                    display: block
                    margin-bottom: 5px
                    font-weight: bold

                input[type="email"]
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
                    box-sizing: border-box
                
                input[type="tel"]
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
                    box-sizing: border-box
                
                input[type="password"]
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
                    box-sizing: border-box

                button#save-button

                    display: inline-block
                    position: relative
                    left: 11%
                    top: 20px
                    width: 80%
                    padding: 10px
                    background-color: #4CAF50
                    color: #fff
                    border: none
                    border-radius: 5px
                    font-size: 16px
                    cursor: pointer
                    transition: all 0.3s ease-in-out
                    &:hover
                        background-color: #6a42ff
                // #cont-squares
                //     display: flex
                //     justify-content: center
                //     align-items: center
                //     gap: 40px
                //     flex-direction: column
                //     width: 50%
                //     height: 80%
                //     #cont-up
                //         width: 80%
                //         height: 100%
                //         background: #e1e1ef
                //         border-radius: 10px
                
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

.title_info
  text-align: center
  font-size: 2.5rem
  margin-top: 20px
  color: #0704A5
  position: relative
  top: -250px
  left: 330px

</style>
  