<template>
  <div>
    <navBar/>
    <homeVue/>
    <lugaresDestaVue/>
    <ciudadesVue/>
    <exploraDestVue/>
    <footerVue/>
  </div>
</template>

<script>
import ciudadesVue from './components/ciudades.vue'
import exploraDestVue from './components/exploraDest.vue'
import footerVue from './components/footer.vue'
import homeVue from './components/home.vue'
import lugaresDestaVue from './components/lugaresDesta.vue'
import navBar from './components/navBar.vue'



export default {
  name: 'App',
  components: {
    navBar,
    homeVue,
    lugaresDestaVue,
    ciudadesVue,
    exploraDestVue,
    footerVue
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
