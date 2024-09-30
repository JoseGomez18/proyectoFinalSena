import { createStore } from 'vuex';

const storedNombre = localStorage.getItem('nombre');
const storedId = localStorage.getItem('id');
const storedCorreo = localStorage.getItem('correo');

export default createStore({
    state: {
        nombre: storedNombre || '',
        id: storedId || '',
        correo: storedCorreo || '',
        // validado: storedValidado || false,
    },
    getters: {
        // obtenerValidacion(state) {
        //     return state.validado
        // },
        obtenerNombre(state) {
            return state.nombre
        },
        obtenerCorreo(state) {
            return state.correo
        },
        obtenerId(state) {
            return state.id
        }
    },
    mutations: {
        // actualizarValidado(state, nuevoValidado) {
        //     state.validado = nuevoValidado
        //     localStorage.setItem('validado', nuevoValidado);
        // },
        actualizarNombre(state, nuevoNombre) {
            localStorage.setItem('nombre', nuevoNombre);
            state.nombre = nuevoNombre
        },
        actualizarCorreo(state, nuevoCorreo) {
            localStorage.setItem('correo', nuevoCorreo);
            state.correo = nuevoCorreo
        },
        actualizarId(state, nuevoId) {
            localStorage.setItem('id', nuevoId);
            state.id = nuevoId
        },
        cerrarSesion(state) {
            localStorage.removeItem('nombre');
            localStorage.removeItem('correo');
            localStorage.removeItem('id');
            state.nombre = '';
            state.correo = '';
            state.id = '';

        }
    },
    actions: {

    }
})