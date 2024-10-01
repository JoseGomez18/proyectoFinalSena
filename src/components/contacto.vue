<template>
    <section class="contact-section">
      <div class="container" data-aos="flip-up">
        <h2 class="title">Contáctanos</h2>
        <form class="contact-form">
          <div class="form-group">
            <label for="name" class="label">Nombre</label>
            <input id="name" type="text" placeholder="Ingresa tu nombre" class="input" />
          </div>
          <div class="form-group">
            <label for="email" class="label">Correo electrónico</label>
            <input id="email" type="email" placeholder="Ingresa tu correo" class="input" />
          </div>
          <div class="form-group">
            <label for="message" class="label">Mensaje</label>
            <textarea id="message" rows="5" placeholder="Escribe tu mensaje" class="textarea"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="button">Enviar</button>
          </div>
        </form>
      </div>
  <!-- Sección de banner con anuncio -->
  <div class="banner-container">
    <div class="relative">
      <img
        :src="bannerSrc"
        alt="Anuncio Banner"
        class="banner-image"
      />
      <div class="overlay">
        <div class="text-center">
          <p class="banner-text">¿Listo para tu próxima aventura?</p>
          <button class="banner-button" @click="verOfertas">
            Ver Ofertas
          </button>
        </div>
      </div>
      <div class="ad-tag">
        <span>Anuncio</span>
      </div>
    </div>
  </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactUs', // Mantén el nombre que ya tienes
  
    // Añadimos el data() y los métodos
    data() {
      return {
        bannerSrc: require('../assets/publicidadPrueba.jpg') // Ajusta la ruta si es necesario
      };
    },
    methods: {
      verOfertas() {
        // Lógica para redirigir o mostrar ofertas
        alert("Redirigiendo a las ofertas...");
      }
    }
  }
  </script>
  
  <style scoped>
/* Contenedor del banner */
.banner-container {
  margin: 3rem 0;
  background-color: #2c4356;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

/* Imagen del banner */
.banner-image {
  width: 100%;
  height: 10rem;
  object-fit: cover;
  display: block;
}

/* Overlay oscuro que permite ver el texto */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Fondo oscuro semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Asegura que el overlay esté por encima de la imagen */
}

/* Texto dentro del overlay */
.banner-text {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  z-index: 2; /* Asegura que el texto esté visible */
}

/* Botón dentro del overlay */
.banner-button {
  background-color: #4db6ac;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.banner-button:hover {
  background-color: #3a8f88;
}

/* Etiqueta de anuncio */
.ad-tag {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  z-index: 2;
}
</style>

  <style scoped>
  .contact-section {
    padding: 2rem;
    background-color: #2e4b63; /* Color de fondo acorde con la paleta */
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #1a283b; /* Color de fondo para el contenedor */
    border-radius: 8px;
    padding: 2rem;
  }
  
  .title {
    font-size: 1.875rem; /* Equivalente a text-3xl */
    font-weight: 700; /* font-bold */
    margin-bottom: 1.5rem; /* mb-8 */
    color: #ffffff; /* Color blanco para el título */
  }
  
  .form-group {
    margin-bottom: 1.5rem; /* Espaciado entre los grupos de formulario */
  }
  
  .label {
    display: block;
    font-size: 1rem; /* Tamaño de fuente para labels */
    font-weight: 600; /* Font-weight para labels */
    color: #ffffff; /* Color blanco para los labels */
    margin-bottom: 0.5rem; /* Espaciado debajo del label */
  }
  
  .input, .textarea {
    width: 95%;
    padding: 0.75rem; /* Espaciado interno de los inputs */
    border: 1px solid #4caf50; /* Color de borde acorde con la paleta */
    border-radius: 4px;
    background-color: #243b55; /* Color de fondo suave para los inputs */
    color: #ffffff; /* Color blanco para el texto de los inputs */
  }
  
  .input::placeholder, .textarea::placeholder {
    color: #90caf9; /* Color del texto del placeholder */
  }
  
  .button {
    background-color: #4caf50; /* Color del botón acorde con la paleta */
    color: #ffffff; /* Color del texto del botón */
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button:hover {
    background-color: #45a049; /* Color del botón en hover */
  }
  
  /* Estilos Responsivos */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .title {
      font-size: 1.5rem; /* Tamaño de fuente más pequeño para pantallas pequeñas */
    }
    
    .input, .textarea {
      padding: 0.5rem; /* Espaciado interno reducido para pantallas pequeñas */
    }
    
    .button {
      padding: 0.5rem 1rem; /* Tamaño de padding reducido para pantallas pequeñas */
    }
  }
  </style>
  