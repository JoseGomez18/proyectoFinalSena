<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo-link">
        <img src="../../public/favicon.jpeg" alt="Logo" class="navbar-logo-image" />
        TravelSeek
      </router-link>

      <div class="navbar-controls">
        <!-- Botón de menú de hamburguesa -->
        <div class="navbar-toggle" @click="toggleMenu">
          <span class="navbar-toggle-icon">&#9776;</span>
        </div>

        <!-- Menú de navegación desplegable -->
        <ul class="navbar-list" :class="{ 'navbar-list-open': isMenuOpen }">
          <li class="navbar-item">
            <a href="#" class="navbar-link" @click.prevent="scrollTo('home')">Home</a>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link" @click.prevent="scrollTo('exploraDest')">Explora Destinos</a>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link" @click.prevent="scrollTo('lugaresDesta')">Lugares Destacados</a>
          </li>
          <li v-if="correo" class="navbar-item">
            <router-link to="/lugaresFavorito" class="navbar-logo-link">
        
              <a class="navbar-link">Favoritos</a>
            </router-link>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link" @click.prevent="scrollTo('contacto')">Contacto</a>
          </li>
          <!-- Icono de usuario y menú desplegable -->
          <div v-if="correo" class="user-icon-container" @click="toggleUserMenu">
            <i class="fa-solid fa-user icon"></i>
            <p>{{ correo }}</p>
            <transition name="fade">
              <div
                class="user-menu"
                v-if="isUserMenuOpen"
                @click.stop
              >
                <ul>
                  <li><router-link to="/perfil">Perfil</router-link></li>
                  <li><a href="#" @click="logout">Cerrar sesión</a></li>
                </ul>
              </div>
            </transition>
          </div>
          <li v-else class="navbar-item">
              <router-link to="/login" class="navbar-logo-link">
          
                <a class="navbar-link">Login</a>
              </router-link>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false,
      isUserMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      // Cierra el menú de usuario si está abierto
      if (this.isUserMenuOpen) {
        this.isUserMenuOpen = false;
      }
      // Alterna el menú de navegación
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleUserMenu() {
      // Cierra el menú de navegación si está abierto
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }
      // Alterna el menú de usuario
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    scrollTo(id) {
      // Redirige a la ruta deseada
      this.$router.push({ path: '/' }).then(() => {
        // Una vez redirigido, realiza el desplazamiento
        this.$nextTick(() => {
          const element = document.getElementById(id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 60, // Ajusta aquí según la altura del navbar
              behavior: 'smooth'
            });
          }
        });
      });
    },
    isActive(route) {
      return this.$route.path === route;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isMenuOpen = false;
        this.isUserMenuOpen = false;
      }
    },
    ...mapMutations(['cerrarSesion']),
    logout() {
      this.cerrarSesion(); 
      alert('Cerrar sesión');
    }
  },
  computed: {
  // Esto mapea el getter 'obtenerCorreo' a la propiedad computada 'correo'
  ...mapGetters(['obtenerNombre']),

  // Puedes renombrar la propiedad si lo deseas:
  correo() {
    return this.obtenerNombre || false;
  } 
 },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Estilos generales del navbar */
.navbar {
  background: #1a283b;
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Contenedor de la barra de navegación */
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
}

.navbar-controls {
  display: flex;
  align-items: center;
}

/* Estilos para el botón de menú de hamburguesa */
.navbar-toggle {
  display: none;
  margin-right: 1rem;
  z-index: 1100;
}

.navbar-toggle-icon {
  font-size: 1.5rem;
  color: var(--color-texto-claro);
  cursor: pointer;
}

/* Estilos para el logo y el nombre */
.navbar-logo-link {
  display: flex;
  align-items: center;
  color: var(--color-texto-claro);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.navbar-logo-image {
  width: 40px;
  height: auto;
  margin-right: 0.5rem;
}

/* Estilos para la lista de enlaces en modo escritorio */
.navbar-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease;
  pointer-events: none; /* Evita clics cuando está oculto en móvil */
}

.icon{
  color: rgb(125, 211, 252);
  ;
    margin-right: 8px;
}

.user-icon-container p{
  color: rgb(125, 211, 252);

}

/* Mostrar lista de enlaces en modo escritorio */
@media (min-width: 769px) {
  .navbar-list {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    pointer-events: auto; /* Permite clics en modo escritorio */
  }

  .navbar-toggle {
    display: none;
  }

  .user-icon-container {
    margin-left: 1rem;
  }
}

/* Estilos para el menú desplegable en modo móvil */
@media (max-width: 768px) {
  .navbar-list {
    display: flex;
    align-items: center;
    position: fixed;
    top: 60px; /* Ajusta según la altura del navbar */
    left: 0;
    right: 0;
    background: #2b2d42;
    padding: 1rem 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transform: translateY(-100%);
    opacity: 0;
    z-index: 1000;
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    flex-direction: row;
    justify-content: space-around;
    pointer-events: none; /* Evita clics cuando está oculto en móvil */
  }

  .navbar-list-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto; /* Permite clics cuando está visible en móvil */
  }

  .navbar-toggle {
    display: block;
  }

  .user-icon-container {
    margin-left: 1rem;
  }
}

/* Estilos para los enlaces de navegación */
.navbar-link {
  color: rgb(125, 211, 252);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  margin: 0.5rem 1rem; /* Ajustar espaciado: vertical y horizontal */
}

/* Efecto de enlace activo y hover */
.navbar-link.active {
  transform: translateY(-3px);
}

.navbar-link:hover {
  color: grey;
  transform: translateY(-3px);
}

/* Estilos para el contenedor del icono de usuario */
.user-icon-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1100;
}

.user-icon {
  width: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

/* Transición de desvanecimiento para el menú del usuario */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Estilos para el menú desplegable del usuario */
.user-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: #2b2d42;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1200;
  border: 1px solid #1a283b;
  width: 200px;
  transition: opacity 0.3s ease;
}

.user-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.user-menu li {
  padding: 0.75rem 1rem;
}

.user-menu li a {
  color: #fff;
  text-decoration: none;
  display: block;
}

.user-menu li a:hover {
  background: #1a283b;
}
</style>
