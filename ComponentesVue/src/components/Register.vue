<script setup>
import { ref, defineEmits } from 'vue';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';

// Emite los mismos eventos que tu padre espera:
// - cambiarALogin -> para volver a la vista de login
// - cambiarAHome -> para ir a la vista 'home' tras registrarse
const emit = defineEmits(['cambiarALogin', 'cambiarAHome']);

const UsuarioRe = ref('');
const PasswordRe = ref('');
const RepetirPasswordRe = ref('');
const errorMensaje = ref('');
const buenMensaje = ref('');

const auth = useFirebaseAuth();

function presioneAceptar() {
  errorMensaje.value = '';
  buenMensaje.value = '';

  if (!UsuarioRe.value || !PasswordRe.value || !RepetirPasswordRe.value) {
    errorMensaje.value = 'Por favor, completa todos los campos.';
    return;
  }

  if (PasswordRe.value !== RepetirPasswordRe.value) {
    errorMensaje.value = 'Las contraseñas no coinciden.';
    return;
  }

  createUserWithEmailAndPassword(auth, UsuarioRe.value, PasswordRe.value)
    .then(() => {
      buenMensaje.value = 'Registro completado. Verifica tu correo electrónico.';
      sendEmailVerification(auth.currentUser);
      emit('cambiarAHome');
    })
    .catch((error) => {
      errorMensaje.value = 'Error: ' + error.message;
    });
}

function registrarConGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      buenMensaje.value = 'Registro completado con Google.';
      emit('cambiarAHome');
    })
    .catch((error) => {
      errorMensaje.value = 'Error con Google: ' + error.message;
    });
}

// Cuando el usuario hace clic en la pestaña o enlace de "Iniciar Sesión"
function irALogin() {
  emit('cambiarALogin');
}
</script>

<template>
  <div class="background">
    <div class="login">
      <!-- Tabs simulados: Iniciar Sesión / Registrarse (activo) -->
      <div class="tabs">
        <button class="tab" @click="irALogin">Iniciar Sesión</button>
        <button class="tab active-tab" disabled>Registrarse</button>
      </div>

      <h1 class="title">Registro</h1>

      <!-- Grupo de inputs -->
      <div class="input-group">
        <i class="icon correo-icon"></i>
        <input v-model="UsuarioRe" type="email" placeholder="Correo electrónico" />
      </div>
      <div class="input-group">
        <i class="icon lock-icon"></i>
        <input v-model="PasswordRe" type="password" placeholder="Contraseña" />
      </div>
      <div class="input-group">
        <i class="icon lock-icon"></i>
        <input v-model="RepetirPasswordRe" type="password" placeholder="Repetir Contraseña" />
      </div>

      <!-- Botón principal -->
      <button @click="presioneAceptar" class="login-btn">Registrar</button>

      <!-- Botón Google -->
      <button @click="registrarConGoogle" class="google-btn">Registrar con Google</button>

      <!-- Mensajes de error / éxito -->
      <p class="error" v-if="errorMensaje">{{ errorMensaje }}</p>
      <p class="success" v-if="buenMensaje">{{ buenMensaje }}</p>

      <!-- Texto para ir a la vista de login -->
      <p class="register-text">
        ¿Ya eres miembro?
        <a href="#" @click.prevent="irALogin">Inicia sesión</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* ======= Estilos de fondo y card principal ======= */
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  width: 100%;
  height: 100vh;
  background: linear-gradient(10deg, rgba(150, 15, 15, 0.8), rgba(165, 47, 47, 0.8)),
    url('@/assets/Fondo.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  background: rgba(124, 7, 7, 0.8);
  width: 360px;
  padding: 24px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* ======= Tabs (pestañas) ======= */
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.tab {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  margin: 0 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease;
}

.tab:hover {
  color: #ffd900;
}

.active-tab {
  border-bottom: 2px solid #ffd900;
}

/* ======= Título ======= */
.title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

/* ======= Inputs con icono ======= */
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
  background: rgb(243, 243, 243);
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Iconos */
.icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
}

/* Emojis */
.user-icon::before {
  content: '👤';
}
.lock-icon::before {
  content: '🔒';
}
.correo-icon::before {
  content: '✉️';
}

/* ======= Botón principal ======= */
.login-btn {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #ff0000, #830f0f);
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 16px;
}
.login-btn:hover {
  background: linear-gradient(90deg, #830f0f, #ff0000);
}

/* ======= Botón Google ======= */
.google-btn {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  outline: none;
  font-size: 14px;
  color: white;
  background: #818e8f;
  cursor: pointer;
  margin-bottom: 16px;
}
.google-btn:hover {
  background: #93aaac;
}

/* ======= Mensajes de error / éxito ======= */
.error {
  color: #ff8080;
  margin-top: 8px;
}
.success {
  color: rgb(102, 255, 0);
  margin-top: 8px;
}

/* ======= Texto para ir a la vista de login ======= */
.register-text {
  margin-top: 16px;
  font-size: 14px;
  color: white;
}
.register-text a {
  color: #ffd900;
  text-decoration: none;
  font-weight: bold;
}
.register-text a:hover {
  text-decoration: underline;
}
</style>
