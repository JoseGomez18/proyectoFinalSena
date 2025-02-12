<template>
  <div class="detalles-lugar">
    <navBar></navBar>
    <div v-if="isLoading" class="loading">
      <loadingSpinnerPantalla :disabled="isLoading" />
    </div>
    <div class="container" v-else>
      <h1 class="titulo">Detalles del lugar</h1>

      <div class="contenido">
        <!-- Imagen del lugar -->
        <div class="imagen-lugar">
          <img :src="lugar.imagen || '/placeholder.svg?height=400&width=600'" alt="Imagen del lugar" class="imagen" />
        </div>
        
        <!-- Información del lugar -->
        <div class="informacion">
          <h2 class="nombre-lugar">{{ lugar.nombre_lugar || 'Nombre del lugar' }}</h2>
          
          <div class="clima">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="clima-text">{{ lugar.clima || 'Clima: Desconocido' }}</span>
          </div>
          
          <p class="descripcion">{{ lugar.descripcion || 'Descripción no disponible' }}</p>

          <button @click="chat()" class="btn-explorar">Volver al chat</button>
        </div>
      </div>
      
      <!-- Actividades -->
      <div class="actividades">
        <h3 class="titulo-actividades">Actividades</h3>
        <div class="grid-actividades">
          <div v-for="actividad in lugar.actividades" :key="actividad.nombre_actividad" class="card-actividad">
            <img :src="actividad.imagen_actividad || '/placeholder.svg?height=200&width=300'" alt="Imagen de la actividad" class="imagen-actividad" />
            <div class="card-header">
              <h4 class="titulo-actividad">{{ actividad.nombre_actividad || 'Nombre de la actividad' }}</h4>
              <p class="descripcion-actividad">{{ actividad.descripcion_actividad || 'Descripción no disponible' }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="container_hoteles">
        <h3>Hoteles sugeridos</h3>
        <div class="carousel-container">
          <!-- <button class="carousel-btn left" @click="scrollLeft">
            ←
          </button> -->
          <div class="control-left">
           <button class="btn-prev" @click="scrollLeft">←</button>
         </div>
          <div class="carousel">
            <div class="carousel-item" v-for="hotel in hoteles" :key="hotel.id">
              <a :href="hotel.enlace">
                <img :src="hotel.imagen || '/placeholder.svg?height=200&width=300'" alt="Imagen del hotel" />
                <div>
                  <h4>{{ hotel.nombre_hotel || 'Nombre del hotel' }}</h4>
                  <i class="fa-solid fa-star color"></i><i class="fa-solid fa-star color"></i><i class="fa-solid fa-star color"></i>
                  <p>2 noches por: ${{ hotel.precio }} COP</p>
                </div>
              </a>
            </div>
          </div>
          

          <!-- <button class="carousel-btn right" @click="scrollRight">
            →
          </button> -->
          <div class="control-right">
            <button class="btn-next" @click="scrollRight">→</button>
          </div>
        </div>
      </div>

    </div>
    <!-- <div v-else class="error">{{ error || 'Error al cargar los detalles del lugar' }}</div> -->
  </div>
</template>

<script>
import axios from 'axios';
import navBar from '../components/navBar.vue';
import loadingSpinnerPantalla from '@/components/loadingSpinnerPantalla.vue';


export default {
  name: 'DetallesLugar',
  data() {
    return {
      lugar: null,
      hoteles: null,
      error: null,
      isLoading: true,
    };
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods:{
    cambiarEstado(valEsta) {
      this[valEsta] = !this[valEsta];
    },
    chat(){
      this.$router.push({ name: 'home', query: { showVideo: false, showChat: true }  });          
    },
    scrollLeft() {
      const carousel = this.$el.querySelector('.carousel');
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    },
    scrollRight() {
      const carousel = this.$el.querySelector('.carousel');
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  },
  async created() {
    try {
      const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/detallesLugar `, { id: this.id });
      const hoteles = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/hotelesLugar `, { id: this.id });

      console.log('Datos recibidos de la API:', response.data);

      if(hoteles){
        console.log(hoteles)
        this.hoteles = hoteles.data
      }else{
        console.error('Datos inesperados de la API:', hoteles.data);
        this.error = 'Datos inesperados recibidos de la API.';
      }

      if (Array.isArray(response.data) && response.data.length > 0) {
        this.lugar = response.data[0];
        this.isLoading = false
      } else {
        console.error('Datos inesperados de la API:', response.data);
        this.error = 'Datos inesperados recibidos de la API.';
      }
    } catch (error) {
      this.error = 'Error al obtener los detalles del lugar: ' + error.message;
      console.error('Error al obtener los detalles del lugar:', error);
    } finally {
      this.isLoading = false
    }
  },
  components: {
    loadingSpinnerPantalla,navBar
  }
};
</script>

<style scoped>
/* Contenedor principal */
.detalles-lugar {
  background-color: #1e2a3a;
  color: #a3b3c7;
  min-height: 100vh;
  padding: 2rem;
}

/* Contenedor central */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  margin-top: 70px;
}

/* Título principal */
.titulo {
  font-size: 2rem;
  font-weight: bold;
  color: #4fd1c5;
  margin-bottom: 1.5rem;
}

/* Contenedor de la imagen y la información */
.contenido {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* Imagen del lugar */
.imagen-lugar {
  border-radius: 0.5rem;
  overflow: hidden;
}

.imagen {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* Información del lugar */


/* Nombre del lugar */
.nombre-lugar {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

/* Clima */
.clima {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #4fd1c5;
}

.clima-text {
  font-size: 1.125rem;
  color: #fff;
}

/* Descripción */
.descripcion {
  color: #a3b3c7;
  margin-bottom: 1rem;
}

/* Botón explorar */
.btn-explorar {
  background-color: #4fd1c5;
  color: #1e2a3a;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-explorar:hover {
  background-color: #3ab7ac;
}

/* Sección de actividades */
.actividades {
  margin-top: 2rem;
}

/* Título de actividades */
.titulo-actividades {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

/* Contenedor de actividades */
.grid-actividades {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

/* Tarjeta de actividad */
.card-actividad {
  background-color: #2d3c4e;
  border: none;
  border-radius: 0.375rem;
  overflow: hidden;
}

/* Imagen de actividad */
.imagen-actividad {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Cabecera de la tarjeta */
.card-header {
  padding: 0.75rem;
}

/* Título y descripción de la actividad */
.titulo-actividad {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.descripcion-actividad {
  color: #a3b3c7;
}

/* Contenedor del carrusel */
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: scroll; /* Habilitar desplazamiento horizontal */
  scroll-behavior: smooth;
  padding: 1rem 0;
  width: 100%;
  scrollbar-width: none; /* Firefox */
}

.carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari y otros navegadores WebKit */
}

.carousel-item { 
  flex: 0 0 auto; /* Permite que los elementos se ajusten automáticamente */
  width: 350px; 
  background-color: #2d3c4e;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1.1);

}

.carousel-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.carousel-item h4 {
  color: #ffffff;
  font-size: 1.25rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
}

.carousel-item p {
  color: #c0c0c0;
  font-size: 1rem;
  padding: 0 1rem 1rem;
}

.carousel-item a{
  text-decoration: none;
}

/* Botones de navegación */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 2rem;
  z-index: 1;
  transition: background-color 0.3s;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel-btn.left {
  left: -1rem;
}

.carousel-btn.right {
  right: -1rem;
}

/* Animaciones de hover en las tarjetas */
.carousel-item:hover {
  transform: scale(1.05);
}

.container_hoteles h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #ffffff;
    text-align: center;
}

/* Mensaje de carga */
.loading {
  color: #fff;
  text-align: center;
  margin-top: 2rem;
}

/* Mensaje de error */
.error {
  color: #f56565;
  text-align: center;
  margin-top: 2rem;
}

/* Controles de navegación (izquierda y derecha) */
.control-left, .control-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1; /* Asegurar que estén sobre las tarjetas */
}

/* Botones de navegación a la izquierda */
.control-left {
  left: 0;
}

/* Botones de navegación a la derecha */
.control-right {
  right: 0;
}

/* Estilo de los botones de navegación */
.control-left .btn-prev, .control-right .btn-next {
  background-color: #1e40af; /* Fondo azul */
  color: white; /* Texto blanco */
  border: none; /* Sin borde */
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.2s;
}

/* Efecto hover en los botones de navegación */
.control-left .btn-prev:hover, .control-right .btn-next:hover {
  background-color: #374151; /* Color secundario */
  transform: scale(1.1);
}
.color{
  color: #f3f301f0;
}
/* Responsividad */
@media (min-width: 768px) {
  .contenido {
    grid-template-columns: 1fr 1fr;
  }

  .grid-actividades {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .titulo {
    font-size: 1.5rem;
  }

  .nombre-lugar {
    font-size: 1.25rem;
  }

  .clima-text {
    font-size: 1rem;
  }

  .descripcion {
    font-size: 0.875rem;
  }

  .btn-explorar {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  .titulo-actividades {
    font-size: 1.25rem;
  }

  .titulo-actividad {
    font-size: 1.125rem;
  }

  
}
</style>