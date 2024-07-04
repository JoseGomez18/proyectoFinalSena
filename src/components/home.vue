<template>
  <div class="home-container">
    <div class="text-section">
      <h1>
        Busca tus próximos destinos <br />
        de la forma más <br />
        personalizada con IA
      </h1>
      <button class="ai-button">IA</button>
    </div>
    <div class="video-section">
      <video controls>
        <source src="path-to-your-video.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  padding: 2rem;
  background: #f5f5f5;
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-right: 2rem;
}

.text-section h1 {
  font-size: 2.5rem;
  line-height: 1.4;
  color: #333;
}

.ai-button {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: #4b6cb7;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ai-button:hover {
  background-color: #182848;
}

.video-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-section video {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
