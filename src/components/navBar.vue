<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <router-link to="/">PagiTours</router-link>
      </div>
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/" class="navbar-link">Home</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/lugaresDest" class="navbar-link">Lugares Destacados</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/services" class="navbar-link">Ciudades</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/contact" class="navbar-link">Explorar</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background: var(--color-gradiente-primario);
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px; 
  border-bottom-right-radius: 10px; 
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-logo a,
.navbar-logo router-link {
  color: var(--color-texto-claro);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
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
  transition: color 0.3s ease;
  cursor: pointer;
}

.navbar-link:hover {
  color: var(--color-acento-claro);
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
  }
  .navbar-list {
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  .navbar-item {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
