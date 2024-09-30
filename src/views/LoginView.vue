<template>

    <body class="cuerpo">
        <div class="wrapper">
            <div class="title-text">
                <div v-if="selectedTab == 'login'" class="title login">
                    Login
                </div>
                <div v-if="selectedTab == 'signup'" class="title signup">
                    Registro
                </div>
            </div>
            <div class="form-container">
                <div class="slide-controls">
                    <input type="radio" name="slide" id="login" v-model="selectedTab" value="login">
                    <input type="radio" name="slide" id="signup" v-model="selectedTab" value="signup">
                    <label for="login" class="slide login" @click="selectedTab = 'login'">Login</label>
                    <label for="signup" class="slide signup" @click="selectedTab = 'signup'">Registrar</label>
                    <div class="slider-tab"></div>
                </div>
                <div class="form-inner">
                    <form action="#" v-if="selectedTab === 'login'" class="login" @submit.prevent="loginSubmit">
                        <div class="field">
                            <input type="email" placeholder="Correo electronico" v-model="correoL" required>
                        </div>
                        <div class="field">
                            <input type="password" placeholder="contraseña" v-model="contraL" required>
                        </div>
                        <div class="pass-link">
                            <a href="">Olvidaste contraseña?</a>
                        </div>
                        <div class="field btn">
                            <div class="btn-layer"></div>
                            <input type="submit" value="Iniciar sesión">
                        </div>
                        <h3 id="error">{{ error }}</h3>
                        <div class="signup-link">
                            No es un miembro? <a href="" @click="selectedTab = 'signup'">Registrarse</a>
                        </div>
                    </form>
                    <form action="#" enctype="multipart/form-data" v-else class="signup" @submit.prevent="signupSubmit">
                        <div class="field">
                            <input type="text" placeholder="Nombre" v-model="nombre" required>
                        </div>
                        <div class="field">
                            <input type="email" placeholder="Correo" v-model="correo" required>
                        </div>
                        <div class="field">
                            <input type="password" placeholder="Contraseña" v-model="contra" required>
                        </div>
                        <v-file-input class="field" accept="image/png, image/jpeg, image/bmp"
                            placeholder="Escoge una foto de perfil" prepend-icon=""
                            label="Click y escoge una foto de perfil" @change="handleFileChange"></v-file-input>
                        <div class="field btn">
                            <div class="btn-layer"></div>
                            <input type="submit" value="Registrar">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios';

export default {
    name: "RegistroView",
    data() {
        return {
            nombre: "",
            correoL: "",
            contraL: "",
            correo: "",
            contra: "",
            selectedTab: "login",
            error: ""
        };
    },
    methods: {
        async loginSubmit() {
            try {
                console.log("Sirve");
                
                const response = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/login`, { user: this.correoL, password: this.contraL }, {withCredentials:true})
                console.log(response);
                
                if (response.data.validacion) {
                    // this.$store.commit('actualizarValidado', response.data.validacion);
                    // this.$store.commit('actualizarNombre', response.data.nombre);
                    console.log(response.data.usuario[0].correo)
                    this.$store.commit('actualizarNombre', response.data.usuario[0].nombre);
                    this.$store.commit('actualizarCorreo', response.data.usuario[0].correo);
                    this.$store.commit('actualizarId', response.data.usuario[0].id);

                    //redireccionar al home
                    this.$router.push('/')
                } else {
                    console.log("error en login ")
                    this.error = response.data.message

                    // reiniciar inputs
                    this.correoL = ""
                    this.contraL = ""
                }

            } catch (error) {
                console.log("Error en login", error);
                this.error = "Error al iniciar sesión.";
            }
        },
        async signupSubmit() {
            try {
                const response2 = await axios.post(`${process.env.VUE_APP_RUTA_API}/api/registro`, { nombre: this.nombre, user: this.correo, password: this.contra })
                console.log(response2.data.ok);
                
                if (response2.data.ok) {
                    console.log("Formulario de registro enviado");
                    this.selectedTab = 'login'
                    this.$router.push('/')
                }
                console.log(response2)

            } catch (error) {
                console.error("Jum Hubo un error " + error)
            }
        }
    }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body .cuerpo {
    display: grid;
    height: 100vh;
    width: 100%;
    place-items: center;
    background: -webkit-linear-gradient(left, #3498db, #2c3e50);
    /* Azul degradado */
}

::selection {
    background: #3498db;
    /* Azul seleccionado */
    color: #fff;
}

.wrapper {
    overflow: hidden;
    width: 366px;
    background: #fff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
}

.wrapper .title-text {
    display: flex;
    width: 200%;
}

.wrapper .title {
    width: 50%;
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .slide-controls {
    position: relative;
    display: flex;
    height: 50px;
    width: 100%;
    overflow: hidden;
    margin: 30px 0 10px 0;
    justify-content: space-between;
    border: 1px solid lightgrey;
    border-radius: 5px;
}

.slide-controls .slide {
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    z-index: 1;
    transition: all 0.6s ease;
}

.slide-controls label.signup {
    color: #000;
}

.slide-controls .slider-tab {
    position: absolute;
    height: 100%;
    width: 50%;
    left: 0;
    z-index: 0;
    border-radius: 5px;
    background: -webkit-linear-gradient(left, #3498db, #2c3e50);
    /* Azul degradado */
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.cuerpo input[type="radio"] {
    display: none;
}

#signup:checked~.slider-tab {
    left: 50%;
}

#signup:checked~label.signup {
    color: #fff;
    cursor: default;
    user-select: none;
}

#signup:checked~label.login {
    color: #000;
}

#login:checked~label.signup {
    color: #000;
}

#login:checked~label.login {
    cursor: default;
    user-select: none;
}

.wrapper .form-container {
    width: 100%;
    overflow: hidden;
}

.form-container .form-inner {
    display: flex;
    width: 200%;
}

.form-container .form-inner form {
    width: 50%;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-inner form .field {
    height: 50px;
    width: 100%;
    margin-top: 20px;
}

.form-inner form .field input {
    height: 100%;
    width: 100%;
    outline: none;
    padding-left: 15px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    border-bottom-width: 2px;
    font-size: 17px;
    transition: all 0.3s ease;
}

.form-inner form .field input:focus {
    border-color: #3498db;
    /* Azul en foco */
}

.form-inner form .field input::placeholder {
    color: #999;
    transition: all 0.3s ease;
}

.cuerpo form .field input:focus::placeholder {
    color: #b3b3b3;
}

.form-inner form .pass-link {
    margin-top: 5px;
}

.form-inner form .signup-link {
    text-align: center;
    margin-top: 30px;
}

.form-inner form .pass-link a,
.form-inner form .signup-link a {
    color: #3498db;
    /* Azul enlaces */
    text-decoration: none;
}

.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover {
    text-decoration: underline;
}

form .btn {
    height: 50px;
    width: 100%;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
}

form .btn .btn-layer {
    height: 100%;
    width: 300%;
    position: absolute;
    left: -100%;
    background: -webkit-linear-gradient(right, #3498db, #2c3e50, #3498db, #2c3e50);
    /* Azul degradado botón */
    border-radius: 5px;
    transition: all 0.4s ease;
}

form .btn:hover .btn-layer {
    left: 0;
}

form .btn input[type="submit"] {
    height: 100%;
    width: 100%;
    z-index: 1;
    position: relative;
    background: none;
    border: none;
    color: #fff;
    padding-left: 0;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
}

#error {
    color: #be3d3d;
    margin-top: 10px;
    text-align: center;
}
</style>
