<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';

const UsuarioRe = ref('');
const PasswordRe = ref('');
const RepetirPasswordRe = ref('');
const errorMensaje = ref('');
const buenMensaje = ref('');

const emit = defineEmits(['cambiarALogin', 'cambiarAHome']); 
const auth = useFirebaseAuth();

function presioneAceptar() {
  errorMensaje.value = '';
  buenMensaje.value = '';

  if (!UsuarioRe.value || !PasswordRe.value || !RepetirPasswordRe.value) {
    errorMensaje.value = 'Por favor complete todos los campos.';
    return;
  }

  if (PasswordRe.value !== RepetirPasswordRe.value) {
    errorMensaje.value = 'Las contraseñas no coinciden.';
    return;
  }

  createUserWithEmailAndPassword(auth, UsuarioRe.value, PasswordRe.value)
    .then(registerOK)
    .catch(registerNOK);
}

function registerOK() {
  buenMensaje.value = 'Registro completado. Verifique su correo electrónico.';
  sendEmailVerification(auth.currentUser);
  emit('cambiarALogin');
}

function registerNOK(error) {
  if (error.message.includes('auth/email-already-in-use')) {
    alert('USUARIO YA EXISTE, INTENTA LOGEARTE');
  } else {
    errorMensaje.value = 'FALLA POR: ' + error.message;
  }
}

function registrarConGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(() => {
      buenMensaje.value = 'Registro completado con Google.';
      emit('cambiarAHome');
    })
    .catch((error) => {
      errorMensaje.value = 'Error al iniciar sesión con Google: ' + error.message;
    });
}

function presioneCancelar() {
  emit('cambiarALogin'); 
}
</script>

<template>
  <div class="register-background">
    <div class="register-container">
      <h1 class="register-title">REGISTRO</h1>
      <div class="input-group">
        <i class="icon correo-icon"></i>
        <input v-model="UsuarioRe" type="text" placeholder="Email" />
      </div>
      <div class="input-group">
        <i class="icon lock-icon"></i>
        <input v-model="PasswordRe" type="password" placeholder="Contraseña" />
      </div>
      <div class="input-group">
        <i class="icon lock-icon"></i>
        <input v-model="RepetirPasswordRe" type="password" placeholder="Confirmar Contraseña" />
      </div>
      <div class="register-actions">
        <button class="register-btn" @click="presioneAceptar">Aceptar</button>
      </div>
      <div>
        <button class="google-btn" @click="registrarConGoogle">Registrarse con Google 🇬</button>
      </div>
      <br/>
      <p class="Login-text">
        ¿Ya tienes cuenta? <a href="#" @click.prevent="presioneCancelar">Inicia Sesion</a>
      </p>
      <label class="error">{{ errorMensaje }}</label>
      <label class="success">{{ buenMensaje }}</label>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.register-background {
  width: 100%;
  height: 100vh;
  background: linear-gradient(10deg, rgba(150, 15, 15, 0.8), rgba(165, 47, 47, 0.8)),
    url('@/assets/Fondo.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-container {
  background: rgba(180, 50, 50, 0.8);
  width: 400px;
  padding: 24px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.register-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

.input-group {
  margin-bottom: 16px;
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 30px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: rgb(255, 255, 255);
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
}

.user-icon::before { content: '👤'; }
.lock-icon::before { content: '🔒'; }
.correo-icon::before { content: '✉️'; }

.register-btn, .cancel-btn, .google-btn {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-btn { background: linear-gradient(90deg, #0444cf, #5189f0); }
.register-btn:hover { background: linear-gradient(90deg, #5189f0, #0444cf); }

.cancel-btn { background: #5189f0; }
.cancel-btn:hover { background: #0444cf; }

.google-btn { background: #818e8f; }
.google-btn:hover { background: #93aaac; }

.error { color: rgb(255, 0, 0); }
.success { color: rgb(102, 255, 0); }

.Login-text{
  color: white  ;
}
.Login-text a {
  color: #ffd900;
  text-decoration: none;
  font-weight: bold;
}
</style>
