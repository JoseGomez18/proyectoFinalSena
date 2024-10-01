<template>
  <div class="lugares-destacados">
    <h2>Lugares Destacados</h2>
    <div v-if="loading">
      <LoadingSpinnerDestinos :loading="loading"/>
    </div>

    <div v-else class="galeria" data-aos="flip-left">
      <div @click="pagina(lugar.id)" class="tarjeta" v-for="(lugar, indice) in lugares" :key="indice" :class="lugar.tamano">
        <img :src="lugar.imagen" :alt="lugar.nombre" />
        <h3 class="nombre-ciudad">{{ lugar.nombre_lugar }}</h3>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import loadingSpinner from './loadingSpinner.vue';
import LoadingSpinnerDestinos from './loadingSpinnerDestinos.vue';

export default {
  components: { loadingSpinner, LoadingSpinnerDestinos },
  name: 'lugaresDestaVue',
  data() {
    return {
      lugares: [],
      tamanosPredefinidos: ['grande', 'mediana', 'grande', 'pequena', 'pequena'], // Tamaños predefinidos
      loading: true
    };
  },
  async created() {
    this.loading=true
    try {
      // IDs de los lugares específicos
      const ids = [17, 2, 3, 4, 5];

      // Hacer la solicitud a la API con los IDs
      const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/lugaresPorIds`, { ids });
      console.log('Datos recibidos de la API:', response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Asignar tamaños predefinidos a los lugares
        this.lugares = response.data.map((lugar, index) => {
        console.log('Lugar:', lugar); // Verifica que cada lugar tenga la propiedad nombre
        return {
          ...lugar,
          tamano: this.tamanosPredefinidos[index % this.tamanosPredefinidos.length],  // Asignar tamaños en orden
        };
      });
      } else {
        console.error('Datos inesperados de la API:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener los lugares:', error);
    }
    finally{
      this.loading=false
    }
  },
methods:{
  pagina(id){
    this.$router.push({ name: 'DetallesLugar', params: { id } });      
  }
}
};
</script>

<style scoped>
/* Contenedor principal */
.lugares-destacados {
padding: 2rem;
background: #2e4b63;
}

/* Título de la sección */
.lugares-destacados h2 {
font-size: 2rem;
margin-bottom: 1.5rem;
text-align: center;
color: white;
}

/* Galería de tarjetas */
.galeria {
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-auto-rows: 140px;
gap: 0.7rem;
}

/* Tarjeta individual */
.tarjeta {
position: relative;
overflow: hidden;
border-radius: 10px;
transition: transform 0.3s ease;
cursor: pointer;
}

/* Efecto de hover en la tarjeta */
.tarjeta:hover {
transform: translateY(-5px);
}

/* Imagen dentro de la tarjeta */
.tarjeta img {
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 10px;
z-index: 1; /* Asegúrate de que la imagen esté detrás del texto */
}

/* Estilos específicos para tamaños de tarjetas */
.tarjeta.grande {
grid-column: span 2;
grid-row: span 2;
}

.tarjeta.mediana {
grid-column: span 2;
grid-row: span 1;
}

.tarjeta.pequena {
grid-column: span 1;
grid-row: span 1;
}

/* Estilo para el nombre del lugar */
.nombre-ciudad {
position: absolute;
bottom: 10px; /* Ajusta este valor según sea necesario */
left: 10px; /* Ajusta este valor según sea necesario */
color: white; /* Cambia a un color visible si es necesario */
font-weight: bold;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Agrega sombra para mejor visibilidad */
z-index: 10; /* Asegúrate de que el texto esté por encima de la imagen */
background: rgba(0, 0, 0, 0.5); /* Agrega un fondo semitransparente si el texto no es legible */
padding: 0.5rem; /* Espaciado alrededor del texto */
border-radius: 5px; /* Redondea las esquinas del fondo */
max-width: calc(100% - 20px); /* Asegúrate de que el texto no se salga de la tarjeta */
box-sizing: border-box; /* Incluye el padding en el ancho total */
}

/* Estilo para el nombre del lugar en tarjetas grandes */
.tarjeta.grande .nombre-ciudad {
font-size: 1.5rem; /* Ajusta el tamaño del texto */
padding: 0.5rem; /* Ajusta el espaciado alrededor del texto */
bottom: 10px; /* Ajusta la posición desde la parte inferior */
left: 10px; /* Ajusta la posición desde el lado izquierdo */
}

/* Estilo para el nombre del lugar en tarjetas medianas */
.tarjeta.mediana .nombre-ciudad {
font-size: 1rem; /* Ajusta el tamaño del texto */
padding: 0.3rem; /* Ajusta el espaciado alrededor del texto */
bottom: 5px; /* Ajusta la posición desde la parte inferior */
left: 5px; /* Ajusta la posición desde el lado izquierdo */
}

/* Estilo para el nombre del lugar en tarjetas pequeñas */
.tarjeta.pequena .nombre-ciudad {
font-size: 0.8rem; /* Ajusta el tamaño del texto */
padding: 0.2rem; /* Ajusta el espaciado alrededor del texto */
bottom: 5px; /* Ajusta la posición desde la parte inferior */
left: 5px; /* Ajusta la posición desde el lado izquierdo */
}

</style>