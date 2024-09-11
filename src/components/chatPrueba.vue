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
                const response = await axios.post('http://localhost:3001/api/busqueda', { input: userInput });
                if (response.data.error) {
                    this.messages.push({ type: 'bot', text: response.data.error });
                } else {
                    this.cambiarEstado('isLoading');
                    const botMessage = response.data.length > 0 ? response.data : "No se encontraron resultados.";
                    this.messages.push({ type: 'bot', text: botMessage });

                    if (response.data) {
                        const ids = (response.data.match(/\[([0-9, ]+)\]/) || [])[1]?.split(',').map(Number) || 0;

                        if (ids !== 0) {
                            const response2 = await axios.post('https://localhost:3001/api/infoDestino', { id: ids });
                            response2.data.forEach(lugar => {
                                this.messages.push({ type: 'card', lugar });
                            });
                        }
                    }
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

        }
    },
    components: {
        LoadingSpinner
    }
};
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(191, 249, 217);
    /* Verde claro para el borde */
    background-color: rgb(230, 230, 230);
    /* Fondo gris claro */
    border-radius: 5px;
    overflow: hidden;
    height: 70vh;
    padding-top: 0px;
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
    overflow-y: auto;
    padding: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
    background-color: rgb(250, 250, 250);
}

.custom-textarea {
    width: 100%;
    height: 25px;
    padding: 10px;
    border: 2px solid rgb(125, 211, 252);
    /* Azul claro */
    border-radius: 30px;
    /* Bordes más redondeados */
    resize: none;
    font-size: 15px;
    font-family: inherit;
    line-height: 1.5;
    background-color: rgb(255, 255, 255);
    /* Fondo blanco */
    color: rgb(18, 18, 18);
    /* Texto negro */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Sombra ligera */
    transition: height 0.2s ease, box-shadow 0.3s ease;
    /* Transiciones suaves */
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
    background-color: rgb(191, 249, 217);
}

.message-bubble.user {
    background-color: rgb(125, 211, 252);
    margin-left: auto;
}

.message-text {
    background-color: rgb(240, 240, 240);
    /* Fondo gris claro para mensajes */
    color: rgb(18, 18, 18);
    /* Texto negro */
    padding: 10px;
    border-radius: 20px;
    margin-top: 10px;
    max-width: 80%;
    word-wrap: break-word;
}

/* Quitar curvatura en la esquina inferior izquierda */
.message-text.user {
    border-radius: 20px 20px 0 20px;
    margin-left: auto;
}

.message-text.bot {
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
    padding: 10px;
    background-color: rgb(230, 230, 230);
}


.input-container button {
    padding: 10px;
    background-color: rgb(125, 211, 252); /* Azul claro */
    color: rgb(255, 255, 255); /* Texto blanco */
    border: none;
    border-radius: 50%; /* Hacerlo circular */
    cursor: pointer;
    margin-left: 10px;
    width: 40px; /* Tamaño cuadrado */
    height: 40px; /* Tamaño cuadrado */
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.input-container button::before {
    content: '↑';
    font-size: 20px; /* Tamaño de la flecha */
}

.input-container button:hover {
    background-color: rgb(191, 249, 217); /* Verde claro al hacer hover */
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
</style>
