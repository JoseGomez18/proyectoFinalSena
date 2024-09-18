<template>
    <div class="parent-container">
      <div class="child-container">
        Este es un contenido muy largo que no debería hacer que el contenedor padre se expanda. En su lugar, deberías ver una barra de desplazamiento horizontal si el contenido es más largo que el ancho disponible.
      </div>
    </div>
  </template>
  
  <style scoped>
  .parent-container {
    width: 100%; /* El contenedor padre ocupa el 100% del espacio disponible */
    max-width: 600px; /* Fija el ancho máximo del contenedor padre */
    padding: 16px; /* Espacio alrededor de la tarjeta */
    background-color: #f0f0f0; /* Color de fondo del contenedor padre */
    border: 1px solid #ddd; /* Borde del contenedor padre */
    margin: 0 auto; /* Centrar el contenedor en el medio de la página */
    
    /* Control del desbordamiento */
    overflow: hidden; /* Si el contenido se desborda, no permitir que el contenedor padre se expanda */
  }
  
  .child-container {
    background-color: #fff; /* Fondo blanco para la tarjeta */
    padding: 16px; /* Espacio interno en la tarjeta */
    border: 1px solid #ccc; /* Borde para la tarjeta */
    border-radius: 8px; /* Bordes redondeados */
    white-space: nowrap; /* Evita que el contenido se envuelva en varias líneas */
    
    /* Control del desbordamiento horizontal */
    overflow-x: auto; /* Barra de desplazamiento horizontal si el contenido es demasiado largo */
    text-overflow: ellipsis; /* Agrega puntos suspensivos (...) si el texto es muy largo */
  }
  </style>
  