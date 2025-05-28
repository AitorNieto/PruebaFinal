<template>
  <div class="background">
    <!-- Botón X para cerrar, arriba a la izquierda, fuera de la tarjeta -->
    <button class="volver-flecha-btn" @click="emit('solicitaHome')" aria-label="Cerrar">
      <span class="flecha">&times;</span>
    </button>
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
        <input :type="passwordFieldType" v-model="Password" placeholder="Contraseña" />
        <i class="icon eye-icon" @click="togglePasswordVisibility">{{ passwordFieldType === 'password' ? '👁️' : '🙈' }}</i>
      </div>
 
 
      <!-- Recordarme y ¿Olvidaste tu contraseña? -->
      <div class="actions">
        <label>
          <input type="checkbox" /> Recordarme
        </label>
        <a href="#" class="forgot-password" @click.prevent="forgotPassword">¿Olvidaste tu contraseña?</a>
      </div>
 
 
      <!-- Botón para iniciar sesión -->
      <button class="login-btn" @click="presioneLogin">Iniciar Sesión</button>
       <!-- Botón Google -->
      <button @click="registrarConGoogle" class="google-btn">Iniciar sesión con Google</button>
 
 
      <!-- Mensaje de error si falla el login -->
      <p class="error" v-if="errorMensaje">{{ errorMensaje }}</p>
      <p class="success" v-if="buenMensaje">{{ buenMensaje }}</p>
 
 
      <!-- Texto para ir a la vista de registro -->
      <p class="register-text">
        ¿No eres miembro?
        <a href="#" @click.prevent="irARegistro">Regístrate ahora</a>
      </p>
    </div>
  </div>
 </template>
 
 
 <script setup>
 import { ref, defineEmits } from 'vue';
 import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
 import { useFirebaseAuth } from 'vuefire';
 
 
 // Emite los mismos eventos que tu padre espera:
 // - logeado -> para indicar que el usuario inició sesión correctamente
 // - solicitaRegistro -> para cambiar a la vista de registro
 const emit = defineEmits(['logeado', 'solicitaRegistro', 'solicitaHome']);
 
 
 const Usuario = ref('');
 const Password = ref('');
 const errorMensaje = ref('');
 const buenMensaje = ref('');
 const passwordFieldType = ref('password');
 
 
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
 
 
 function registrarConGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      buenMensaje.value = 'Inicio de sesión completado con Google.';
      emit('logeado');
    })
    .catch((error) => {
      errorMensaje.value = 'Error con Google: ' + error.message;
    });
 }
 
 
 // Cuando el usuario hace clic en la pestaña o enlace de "Registrarse"
 function irARegistro() {
  emit('solicitaRegistro');
 }
 
 
 function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
 }
 
 function forgotPassword() {
  if (!Usuario.value) {
    errorMensaje.value = 'Introduce tu correo electrónico para restablecer la contraseña.';
    return;
  }
  sendPasswordResetEmail(auth, Usuario.value)
    .then(() => {
      buenMensaje.value = 'Se ha enviado un correo para restablecer la contraseña.';
      errorMensaje.value = '';
    })
    .catch((error) => {
      errorMensaje.value = 'Error al enviar el correo de recuperación: ' + error.message;
      buenMensaje.value = '';
    });
}
 </script>
 
 
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
  font-weight: 400;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease;
 }
 
 
 .tab:hover {
  color: #fff;
  /* Quitar cualquier sombra o efecto dorado */
  text-shadow: none;
 }
 
 
 .active-tab {
  border-bottom: 2px solid #ffd90099;
 }
 
 
 /* ======= Título ======= */
 .title {
  font-size: 24px;
  font-weight: 400;
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
  margin-bottom: 24px; /* Añadido margen inferior */
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
  background: #4285f4;
  cursor: pointer;
  margin-bottom: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
 }
 .google-btn::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg') no-repeat center/contain;
  vertical-align: middle;
 }
 .google-btn:hover {
  background: #357ae8;
  color: #fff;
  /* Quitar cualquier sombra o efecto dorado */
  text-shadow: none;
 }
 
 
 /* ======= Mensaje de error ======= */
 .error {
  color: #ff8080;
  margin-top: 8px;
 }
 
 
 /* ======= Mensaje de éxito ======= */
 .success {
  color: rgb(102, 255, 0);
  margin-top: 8px;
 }
 
 
 /* ======= Texto para ir a la vista de registro ======= */
 .register-text {
  margin-top: 16px;
  font-size: 14px;
  color: white;
 }
 .register-text a {
  color: #fff;
  text-decoration: underline;
  font-weight: 400;
 }
 .register-text a:hover {
  color: #a32b2b;
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
  height:38px;
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
