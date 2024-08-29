<template>
    <div class="chat-container">
      <main ref="scrollContainer">
        <h2>CHAT</h2>
        <ul>
          <div class="sugerencias">
            <button v-for="(sugerencia, index) in sugerencias" :key="index" @click="sendMessage(sugerencia.text)">
              {{ sugerencia.text }}
            </button>
          </div>
          
          <li v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
            <span>{{ message.type === 'bot' || message.type === 'card' ? 'GPT' : 'Tú' }}</span>
            <p v-if="message.type !== 'card'">{{ message.text }}</p>
            <div v-else class="cardL">
              <img :src="message.lugar.imagen" alt="Imagen del lugar">
              <h2>{{ message.lugar.nombre_lugar }}</h2>
              <p id="cardLp">Clima: {{ message.lugar.clima }}</p>
              <p id="cardLp">Descripción: {{ message.lugar.descripcion }}</p>
              <button @click="pagina(message.lugar.id)">Seleccionar</button>
            </div>
          </li>
  
          <transition
            name="backLeft"
            enter-active-class="animate__animated animate__backInLeft animate__faster"
            leave-active-class="animate__animated animate__backOutLeft animate__faster"
          >
            <li v-if="isLoading" ref="loadingSpinner" class="loading-item">
              <LoadingSpinner :loading="isLoading" />
            </li>
          </transition>
        </ul>
      </main>
  
      <form @submit.prevent="sendMessage(newMessage)">
        <input type="text" v-model="newMessage" placeholder="Escribe tu mensaje aqui..." />
        <button>Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import LoadingSpinner from './loadingSpinner.vue';
  
  export default {
    name: 'chat',
    data() {
      return {
        messages: [
          { type: 'bot', text: '¿Tienes en mente algún país al que te gustaría viajar o prefieres que te sugiera un tipo de destino según tus preferencias? (por ejemplo, una ciudad vibrante, una playa tranquila, una montaña para escalar, etc.)' },
        ],
        sugerencias: [
          {text: "Quiero ir a Italia"},
          {text: "Lugares históricos en Francia"},
          {text: "Playas tranquilas y económicas"},
        ],
        newMessage: '',
        isLoading: false,
      };
    },
    methods: {
      async sendMessage(message) {
        const userMessage = message || this.newMessage.trim();
        if (userMessage === '') return; // Evitar mensajes vacíos
  
        this.messages.push({ type: 'user', text: userMessage }); // Añadir el mensaje del usuario
        this.newMessage = ''; // Limpiar el input
        this.isLoading = true;
  
        // Esperar a que el DOM se actualice y luego hacer el scroll
        await this.$nextTick();
  
        // Esperar a que el símbolo de carga esté visible
        setTimeout(() => {
          this.scrollToLoadingSpinner();
        }, 300); // Ajusta el tiempo si es necesario para que la transición se complete
  
        await this.botResponse(userMessage); // Obtener respuesta del bot
      },
  
      async botResponse(userInput) {
        try {
          const response = await axios.post('http://localhost:3001/api/busquedaIA', { input: userInput });
          if (response.data.error) {
            this.messages.push({ type: 'bot', text: response.data.error });
          } else {
            this.isLoading = false;
            const botMessage = response.data.length > 0 ? response.data : "No se encontraron resultados.";
            this.messages.push({ type: 'bot', text: botMessage });
  
            if (response.data) {
              const ids = (response.data.match(/\[([0-9, ]+)\]/) || [])[1]?.split(',').map(Number) || 0;
  
              if (ids !== 0) {
                const response2 = await axios.post('http://localhost:3001/api/infoDestino', { id: ids });
                response2.data.forEach(lugar => {
                  this.messages.push({ type: 'card', lugar });
                });
              }
            }
          }
        } catch (error) {
          this.isLoading = false;
          setTimeout(() => {
            this.messages.push({ type: 'bot', text: "Hubo un error al procesar tu solicitud." });
          }, 600);
        }
      },
  
      scrollToLoadingSpinner() {
        const scrollContainer = this.$refs.scrollContainer;
        const loadingSpinner = this.$refs.loadingSpinner;
  
        if (scrollContainer && loadingSpinner) {
          scrollContainer.scrollTop = loadingSpinner.offsetTop + loadingSpinner.clientHeight - scrollContainer.clientHeight;
        }
      }
    },
    components: {
      LoadingSpinner
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  main {
    width: 500px;
    max-width: 100%;
    height: 70vh;
    background: rgb(31, 41, 55);
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 16px;
    overflow-y: auto;
  }
  
  ul {
    position: relative;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
  
  .message {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 4px 0;
    padding: 4px 8px;
    text-align: start;
  }
  
  .message span {
    width: 36px;
    height: 36px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999999px;
  }
  
  .message p {
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  .user {
    align-self: flex-end;
    align-items: flex-end;
  }
  
  .user p,
  .user span {
    background: #314a80 !important;
    color: white;
  }
  
  .user p {
    padding: 12px;
    border-radius: 24px 24px 4px;
  }
  
  .bot {
    align-self: flex-start;
  }
  
  .bot p,
  .bot span {
    color: black;
    border: 1px solid #80808038;
    background: #f0f8ff8f !important;
  }
  
  .bot p {
    border-radius: 24px 24px 24px 4px;
    padding: 12px;
  }
  
  form {
    display: flex;
  }
  
  form input {
    border-radius: 99999px;
    flex-grow: 1;
    border: 0;
    padding: 8px;
    margin-right: 8px;
    border: 1px solid #ccc;
  }
  
  form button {
    background: #354f88;
    border: 0;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    padding: 8px;
  }
  
  .cardL {
    background: white;
    border-radius: 9px;
  }
  
  .cardL h2 {
    padding: 0px 5px;
    color: black;
  }
  
  #cardLp {
    background: none !important;
    color: #7f8d89;
  }
  
  .cardL img {
    width: 100%;
    border-radius: 9px 9px 0 0;
    object-fit: cover;
  }
  
  .sugerencias {
    position: absolute;
    top: 160px;
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
  }
  
  .sugerencias button {
    margin-top: 0.8rem;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    border-color: rgb(194 202 200);
    padding: 4px;
    color: rgb(72 91 87);
    background-color: rgb(255 255 255);
    border-radius: 50px;
  }
  
  .loading-item {
    margin: 20px 0;
  }
  </style>
  