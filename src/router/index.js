//import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DetallesLugar from '@/views/DetallesLugar.vue'
import ExploraDest from '@/components/exploraDest.vue'
import LugaresDesta from '@/components/lugaresDesta.vue'
import Ciudades from '@/components/ciudades.vue'
import ScrollPrueba from '@/components/scrollPrueba.vue'
import Perfil from '@/components/perfil.vue'
import CambiarPassword from '@/components/CambiarPassword.vue'
import EditarPerfil from '@/components/EditarPerfil.vue'
import Testimonials from '@/components/testimonials.vue'
import Contacto from '@/components/contacto.vue'
import lugaresFavorito from '@/views/lugaresFavorito.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import PrivacyPolicy from '../components/PrivacyPolicy.vue';
import TermsAndConditions from '../components/TermsAndConditions.vue';

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
        component: ScrollPrueba,
        meta:{ requiresAuth: true}
    },
    
    // {
    //     path: '/perfil',
    //     name: 'perfil',
    //     component: Perfil,
    // },
    // {
    //     path: '/editarPerfil',
    //     name: 'editarPerfil',
    //     component: EditarPerfil
    // },
    // {
    //     path: '/cambiarPassword',
    //     name: 'cambiarPassword',
    //     component: CambiarPassword,
    // },
    {
        path: '/testimonials',
        name: 'testimonials',
        component: Testimonials,
    },
    {
        path: '/contacto',
        name: 'contacto',
        component: Contacto,
    }, {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/lugaresFavorito',
        name: 'lugaresFavorito',
        component: lugaresFavorito,
    },

    {
        path: '/politica-privacidad',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy,
      },
      {
        path: '/terminos-condiciones',
        name: 'TermsAndConditions',
        component: TermsAndConditions,
      },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')); // Verificar si hay un token en las cookies

    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        // Si la ruta requiere autenticación y no hay token, redirigir al login
        next('/login');
    } else {
        next(); // Permitir el acceso
    }
});


export default router

