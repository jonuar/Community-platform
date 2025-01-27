<template>
  <section id="container">
    <div id="dashboard">
      <div id="left-side">
        <img src="../assets/logo-community-nospace.png" alt="Logo Comunidad Global One More" id="logo" />
        <h1>Bienvenido, {{ userName }}.</h1>
        <div id="cont-buttons">
          <RouterLink to="/infoadmin" class="button">
            <button>
              <font-awesome-icon icon="book" class="icon_dashboard" />
              Información
            </button>
          </RouterLink>
          <button class="logoutButton" @click="cerrarSesion">
            <font-awesome-icon icon="arrow-right-from-bracket" class="icon_dashboard" />
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div id="right-side">
        <div id="cont-list">
          <!-- Tabla para mostrar usuarios -->
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Enlace izquierdo</th>
                <th>Enlace derecho</th>
                <th>Activar/Desactivar</th>
                <th>Comprobante</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.id">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>
                  <strong :style="{ color: user.isActive ? 'green' : 'red', textDecoration: 'underline' }"> {{
                    user.isActive ? 'Activo' : 'Inactivo' }}</strong>
                </td>
                <td>
                  <!-- Mostrar enlace 1 o mensaje si no existe -->
                  <span v-if="user.link1[0]">{{ user.link1[0] }}</span>
                  <br>
                  <span v-if="user.link1[0]">{{ user.link1[1] ? "(Tomado)" : "(No tomado)" }}</span>
                  <span v-else>Sin enlace izquierdo</span>
                </td>
                <td>
                  <!-- Mostrar enlace 2 o mensaje si no existe -->
                  <span v-if="user.link2[0]">{{ user.link2[0] }}</span>
                  <br>
                  <span v-if="user.link2[0]">{{ user.link2[1] ? "(Tomado)" : "(No tomado)" }}</span>
                  <span v-else>Sin enlace derecho</span>
                </td>
                <td>
                  <!-- Botón de activar/desactivar con clases condicionales -->
                  <button @click="toggleActive(user)" :class="user.isActive ? 'btn-activate' : 'btn-deactivate'">
                    <strong>{{ user.isActive ? "Desactivar" : "Activar" }}</strong>
                  </button>
                </td>
                <td>
                  <!-- Mostrar imagen o mensaje si no hay imagen -->
                  <img v-if="user.imageUrl" :src="user.imageUrl" alt="Comprobante" class="image-preview" />
                  <span v-else>No hay comprobante</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mitt from "mitt";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage"; 
import { getAuth, signOut } from "firebase/auth";
import { db, storage } from "@/main"; // Asegúrate de tener configurado el almacenamiento de Firebase

export default {
  data() {
    return {
      users: [], // Lista de usuarios
      userId: localStorage.getItem("userId"), // ID del usuario logueado
      userName: localStorage.getItem("userName"), // Nombre del usuario logueado
      emitter: mitt(), // Instancia de mitt para eventos
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const usersList = [];
        // Crea una consulta para filtrar usuarios por su rol, excluyendo administradores
        const q = query(collection(db, "users"), where("role", "not-in", ["admin"]));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = { id: doc.id, ...doc.data() };
          usersList.push(userData);
        });

        // Asociar imágenes de Storage con los usuarios
        for (let user of usersList) {
          user.imageURL = await this.getUserImage(user.id); // Recuperar imagen asociada
        }

        this.users = usersList;
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    },

    // Método para obtener la imagen de un usuario desde Firebase Storage
    async getUserImage(userId) {
      try {
        const storageRef = ref(storage, `images/${userId}/profile.jpg`); // Ruta a la imagen (ajusta según sea necesario)
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        console.error("Error al obtener la imagen del usuario:", error);
        return null; // En caso de error, retornar null o una imagen predeterminada
      }
    },

    async toggleActive(user) {
      try {
        const updatedStatus = !user.isActive;
        user.isActive = updatedStatus;
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          isActive: updatedStatus,
        });
        alert(
          `Usuario ${updatedStatus ? "activado" : "desactivado"} correctamente.`
        );
      } catch (error) {
        console.error("Error al cambiar el estado de usuario:", error);
        alert("Hubo un error al cambiar el estado del usuario.");
      }
    },

    async cerrarSesion() {
      const auth = getAuth();

      try {
        await signOut(auth);
        console.log("Usuario cerrado sesión con éxito");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        this.$router.replace("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();

    // Usamos mitt para escuchar los cambios en la base de datos
    this.unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const usersList = [];
      querySnapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        if (userData.role !== "admin") {
          usersList.push(userData);
        }
      });
      this.users = usersList; // Actualizamos la lista de usuarios
      this.emitter.emit("usersUpdated", usersList); // Emitimos un evento con mitt
    });
  },

  // Usamos onBeforeUnmount para limpiar el listener cuando el componente se destruya
  BeforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe(); // Limpiar el listener de Firestore
    }
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
                    justify-content: space-evenly
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
                width: 90%
                height: 80%
                background: #e1e1ef
                border-radius: 10px
                margin: 40px
                padding: 20px
                overflow: auto
                table
                    width: 100%
                    border-collapse: collapse
                    text-align: left
                    thead
                        background-color: #f4f4f4
                    th, td
                        padding: 10px
                        border: 1px solid #ddd
                    tbody
                        tr:nth-child(even)
                            background-color: #f9f9f9
                        tr:hover
                            background-color: #f1f1f1
                        button
                            padding: 5px 10px
                            background-color: #4CAF50
                            color: white
                            border: none
                            cursor: pointer
                            font-size: 14px
                            border-radius: 5px
                            cursor: pointer
                            &:hover
                                opacity: 0.6

                    /* Estilos para el botón Activar */
                    .btn-deactivate
                        background-color: #4CAF50
                        color: white

                    /* Estilos para el botón Desactivar */
                    .btn-activate
                        background-color: #f44336
                        color: white
</style>
