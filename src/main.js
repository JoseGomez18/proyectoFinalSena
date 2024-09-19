import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './assets/style/global.css';

// Importa AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

// Inicializa AOS después de montar la app
app.use(router);
app.mount('#app');
AOS.init({
  once: false, // Para que las animaciones se repitan al hacer scroll
});
