<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/main.js";
export default {
  name: 'App',
  data(){
    return{
      user:null,
    };
  }, 

  created(){
    onAuthStateChanged(auth, (user) => {
      this.user = user; // Almacena el usuario actual en una variable reacriva en el componente
    });
  }
}
</script>
<style lang="sass" >
// Remueve el margen blanco por defecto
body
  margin: 0
  padding: 0
  box-sizing: border-box
  height: 100%
  background: linear-gradient(to bottom, #0b004b, #b83aff)

#app 
  height: 100%
//   font-family: Avenir, Helvetica, Arial, sans-serif
//   -webkit-font-smoothing: antialiased
//   -moz-osx-font-smoothing: grayscale
//   text-align: center
//   color: #2c3e50
//   background-color: linear-gradient(to bottom, #0b004b, #b83aff) 

</style>
