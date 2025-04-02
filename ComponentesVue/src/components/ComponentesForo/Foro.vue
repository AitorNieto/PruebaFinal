<template>
  <div class="foro-container">
    <button class="fancy-button back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i>
      <span>Volver al Inicio</span>
      <div class="button-glow"></div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Foro',
  emits: ['navigate'],
  methods: {
    goBack() {
      this.$emit('navigate', 'home');
    },
  },
};
</script>

<style scoped>
.foro-container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/ForoMan2.png'); /* Ruta a la imagen */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: Arial, sans-serif;
}

.fancy-button {
  position: relative;
  margin-right: 150vh;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #800000, #ff0000);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fancy-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.button-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fancy-button:hover .button-glow {
  opacity: 1;
}
</style>
