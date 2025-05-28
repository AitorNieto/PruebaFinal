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

const passwordFieldType = ref('password');
const repeatPasswordFieldType = ref('password');

function presioneAceptar() {
  errorMensaje.value = '';
  buenMensaje.value = '';

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!UsuarioRe.value || !PasswordRe.value || !RepetirPasswordRe.value) {
    errorMensaje.value = 'Por favor, completa todos los campos.';
    return;
  }
  if (!emailRegex.test(UsuarioRe.value)) {
    errorMensaje.value = 'Introduce un correo electrónico válido.';
    return;
  }
  if (PasswordRe.value !== RepetirPasswordRe.value) {
    errorMensaje.value = 'Las contraseñas no coinciden.';
    return;
  }

  createUserWithEmailAndPassword(auth, UsuarioRe.value, PasswordRe.value)
    .then(() => {
      sendEmailVerification(auth.currentUser);
      buenMensaje.value = 'Registro completado.\nHemos enviado un correo de verificación a tu email.\nPor favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta antes de iniciar sesión.';
      // No cambiar a home automáticamente, dejar que el usuario lea el mensaje
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

function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}

function toggleRepeatPasswordVisibility() {
  repeatPasswordFieldType.value = repeatPasswordFieldType.value === 'password' ? 'text' : 'password';
}
</script>

<template>
  <div class="background">
    <!-- Botón X para cerrar, arriba a la izquierda, fuera de la tarjeta -->
    <button class="volver-flecha-btn" @click="$emit('cambiarAHome')" aria-label="Cerrar">
      <span class="flecha">&times;</span>
    </button>
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
        <input :type="passwordFieldType" v-model="PasswordRe" placeholder="Contraseña" />
        <i class="icon eye-icon" @click="togglePasswordVisibility">{{ passwordFieldType === 'password' ? '👁️' : '🙈' }}</i>
      </div>
      <div class="input-group">
        <i class="icon lock-icon"></i>
        <input :type="repeatPasswordFieldType" v-model="RepetirPasswordRe" placeholder="Repetir Contraseña" />
        <i class="icon eye-icon" @click="toggleRepeatPasswordVisibility">{{ repeatPasswordFieldType === 'password' ? '👁️' : '🙈' }}</i>
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
  font-family: Impact, 'Arial Narrow Bold', Arial, sans-serif !important;
  font-weight: 400 !important;
  font-stretch: condensed;
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
  position: relative;
}

/* ======= Botón flecha volver arriba a la izquierda en el background ======= */
.volver-flecha-btn {
  position: fixed;
  top: 32px;
  left: 32px;
  background: #800000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.13);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  z-index: 1002;
}
.volver-flecha-btn .flecha {
  font-size: 1.4em;
  font-weight: bold;
  margin: 0;
  font-family: 'Arial Black', 'Arial Bold', Arial, sans-serif;
  line-height: 1;
  letter-spacing: 0;
  color: #fff;
  text-shadow: 0 1px 4px #0005;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.volver-flecha-btn:hover {
  background: #a32b2b;
  color: #fff;
  box-shadow: 0 4px 16px #0004;
}
@media (max-width: 600px) {
  .volver-flecha-btn {
    top: 10px;
    left: 10px;
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
  .volver-flecha-btn .flecha {
    font-size: 1.1em;
  }
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

/* Icono de ojo */
.eye-icon {
  right: 12px;
  left: auto;
  cursor: pointer;
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

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .login {
    width: 90%;
    padding: 16px;
  }

  .tab {
    font-size: 14px;
    padding: 6px 12px;
  }

  .title {
    font-size: 20px;
  }

  .input-group input {
    padding: 10px 14px 10px 36px;
    font-size: 12px;
  }

  .login-btn,
  .google-btn {
    padding: 10px;
    font-size: 14px;
  }

  .register-text {
    font-size: 12px;
  }
}
</style>