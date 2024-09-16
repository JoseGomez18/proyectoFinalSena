import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/style/global.css'


console.log(process.env.VUE_APP_RUTA_API)
createApp(App).use(router).mount('#app')



