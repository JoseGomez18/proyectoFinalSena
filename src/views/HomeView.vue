<template>
  <div>
    <navBar/>
    <homeVue id="home"/>
    <exploraDestVue id="exploraDest"/>
    <lugaresDestaVue id="lugaresDesta"/>
    <testimonials id="exploraDest"/>
    <contacto id="contacto"/>
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
  name: 'HomeView',
  components: {
    navBar,
    homeVue,
    lugaresDestaVue,
    exploraDestVue,
    Testimonials,
    Contacto,
    footerVue,
    Chat,
  },
};
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
"