<script setup>
import { ref, onMounted } from 'vue';
import Menu from './components/Menu.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';
import Perfil from './components/Perfil.vue';
import PreHome from './components/PreHome.vue';

const currentSection = ref('prehome');

function changeSection(section) {
  currentSection.value = section;
}

onMounted(() => {
  setTimeout(() => {
    currentSection.value = 'home';
  }, 3000);
});
</script>

<template>
  <div id="app">
    <div v-if="currentSection !== 'prehome' && currentSection !== 'login' && currentSection !== 'register'">
      <div class="auth-buttons">
        <button @click="changeSection('login')">Autenticación</button>
      </div>
    </div>

    <div v-if="currentSection === 'prehome'">
      <PreHome />
    </div>
    <div v-else-if="currentSection === 'login'">
      <Login @logeado="changeSection('home')" @solicitaRegistro="changeSection('register')" />
    </div>
    <div v-else-if="currentSection === 'register'">
      <Register @cambiarALogin="changeSection('login')" @cambiarAHome="changeSection('home')" />
    </div>
    <div v-else-if="currentSection === 'home'">
      <Home />
    </div>
    <div v-else-if="currentSection === 'profile'">
      <Perfil />
    </div>

    <div v-if="currentSection !== 'prehome'">
      <Menu @navigate="changeSection" />
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  position: relative;
}

.auth-buttons {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000; /* Asegúrate de que los botones estén por encima del contenido */
}

.auth-buttons button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #800000; /* Granate */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.auth-buttons button:hover {
  background-color: #660000; /* Granate oscuro */
}

.main-title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
</style>