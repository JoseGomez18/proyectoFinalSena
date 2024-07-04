<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <router-link to="/">MyBrand</router-link>
      </div>
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/" class="text_color">Home</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/about" class="text_color">About</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/services" class="text_color">Services</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/contact" class="text_color">Contact</router-link>
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
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-logo a {
  color: #ffffff;
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

.text_color{
  color: white;
}

.navbar-item {
  margin-left: 1.5rem;
}


.navbar-item a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-item a:hover {
  color: #ffd700;
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
