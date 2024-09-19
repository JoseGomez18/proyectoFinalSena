<template>
    <section class="testimonials py-12 px-4 md:px-6">
      <div class="container mx-auto" data-aos="flip-up">
        <h2 class="text-2xl font-bold mb-8">Lo que dicen nuestros clientes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="testimonial-card bg-background rounded-lg shadow-md p-6" v-for="(testimonial, index) in testimonials" :key="index">
            <blockquote>
              <p class="text-muted-foreground mb-4">{{ testimonial.text }}</p>
              <cite class="font-bold">- {{ testimonial.author }}</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "Testimonials",
    data() {
      return {
        testimonials: [
          {
            text: "¡Nuestro viaje a Bali fue una experiencia increíble! Los organizadores se encargaron de todo y pudimos disfrutar al máximo.",
            author: "María, México",
          },
          {
            text: "La ruta por Irlanda superó todas nuestras expectativas. Los paisajes eran impresionantes y la atención al detalle fue excelente.",
            author: "Juan, España",
          },
          {
            text: "Nuestra aventura en Patagonia fue una de las mejores experiencias de nuestras vidas. ¡Gracias por hacer que todo fuera tan fácil!",
            author: "Ana, Argentina",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para la sección de testimonios */
  .testimonials {
    background-color: #2e4b63; /* Color de fondo consistente con lugaresDestaVue */
    padding: 3rem 1rem;
    color: white;
  }
  
  .container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .text-2xl {
    font-size: 2rem;
    text-align: center;
  }
  
  .font-bold {
    font-weight: 700;
  }
  
  .mb-8 {
    margin-bottom: 2rem;
  }
  
  .grid {
    display: grid;
    gap: 1.5rem;
  }
  
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .sm\:grid-cols-2 {
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  
  .lg\:grid-cols-3 {
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  
  .testimonial-card {
    background-color: #1a283b; /* Tono oscuro de la paleta de colores */
    border-radius: 10px;
    padding: 1.5rem;
    transition: transform 0.3s ease;
  }
  
  .testimonial-card:hover {
    transform: translateY(-5px);
  }
  
  .text-muted-foreground {
    color: #90caf9; /* Azul claro de la paleta de colores */
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  </style>
  