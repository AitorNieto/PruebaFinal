<template>
  <div class="foro-container">
  </div>
</template>

<script>
export default {
  name: 'Foro',
};
</script>

<style scoped>
.foro-container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/ForoMan.png'); /* Ruta a la imagen */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 3rem;
}
</style>