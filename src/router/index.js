//import { createRouter, createWebHashHistory } from 'vue-router'
import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetallesLugar from '@/views/DetallesLugar.vue'
import ExploraDest from '@/components/exploraDest.vue'
import LugaresDesta from '@/components/lugaresDesta.vue'
import Ciudades from '@/components/ciudades.vue'
import Perfil from '@/components/perfil.vue'
import CambiarPassword from '@/components/CambiarPassword.vue'
import EditarPerfil from '@/components/EditarPerfil.vue'
import Testimonials from '@/components/testimonials.vue'
import Contacto from '@/components/contacto.vue'

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
        path: '/perfil',
        name: 'perfil',
        component: Perfil,
    },
    {
        path: '/editarPerfil',
        name: 'editarPerfil',
        component: EditarPerfil
    },
    {
        path: '/cambiarPassword',
        name: 'cambiarPassword',
        component: CambiarPassword,
    },
    {
        path: '/testimonials',
        name: 'testimonials',
        component: Testimonials,
    },
    {
        path: '/contacto',
        name: 'contacto',
        component: Contacto,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
