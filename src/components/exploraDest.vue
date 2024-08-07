<template>
  <div class="categorias-destinos">
    <h2>Categorías de Destinos</h2>
    <div class="botones-categorias">
      <button v-for="(categoria, index) in categorias" :key="index" @click="seleccionarCategoria(index)">
        {{ categoria.nombre }}
      </button>
    </div>
    <div class="contenedor-tarjetas">
      <div class="tarjetas-horizontales" ref="horizontalContainer">
        <div class="tarjeta" v-for="(destino, index) in destinosFiltrados" :key="index">
          <img :src="require(`@/assets/${destino.imagen}`)" :alt="destino.nombre" />
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
  name: 'CategoriasDestinos',
  data() {
    return {
      categorias: [
        { nombre: 'Turismo', filtro: 'turismo' },
        { nombre: 'Fiesta', filtro: 'fiesta' },
        { nombre: 'Bosque', filtro: 'bosque' },
        { nombre: 'Relax', filtro: 'relax' },
        { nombre: 'Playa', filtro: 'playa' },
        { nombre: 'City', filtro: 'city' },
        { nombre: 'Romance', filtro: 'romance' },
      ],
      destinos: [
        { nombre: 'Destino 1', imagen: 'imgPrueba.jpg', categorias: ['turismo', 'fiesta', 'city'] },
        { nombre: 'Destino 2', imagen: 'imgPrueba.jpg', categorias: ['bosque', 'relax'] },
        { nombre: 'Destino 3', imagen: 'imgPrueba.jpg', categorias: ['playa', 'city'] },
        { nombre: 'Destino 4', imagen: 'imgPrueba.jpg', categorias: ['turismo', 'fiesta', 'city'] },
        { nombre: 'Destino 5', imagen: 'imgPrueba.jpg', categorias: ['bosque', 'relax'] },
        { nombre: 'Destino 6', imagen: 'imgPrueba.jpg', categorias: ['playa', 'city'] },
      ],
      categoriaSeleccionada: null,
      scrollStep: 300,
    };
  },
  computed: {
    destinosFiltrados() {
      if (!this.categoriaSeleccionada) return this.destinos;
      return this.destinos.filter(destino => destino.categorias.includes(this.categoriaSeleccionada));
    },
  },
  methods: {
    seleccionarCategoria(index) {
      this.categoriaSeleccionada = this.categorias[index].filtro;
      this.$refs.horizontalContainer.scrollLeft = 0;
    },
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
.categorias-destinos {
  padding: 2rem;
  background: var(--color-fondo);
}

.categorias-destinos h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--color-texto);
}

.botones-categorias {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin-bottom: 1rem;
}

.botones-categorias button {
  flex: 1;
  background-color: var(--color-primario);
  color: var(--color-texto-claro);
  border: 1px solid var(--color-borde);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 25px;
  transition: background-color 0.3s ease, transform 0.2s;
}

.botones-categorias button:hover {
  background-color: #4ba2db; /* Un tono más claro del color primario */
  color: #ffffff; /* Blanco, para contraste con el fondo azul claro */
  transform: translateY(-3px);
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
  overflow-x: auto; /* Añadir overflow-x para permitir desplazamiento horizontal */
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
  border-radius: 50%;
}

.btn-prev:hover,
.btn-next:hover {
  background-color: var(--color-primario-oscuro);
}
</style>
