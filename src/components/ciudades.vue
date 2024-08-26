<template>
  <div class="ciudades-destacadas">
    <h2>Ciudades Destacadas</h2>
    <div class="contenedor-tarjetas">
      <div class="tarjetas-horizontales" ref="horizontalContainer">
        <div class="tarjeta" v-for="(ciudad, index) in ciudades" :key="index">
          <img :src="require(`@/assets/${ciudad.imagen}`)" :alt="ciudad.nombre" />
          <div class="contenido-tarjeta">
            <h3>{{ ciudad.nombre }}</h3>
          </div>
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
        { nombre: 'Ciudad 4', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 5', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 6', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 7', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 8', imagen: 'imgPrueba.jpg' },
        { nombre: 'Ciudad 9', imagen: 'images.jpeg' },
        { nombre: 'Ciudad 10', imagen: 'imgPrueba.jpg' },
      ],
      scrollStep: 300,
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
      this.updateCurrentIndex();
    },
    updateCurrentIndex() {
      const container = this.$refs.horizontalContainer;
      const index = Math.round(container.scrollLeft / this.scrollStep);
      console.log('Current Index:', index); // Depuración
    },
  },
};
</script>

<style scoped>
.ciudades-destacadas {
  padding: 2rem;
  background: var(--color-gradiente-primario);
}

.ciudades-destacadas h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
}

.contenedor-tarjetas {
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.tarjetas-horizontales {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  scroll-behavior: smooth;
  overflow-x: auto; /* Permitir desplazamiento horizontal */
}

.tarjeta {
  flex: 0 0 300px;
  background: var(--color-fondo-claro);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.tarjeta:hover {
  transform: translateY(-5px);
}

.tarjeta img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.contenido-tarjeta {
  padding: 0.5rem;
  text-align: center;
  color: var(--color-texto-claro);
  background: var(--color-secundario);
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
  background-color: var(--color-primario);
  color: var(--color-texto-claro);
  border: 1px solid var(--color-borde);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-prev:hover,
.btn-next:hover {
  background-color: var(--color-primario-oscuro);
}
</style>
