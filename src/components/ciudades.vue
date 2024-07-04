<template>
  <div class="ciudades-destacadas">
    <h2>Ciudades</h2>
    <div class="contenedor-tarjetas">
      <div class="tarjetas-horizontales" ref="horizontalContainer">
        <div class="tarjeta" v-for="(ciudad, index) in ciudades" :key="index">
          <img :src="require(`@/assets/${ciudad.imagen}`)" :alt="ciudad.nombre" />
        </div>
      </div>
      <div class="controles">
        <button class="btn-prev" @click="scrollHorizontal('left')">←</button>
        <button class="btn-next" @click="scrollHorizontal('right')">→</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CiudadesDestacadas',
  data() {
    return {
      ciudades: [
        { nombre: 'Ciudad 1', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 2', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 3', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 1', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 2', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 3', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 1', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 2', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 3', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 1', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 2', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 3', imagen: 'imgPrueba.jpg' },
      ],
      currentIndex: 0,
      scrollStep: 300, // Ancho de desplazamiento por paso
    };
  },
  methods: {
    scrollHorizontal(direction) {
      const container = this.$refs.horizontalContainer;
      if (direction === 'left') {
        container.scrollLeft -= this.scrollStep;
      } else {
        container.scrollLeft += this.scrollStep;
      }
    },
  },
};
</script>

<style scoped>
.ciudades-destacadas {
  padding: 2rem;
  background: #f5f5f5;
}

.ciudades-destacadas h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.contenedor-tarjetas {
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.tarjetas-horizontales {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem; /* Espacio adicional para el control */
}

.tarjeta {
  flex: 0 0 300px; /* Ancho fijo de cada tarjeta */
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.tarjeta img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.controles {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.btn-prev,
.btn-next {
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-prev:hover,
.btn-next:hover {
  background-color: #f0f0f0;
}
</style>
