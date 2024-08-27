<template>
  <div>

    <h1>Detalles del Lugar</h1>

    <div v-if="loading">
      <p>Cargando...</p>
    </div>

    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="lugar">
      <img :src="lugar.imagen" alt="Imagen del lugar" />

      <h2>{{ lugar.nombre_lugar }}</h2>

      <p>Clima: {{ lugar.clima }}</p>
      <p>{{ lugar.descripcion }}</p>
      
      <div v-if="lugar.actividades.length">
        <h3>Actividades:</h3>
        <ul>
          <li v-for="actividad in lugar.actividades" :key="actividad.nombre_actividad">
            <p>{{ actividad.nombre_actividad }}</p>
            <p>{{ actividad.descripcion_actividad }}</p>
            <img :src="actividad.imagen_actividad" alt="Imagen de la actividad" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DetallesLugar',
  data() {
    return {
      lugar: null,
      loading: true,
      error: null
    };
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  async created() {
    try {
      const response = await axios.post(`http://localhost:3001/api/detallesLugar/`, { id: this.id });
      console.log('Datos recibidos de la API:', response.data); // Verifica la estructura de la respuesta

      // Suponiendo que la respuesta es un arreglo con un solo objeto
      if (Array.isArray(response.data) && response.data.length > 0) {
        this.lugar = response.data[0];
      } else {
        console.error('Datos inesperados de la API:', response.data);
        this.error = 'Datos inesperados recibidos de la API.';
      }
    } catch (error) {
      this.error = 'Error al obtener los detalles del lugar: ' + error.message;
      console.error('Error al obtener los detalles del lugar:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
/* Agrega aquí estilos específicos para este componente */
</style>
