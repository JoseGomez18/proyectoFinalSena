<template>
      <div class="chat-container">
      <main>
        <h2>CHAT</h2>
        <ul>
          <li v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
            <span>{{ message.type === 'bot' || message.type === 'card' ? 'GPT' : 'Tú' }}</span>
            <p v-if="message.type !== 'card'">{{ message.text }}</p>
            <div v-else class="cardL">
              <img :src="message.lugar.imagen"  alt="Imagen del lugar">
              <h2>{{ message.lugar.nombre_lugar }}</h2>
              <p id="cardLp">Clima: {{message.lugar.clima}}</p>
              <p id="cardLp">Descripción: {{ message.lugar.descripcion }}</p>
              <button @click="pagina(message.lugar.id)">Seleccionar</button>
              <!-- <p>{{ message.lugar.nombre_lugar }}</p>
              <p>{{ message.lugar.clima }}</p> -->
            </div>
          </li>
        </ul>
        <!-- <div v-for="(lugar,index) in lugares" :key="index" class="cardL message bot ">
          <p id="cardLp">{{lugar.nombre_lugar}}</p>
          <p id="cardLp">{{lugar.clima}}</p>
          <p>hhh</p>
        </div> -->
        <!-- v-for="(lugar,index) in lugares" :key="index" -->
      

      </main>

      <form @submit.prevent="sendMessage">
        <input type="text" v-model="newMessage" placeholder="Escribe tu mensaje aqui..." />
        <button>Enviar</button>
      </form>
  
      <template id="message-template">
        <li class="message">
          <span></span>
          <p></p>
        </li>
      </template>
    </div>
  <!-- <div>
    <h1>hola</h1>
  </div> -->
</template>

<script>

  import axios from 'axios';

  export default {
     name: 'chat',
    data() {
      return {
        messages: [
          { type: 'bot', text: '¿A que país quieres ir de vacaciones?' },
        ],
        newMessage: '',
        lugares: ''
      };
    },
    methods: {
      async sendMessage() {
        if (this.newMessage.trim() === '') return;

        this.messages.push({ type: 'user', text: this.newMessage });

        const userInput = this.newMessage;
        this.newMessage = '';

        await this.botResponse(userInput);
      },

      async botResponse(userInput) {
        try {
        // se envia el mensaje del usuario
        const response = await axios.post('http://localhost:3001/api/busquedaIA', { input: userInput });
        // validacion de error o cargar la respuesta del bot
        if (response.data.error) {
          this.messages.push({ type: 'bot', text: response.data.error });
        } else {
          const botMessage = response.data.length > 0 ? response.data : "No se encontraron resultados.";
          this.messages.push({ type: 'bot', text: botMessage });
          console.log(botMessage)
          if(response.data){
            const ids = (response.data.match(/\[([0-9, ]+)\]/) || [])[1]?.split(',').map(Number) || 0;

            if (ids !== 0){
               const response2 = await axios.post('http://localhost:3001/api/infoDestino', { id: ids });
              //  this.lugares = response2.data

              response2.data.forEach(lugar => {
              this.messages.push({ type: 'card', lugar });
             }); 

               console.log(response2.data)
            }

            console.log(ids); // Salida: [1, 39]
          }
          // this.messages.push({ type: 'bot', text: botMessage });
        }

      } catch (error) {
        console.error("Error:", error);
        this.messages.push({ type: 'bot', text: "Hubo un error al procesar tu solicitud." });
      }
      },
      pagina(id){
        this.$router.push({ name: 'DetallesLugar', params: { id } });      }
    },
  };
  
</script>

<style scoped>
.chat-container {
  /* background: white;
  display: grid;
  place-content: center; */
  height: 100vh;
  height: 100dvh; /* dynamic vh */
  margin-top: 90px;
}

main {
  width: 500px;
  max-width: 100%;
  height: 70vh;
  background: rgb(31 41 55);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  overflow-y: auto;
}

ul {
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

.user p{
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

.bot p{
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

.cardL{
  background: white;
  /* padding: 5px; */
  border-radius: 9px;
  /* height: 201px; */
}

.cardL h2{
  padding: 0px 5px
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
</style>




