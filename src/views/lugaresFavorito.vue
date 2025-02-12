<template>
  <div class="favorites-section">
    <navBar></navBar>
    <h2 class="title">Mis Destinos Favoritos</h2>

    <div class="flex-container" v-if="favoritePlaces.length">
      <div class="card-container">
        <transition name="fade" mode="out-in">
          <div class="card-content" :key="currentIndex">
            <img
              :src="favoritePlaces[currentIndex].imagen"
              :alt="favoritePlaces[currentIndex].nombre_lugar"
              class="large-image"
            />
            <button class="nav-button left" @click="prevSlide">◀</button>
            <button class="nav-button right" @click="nextSlide">▶</button>
          </div>
        </transition>

        <div class="card-footer">
          <div class="card-header">
            <h3 class="place-name">{{ favoritePlaces[currentIndex].nombre_lugar }}</h3>
          </div>
          <p class="description">{{ favoritePlaces[currentIndex].descripcion }}</p>
          <div class="tags">
            <span v-for="tag in favoritePlaces[currentIndex].tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <!-- Botón "Ver más" centrado -->
          <div class="ver-mas-container"  :key="currentIndex">
               <button class="ver-mas-button" @click="pagina(favoritePlaces[currentIndex].lugar_id)">Ver más</button>
          </div>
        </div>
      </div>

      <div class="scroll-area">
        <div class="favorites-list">
          <div
            v-for="(lugares, index) in favoritePlaces"
            :key="lugares.id"
            class="small-card"
            :class="{ active: index === currentIndex }"
            @click="setCurrentIndex(index)"
          >
            <img :src="lugares.imagen" :alt="lugares.nombre_lugar" class="small-image" />
            <div class="small-card-content">
              <h4 class="small-place-name">{{ lugares.nombre_lugar }}</h4>
              <!-- Botón de eliminar mejorado -->
              <button @click="eliminar(lugares.lugar_id)" class="delete-button">❌</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-favorites">
      <p>No tienes destinos favoritos aún.</p>
    </div>

    <div class="footer" v-if="favoritePlaces.length">
      <span class="footer-text">Mostrando {{ favoritePlaces.length }} destinos favoritos</span>
      <button class="tips-button">📝 Consejos de viaje</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import navBar from '../components/navBar.vue';
import axios from 'axios';

export default {
  data() {
    return {
      currentIndex: 0,
      favoritePlaces: [],
      idUser: this.id
    };
  },
  mounted() {
    this.fetchFavoritePlaces();
  },
  methods: {
    async fetchFavoritePlaces() {
      const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/obtenerFav`, { idUser: this.id });
      this.favoritePlaces = response.data.lugares;
      console.log(response.data);
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.favoritePlaces.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.favoritePlaces.length) % this.favoritePlaces.length;
    },
    setCurrentIndex(index) {
      this.currentIndex = index;
    },
    async eliminar(idLugar) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/eliminarFav`, { idUser: this.id, idLugar:idLugar });
          // Verifica si la respuesta es exitosa antes de actualizar la lista local
    if (response.status === 200) {
      // Elimina el lugar del array local
      this.favoritePlaces = this.favoritePlaces.filter(lugar => lugar.lugar_id !== idLugar);
      
      // Si el lugar eliminado es el que estaba siendo mostrado, actualiza el índice
      if (this.currentIndex >= this.favoritePlaces.length) {
        this.currentIndex = this.favoritePlaces.length - 1; // Asegúrate de no salir del rango
      }
    }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
   pagina(id) {
     this.$router.push({ name: 'DetallesLugar', params: { id } });
     console.log(id)
   }
  },
  computed: {
  // Esto mapea el getter 'obtenerCorreo' a la propiedad computada 'correo'
  ...mapGetters(['obtenerCorreo','obtenerId']),

  id() {
    return this.obtenerId || null; // o cualquier valor predeterminado que prefieras
  }
 },
  components: {
    navBar
  }
};
</script>

<style scoped>
.favorites-section {
  background-color: #2e4b63;
  min-height: 100vh;
  padding: 1.5rem;
  color: white;
  margin-top: 2.2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #4fd1c5;
  margin-bottom: 1.5rem;
}

.flex-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

.card-container {
  width: 40%;
  flex-grow: 2;
  background-color: #2d3748;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  overflow: hidden;
}

.card-content {
  position: relative;
  transition: all 0.5s ease;
}

.large-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
}

.nav-button.left {
  left: 0.5rem;
}

.nav-button.right {
  right: 0.5rem;
}

.card-footer {
  padding: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.place-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4fd1c5;
}

.description {
  color: white;
  margin-bottom: 0.2rem;
}

.ver-mas-container {
  display: flex;
  justify-content: center;
}

.ver-mas-button {
  background-color: #4fd1c5;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  margin-top: 1rem;
  border-radius: 0.5rem;
}

.scroll-area {
  flex-grow: 1;
  height: calc(100vh - 200px); /* Altura ajustada para el contenedor con scroll */
  overflow-y: auto; /* Habilita el scroll vertical */
}


.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.small-card {
  background-color: #1a202c;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  align-items: center;
}

.small-card.active {
  border: 2px solid #4fd1c5;
}

.small-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.small-card-content {
  margin-left: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.small-place-name {
  font-size: 1rem;
  font-weight: bold;
  color: #4fd1c5;
}

/* Estilo mejorado para el botón de eliminar */
.delete-button {
  background-color: #000000;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.delete-button:hover {
  background-color: #c53030;
  transform: scale(1.1);
}

.delete-button:active {
  transform: scale(0.95);
}

.no-favorites {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.footer-text {
  color: white;
}

.tips-button {
  background-color: #4fd1c5;
  color: white;
  border: none;
  padding: 0.8rem 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
}

/* Media Queries para hacer el diseño más responsivo */
@media (max-width: 768px) {
  /* En pantallas menores a 768px (tablets y dispositivos similares) */
  
  /* Cambiamos la dirección del contenedor para que las tarjetas se alineen en columna */
  .flex-container {
    flex-direction: column;
  }
  
  /* Ajustamos el tamaño de la imagen principal */
  .large-image {
    height: 250px;
  }

  /* Reducimos el tamaño de las tarjetas pequeñas */
  .small-image {
    width: 80px;
    height: 60px;
  }

  /* Alineamos el contenido de las tarjetas pequeñas en columna */
  .small-card-content {
    flex-direction: column;
    align-items: flex-start;
  }

  /* Ajustamos la altura del área de scroll para ocupar mejor el espacio */
  .scroll-area {
    height: auto;
    max-height: 400px; /* Altura limitada para evitar que ocupe demasiado espacio */
  }
}

@media (max-width: 480px) {
  /* En pantallas menores a 480px (móviles) */

  /* Reducimos el tamaño del título */
  .title {
    font-size: 1.5rem;
  }

  /* Reducimos aún más la altura de la imagen principal */
  .large-image {
    height: 200px;
  }

  /* Ajustamos el tamaño de las imágenes pequeñas para pantallas muy pequeñas */
  .small-image {
    width: 70px;
    height: 50px;
  }

  /* Ajustamos el tamaño del botón "Ver más" para móviles */
  .ver-mas-button {
    padding: 0.2rem 0.5rem;
  }

  /* Ajustamos el botón de consejos para que no ocupe tanto espacio */
  .tips-button {
    padding: 0.6rem 0.8rem;
  }

  /* Reducimos el tamaño del footer */
  .footer {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  /* Ajustamos el texto del footer */
  .footer-text {
    font-size: 0.9rem;
  }
}

</style>