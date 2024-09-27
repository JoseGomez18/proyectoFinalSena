<template>
  <footer class="footer">
    <div class="inner">
      <!-- Sección de Contacto -->
      <div class="footer-section">
        <h3>Contacto</h3>
        <p> 
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=customerservicetraveelseek@gmail.com&su=Consulta%20TraveelSeek&body=Hola%20equipo%20TraveelSeek," 
            target="_blank"
            rel="noopener noreferrer">
            <i class="fab fa-google"></i> customerservicetraveelseek@gmail.com
          </a>
        </p>
        <p>Teléfono: +57 3044576630</p>
      </div>

      <!-- Sección de Redes Sociales -->
      <div class="footer-section">
        <h3>Redes Sociales</h3>
        <ul>
          <!-- Facebook -->
          <li>
            <a href="https://www.facebook.com/profile.php?id=61566109181784" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook-square"></i> Facebook
            </a>
          </li>
          
          <!-- Twitter -->
          <li>
            <a href="https://twitter.com/Travel_Seek" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter"></i> Twitter
            </a>
          </li>
          
          <!-- Instagram -->
          <li>
            <a href="https://www.instagram.com/travelseek10" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram"></i> Instagram
            </a>
          </li>
        </ul>
      </div>

      <!-- Sección de Enlaces -->
      <div class="footer-section">
        <h3>Enlaces</h3>
        <ul>
          <li><a href="#">Acerca de nosotros</a></li>
          <li><a href="#">Política de privacidad</a></li>
          <li><a href="#">Términos y condiciones</a></li>
        </ul>
      </div>
    </div>

    <!-- Barra Inferior -->
    <div class="bottom-bar">
      <p>&copy; {{ new Date().getFullYear() }} Travel Seek Oficial - Todos los derechos reservados</p>
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


.footer a {
  color: white; 
  text-decoration: none; 
}

.footer a:hover {
  text-decoration: underline; 
}

</style>
