<template>
  <div class="edit-profile-page">
    <div class="edit-profile-container">
      <!-- Botón de volver atrás -->
      <button class="back-btn" @click="goBack">← Volver</button>

      <!-- Sección de cambio de contraseña -->
      <section class="edit-profile-info">
        <h1 class="edit-title">Cambiar Contraseña</h1>
        <form @submit.prevent="submitForm">

          <div class="form-group">
            <label for="currentPassword">Contraseña Actual:</label>
            <input type="password" id="currentPassword" v-model="formData.currentPassword"
              placeholder="Ingresa tu contraseña actual" />
          </div>

          <div class="form-group">
            <label for="newPassword">Nueva Contraseña:</label>
            <input type="password" id="newPassword" v-model="formData.newPassword"
              placeholder="Ingresa la nueva contraseña" />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Nueva Contraseña:</label>
            <input type="password" id="confirmPassword" v-model="formData.confirmPassword"
              placeholder="Confirma la nueva contraseña" />
          </div>

          <button type="submit" class="save-btn" @click="goBack">Cambiar Contraseña</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CambiarContraseña',
  data() {
    return {
      formData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async submitForm() {
      if (this.formData.newPassword !== this.formData.confirmPassword) {
        alert('Las contraseñas nuevas no coinciden');
        return;
      }

      try {
        const userId = localStorage.getItem('id');

        const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/cambiarContra`, {
          id: userId, 
          currentPassword: this.formData.currentPassword,
          newPassword: this.formData.newPassword
        })

        if (response.data.success) {
          alert('Contraseña cambiada exitosamente');
          // Opcional: redirigir a otra página
          this.$router.push('/perfil');
        } else {
          alert('Error al cambiar la contraseña');
        }
      } catch {
        console.error('Error enviando el formulario', error);
        alert('Hubo un problema al procesar su solicitud');
      }

      console.log('Formulario enviado', this.formData);
    }
  }
};
</script>

<style scoped>
/* Estilos generales de la página de cambio de contraseña */
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

.edit-title {
  margin-bottom: 1rem;
  color: #90caf9;
  font-size: 1.8rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4caf50;
  border-radius: 5px;
  background: #1a283b;
  color: #ffffff;
  font-size: 0.9rem;
}

input::placeholder {
  color: #90caf9;
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

@media (max-width: 768px) {
  .edit-profile-container {
    padding: 1.5rem;
  }

  .save-btn {
    font-size: 0.9rem;
  }
}
</style>