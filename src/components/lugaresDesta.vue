<template>
  <div class="lugares-destacados">
    <h2>Lugares Destacados</h2>
    <div class="contenedor-tarjetas">
      <div class="tarjetas-horizontales">
        <div class="tarjeta" v-for="(lugar, indice) in lugaresHorizontales" :key="indice">
          <img :src="require(`@/assets/${lugar.imagen}`)" :alt="lugar.nombre" />
          <div class="contenido-tarjeta">
            <h3>{{ lugar.nombre }}</h3>
          </div>
        </div>
      </div>
      <div class="tarjeta-ancho-completo">
        <img :src="require(`@/assets/${lugarAnchoCompleto.imagen}`)" :alt="lugarAnchoCompleto.nombre" />
        <div class="contenido-tarjeta">
          <h3>{{ lugarAnchoCompleto.nombre }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lugaresDestaVue',
  data() {
    return {
      lugaresHorizontales: [
        { nombre: 'Lugar 1', imagen: 'imgPrueba.jpg' }, // Usando imgPrueba.jpg aquí
        { nombre: 'Lugar 2', imagen: 'imgPrueba.jpg' }, // Cambia a las imágenes reales que tengas
        { nombre: 'Lugar 3', imagen: 'imgPrueba.jpg' },
      ],
      lugarAnchoCompleto: { nombre: 'Lugar Destacado', imagen: 'imgPrueba.jpg' },
    };
  },
};
</script>

<style scoped>
.lugares-destacados {
  padding: 2rem;
  background: #f5f5f5;
}

.lugares-destacados h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.contenedor-tarjetas {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tarjetas-horizontales {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.tarjeta {
  flex: 1;
  background: #ffffff;
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
  padding: 1rem;
  text-align: center;
}

.tarjeta-ancho-completo {
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.tarjeta-ancho-completo:hover {
  transform: translateY(-5px);
}

.tarjeta-ancho-completo img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.tarjeta-ancho-completo .contenido-tarjeta {
  padding: 1rem;
  text-align: center;
}
</style>
