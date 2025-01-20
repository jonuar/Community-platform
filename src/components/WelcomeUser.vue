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
            <!-- Mostrar el mensaje del enlace tomado -->
            <p v-if="linkTaken[0]">
              Has tomado el enlace: <span id="enlaceTomado">{{ linkTaken[0] }}</span> del usuario: <strong>{{
                linkTaken[1] }}</strong>
            </p>
            <p v-else>
              No has tomado ningún enlace aún.
            </p>
          </div>
          <div id="cont-down">
            <form @submit.prevent="guardarEnlaces">
              <h3>Ingresa tus enlaces</h3>
              <input type="text" id="enlaceIzquierda" v-model="enlaceIzquierda"
                placeholder="Ingrese el enlace izquierdo aquí" required />
              <input type="text" id="enlaceDerecha" v-model="enlaceDerecha" placeholder="Ingrese el enlace derecho aquí"
                required />
              <button type="submit" :disabled="!linkTaken">Guardar</button>
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
      hasTakenLink: false, // Indica si el usuario ya tomó un enlace
    };
  },
  computed: {
    // Propiedad computada para filtrar usuarios activos con enlaces disponibles
    filteredUsers() {
      return this.activeUsers.filter(user => (user.link1[0] || user.link2[0]));
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
          // console.log("Link tomado:", this.linkTaken)
          this.hasTakenLink = this.linkTaken !== null && this.linkTaken[0].length > 0; // Si linkTaken tiene un valor diferente de null y su longitud en el item 0 es mayor a 0, se ha tomado un enlace
          // console.log("Has tomado un enlace:", this.hasTakenLink)
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
            overflow: auto
            overflow-x: hidden

            #logo
                width: 30%
                padding-top: 20px
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
            #cont-list
                width: 60%
                height: 80%
                background: #e1e1ef
                border-radius: 10px
                margin: 40px
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                overflow: auto
                table
                  width: 100%
                  border-collapse: collapse
                  text-align: left
                  background: #fff
                  border-radius: 8px
                  overflow: hidden
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                  th, td
                    padding: 10px 15px
                    border-bottom: 1px solid #eaeaea
                  th
                    background: #0704a5
                    color: white
                    font-weight: bold
                    text-transform: uppercase
                  tr:nth-child(even)
                    background: #f9f9f9
                  tr:hover
                    background: #f1f1f1
                  td
                    font-size: 0.9rem
                    .btn-enlace
                      background-color: #824caf
                      color: #fff
                      font-size: 14px
                      padding: 10px 15px
                      border: none
                      border-radius: 5px
                      cursor: pointer
                      transition: background-color 0.3s ease
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

                #cont-up
                    display: flex
                    flex-direction: column
                    align-items: center
                    justify-content: center
                    width: 80%
                    height: 100%
                    background: #e1e1ef
                    border-radius: 10px
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                    padding: 20px
                    font-size: 1.2rem
                    color: #333
                    #cont-up strong
                      color: #2c3e50
                      font-weight: bold
                    #cont-up p
                      font-style: italic
                    #enlaceTomado
                      font-style: italic
                      color: purple
                    #cont-up p:empty
                      color: #999
                      font-style: normal

                #cont-down
                    width: 80%
                    padding: 20px
                    height: 100%
                    background: #e1e1ef
                    border-radius: 10px
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
                    form
                      display: flex
                      flex-direction: column
                      gap: 15px

                      h3
                        font-size: 1.5rem
                        color: #0704a5
                        text-align: center

                      label
                        font-weight: bold
                        color: #333

                      input
                        padding: 10px
                        border: 1px solid #ccc
                        border-radius: 5px
                        outline: none
                        transition: all 0.3s ease

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
                        width: 40%

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
