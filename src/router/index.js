//import { createRouter, createWebHashHistory } from 'vue-router'
import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetallesLugar from '@/views/DetallesLugar.vue'
import ExploraDest from '@/components/exploraDest.vue'
import LugaresDesta from '@/components/lugaresDesta.vue'
import Ciudades from '@/components/ciudades.vue'
import ScrollPrueba from '@/components/scrollPrueba.vue'
//import LoadingSpinner from '@/components/loadingSpinner.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/detalles/:id',
        name: 'DetallesLugar',
        component: DetallesLugar,
        props: true
    },
    {
        path: '/exploraDest',
        name: 'exploraDest',
        component: ExploraDest
    },
    {
        path: '/lugaresDesta',
        name: 'lugaresDesta',
        component: LugaresDesta
    },
    {
        path: '/ciudades',
        name: 'ciudades',
        component: Ciudades
    },
    {
        path: '/pruebas',
        name: 'pruebas',
        component:ScrollPrueba
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
