<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <router-link to="/" class="navbar-logo-link">
          <img src="@/assets/logo.png" alt="Logo" class="navbar-logo-image" />
          PagiTours
        </router-link>
      </div>
      <ul class="navbar-list" :class="{ 'navbar-list-open': isMenuOpen }">
        <li class="navbar-item">
          <router-link 
            to="/" 
            class="navbar-link" 
            :class="{ active: isActive('/') }"
          >Home</router-link>
        </li>
        <li class="navbar-item">
          <router-link 
            to="/exploraDest" 
            class="navbar-link" 
            :class="{ active: isActive('/exploraDest') }"
          >Explora Destinos</router-link>
        </li>
        <li class="navbar-item">
          <router-link 
            to="/lugaresDesta" 
            class="navbar-link" 
            :class="{ active: isActive('/lugaresDesta') }"
          >Lugares Destacados</router-link>
        </li>
        <li class="navbar-item">
          <router-link 
            to="/ciudades" 
            class="navbar-link" 
            :class="{ active: isActive('/ciudades') }"
          >Ciudades</router-link>
        </li>
        <li class="navbar-item navbar-toggle" @click="toggleMenu">
          <span class="navbar-toggle-icon">&#9776;</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
.navbar {
  background: var(--color-gradiente-primario);
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

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

.navbar-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-item {
  margin-left: 1.5rem;
}

.navbar-link {
  color: var(--color-texto-claro);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.navbar-link.active {
  color: var(--color-acento-claro);
  transform: translateY(-3px);
}

.navbar-link:hover {
  color: var(--color-acento-claro);
  transform: translateY(-3px);
}

.navbar-toggle {
  display: none;
}

.navbar-toggle-icon {
  font-size: 1.5rem;
  color: var(--color-texto-claro);
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--color-gradiente-primario);
    padding: 1rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }

  .navbar-list-open {
    transform: translateY(0);
  }

  .navbar-item {
    margin-left: 0;
    margin-top: 1rem;
  }

  .navbar-toggle {
    display: block;
  }
}
</style>
