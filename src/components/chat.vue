<template>
  <section class="chat-container">
    <ul class="messages-container" ref="messagesContainer">
      <h2 class="chat-title">Chat</h2>

      <button @click="deleteMessagesToLocalStorage" class="reset">
        <i  class="fa-solid fa-arrows-rotate icono"></i>
        Reiniciar chat
      </button>

      <li v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
        <!-- Burbujas de tipo de mensaje (GPT o Tú) -->
        <span class="message-bubble" :class="message.type">
          {{ message.type === 'bot' || message.type === 'card' ? 'IA' : 'Tú' }}
        </span>
        <!-- Texto del mensaje -->
        <p v-if="message.type !== 'card'" class="message-text" :class="message.type">{{ message.text }}</p>
        <section v-else class="cards-container">
          <article v-for="(lugar, index) in message.lugares" :key="index" class="cardL">
            <!-- corazon favoritos -->
            <div @click="handleFavClick(lugar)" class="container-fav">
              <i :class="lugar.isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
            </div>
            <!-- info de la card -->
            <img :src="lugar.imagen" alt="Imagen del lugar">
            <h3 class="place-title">{{ lugar.nombre_lugar }}</h3>
            <p id="cardLp">Clima: {{ lugar.clima }}</p>
            <button @click="pagina(lugar.id)">Ver más</button>
          </article>
        </section>

        <article class="sugerencias">
          <button :disabled="isLoading" v-for="(sugerencia, index) in message.sugerencias" :key="index"
            @click="sendMessage(sugerencia.text)" > {{ sugerencia.text }}</button>
        </article>
      </li>

      <transition name="backLeft" enter-active-class="animate__animated animate__backInLeft animate__faster" leave-active-class="animate__animated animate__backOutLeft animate__faster">
        <LoadingSpinner :loading="isLoading" />
      </transition>
    </ul>

    <form @submit.prevent="sendMessage(newMessage)" class="input-container">
      <textarea v-model="newMessage" placeholder="Escribe un mensaje..." class="custom-textarea"
        @input="autoResize" @keydown.enter="sendMessage(newMessage)" ></textarea>

      <button :disabled="isLoading">
        <i class="fa-solid fa-arrow-up"></i>
      </button>
    </form>
  </section>
</template>


<script>
import { mapGetters} from 'vuex';
import axios from 'axios';
import LoadingSpinner from './loadingSpinner.vue';

export default {
  name: 'chat',
  data() {
    return {
      messages: [
        {
          type: 'bot', text: '¡Hola! ¿Buscas el destino perfecto? Cuéntame si tienes un país en mente o prefieres que te sugiera algo según tus gustos: una escapada a la playa, una ciudad vibrante o un rincón lleno de aventura. ¡Estoy aquí para ayudarte!',
          sugerencias: [
            { text: "Quiero ir a Italia" },
            { text: "Lugares históricos en Francia" },
            { text: "Playas Hermosas en Colombia" },
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

      // Verifica si el mensaje ya existe en la lista de mensajes
      const messageExists = this.messages.some(msg => msg.text === userMessage);
      if (messageExists) return; // Evita añadir mensajes duplicados

      this.messages.push({ type: 'user', text: userMessage }); // Añadir mensaje del usuario
      this.newMessage = ''; // Limpiar el input

      this.saveMessagesToLocalStorage(); // Guardar los mensajes en localStorage

      this.$nextTick(() => {
        this.scrollToBottom();
      })

      this.isLoading = true;
      await this.botResponse(userMessage); // Obtener respuestas del bot
    },
    saveMessagesToLocalStorage() {
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    },
    deleteMessagesToLocalStorage() {
      localStorage.removeItem('chatMessages');
      window.location.reload();
      this.$router.push({ name: 'home', query: { showVideo: false, showChat: true } });
    },
    loadMessagesFromLocalStorage() {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages);
      }
    },
    async botResponse(userInput) {
      try {
        // Enviar solicitud al backend para obtener la respuesta del bot
        const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/busquedaIA`, { input: userInput });

        // Manejo de errores
        if (response.data.error) {
          this.cambiarEstado('isLoading');
          this.messages.push({ type: 'bot', text: response.data.error });
          console.error("Error: ", response.data.error);
          return;
        }

        // Procesar respuesta del bot
        let botMessage = response.data.length > 0 ? response.data : 'No se encontraron resultados.';

        // Extraer lugares exactos de la respuesta
        const lugaresExactos = (botMessage.match(/\["([^"]+)"(?:, "([^"]+)")*\]/) || [])[0]?.match(/"([^"]+)"/g)?.map(l => l.replace(/"/g, '')) || [];

        // Mostrar el mensaje del bot
        botMessage = this.truncateText(botMessage);
        this.messages.push({ type: 'bot', text: botMessage });
        this.$nextTick(() => {
          this.scrollToBottom();
        })

        // Verificar y procesar lugares exactos
        if (lugaresExactos.length > 0) {
          try {
            const response2 = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/infoDestino`, { id: lugaresExactos });
            if (response2.data.error) {
              console.log("llego al error: " + response2.data.error)
              this.botResponse("No hay estos lugares en la db, devuelve lugares que si esten en la db")
              this.cambiarEstado("isLoading")
              return;
            }

             // Obtener los lugares favoritos del usuario
            const idUser = this.id; 
            const favoritosResponse = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/obtenerFav`, { idUser });
            const favoritos = favoritosResponse.data.lugares.map(fav => fav.lugar_id); // IDs de los lugares favoritos

            // Procesar información de lugares y marcar como favoritos si están en la lista
            const lugares = response2.data.map(lugar => ({
              nombre_lugar: lugar.nombre_lugar,
              clima: lugar.clima,
              descripcion: lugar.descripcion,
              imagen: lugar.imagen,
              id: lugar.id,
              isFav: favoritos.includes(lugar.id) // Marcar como favorito si está en la lista
            }));

            this.messages.push({ type: 'card', lugares });
            this.$nextTick(() => {
              this.scrollToBottom();
            })

          } catch (error) {
            this.messages.push({ type: 'bot', text: 'Error al obtener detalles de los lugares.' });
            console.error("Error en infoDestino: ", error);
          }
        }
      } catch (error) {
        this.cambiarEstado('isLoading');
        this.messages.push({ type: 'bot', text: 'Error en la solicitud al servidor.' });
        console.error("Error en busquedaIA: ", error);
      } finally {
        this.cambiarEstado('isLoading');
        this.saveMessagesToLocalStorage(); // Guardar los mensajes en localStorage
      }
    },
    handleFavClick(lugar) {
      if (!this.correo) {
        this.showLoginPopup(); // Si no está logueado, mostrar popup
        return;
      }
      lugar.isFav ? this.eliminarfav(lugar.id) : this.addFav(lugar.id);
      this.saveMessagesToLocalStorage()
    },
    showLoginPopup() {
      alert("Por favor, inicia sesión para agregar lugares a favoritos."); // Muestra un popup simple
    },
    async addFav(id){
      // Busca el lugar por su ID y actualiza isFav
      this.messages.forEach(message => {
        if (message.type === 'card') {
          const lugar = message.lugares.find(l => l.id === id);
          if (lugar) lugar.isFav = true; // Solo si el lugar existe
        }
      });

      try {
        const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/insertFav`,{idUser:this.id,idLugar:id}) 
        if(response.data.existe){
          alert("ya lo habias guardado como fav")
          return;
        } 
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarfav(id){
      this.messages.forEach(message => {
        if (message.type === 'card') {
          const lugar = message.lugares.find(l => l.id === id);
          if (lugar) lugar.isFav = false; // Solo si el lugar existe
        }
      });
      
      try {
        const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/eliminarFav`,{idUser:this.id,idLugar:id}) 
        console.log(response)
      } catch (error) {
        console.log(error)
      }
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
      const minHeight = 35; // Altura mínima deseada
      const newHeight = parseFloat((textArea.scrollHeight + minHeight) / 2);
      // Ajusta la altura del textarea
      textArea.style.height = `${newHeight}px`;
    },
    truncateText(texto) {
      // Encuentra la posición del primer número en el texto
      const regex = /\d+\./;
      const match = texto.match(regex);

      // Si encuentra el patrón, corta el texto hasta la posición del número
      if (match) {
        const index = match.index;
        return texto.slice(0, index).trim();
      }

      // Si no encuentra ningún número, devuelve el texto original
      return texto;
    },
    pagina(id) {
      this.$router.push({ name: 'DetallesLugar', params: { id } });
    }
  },
  computed: {
  // Esto mapea el getter 'obtenerCorreo' a la propiedad computada 'correo'
  ...mapGetters(['obtenerCorreo','obtenerId']),

  // Puedes renombrar la propiedad si lo deseas:
  correo() {
    return this.obtenerCorreo || false;
  },
  id() {
    return this.obtenerId || null; // o cualquier valor predeterminado que prefieras
  }
 },
  mounted() {
    this.loadMessagesFromLocalStorage(); // Cargar el historial al montar el componente
    this.scrollToBottom();
  },
  components: {
    LoadingSpinner
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity));
  border-radius: 5px;
  overflow: hidden;
  height: 70vh;
  position: relative;
}

.reset {
  width: 136px;
  position: absolute;
  top: 9px;
  font-size: 13px;
  height: 33px;
  border-radius: 13px;
  right: 24px;
  border: none;
  z-index: 9999;
  color: white;
  background: rgb(55 65 81 / 1);
  cursor: pointer;
}

.chat-title {
  text-align: center;
  color: rgb(125, 211, 252);
  /* Azul claro para el título */
  padding: 1%;
  margin: 0;
  font-size: 1.5rem;
}

.messages-container {
  width: 100%;
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity));
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}

.custom-textarea {
  width: 100%;
  height: 30px;
  padding: 1%;
  box-sizing: border-box;
  border: 1px solid rgb(125, 211, 252);
  border-radius: 30px;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  white-space: normal;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  background-color: rgb(255, 255, 255);
  color: rgb(18, 18, 18);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: height 0.2s ease, box-shadow 0.3s ease;
  margin-bottom: 10px;
  min-height: 30px;
  max-height: 80px;
}

.custom-textarea::-webkit-scrollbar {
  display: none;
}


.custom-textarea:focus {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  outline: none;
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
  --tw-bg-opacity: 1;
  background-color: rgb(7 89 133 / var(--tw-bg-opacity));
  /* background-color: rgb(2, 132, 199);  */
  color: white;
  /* Texto blanco */
}

.message-bubble.user {
  /* background-color: rgb(125, 211, 252); */
  --tw-bg-opacity: 1;
  background-color: rgb(2 132 199 / var(--tw-bg-opacity));
  color: white;
  margin-left: auto;
}

.message-text {
  background-color: rgb(255, 255, 255);
  /* Fondo gris claro */
  color: rgb(18, 18, 18);
  /* Texto negro */
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
  /* background-color: rgb(125, 211, 252);  */
  --tw-bg-opacity: 1;
  background-color: rgb(2 132 199 / var(--tw-bg-opacity));
  color: white;
  /* Texto blanco */
  border-radius: 20px 20px 0 20px;
  margin-left: auto;
}

.message-text.bot {
  /* background-color: rgb(2, 132, 199);  */
  --tw-bg-opacity: 1;
  background-color: rgb(7 89 133 / var(--tw-bg-opacity));
  color: white;
  /* Texto blanco */
  border-radius: 20px 20px 20px 0;
  line-height: 21px;
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
  /* align-items: center; */
  padding: 3px;
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity));
}


.input-container button {
  padding: 10px;
  background-color: rgb(7 89 133);
  color: white;
  border: none;
  border-radius: 9px;
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

/* .input-container button::before {
  content: '↑';
  font-size: 20px;
  /* Tamaño de la flecha */


.input-container button:hover {
  background-color: rgb(2, 132, 199);
  /* Verde claro al hacer hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  /* Sombra más fuerte */
}

.icono {
  margin-right: 8px;
}

.sugerencias {
  display: flex;
  align-items: center;
  padding: 1%;
  flex-wrap: wrap;
}

.sugerencias button {
  padding: 6px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  /* border-color: rgb(191, 249, 217); */
  /* Verde claro para el borde */
  color: white;
  /* Texto negro */
  /* background-color: rgb(255, 255, 255); */
  background-color: rgb(0 0 0 / 25%);

  /* Fondo blanco */
  border-radius: 50px;
}

.cards-container {
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  white-space: nowrap;
  width: 100%;
  padding: 10px;
  gap: 15px;
  justify-content: flex-start;
}

.cards-container::-webkit-scrollbar {
  display: none;
  /* Opcional: oculta la barra de desplazamiento horizontal */
}

.cardL {
  flex: 0 0 auto;
  width: 220px;
  /* padding: 15px; */
  margin-bottom: 20px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.cardL:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.cardL img {
  width: 100%;
  height: 160px;
  border-radius: 12px 12px 0 0;
  object-fit: cover;
}

.cardL h3 {
  margin: 10px 0;
  padding: 0px 10px;
  color: #2c3e50;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 600;
  white-space: normal;
  word-wrap: break-word;
}

#cardLp {
  background: none !important;
  color: #7f8d89;
  padding: 0px 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 0.9rem;
  word-wrap: break-word;
}

.cardL button {
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  border: none;
  color: white;
  border-radius: 8px;
  margin: 8px;
  padding: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;
  text-transform: uppercase;
}

.cardL button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.container-fav{
  position: absolute;
    border-radius: 50%;
    width: 27px;
    display: flex;
    height: 24px;
    background: #1a283b;
    right: 4px;
    cursor: pointer;
    top: 4px;
    justify-content: center;
    align-items: center;
}

.container-fav:hover{
  background: #000000;
}

@media (max-width: 768px) {
  .chat-container {
    font-size: 0.9rem;
    /* Disminuye el tamaño de letra */
    height: 60vh;
    /* Ajusta el tamaño total del chat */
  }

  .chat-title {
    font-size: 1.2rem;
    /* Reduce el tamaño del título */
  }

  .custom-textarea {
    font-size: 13px;
    /* Reduce el tamaño de la fuente */
    height: 25px;
    /* Reduce la altura de la caja de texto */
    padding: 5px;
  }

  .input-container button {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }

  .message-text {
    font-size: 14px;
    /* Reduce el tamaño del texto del mensaje */
  }

  .messages-container {
    padding: 8px;
    /* Reducir el padding del contenedor */
  }

  .message-bubble {
    width: 30px;
    /* Reduce las burbujas de los mensajes */
    height: 30px;
    font-size: 12px;
  }
}
</style>