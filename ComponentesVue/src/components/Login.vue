
<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';

const emit = defineEmits(['logeado', 'solicitaRegistro']);

const Usuario = ref('');
const Password = ref('');
const auth = useFirebaseAuth();

function presioneLogin() {
  signInWithEmailAndPassword(auth, Usuario.value, Password.value)
    .then(loginOK)
    .catch(loginNOK);
}

function loginOK(userCredential) {
  alert('Usuario autenticado correctamente');
  emit('logeado');
}

function loginNOK(reason) {
  alert(`Usuario equivocado, intenta otra vez: ${reason.message}`);
}

function presioneRegistrar() {
  emit('solicitaRegistro');
}
</script>

<template>
  <div class="background">
    <div class="login">
      <h1 class="title">Login</h1>
      <div class="input-group">
        <i class="icon user-icon"></i>
        <input v-model="Usuario" type="text" placeholder="Usuario" />
      </div>
      <div class="input-group">
        <i class="icon lock-icon"></i>
        <input v-model="Password" type="password" placeholder="Contraseña" />
      </div>
      <div class="actions">
        <label>
          <input type="checkbox" /> Recordarme
        </label>
        <a href="#" class="forgot-password">Contraseña olvidada?</a>
      </div>
      <button class="login-btn" @click="presioneLogin">Iniciar Sesión</button>
      <p class="register-text">
        ¿No tienes cuenta? <a href="#" @click.prevent="presioneRegistrar">Regístrate</a>
      </p>
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

.background {
  width: 100%;
  height: 100vh;
  background: linear-gradient(10deg, rgba(16, 77, 107, 0.8), rgba(10, 75, 99, 0.8)),
    url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvSd6-0-X6oKvvOX6OoxNgatOXWbbLBvdVjA&s') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  background: rgba(65, 141, 168, 0.8);
  width: 360px;
  padding: 24px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.title {
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
  background: rgba(255, 255, 255, 0.8);
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

.user-icon::before {
  content: '👤';
}

.lock-icon::before {
  content: '🔒';
}

.login-btn {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #56ccf2, #2f80ed);
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: linear-gradient(90deg, #2f80ed, #56ccf2);
}

.register-text {
  margin-top: 16px;
  font-size: 14px;
  color: white;
}

.register-text a {
  color: #56ccf2;
  text-decoration: none;
  font-weight: bold;
}

.register-text a:hover {
  text-decoration: underline;
}
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
</style>
