<template>
    <div class="body">
      <div class="terms-container">
        <h1>Términos y Condiciones de Travel Seek</h1>
        <p>
          Al utilizar los servicios de Travel Seek, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestros servicios.
        </p>
        <p>
          Travel Seek se reserva el derecho de modificar estos términos en cualquier momento. Cualquier cambio será efectivo al ser publicado en nuestro sitio web. Te recomendamos revisar regularmente estos términos.
        </p>
        <p>
          No serás responsable de los daños indirectos, incidentales o consecuentes que resulten del uso de nuestros servicios. Travel Seek no garantiza la disponibilidad continua de nuestros servicios.
        </p>
        <p>
          Al utilizar nuestros servicios, aceptas que la información proporcionada puede estar sujeta a errores y que no garantizamos la precisión o fiabilidad de dicha información.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TermsAndConditions'
  };
  </script>
  
  <style scoped>
  .terms-container {
    max-width: 800px;
    margin: 40px auto; 
    padding: 30px;
    border-radius: 12px;
    background-color: #2c3e50; 
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    color: #ecf0f1; 
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    color: #3498db; 
    margin-bottom: 20px;
  }
  
  p {
    line-height: 1.6;
  }
  
  a {
    color: #1abc9c; 
    text-decoration: underline;
  }
  
  a:hover {
    text-decoration: none;
    color: #16a085; 
  }
  
  
  .body {
    background-color: #003366;
    margin: 0; 
    padding: 0; 
    height: 100vh; 
    display: flex;
    justify-content: center; 
    align-items: center; 
  }
  </style>
  