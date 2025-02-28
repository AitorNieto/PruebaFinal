<script setup>
import { ref, defineEmits } from 'vue';
import { useFirebaseAuth } from 'vuefire';

const isOpen = ref(false);
const emit = defineEmits(['navigate']);
const auth = useFirebaseAuth();

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function navigate(section) {
  if (section === 'profile' && !auth.currentUser) {
    alert('Debes estar autenticado para acceder al perfil. Redirigiendo al registro.');
    emit('navigate', 'register');
  } else {
    emit('navigate', section);
  }
  isOpen.value = false;
}

function handleLogout() {
  if (!auth || !auth.currentUser) {
    console.error("No estás conectado para cerrar sesión.");
    alert("No estás conectado para cerrar sesión.");
    isOpen.value = false; // Asegúrate de cerrar el menú
    return;
  }

  auth.signOut()
    .then(() => {
      alert("Sesión cerrada correctamente.");
      emit('navigate', 'login'); // Redirigir al login
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error.message);
      alert("Hubo un problema al intentar cerrar sesión: " + error.message);
    })
    .finally(() => {
      isOpen.value = false; // Cerrar el menú
    });
}
</script>

<template>
  <div>
    <button @click="toggleMenu" class="menu-toggle">☰</button>

    <transition name="slide">
      <aside v-if="isOpen" class="menu">
        <nav>
          <ul>
            <li><a href="#" @click.prevent="navigate('home')">Inicio</a></li>
            <li><a href="#" @click.prevent="navigate('profile')">Perfil</a></li>
            <li><a href="#" @click.prevent="handleLogout">Cerrar sesión</a></li>
          </ul>
        </nav>
      </aside>
    </transition>

    <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
  </div>
</template>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(124, 7, 7, 0.8);
  color: white;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.menu ul li {
  margin: 0;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
}

.menu ul li a:hover {
  color: #00e1ff;
}

.menu ul li a:active {
  background-color: rgba(0, 0, 0, 0.1); /* Ajusta la opacidad del fondo al estar pulsado */
}

.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1002;
  font-size: 20px;
}

.menu-toggle:hover {
  background: rgba(124, 7, 7, 0.8);;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.background {
  width: 100%;
  height: 100vh;
  background: linear-gradient(10deg, rgba(150, 15, 15, 0.8), rgba(165, 47, 47, 0.8));
}
</style>
