
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
  emit('navigate', section);
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
            <li><a href="#" @click="navigate('home')">Inicio</a></li>
            <li><a href="#" @click="navigate('profile')">Perfil</a></li>
            <li><a href="#" @click="handleLogout">Cerrar sesión</a></li>
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
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: rgba(16, 77, 107, 0.8);
  color: white;
  padding: 20px;
  transform: translateX(0);
  z-index: 1001;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu ul li {
  margin: 20px 0;
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

.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background: #348ff7;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1002;
  font-size: 20px;
}

.menu-toggle:hover {
  background: #07305e;
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
</style>
