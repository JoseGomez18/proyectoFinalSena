<template>
  <footer class="footer">
    <div class="inner">
      <div class="footer-section">
        <h3>Contacto</h3>
        <p>Email: contacto@gmail.com</p>
        <p>Teléfono: +1234567890</p>
      </div>
      <div class="footer-section">
        <h3>Redes Sociales</h3>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Enlaces</h3>
        <ul>
          <li><a href="#">Acerca de nosotros</a></li>
          <li><a href="#">Política de privacidad</a></li>
          <li><a href="#">Términos y condiciones</a></li>
        </ul>
      </div>
    </div>
    <div class="bottom-bar">
      <p>&copy; {{ new Date().getFullYear() }} Santiago - Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background: #1a283b;
  color: white;
  padding: 2rem 0;
}

.inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1 1 300px;
  margin-bottom: 1.5rem;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.footer-section p,
.footer-section ul {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.footer-section ul {
  padding-left: 0;
}

.footer-section ul li {
  list-style-type: none;
}

.footer-section ul li a {
  color: var(--color-texto-claro);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: var(--color-primario-claro); /* O cualquier tono más claro o secundario */
}

.bottom-bar {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--color-borde);
}

.bottom-bar p {
  font-size: 0.9rem;
}
</style>
