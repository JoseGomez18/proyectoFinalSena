<template>
  <div ref="destino" class="categorias-destinos">
    <!-- Título de la sección -->
    <h2>Categorías de Destinos</h2>

    <!-- Contenedor de botones de categorías -->
    <div class="botones-categorias">
      <!-- Botón para todas las categorías -->
      <button 
        @click="seleccionarCategoria(null)" 
        :class="{ active: categoriaSeleccionada === null }">
        🌍 Todas
      </button>
      
      <!-- Botones para categorías individuales -->
      <button 
        v-for="(categoria, index) in categorias" 
        :key="index" 
        @click="seleccionarCategoria(categoria.filtro)" 
        :class="{ active: categoriaSeleccionada === categoria.filtro }">
        <span class="emoji">{{ categoria.emoji }}</span>
        {{ categoria.nombre }}
      </button>
    </div>

    <!-- Contenedor de tarjetas con destinos -->
    <div class="contenedor-tarjetas">
      <!-- Controles de navegación a la izquierda -->
      <div class="control-left">
        <button class="btn-prev" @click="scrollHorizontal('left')">←</button>
      </div>

      <!-- Contenedor horizontal para tarjetas -->
      <div class="tarjetas-horizontales" ref="horizontalContainer">
        <!-- Tarjetas de destinos -->
        <div class="tarjeta" v-for="(destino, index) in destinosFiltrados" :key="index">
          <img :src="require(`@/assets/${destino.imagen}`)" :alt="destino.nombre" />
          <div class="info-overlay">
            <h3>{{ destino.nombre }}</h3>
           <!-- <p>Descripción breve del lugar.</p>-->
          </div>
        </div>
      </div>
      
      <!-- Controles de navegación a la derecha -->
      <div class="control-right">
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
      // Datos de categorías
      categorias: [
        { nombre: 'Turismo', filtro: 'turismo', emoji: '🌄' },
        { nombre: 'Fiesta', filtro: 'fiesta', emoji: '🎉' },
        { nombre: 'Bosque', filtro: 'bosque', emoji: '🌳' },
        { nombre: 'Relax', filtro: 'relax', emoji: '😌' },
        { nombre: 'Playa', filtro: 'playa', emoji: '🏖️' },
        { nombre: 'City', filtro: 'city', emoji: '🌆' },
        { nombre: 'Romance', filtro: 'romance', emoji: '❤️' },
      ],
      // Datos de destinos
      destinos: [
        { nombre: 'Destino 1', imagen: 'dubai.jpg', categorias: ['turismo', 'fiesta', 'city'] },
        { nombre: 'Destino 2', imagen: 'estambul.jpg', categorias: ['bosque', 'relax'] },
        { nombre: 'Destino 3', imagen: 'imgPrueba.jpg', categorias: ['playa', 'city'] },
        { nombre: 'Destino 4', imagen: 'londres.jpg', categorias: ['turismo', 'fiesta', 'city'] },
        { nombre: 'Destino 5', imagen: 'paris.jpg', categorias: ['bosque', 'relax'] },
        { nombre: 'Destino 6', imagen: 'imgPrueba.jpg', categorias: ['playa', 'city'] },
      ],
      categoriaSeleccionada: null,
      scrollStep: 300,
    };
  },
  computed: {
    // Filtrar destinos según la categoría seleccionada
    destinosFiltrados() {
      if (!this.categoriaSeleccionada) return this.destinos;
      return this.destinos.filter(destino => destino.categorias.includes(this.categoriaSeleccionada));
    },
  },
  methods: {
    // Cambiar categoría seleccionada y reiniciar el scroll
    seleccionarCategoria(filtro) {
      this.categoriaSeleccionada = filtro;
      this.$refs.horizontalContainer.scrollLeft = 0;
    },
    // Navegar horizontalmente en el contenedor de tarjetas
    scrollHorizontal(direction) {
      const container = this.$refs.horizontalContainer;
      const scrollAmount = this.scrollStep;
      let start = container.scrollLeft;
      let end = direction === 'left' ? start - scrollAmount : start + scrollAmount;
      let startTime = performance.now();

      function animateScroll(currentTime) {
        let timeElapsed = currentTime - startTime;
        let progress = Math.min(timeElapsed / 300, 1); // 300ms para la animación

        container.scrollLeft = start + (end - start) * progress;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          container.scrollLeft = end;
        }
      }

      requestAnimationFrame(animateScroll);
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.categorias-destinos {
  padding: 1.5rem;
  background-color: #263f58; /* Color de fondo */
}

/* Estilo del título */
.categorias-destinos h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
  color: white;
}

/* Contenedor de botones de categorías */
.botones-categorias {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; /* Permitir desplazamiento horizontal */
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: flex-start; /* Alinear los botones al inicio */
  position: relative; /* Añadido para el z-index */
  z-index: 2; /* Asegurar que esté por encima de las tarjetas */
  background-color: #263f58; /* Fondo para asegurar visibilidad */
}

/* Estilo de los botones de categorías */
.botones-categorias button {
  background-color: transparent; /* Fondo transparente */
  color: white; /* Texto blanco */
  border: 1px solid #2d5173; /* Borde blanco */
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease, transform 0.2s;
  white-space: nowrap; /* Evitar el ajuste de línea dentro del botón */
}

/* Tamaño del emoji dentro del botón */
.botones-categorias button .emoji {
  font-size: 1.2rem;
}

/* Estado activo del botón */
.botones-categorias button.active {
  background-color: #1e40af; /* Fondo azul */
  color: white; /* Texto blanco */
}

/* Efecto hover en los botones */
.botones-categorias button:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Fondo ligeramente visible */
}

/* Contenedor de tarjetas */
.contenedor-tarjetas {
  position: relative;
  overflow: hidden;
  height: 164px; /* Altura fija del contenedor */
}

/* Contenedor horizontal para las tarjetas */
.tarjetas-horizontales {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  overflow-x: auto; /* Permitir desplazamiento horizontal */
  scroll-behavior: smooth; /* Desplazamiento suave */
  -webkit-overflow-scrolling: touch; /* Desplazamiento suave en dispositivos táctiles */
}

/* Estilo de las tarjetas */
.tarjeta {
  flex: 0 0 250px; /* Tamaño fijo de las tarjetas */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilo de las imágenes dentro de las tarjetas */
.tarjeta img {
  width: 100%;
  height: 150px; /* Altura fija de las imágenes */
  object-fit: cover;
}

/* Contenedor de la superposición de información */
.info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

/* Mostrar la superposición cuando se pasa el mouse sobre la tarjeta */
.tarjeta:hover .info-overlay {
  transform: translateY(0);
}

/* Estilo del texto en la superposición */
.info-overlay h3 {
  margin: 0;
  font-size: 1.2rem;
}

.info-overlay p {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
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

/* Estilo responsivo para pantallas pequeñas */
@media (max-width: 768px) {
  /* Ajustar el tamaño de las tarjetas */
  .tarjeta {
    flex: 0 0 200px;
  }

  /* Ajustar el tamaño de los botones de navegación */
  .control-left .btn-prev, .control-right .btn-next {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }

  /* Ajustar el tamaño del título */
  .categorias-destinos h2 {
    font-size: 1.5rem;
  }

  /* Ajustar el tamaño de los botones de categorías */
  .botones-categorias button {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 480px) {
  /* Ajustar el tamaño de las tarjetas */
  .tarjeta {
    flex: 0 0 150px;
  }

  /* Ajustar el tamaño de los botones de navegación */
  .control-left .btn-prev, .control-right .btn-next {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }

  /* Ajustar el tamaño del título */
  .categorias-destinos h2 {
    font-size: 1.2rem;
  }

  /* Ajustar el tamaño de los botones de categorías */
  .botones-categorias button {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
}

</style>
