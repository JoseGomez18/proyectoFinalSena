  <template>
    <div class="lugares-destacados">
      <h2>Lugares Destacados</h2>
      <div class="galeria">
        <div class="tarjeta" v-for="(lugar, indice) in lugares" :key="indice" :class="lugar.tamano">
          <img :src="require(`@/assets/${lugar.imagen}`)" :alt="lugar.nombre" />
          <h3 class="nombre-ciudad">{{ lugar.nombre }}</h3>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'lugaresDestaVue',
    data() {
      return {
        lugares: [
          { nombre: 'Medellín', imagen: 'imgPrueba.jpg', tamano: 'grande' },
          { nombre: 'Bogotá', imagen: 'imgPrueba.jpg', tamano: 'mediana' },
          { nombre: 'Cartagena', imagen: 'imgPrueba.jpg', tamano: 'grande' },
          { nombre: 'Santa Marta', imagen: 'imgPrueba.jpg', tamano: 'pequena' },
          { nombre: 'Barranquilla', imagen: 'imgPrueba.jpg', tamano: 'pequena' },
        ],
      };
    },
  };
  </script>

  <style scoped>
  .lugares-destacados {
    padding: 2rem;
    background: var(--color-fondo);
  }

  .lugares-destacados h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--color-texto);
  }

  .galeria {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    gap: 1rem;
  }

  .tarjeta {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }

  .tarjeta:hover {
    transform: translateY(-5px);
  }

  .tarjeta img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

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

  .nombre-ciudad {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-texto-claro);
    font-size: 1.2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }
  </style>
