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
      <chat v-if="seen"/>
      <!-- Asegúrate de tener tu video aquí si decides usar uno -->
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
      console.log(this.seen)
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
  color: var(--color-texto-claro);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
}

.text-section .highlight {
  color: var(--color-acento-claro);
  font-weight: bold;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 10px var(--color-acento-claro), 0 0 20px var(--color-acento-claro);
  }
  100% {
    text-shadow: 0 0 20px var(--color-acento-claro), 0 0 30px var(--color-acento-claro);
  }
}

.ai-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: var(--color-texto-claro);
  background-color: black;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1.5rem;
}

.ai-button:hover {
  background-color: var(--color-acento-claro);
  color: black;
  transform: translateY(-3px);
}

.video-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-section chat {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
