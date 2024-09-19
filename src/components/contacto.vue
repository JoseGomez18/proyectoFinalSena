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
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactUs'
  }
  </script>
  
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
  