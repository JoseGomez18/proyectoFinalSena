<template>
  <section class="chat-container">
      <ul class="messages-container" ref="messagesContainer">
          <h2 class="chat-title">Chat</h2>
          <li v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
              <!-- Burbujas de tipo de mensaje (GPT o Tú) -->
              <span class="message-bubble" :class="message.type">
                  {{ message.type === 'bot' || message.type === 'card' ? 'GPT' : 'Tú' }}
              </span>
              <!-- Texto del mensaje -->
              <p v-if="message.type !== 'card'" class="message-text" :class="message.type">{{ message.text }}</p>
              <section v-else class="cardL">
                  <img :src="message.lugar.imagen" alt="Imagen del lugar">
                  <h3>{{ message.lugar.nombre_lugar }}</h3>
                  <p id="cardLp">Clima: {{ message.lugar.clima }}</p>
                  <p id="cardLp">Descripcion: {{ message.lugar.descripcion }}</p>
                  <button @click="pagina(message.lugar.id)">Seleccionar</button>
              </section>
              <article class="sugerencias">
                  <button v-for="(sugerencia, index) in message.sugerencias" :key="index"
                      @click="sendMessage(sugerencia.text)">{{ sugerencia.text }}</button>
              </article>
          </li>
          <transition name="backLeft" enter-active-class="animate__animated animate__backInLeft animate__faster"
              leave-active-class="animate__animated animate__backOutLeft animate__faster">
              <LoadingSpinner :loading="isLoading" />
          </transition>
      </ul>

      <form @submit.prevent="sendMessage(newMessage)" class="input-container">
          <textarea v-model="newMessage" placeholder="Escribe un mensaje..." class="custom-textarea"
              @input="autoResize"></textarea>
          <button :disabled="isLoading"></button>
      </form>
  </section>
</template>


<script>
import axios from 'axios';
import LoadingSpinner from './loadingSpinner.vue';
import { nextTick } from 'vue';

export default {
  name:'chat',
  data() {
      return {
          messages: [
              {
                  type: 'bot', text: '¿Tienes en mente algún país al que te gustaría viajar o prefieres que te sugiera un tipo de destino según tus preferencias? (por ejemplo, una ciudad vibrante, una playa tranquila, una montaña para escalar, etc.)',
                  sugerencias: [
                      { text: "Quiero ir a Italia" },
                      { text: "Lugares históricos en Francia" },
                      { text: "Playas tranquilas y económicas" },
                  ]
              }
          ],
          newMessage: '',
          lugares: '',
          isLoading: false,
      };
  },
  methods: {
      async sendMessage(message) {
          const userMessage = message || this.newMessage.trim();
          if (userMessage === '') return; // Evita mensajes vacíos

          this.messages.push({ type: 'user', text: userMessage }); // Añadir mensaje del usuario
          this.newMessage = ''; // Limpiar el input

          this.$nextTick(() => {
              this.scrollToBottom();
          })
          this.isLoading = true;
          await this.botResponse(userMessage); // Obtener respuestas del bot
      },
      async botResponse(userInput) {
          try {
              const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/busquedaIA `, { input: userInput });
              if (response.data.error) {
                  this.cambiarEstado('isLoading');
                  this.messages.push({ type: 'bot', text: response.data.error });
              } else {
                  let botMessage = response.data.length > 0 ? response.data : this.messages.push({ type: 'bot', text: 'No se encontraron resultados.' });
                  console.log(botMessage);
                  
                  

                  if (response.data) {
                      const ids = (response.data.match(/\[([0-9, ]+)\]/) || [])[1]?.split(',').map(Number) || 0;
                      this.truncateText(botMessage);
                      this.messages.push({ type: 'bot', text: botMessage });

                      if (ids !== 0) {
                          const response2 = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/infoDestino `, { id: ids });
                          response2.data.forEach(lugar => {
                              this.messages.push({ type: 'card', lugar });
                          });
                      }
                  }
                  
                  this.cambiarEstado('isLoading');
              }
          } catch (error) {
              this.cambiarEstado('isLoading');
              setTimeout(() => {
                  this.messages.push({ type: 'bot', text: "Hubo un error al procesar tu solicitud" });
              }, 700);
          }

          // Esperar a que el DOM se actualice y luego hacer scroll
          this.$nextTick(() => {
              // Usa setTimeout para asegurarte de que el scroll se realice después de que el DOM se haya actualizado completamente
              setTimeout(() => {
                  this.scrollToBottom();
              }, 701); // Ajusta el tiempo si es necesario
          });
      },
      scrollToBottom() {
          const messagesContainer = this.$refs.messagesContainer;
          if (messagesContainer) {
              messagesContainer.scrollTop = messagesContainer.scrollHeight; // Desplazar al final del contenedor
          }
      },
      cambiarEstado(valEsta) {
          this[valEsta] = !this[valEsta];
      },
      autoResize(event) {
          const textArea = event.target;
          const minHeight = 25;
          const scrollHeight = textArea.scrollHeight;

          // Ajusta la altura solo si el contenido desborda el ancho del textarea
          if (scrollHeight > textArea.clientHeight) {
              textArea.style.height = `${Math.max(minHeight, scrollHeight)}px`;
          }
      },
      truncateText(text) {
      // Encuentra la posición del primer número en el texto
      const index = text.search(/\d/);

      // Si hay un número en el texto, corta el texto hasta esa posición
      return index !== -1 ? text.slice(0, index).trim() : text;
    },
    
  },
    components:{
      LoadingSpinner
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(2, 132, 199); /* Azul oscuro */
  background-color: rgb(235, 247, 255);/* Fondo azul suave */
  border-radius: 5px;
  overflow: hidden;
  height: 70vh;
}

.chat-title {
  text-align: center;
  color: rgb(125, 211, 252); /* Azul claro para el título */
  padding: 1%;
  margin: 0;
  font-size: 1.5rem;
}

.messages-container {
  overflow-y: auto;
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  background-color: rgb(245, 248, 255); /* Fondo ligeramente más oscuro */
}

.custom-textarea {
  width: 100%;
  height: 25px;
  padding: 5px;
  border: 1px solid rgb(125, 211, 252); /* Azul claro */
  border-radius: 30px;
  resize: none;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  background-color: rgb(255, 255, 255);
  color: rgb(18, 18, 18);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: height 0.2s ease, box-shadow 0.3s ease;
  margin-bottom: 10px;
}


.custom-textarea:focus {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  /* Sombra más fuerte al hacer focus */
  outline: none;
  /* Eliminar el borde de enfoque predeterminado */
}


.chat-title {
  text-align: center;
  color: white;
  padding: 10px;
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 1%;
  /* No necesita position: fixed o sticky */
}

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1%;
}

.message-bubble {
  width: 36px;
  height: 36px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999999px;
  position: relative;
  /* Asegúrate de que esto esté aquí para los ::after */
}

/* Puntita cuadrada para la burbuja */

.message-bubble.bot {
  background-color: rgb(2, 132, 199); /* Azul oscuro para mensajes del bot */
  color: white; /* Texto blanco */
}

.message-bubble.user {
  background-color: rgb(125, 211, 252); /* Azul claro para mensajes del usuario */
  color: white;
  margin-left: auto;
}

.message-text {
 background-color: rgb(255, 255, 255);  /* Fondo gris claro */
  color: rgb(18, 18, 18); /* Texto negro */
  padding: 10px;
  font-size: 15px;
  border-radius: 20px;
  margin-top: 10px;
  max-width: 80%;
  word-wrap: break-word;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Quitar curvatura en la esquina inferior izquierda */
.message-text.user {
  background-color: rgb(125, 211, 252); /* Azul claro */
  color: white; /* Texto blanco */
  border-radius: 20px 20px 0 20px;
  margin-left: auto;
}

.message-text.bot {
  background-color: rgb(2, 132, 199); /* Azul oscuro */
  color: white; /* Texto blanco */
  border-radius: 20px 20px 20px 0;
}

/* Ajustar la forma del texto largo */
.message-text::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: -10px;
  width: 15px;
  height: 15px;
  background-color: #f0f0f0;
  clip-path: polygon(0 100%, 100% 100%, 50% 0);
}


.input-container {
  display: flex;
  align-items: center;
  padding: 3px;
  background-color: rgb(240, 240, 240); /* Fondo claro */
  border-top: 1px solid rgb(2, 132, 199);
}


.input-container button {
  padding: 10px;
  background-color: rgb(125, 211, 252); /* Azul claro */
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.input-container button::before {
  content: '↑';
  font-size: 20px; /* Tamaño de la flecha */
}

.input-container button:hover {
  background-color: rgb(2, 132, 199);  /* Verde claro al hacer hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Sombra más fuerte */
}

.sugerencias {
  display: flex;
  align-items: center;
  padding: 1%;
  flex-wrap: wrap;
}

.sugerencias button {
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  border-color: rgb(191, 249, 217);
  /* Verde claro para el borde */
  color: rgb(18, 18, 18);
  /* Texto negro */
  background-color: rgb(255, 255, 255);
  /* Fondo blanco */
  border-radius: 50px;
}


.cardL{
  background: white;
  /* padding: 5px; */
  border-radius: 9px;
  /* height: 201px; */
}

.cardL h2{
  padding: 0px 5px;
  color: black
}

#cardLp{
  background: none !important;
  color: #7f8d89;
}

.cardL img{
  width: 100%;
  border-radius: 9px 9px 0 0;
  object-fit: cover;
}

@media (max-width: 768px) {
  .chat-container {
    font-size: 0.9rem; /* Disminuye el tamaño de letra */
    height: 60vh; /* Ajusta el tamaño total del chat */
  }

  .chat-title {
    font-size: 1.2rem; /* Reduce el tamaño del título */
  }

  .custom-textarea {
    font-size: 13px; /* Reduce el tamaño de la fuente */
    height: 20px; /* Reduce la altura de la caja de texto */
    padding: 5px;
  }

  .input-container button {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }

  .message-text {
    font-size: 14px; /* Reduce el tamaño del texto del mensaje */
  }

  .messages-container {
    padding: 8px; /* Reducir el padding del contenedor */
  }

  .message-bubble {
    width: 30px; /* Reduce las burbujas de los mensajes */
    height: 30px;
    font-size: 12px;
  }
}

</style>
