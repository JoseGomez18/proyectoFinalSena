<template>
    <div class="loading-spinner" v-if="loading">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoadingSpinner",
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
    justify-content: center;
    margin: 1%;
    height: 50px; /* Altura ajustada */
  }
  
  .spinner {
    width: 27px;
    height: 26px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top-color: #2979aa;
    border-radius: 55%;
    animation: spin-94168e66 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>