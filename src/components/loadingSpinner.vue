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
  margin: 1%;
  height: 50px; /* Altura ajustada */
}

.spinner {
  width: 20px; /* Tamaño más pequeño */
  height: 20px; /* Tamaño más pequeño */
  border: 2px solid rgba(0, 0, 0, 0.1); /* Tamaño del borde más pequeño */
  border-top-color: #2979aa; /* Color del spinner */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
