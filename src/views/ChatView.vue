<template>
    <body>
      <main>
        
        <ul>
          <li v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
            <span>{{ message.type === 'bot' ? 'GPT' : 'Tú' }}</span>
            <p>{{ message.text }}</p>
          </li>
        </ul>

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
    </body>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        messages: [
          { type: 'bot', text: '¿A donde quieres ir de vacaciones?' },
        ],
        newMessage: '',
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
        const response = await axios.post('http://localhost:3001/busquedaIA', { input: userInput });
        if (response.data.error) {
          this.messages.push({ type: 'bot', text: response.data.error });
        } else {
          const botMessage = response.data.length > 0 ? JSON.stringify(response.data) : "No se encontraron resultados.";
          this.messages.push({ type: 'bot', text: botMessage });
        }
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({ type: 'bot', text: "Hubo un error al procesar tu solicitud." });
      }
      }
    },
  };
  </script>
  
  <style scoped>
  body {
    background: white;
    display: grid;
    place-content: center;
    height: 100vh;
    height: 100dvh; /* dynamic vh */
  }
  
  main {
    width: 400px;
    max-width: 100%;
    height: 70vh;
    background: #fff;
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
    background: skyblue !important;
  }
  
  .bot {
    align-self: flex-start;
  }
  
  .bot p,
  .bot span {
    background: rgba(65, 216, 65, 0.671) !important;
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
    background: #09f;
    border: 0;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    padding: 8px;
  }
  </style>
  





<!-- <template>
<body>
    <main>
          <ul>
              <li class="message bot">
                  <span>GPT</span>
                  <p>Esta es la respuesta del bot</p>
              </li>
      
              <li class="message user">
                  <span>Tú</span>
                  <p>Esta es la respuesta del usuario</p>
              </li>
      
              <li class="message user">
                  <span>Tú</span>
                  <p>Esta es la respuesta del usuario y es muuuuuuuuy larga, solo para probar que no se dañe nada mi bro</p>
              </li>
            </ul>
        </main>
    <form action="">
        <input type="text" placeholder="Escribe tu mensaje aqui...">
        <button>Enviar</button>
    </form>

    <template id="message-template">
        <li class="message">
            <span></span>
            <p></p>
        </li>
    </template>

</body>
</template>

<script>
export default {

}
</script>

<style scoped>
/* *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */
body{
    background: white;
    display: grid;
    place-content: center;
    height: 100vh;
    height: 100dvh; /* dinamyc vh */
}

main{
    width: 400px;
    max-width: 100%;
    height: 70vh;

    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    
    padding: 8px;
    margin-bottom: 16px;

    overflow-y: auto
}

ul{
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
}

.message{
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
    font-weight:500 ;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:999999px ;
}

.message p {
    padding: 4px 8px;
    border-radius: 4px;
}

.user{
    align-self: flex-end;
    align-items: flex-end;
}

.user p, .user span{
    background: skyblue !important;
}

.bot{
    align-self: flex-start;
}

.bot p, .bot span{
    background: rgba(65, 216, 65, 0.671) !important; 
}

form{
    display: flex;
}

form input{
    border-radius: 99999px;
    flex-grow: 1;
    border: 0;
    padding: 8px;
    margin-right: 8px;
    border: 1px solid #ccc;
}

form button{
    background: #09f;
    border: 0;
    color: white;
    border-radius:6px ;
    cursor: pointer;
    padding: 8px;
}

</style> -->