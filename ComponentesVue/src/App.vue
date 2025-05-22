<script setup>
import { ref, onMounted } from 'vue';
import Login from './components/Autentificacion/Login.vue';
import Register from './components/Autentificacion/Register.vue';
import Home from './components/ComponentesHome/Home.vue';
import Perfil from './components/ComponentesPerfil/Perfil.vue';
import PreHome from './components/ComponentesHome/PreHome.vue';
import Nosotros from './components/ComponentesNosotros/Nosotros.vue';
import Videos from './components/ComponenteVideos/Videos.vue';
import Foro from './components/ComponentesForo/Foro.vue';


const currentSection = ref('prehome');

function changeSection(section) {
  currentSection.value = section;
}

onMounted(() => {
  setTimeout(() => {
    currentSection.value = 'home';
  }, 3000);
});

// Removed redundant export default block
</script>

<template>
  <div id="app">
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
      <Home @navigate="changeSection" />
    </div>
    <div v-else-if="currentSection === 'profile'">
      <Perfil @navigate="changeSection" />
    </div>
    <div v-else-if="currentSection === 'nosotros'">
      <Nosotros />
    </div>
    <div v-else-if="currentSection === 'videos'">
      <Videos />
    </div>
    <div v-else-if="currentSection === 'foro'">
      <Foro />
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
  z-index: 2000; /* Asegúrate de que los botones estén por encima del contenido */
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

/* Media Queries */
@media (max-width: 768px) {
  .auth-buttons button {
    padding: 8px 16px;
    font-size: 14px;
  }

  .main-title {
    font-size: 24px;
  }

  .logo {
    width: 60px;
    height: 60px;
  }
}
</style>