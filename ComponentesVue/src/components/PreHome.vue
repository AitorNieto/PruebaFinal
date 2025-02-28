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
  </div>
</template>

<style scoped>
.prehome {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.letter, .icon {
  margin: 0 10px;
  animation: spin 1.5s linear infinite; /* Ajusta la duración de la animación */
}

@keyframes spin {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
}
</style>