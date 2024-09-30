<template>
    <div class="profile-page">
      <div class="profile-container">
        <!-- Botón de volver atrás -->
        <button class="back-btn" @click="goBack">← Volver</button>
  
        <!-- Sección de información del usuario -->
        <section class="profile-info">
          <i class="fa-solid fa-user profile-logo"></i>

          <!-- <img src="@/assets/images.jpeg" alt="Logo de la página" class="profile-logo" /> -->
          <div class="profile-details">
            <h2 class="profile-name">{{nombre}}</h2>
            <p class="profile-email">{{ correo }}</p>
          </div>
          <button class="edit-profile-btn" @click="goToEditProfile">Editar Perfil</button>
        </section>
  
        <!-- Sección de configuración de la cuenta -->
        <section class="profile-settings">
          <h3 class="settings-title">Configuraciones de Cuenta</h3>
          <ul class="settings-list">
            <li class="settings-item">
              <button @click="goToChangePassword" class="settings-btn">Cambiar Contraseña</button>
            </li>
            <li class="settings-item">
              <button @click="updateEmail" class="settings-btn">Actualizar Correo</button>
            </li>
            <li class="settings-item">
              <button @click="deleteAccount" class="settings-btn">Eliminar Cuenta</button>
            </li>
          </ul>
        </section>
  
        <!-- Sección de cierre de sesión -->
        <button class="logout-btn" @click="logout">Cerrar Sesión</button>
      </div>
    </div>
  </template>
  
  <script>
import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'Perfil',
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      goToEditProfile() {
        this.$router.push({ name: 'editarPerfil' });
      },
      goToChangePassword() {
        this.$router.push({ name: 'cambiarPassword' });
      },
      updateEmail() {
        alert('Función para actualizar el correo electrónico');
      },
      manageNotifications() {
        alert('Función para gestionar las notificaciones');
      },
      deleteAccount() {
        alert('Función para eliminar la cuenta');
      },
      ...mapMutations(['cerrarSesion']),
    logout() {
      this.cerrarSesion(); 
      this.$router.push("/")
    }
    },
    computed: {
    nombre() {
      return this.$store.getters.obtenerNombre;
    },
    correo() {
      return this.$store.getters.obtenerCorreo;
    }
  }
  };
  </script>
  
  <style scoped>
  /* Estilos generales de la página del perfil */
  .profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a283b, #243b55);
    padding: 2rem;
  }
  
  .profile-container {
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
  
  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .profile-logo {
    width: 67px;
    text-align: center;
    height: 54px;
    font-size: 29px;
    border: 3px solid #4caf50;
    border-radius: 50%;
    background-color: #1a283b;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .profile-details {
    margin-bottom: 1rem;
  }
  
  .profile-name {
    font-size: 1.5rem;
    margin: 0.5rem 0;
    color: #90caf9;
  }
  
  .profile-email {
    font-size: 0.9rem;
    color: #ffffff;
  }
  
  .edit-profile-btn {
    padding: 0.5rem 1.5rem;
    background: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .edit-profile-btn:hover {
    background: #43a047;
  }
  
  .profile-settings {
    text-align: left;
    margin-bottom: 2rem;
  }
  
  .settings-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #90caf9;
  }
  
  .settings-list {
    list-style: none;
    padding: 0;
  }
  
  .settings-item {
    margin-bottom: 0.75rem;
  }
  
  .settings-btn {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #2b2d42;
    color: #ffffff;
    border: 1px solid #4caf50;
    border-radius: 5px;
    cursor: pointer;
    text-align: left;
  }
  
  .settings-btn:hover {
    background: #3a3b4c;
  }
  
  .logout-btn {
    width: 100%;
    padding: 0.75rem;
    background: #f44336;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .logout-btn:hover {
    background: #d32f2f;
  }
  
  /* Estilo responsivo */
  @media (max-width: 768px) {
    .profile-container {
      padding: 1.5rem;
    }
  
    .settings-btn {
      font-size: 0.9rem;
    }
  
    .logout-btn {
      font-size: 0.9rem;
    }
  }
  </style>
  