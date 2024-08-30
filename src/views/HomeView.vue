<template>
  <div>
    <navBar/>
    <homeVue/>
    <exploraDestVue/>
    <lugaresDestaVue/>
    <testimonials/>
    <contacto/>
    <footerVue/>
  </div>
</template>

<script>
import Contacto from '@/components/contacto.vue';
import Chat from '../components/chat.vue';
import ciudadesVue from '../components/ciudades.vue';
import exploraDestVue from '../components/exploraDest.vue';
import footerVue from '../components/footer.vue';
import homeVue from '../components/home.vue';
import lugaresDestaVue from '../components/lugaresDesta.vue';
import navBar from '../components/navBar.vue';
import Testimonials from '@/components/testimonials.vue';

export default {
  name: 'home',
  components: {
    navBar,
    homeVue,
    lugaresDestaVue,
    ciudadesVue,
    exploraDestVue,
    Testimonials,
    Contacto,
    footerVue,
    Chat,
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
