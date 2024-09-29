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
            <a href="#" class="navbar-link" @click.prevent="handleMenuClick('home')">Home</a>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link" @click.prevent="handleMenuClick('exploraDest')">Explora Destinos</a>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link" @click.prevent="handleMenuClick('lugaresDesta')">Lugares Destacados</a>
          </li>
          <li class="navbar-item">
            <router-link to="/lugaresFavorito" class="navbar-logo-link">
              <a class="navbar-link">Favoritos</a>
            </router-link>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link" @click.prevent="handleMenuClick('contacto')">Contacto</a>
          </li>
        </ul>

        <!-- Icono de usuario y menú desplegable -->
        <div class="user-icon-container" @click="toggleUserMenu">
          <img src="@/assets/images.jpeg" alt="User Icon" class="user-icon" />
          <transition name="fade">
            <div class="user-menu" v-if="isUserMenuOpen" @click.stop>
              <ul>
                <li><router-link to="/perfil">Perfil</router-link></li>
                <li><a href="#" @click="logout">Cerrar sesión</a></li>
                <li><router-link to="/configuracion">Configuración</router-link></li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
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
    handleMenuClick(id) {
      // Redirige a la ruta deseada y cierra el menú
      this.scrollTo(id);
      this.isMenuOpen = false; // Cierra el menú al seleccionar un enlace
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
    logout() {
      // Lógica para cerrar sesión
      alert('Cerrar sesión');
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

/* Estilos para los elementos del menú */
.navbar-item {
  margin: 0 1rem; /* Espaciado horizontal uniforme entre elementos */
}

/* Estilos para el menú desplegable en modo móvil */
@media (max-width: 768px) {
  .navbar-list {
    display: flex;
    flex-direction: column; /* Cambiado a columna */
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
  margin-left: 1rem;
}

/* Estilos para el menú desplegable del usuario */
.user-menu {
  position: absolute;
  top: 100%; /* Coloca el menú justo debajo del icono */
  right: 0;
  background: #2b2d42;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1200; /* Asegúrate de que esté por encima */
}

.user-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-menu li {
  margin: 0.5rem 0;
}

.user-menu a {
  color: #ffffff; /* Color de texto del menú */
  text-decoration: none;
  transition: color 0.3s ease;
}

.user-menu a:hover {
  color: #c9c9c9; /* Color al pasar el mouse */
}

/* Transiciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active en <2.1.8 */ {
  opacity: 0;
}
</style>
