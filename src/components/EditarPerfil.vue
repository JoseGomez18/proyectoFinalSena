<template>
    <div class="edit-profile-page">
      <div class="edit-profile-container">
        <!-- Botón de volver atrás -->
        <button class="back-btn" @click="goBack">← Volver</button>
  
        <!-- Sección de edición de perfil -->
        <section class="edit-profile-info">
          <!-- <img src="@/assets/images.jpeg" alt="Logo de la página" class="profile-logo" /> -->
          <h1 class="edit-title">Editar Perfil</h1>
  
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Nombre Completo:</label>
              <input type="text" id="name" v-model="formData.name" placeholder="Ingresa tu nombre completo" />
            </div>
            <div class="form-group">
              <label for="email">Correo Electrónico:</label>
              <input type="email" id="email" v-model="formData.email" placeholder="Ingresa tu correo electrónico" />
            </div>
            <div class="form-group">
              <label for="confirm-email">Confirmar Correo Electrónico:</label>
              <input type="email" id="confirm-email" v-model="formData.confirmEmail" placeholder="Confirma tu correo electrónico" />
            </div>
            <div class="form-group">
              <label for="phone">Número de Teléfono:</label>
              <input type="tel" id="phone" v-model="formData.phone" placeholder="Ingresa tu número de teléfono" />
            </div>
            <button type="submit" class="save-btn">Guardar Cambios</button>
          </form>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditarPerfil',
    data() {
      return {
        formData: {
          name: '',
          email: '',
          confirmEmail: '',
          phone: ''
        }
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      submitForm() {
        if (this.formData.email !== this.formData.confirmEmail) {
          alert('Los correos electrónicos no coinciden.');
          return;
        }
        
        console.log('Formulario enviado', this.formData);
        // Aquí podrías agregar lógica para enviar los datos a una API
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos generales de la página de edición de perfil */
  .edit-profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a283b, #243b55);
    padding: 2rem;
  }
  
  .edit-profile-container {
    background: rgba(26, 40, 59, 0.9);
    border-radius: 10px;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: #ffffff;
    text-align: center;
    position: relative;
  }
  
  /* Estilo para el botón de volver atrás */
  .back-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    background: #90caf9;
    color: #1a283b;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.3s, transform 0.2s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .back-btn:hover {
    background: #4caf50;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  /* Estilo para el logo */
  .profile-logo {
    width: 100px;
    height: auto;
    margin-bottom: 1rem;
    border: 3px solid #4caf50; /* Añadido borde similar al estilo del perfil */
    border-radius: 50%;
    background-color: #1a283b; /* Fondo oscuro para el logo */
    padding: 0.5rem; /* Espacio alrededor del logo */
  }
  
  /* Estilo para el título y el formulario */
  .edit-profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .edit-title {
    margin-bottom: 1rem;
    color: #90caf9;
    font-size: 1.8rem; /* Ajusta el tamaño del título */
    font-weight: bold;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    width: 100%;
    text-align: left; /* Alinea el texto de las etiquetas a la izquierda */
  }
  
  label {
    display: block;
    margin-bottom: 0.3rem; /* Reduce el espacio debajo de la etiqueta */
    color: #ffffff;
    font-size: 0.9rem; /* Ajusta el tamaño de la fuente de las etiquetas */
    font-weight: 600; /* Haciendo que las etiquetas sean un poco más prominentes */
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #4caf50;
    border-radius: 5px;
    background: #1a283b;
    color: #ffffff;
    font-size: 0.9rem; /* Ajusta el tamaño de la fuente de los inputs */
  }
  
  input::placeholder {
    color: #90caf9; /* Color de texto para los placeholders */
  }
  
  .save-btn {
    padding: 0.75rem 1.5rem;
    background: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
  }
  
  .save-btn:hover {
    background: #43a047;
  }
  
  /* Estilo responsivo */
  @media (max-width: 768px) {
    .edit-profile-container {
      padding: 1.5rem;
    }
  
    .save-btn {
      font-size: 0.9rem;
    }
  }
  </style>
  