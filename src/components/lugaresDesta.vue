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
        { nombre: 'Medellin', imagen: 'imgPrueba.jpg' },
        { nombre: 'Bogota', imagen: 'imgPrueba.jpg' },
        { nombre: 'Cali', imagen: 'imgPrueba.jpg' },
      ],
      lugarAnchoCompleto: { nombre: 'Cartagena', imagen: 'imgPrueba.jpg' },
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
  background: var(--color-acento);
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
  height: 170px;
  object-fit: cover;
}

.contenido-tarjeta {
  padding: 1rem;
  text-align: center;
  color: var(--color-texto-claro);
  background: var(--color-secundario);
}

.tarjeta-ancho-completo {
  width: 100%;
  background: var(--color-secundario);
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
  height: 200px;
  object-fit: cover;
}

.tarjeta-ancho-completo .contenido-tarjeta {
  padding: 1rem;
  text-align: center;
  color: var(--color-texto-claro);
}
</style>
