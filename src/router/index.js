//import { createRouter, createWebHashHistory } from 'vue-router'
import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExploraDest from '@/components/exploraDest.vue'
import LugaresDesta from '@/components/lugaresDesta.vue'
import Ciudades from '@/components/ciudades.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
