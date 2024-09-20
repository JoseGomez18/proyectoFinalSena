import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/style/global.css'

// Importa AOS
import AOS from 'aos';
import 'aos/dist/aos.css';


console.log(process.env.VUE_APP_RUTA_API)
createApp(App).use(router).mount('#app')
AOS.init({
    once: false, // Para que las animaciones se repitan al hacer scroll
});


