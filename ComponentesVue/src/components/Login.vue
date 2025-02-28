<script setup>
import { ref, defineEmits } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';

// Emite los mismos eventos que tu padre espera:
// - logeado -> para indicar que el usuario inició sesión correctamente
// - solicitaRegistro -> para cambiar a la vista de registro
const emit = defineEmits(['logeado', 'solicitaRegistro']);

const Usuario = ref('');
const Password = ref('');
const errorMensaje = ref('');

const auth = useFirebaseAuth();

function presioneLogin() {
  errorMensaje.value = '';
  signInWithEmailAndPassword(auth, Usuario.value, Password.value)
    .then(() => {
      // Usuario autenticado correctamente
      emit('logeado');
    })
    .catch((reason) => {
      errorMensaje.value = `Error: ${reason.message}`;
    });
}

// Cuando el usuario hace clic en la pestaña o enlace de "Registrarse"
function irARegistro() {
  emit('solicitaRegistro');
}
</script>

<template>
  <div class="background">
    <div class="login">
      <!-- Tabs simulados: Login (activo) / Registrarse -->
      <div class="tabs">
        <button class="tab active-tab" disabled>Iniciar Sesión</button>
        <button class="tab" @click="irARegistro">Registrarse</button>
      </div>

      <h1 class="title">Iniciar Sesión</h1>

      <!-- Grupo de inputs -->
      <div class="input-group">
        <i class="icon correo-icon"></i>
        <input v-model="Usuario" type="email" placeholder="Correo electrónico" />
      </div>
      <div class="input-group">
        <i class="icon lock-icon"></i>
        <input v-model="Password" type="password" placeholder="Contraseña" />
      </div>

      <!-- Recordarme y ¿Olvidaste tu contraseña? -->
      <div class="actions">
        <label>
          <input type="checkbox" /> Recordarme
        </label>
        <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
      </div>

      <!-- Botón para iniciar sesión -->
      <button class="login-btn" @click="presioneLogin">Iniciar Sesión</button>

      <!-- Mensaje de error si falla el login -->
      <p class="error" v-if="errorMensaje">{{ errorMensaje }}</p>

      <!-- Texto para ir a la vista de registro -->
      <p class="register-text">
        ¿No eres miembro?
        <a href="#" @click.prevent="irARegistro">Regístrate ahora</a>
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

/* ======= Sección Recordarme / Forgot password ======= */
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: white;
  font-size: 12px;
}

.forgot-password {
  color: #fff;
  text-decoration: none;
}
.forgot-password:hover {
  text-decoration: underline;
}

/* ======= Botón de Login ======= */
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
}
.login-btn:hover {
  background: linear-gradient(90deg, #830f0f, #ff0000);
}

/* ======= Mensaje de error ======= */
.error {
  color: #ff8080;
  margin-top: 8px;
}

/* ======= Texto de registro ======= */
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

  .actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .forgot-password {
    margin-top: 8px;
  }

  .login-btn {
    padding: 10px;
    font-size: 14px;
  }

  .register-text {
    font-size: 12px;
  }
}
</style>