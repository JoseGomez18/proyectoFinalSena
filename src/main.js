import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store';
import './assets/style/global.css'

// Importa AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

createApp(App).use(router).use(store).mount('#app')
AOS.init({
    once: false, // Para que las animaciones se repitan al hacer scroll
});


