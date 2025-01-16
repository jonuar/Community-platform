<template>
  <section id="container">
    <div id="dashboard">
      <div id="left-side">
        <img
          src="../assets/logo-community-nospace.png"
          alt="Logo Comunidad Global One More"
          id="logo"
        />
        <h1>Bienvenido, {{ user }}.</h1>
        <div id="cont-buttons">
          <button>Gestion</button>
          <button>Datos</button>
          <button>Configuracion</button>
        </div>
      </div>
      <div id="right-side">
        <div id="cont-list">
          <!-- Renderizamos la lista de usuarios aquí -->
          <!-- Tabla para mostrar usuarios -->
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.movil }}</td>
                <td>{{ user.isActive ? "Activo" : "Inactivo" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main";

export default {
  name: "WelcomeAdmin",
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      users: [], // Almacenar la lista de usuarios
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // Obtenemos todos los documentos de la colección
        const usersList = [];
        querySnapshot.forEach((doc) => {
          const userData = { id: doc.id, ...doc.data() };
          // Filtrar usuarios que no sean admin
          if (userData.role !== "admin") {
            usersList.push(userData);
          }
        });
        this.users = usersList; // Actualizamos el estado del componente con usuarios filtrados
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers(); // Llamamos a la función al montar el componente
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
                    &:hover
                        background: #6a42ff
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
</style>
