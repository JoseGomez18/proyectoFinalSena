<template>
    <div class="loading-spinner" v-if="loading">
      <div class="spinner"></div>
      <p>Estamos buscando la mejor información para tu proximo destino...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoadingSpinnerPantalla",
    props: {
      loading: {
        type: Boolean,
        default: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .loading-spinner {
    display: flex;
    flex-direction: column;
    margin: 1%;
    height: 85vh;
    align-items: center;
    justify-content: center;
  }

  p{
    color: #dbeaff;
    font-size: 15px;

  }
  
  .spinner {
    width: 110px;
    height: 112px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top-color: #2979aa;
    border-radius: 61%;
    animation: spin-94168e66 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  