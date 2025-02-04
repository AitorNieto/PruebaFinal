<script setup>
import { ref } from 'vue';
import Menu from './components/Menu.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';
import Perfil from './components/Perfil.vue';

const LoginVisible=ref(true);
const RegistroVisible=ref(false);
const HomeVisible=ref(false);

function mostrarRegistro(){
  LoginVisible.value=false;
  RegistroVisible.value=true;
}

function mostrarLogin(){
    LoginVisible.value=true;
    RegistroVisible.value=false;
}

function mostrarHome(){
  HomeVisible.value=true;
  LoginVisible.value=false;
}

const currentSection = ref('login');

function changeSection(section) {
  currentSection.value = section;
}
</script>

<template>
  <div id="app">
    <h1 class="main-title">
      Destino Perfecto
      <img class="logo" src="./assets/LogoPagina.jpg" alt="Logo" />
    </h1>
    
    <Menu v-if="currentSection !== 'login' && currentSection !== 'register'" @navigate="changeSection" />
    
    <div v-if="currentSection === 'login'">
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
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  position: relative;
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