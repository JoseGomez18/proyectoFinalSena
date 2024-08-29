<template>
    <div v-if="loading" class="loading-spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
      <div class="dot3"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingSpinner',
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  
  .dot1, .dot2, .dot3 {
    width: 10px;
    height: 10px;
    background-color: #3498db;
    border-radius: 50%;
    margin: 0 5px;
    animation: bouncing 1.5s infinite;
  }
  
  .dot2 {
    animation-delay: 0.3s;
  }
  
  .dot3 {
    animation-delay: 0.6s;
  }
  
  @keyframes bouncing {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  </style>
  