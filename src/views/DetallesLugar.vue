<template>
    <div>
      <h1>Detalles del Lugar</h1>
      <div v-if="lugar">
        <img :src="lugar.imagen" alt="Imagen del lugar">
        <h2>{{ lugar.nombre_lugar }}</h2>
        <p>Clima: {{ lugar.clima }}</p>
        <p>{{ lugar.descripcion }}</p>
        <!-- Agrega aquí cualquier otra información que desees mostrar -->
      </div>
      <div v-else>
        <p>Cargando...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DetallesLugar',
    data() {
      return {
        lugar: null
      };
    },
    props: ['id'],
    async created() {
      try {
        const response = await axios.post(`http://localhost:3001/api/detallesLugar/`, {id:this.id});
        console.log(response.data)
        this.lugar = response.data;
      } catch (error) {
        console.error('Error al obtener los detalles del lugar:', error);
      }
    }
  };
  </script>
  