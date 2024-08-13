<template>
  <div class="categorias-destinos">
    <h2>Categorías de Destinos</h2>
    <div class="botones-categorias">
      <button @click="seleccionarCategoria(null)" :class="{ active: categoriaSeleccionada === null }">Todas</button>
      <button v-for="(categoria, index) in categorias" :key="index" @click="seleccionarCategoria(categoria.filtro)" :class="{ active: categoriaSeleccionada === categoria.filtro }">
        <span class="emoji">{{ categoria.emoji }}</span>
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
        { nombre: 'Todas', filtro: null, emoji: '🌍' },
        { nombre: 'Turismo', filtro: 'turismo', emoji: '🌄' },
        { nombre: 'Fiesta', filtro: 'fiesta', emoji: '🎉' },
        { nombre: 'Bosque', filtro: 'bosque', emoji: '🌳' },
        { nombre: 'Relax', filtro: 'relax', emoji: '😌' },
        { nombre: 'Playa', filtro: 'playa', emoji: '🏖️' },
        { nombre: 'City', filtro: 'city', emoji: '🌆' },
        { nombre: 'Romance', filtro: 'romance', emoji: '❤️' },
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
    seleccionarCategoria(filtro) {
      this.categoriaSeleccionada = filtro;
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
  padding: 1.5rem;
  background: var(--color-fondo);
  border-radius: 10px;
}

.categorias-destinos h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: left;
  color: var(--color-texto);
}

.botones-categorias {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.botones-categorias button {
  background-color: white;
  color: var(--color-texto);
  border: 1px solid var(--color-primario);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease, transform 0.2s;
}

.botones-categorias button .emoji {
  font-size: 1.2rem;
}

.botones-categorias button.active {
  background-color: var(--color-primario);
  color: white;
}

.botones-categorias button:hover {
  background-color: var(--color-secundario);
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
  overflow-x: auto;
}

.tarjeta {
  flex: 0 0 250px;
  background: white;
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
  background-color: white;
  color: var(--color-texto);
  border: 1px solid var(--color-primario);
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-prev:hover,
.btn-next:hover {
  background-color: var(--color-secundario);
}
</style>
