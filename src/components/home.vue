<template>
  <div class="home-container">
    <div class="text-section">
      <h1>
        Busca tus próximos destinos <br />
        de la forma más <br />
        <span class="highlight">personalizada con IA</span>
      </h1>
      <button class="ai-button" @click="activar">Explorar con IA</button>
    </div>
    <div class="video-section">
      <video
        v-if="!seen"
        autoplay
        loop
        muted
        playsinline
        class="background-video"
      >
        <source src="../assets/videoFront2.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <chat v-if="seen" class="chat"/>
    </div>
  </div>
</template>

<script>
import Chat from '../components/chat.vue'

export default {
  name: 'Home',
  data() {
    return {
      seen: false
    }
  },
  methods: {
    activar() {
      this.seen = !this.seen
    }
  },
  components: {
    Chat
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  padding: 2rem;
  background: var(--color-gradiente-primario);
  color: var(--color-texto-claro);
  flex-direction: row; /* Horizontal en escritorio */
  overflow: hidden; /* Evita scroll innecesario */
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 2rem;
}

.text-section h1 {
  font-size: 2.5rem;
  line-height: 1.4;
  color: var(--color-texto-claro);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
}

.text-section .highlight {
  color: rgb(125, 211, 252);
  font-weight: bold;
  animation: glow 2s infinite alternate;
}

.ai-button {
  align-self: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: rgb(14, 165, 233);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1.5rem;
}

.ai-button:hover {
  background-color: rgb(2, 132, 199);
  color: white;
  transform: translateY(-3px);
}

.video-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Para posicionar el video y el chat correctamente */
}

.background-video {
  width: 100%;
  height: auto; /* Mantiene la proporción del video */
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos para el diseño responsivo */
@media (max-width: 768px) {
  .home-container {
    flex-direction: column; /* Vertical en móvil */
  }
  
  .text-section {
    padding-right: 0;
    padding-bottom: 2rem;
    align-items: flex-start; /* Alinear el texto al inicio */
  }
  
  .video-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .background-video {
    max-width: 100%;
  }
}
</style>
