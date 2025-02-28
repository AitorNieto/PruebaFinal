<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
});
</script>

<template>
  <div v-if="isVisible" class="prehome">
    <div class="spinner">
      <span class="letter">D</span>
      <span class="icon">🎙️</span>
      <span class="letter">B</span>
    </div>
    <div class="footer">
      ©️ 2025 Delirios&Barbaries All rights reserved | Design by Aitor Nieto & Guillermo Beltran | Code by Aitor Nieto, Guillermo Beltran, Marcos Garcia & Eidan Martinez
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.prehome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(232, 228, 228);
  color: #8b0000; /* Rojo granate */
  font-family: 'Roboto', sans-serif; /* Letra redondita */
  position: relative;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px; /* Tamaño más grande */
  animation: fadeIn 1s ease-in-out;
}

.letter, .icon {
  margin: 0 5px; /* Espaciado más pequeño */
  animation: spin 1.5s linear infinite; /* Ajusta la duración de la animación */
  color: #8b0000; /* Rojo granate */
}

.letter {
  font-size: 48px; /* Tamaño más grande */
  font-weight: bold;
}

.icon {
  font-size: 36px; /* Tamaño más pequeño para el ícono */
}

.footer {
  position: absolute;
  bottom: 10px;
  font-size: 12px;
  text-align: center;
  color: #8b0000; /* Rojo granate */
}

@keyframes spin {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>