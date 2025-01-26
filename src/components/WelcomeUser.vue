<template>
  <section id="container">
    <div id="dashboard">
      <div id="left-side">
        <img id="logo" src="../assets/logo-community-nospace.png" alt="Logo" />
        <h1>Bienvenido, {{ userName }}.</h1>
        <div id="cont-buttons">

          <button>
            <font-awesome-icon icon="layer-group" class="icon_dashboard" />
            Dashboard
          </button>



          <router-link to="/UserInfor" class="button">
            <button>
              <font-awesome-icon icon="book" class="icon_dashboard" />
              Información
            </button>
          </router-link>
          <!-- <router-link to="/UserConfig" class="button">
            <button>
              <font-awesome-icon icon="gears" class="icon_dashboard" />
              Configuración
            </button>
          </router-link> -->
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
              <button class="close-btn" @click="toggleDropdown">
                x
              </button>
            </ul>
          </div>


      </div>
      <div id="right-side">
        <div id="cont-list">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre Miembro</th>
                <th>Enlace Izquierda</th>
                <th>Enlace Derecha</th>
              </tr>
            </thead>
            <tbody>
              <!-- Iterar sobre los usuarios filtrados -->
              <tr v-for="(user, index) in filteredUsers" :key="user.id">
                <td>{{ index + 1 }}.</td>
                <td>{{ user.name }}</td>
                <td>
                  <!-- Botón para copiar enlace izquierdo -->
                  <button v-if="index === 0" class="btn-enlace" :disabled="isButtonDisabled(user.link1)"
                    @click="copiarEnlace(user.id, user.name, user.link1, 'link1')">
                    Tomar enlace
                  </button>
                </td>
                <td>
                  <!-- Botón para copiar enlace derecho -->
                  <button v-if="index === 0" class="btn-enlace" :disabled="isButtonDisabled(user.link2)"
                    @click="copiarEnlace(user.id, user.name, user.link2, 'link2')">
                    Tomar enlace
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="cont-squares">
          <div id="cont-up">
            <h3>Enlace tomado</h3>
            <!-- Mostrar el mensaje del enlace tomado -->
            <div id="cont-enlaceTomado" v-if="linkTaken[0]">
              <!-- Mostrar el enlace tomado y de qué lado proviene -->
              <p>Has tomado el enlace {{ linkSource }}<!-- Muestra si el enlace es izquierdo o derecho -->: <span
                  id="enlaceTomado">{{ linkTaken[0] }}</span><br><span> del usuario: <strong>{{ linkTaken[1]
                    }}</strong></span></p>

            </div>
            <p v-else>
              No has tomado ningún enlace aún.
            </p>
          </div>
          

            <div id="cont-center">

            </div>
            <!-- Formulario para activar la cuenta -->
<!--            
            <div id="cont-pay">
              <form>
                <h3>Activación</h3>
                <img src="https://imgs.search.brave.com/ha47WwMoeEgrtA6F6ZnSewUMfCLvw3uD-HbmYuyN9xo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9l/L2VjL1FSb3JnLnBu/Zw" alt="">
                
                <span>(TRC20):34dfeycv3547gehceu3683294r97 </span> 
                
                  <input type="file" id="imagen" name="imagen" accept="image/*">
                  <button type="submit">Activar</button>
              
            </form>
          </div> -->
        


          <div id="cont-down">
            <form @submit.prevent="guardarEnlaces">
              <h3>Ingresa tus enlaces</h3>
              <input type="text" id="enlaceIzquierda" v-model="enlaceIzquierda"
                placeholder="Ingrese el enlace izquierdo aquí" required />
              <input type="text" id="enlaceDerecha" v-model="enlaceDerecha" placeholder="Ingrese el enlace derecho aquí"
                required />
              <button type="submit" :disabled="!linkTaken[0]">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <a href="https://wa.me/1234567890" class="whatsapp-button" target="_blank">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
        alt="WhatsApp Logo" />
    </a>
  </section>
</template>

<script>
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "@/main";

export default {
  name: "WelcomeUser",
  data() {
    return {
      userId: localStorage.getItem("userId"), // Recupera el ID del usuario desde localStorage
      userName: localStorage.getItem("userName"), // Recupera el nombre del usuario desde localStorage
      activeUsers: [], // Lista de usuarios activos
      enlaceIzquierda: "", // Enlace izquierdo proporcionado por el usuario
      enlaceDerecha: "", // Enlace derecho proporcionado por el usuario
      linkTaken: [], // Información del enlace tomado desde la base de datos
      hasTakenLink: false, // Indica si el usuario tomó un enlace
      isDropdownOpen: false,
    };
  },
  computed: {
    // Propiedad computada para filtrar usuarios activos con enlaces disponibles
    filteredUsers() {
      return this.activeUsers.filter(user => (user.link1[0] || user.link2[0]));
    },

    // Propiedad computada para determinar si el enlace tomado es izquierdo o derecho
    linkSource() {
      if (this.linkTaken && this.linkTaken[0]) {
        // Busca en la lista de usuarios activos al propietario del enlace tomado
        const owner = this.activeUsers.find((user) =>
          user.link1[0] === this.linkTaken[0] || user.link2[0] === this.linkTaken[0]
        );
        if (owner) {
          // Verifica si el enlace tomado es el izquierdo o derecho
          if (owner.link1[0] === this.linkTaken[0]) return "izquierdo";
          if (owner.link2[0] === this.linkTaken[0]) return "derecho";
        }
      }
      return ""; // Por defecto, no se muestra nada si no hay enlace tomado
    },
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
    fetchActiveUsers() {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("isActive", "==", true)); // Filtra usuarios activos
      onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        this.activeUsers = users;
      });
    },
    async fetchUserData() {
      try {
        const userDocRef = doc(db, "users", this.userId); // Referencia al documento del usuario
        const docSnapshot = await getDoc(userDocRef); // Obtener la información del documento del usuario
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          this.linkTaken = userData.linkTaken || null;
          console.log("Link tomado:", this.linkTaken)
          this.hasTakenLink = this.linkTaken !== null && this.linkTaken[0].length > 0; // Si linkTaken tiene un valor diferente de null y su longitud en el item 0 es mayor a 0, se ha tomado un enlace
          console.log("Has tomado un enlace:", this.hasTakenLink)
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    },

    // Lógica de deshabilitar botones para tomar enlaces
    isButtonDisabled(link) {
      // El botón se deshabilita si el enlace está en false
      return !link[1] || this.hasTakenLink;
    },
    async guardarEnlaces() {
      try {
        const userDocRef = doc(db, "users", this.userId);
        await updateDoc(userDocRef, {
          link1: [this.enlaceIzquierda, true], // Guardar enlace izquierdo
          link2: [this.enlaceDerecha, true], // Guardar enlace derecho
        });
        alert("Enlaces guardados correctamente.");
      } catch (error) {
        console.error("Error al guardar los enlaces:", error);
        alert("Ocurrió un error al guardar los enlaces.");
      }
    },
    async copiarEnlace(ownerId, ownerName, link, linkKey) {
      try {
        if (this.hasTakenLink) {
          alert("Ya tomaste un enlace.");
          return;
        }

        const currentUserRef = doc(db, "users", this.userId);
        const ownerRef = doc(db, "users", ownerId);

        await updateDoc(currentUserRef, {
          linkTaken: [link[0], ownerName], // Guardar el enlace tomado y su dueño
        });

        const updatedLinks = { [linkKey]: [link[0], false] }; // Desactivar el enlace tomado
        await updateDoc(ownerRef, updatedLinks);

        const owner = this.activeUsers.find((user) => user.id === ownerId);
        if (!owner.link1[1] && !owner.link2[1]) {
          await updateDoc(ownerRef, { isActive: false }); // Marcar al dueño como inactivo si ambos enlaces son tomados
        }

        this.linkTaken = [link[0], ownerName];
        this.hasTakenLink = true;
        alert(`Has tomado el enlace: ${link[0]} del usuario ${ownerName}`);
      } catch (error) {
        console.error("Error al copiar el enlace:", error);
        alert("Ocurrió un error al tomar el enlace.");
      }
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  mounted() {
    this.fetchActiveUsers(); // Cargar usuarios activos
    this.fetchUserData(); // Cargar el estado del enlace tomado desde la base de datos
  },
}
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
            border-radius: 10px 0 0 10px
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
            #cont-list
                width: 60%
                height: 80%
                background: #e1e1ef
                border-radius: 10px
                margin: 40px
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                overflow: auto
                @media screen and (max-width: 500px)
                  width: 80%
                  height: 80%
                  overflow: auto
                table
                  width: 100%
                  border-collapse: collapse
                  text-align: left
                  background: #fff
                  border-radius: 8px
                  overflow: hidden
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                  @media screen and (max-width: 500px)
                    width: 100%
                  th, td
                    padding: 10px 15px
                    border-bottom: 1px solid #eaeaea
                    @media screen and (max-width: 500px)
                      padding: 5px 8px
                  th
                    background: #0704a5
                    color: white
                    font-weight: bold
                    text-transform: uppercase
                    @media screen and (max-width: 500px)
                      font-size: .6rem
                  tr:nth-child(even)
                    background: #f9f9f9
                  tr:hover
                    background: #f1f1f1
                  td
                    font-size: 0.9rem
                  @media screen and (max-width: 500px)
                    td
                      font-size: 0.57rem
                    .btn-enlace
                      background-color: #824caf
                      color: #fff
                      font-size: 14px
                      padding: 10px 15px
                      border: none
                      border-radius: 5px
                      cursor: pointer
                      transition: background-color 0.3s ease
                      @media screen and (max-width: 500px)
                        font-size: .4rem
                        padding: 5px  10px
                      &:hover
                        background-color: #45a049
                      &:disabled
                        background-color: #ccc
                        color: #666
                        cursor: not-allowed

            #cont-squares
                display: flex
                justify-content: center
                align-items: center
                gap: 20px
                flex-direction: column
                width: 40%
                height: 80%
                @media screen and (max-width: 500px)
                  width: 80%
                  height: 30%
                  margin-top: 37% !important

                #cont-up
                    display: flex
                    flex-direction: column
                    align-items: center
                    justify-content: center
                    margin-top: 20%
                    width: 80%
                    height: 50%
                    background: #e1e1ef
                    border-radius: 10px
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                    padding: 20px
                    font-size: 1.2rem
                    color: #333
                    @media screen and (max-width: 500px)
                      font-size: .8rem
                    h3
                      font-size: 1.3rem
                      color: #0704a5
                      margin-bottom: 10px
                      @media screen and (max-width: 500px)
                        font-size: 1rem
                    #cont-enlaceTomado
                      display: flex
                      flex-direction: column
                      align-items: start
                      justify-content: center
                      
                      p
                        text-align: center
                        display: flex
                        flex-direction: column
                      
                      #enlaceTomado
                        font-weight: bold
                        color: purple
                    #cont-up div p:empty
                      color: #999
                      font-style: normal

                #cont-center
                    display: flex
                    flex-direction: column
                    align-items: center
                    justify-content: center
                    width: 80%
                    height: 30%
                    background: #e1e1ef
                    border-radius: 10px
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                    padding: 20px

                #cont-pay
                    display: flex
                    flex-direction: column
                    justify-content: center
                    align-items: center
                    width: 80%
                    height: 34%
                    background: #e1e1ef
                    border-radius: 10px
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                    padding: 20px
                    h3
                      font-size: 1.2rem
                      color: #0704a5
                      text-align: center
                    img
                      width: 90px
                      margin-bottom: 10px
                      margin-left: 110px
                      border-radius: 10px
                    span
                      margin-top: 50px
                      font-weight: bold
                      font-size: 1rem
                      margin: 5px 0 
                      text-align: center
                    input
                      padding: 7px
                      border-radius: 5px
                    button
                        padding: 10px
                        background: #4CAF50
                        color: white
                        border: none
                        border-radius: 5px
                        cursor: pointer
                        font-size: 1rem
                        transition: all 0.3s ease
                        width: 25%
                        margin-right: 5px !important

                        &:hover
                          background: #6a42ff
                          transform: scale(1.05)
                    
                    

                #cont-down
                    width: 80%
                    padding: 20px
                    margin-top: 20%
                    height: 30%
                    background: #e1e1ef
                    border-radius: 10px
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                    @media screen and (max-width: 650px)  
                      height: 135%
                    form
                      display: flex
                      flex-direction: column
                      gap: 8px

                      h3
                        
                        font-size: 1.1rem
                        color: #0704a5
                        text-align: center
                        @media screen and (max-width: 500px)
                          font-size: 1rem

                      label
                        font-weight: bold
                        color: #333
                        @media screen and (max-width: 500px)
                          font-size: .6rem

                      input
                        padding: 7px
                        border: 1px solid #ccc
                        border-radius: 5px
                        outline: none
                        transition: all 0.3s ease
                        @media screen and (max-width: 500px)
                          font-size: .8rem
                          width: 95%
                          height: 10% 

                        &:focus
                          border-color: #0704a5

                      button //Guardar
                        padding: 10px
                        background: #4CAF50
                        color: white
                        border: none
                        border-radius: 5px
                        cursor: pointer
                        font-size: 1rem
                        transition: all 0.3s ease
                        width: 25%
                        @media screen and (max-width: 500px)
                          width: 47%
                          font-size: .6rem
                          padding: 7px

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

