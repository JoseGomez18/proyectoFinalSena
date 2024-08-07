<template>
    <div>
      <navBar/>
      <!-- <chat v-if="seen"/> -->
      <homeVue/>
      <!-- <button v-on:click="activar()">activar</button> -->
      <lugaresDestaVue/>
      <ciudadesVue/>
      <exploraDestVue/>
      <footerVue/>
    </div>
  </template>
  
  <script>
  import Chat from '../components/chat.vue'
  import ciudadesVue from '../components/ciudades.vue'
  import exploraDestVue from '../components/exploraDest.vue'
  import footerVue from '../components/footer.vue'
  import homeVue from '../components/home.vue'
  import lugaresDestaVue from '../components/lugaresDesta.vue'
  import navBar from '../components/navBar.vue'
  
  
  
  export default {
    name: 'home',
    // data(){
    //   return{
    //     seen: true
    //   }
    // },
    // methods: {
    //   activar(){
    //     this.seen = !this.seen
    //     console.log(this.seen)
    //   }
    // },
    components: {
      navBar,
      homeVue,
      lugaresDestaVue,
      ciudadesVue,
      exploraDestVue,
      footerVue,
        Chat
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  </style>
  