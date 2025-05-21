<template>
  <div class="background">
    <div class="hero-container">
      <h1 class="titulo">DELIRIOS Y BARBARIES</h1>
      <img :src="imageSrc" alt="Imagen de bienvenida" class="welcome-image" />
    </div>
    <Countdown class="countdown-container" />
  </div>
</template>

<script setup>
import Countdown from './Extras/Countdown.vue';
import imageSrc from '@/assets/FondoDyB.png';
</script>

<style scoped>
.background {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
      10deg,
      rgba(150, 15, 15, 0.8),
      rgba(165, 47, 47, 0.8)
    ),
    url('@/assets/FondoPrincipal.png') no-repeat center center fixed;
  background-size: cover;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
  text-align: center;
}

.titulo {
  font-size: 4.7vw;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Georgia', serif;
  text-align: center;
  margin: 2.8%;
  position: absolute;
  top: 0%;
  left: 20%;
  text-shadow: 3px 3px 3px rgba(114, 36, 36, 0.8);
  transition: color 0.5s ease, text-shadow 2s ease;
  z-index: 2;
}

.titulo:hover {
  color: #6d0303;
  text-shadow: 3px 3px 3px rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .titulo {
    font-size: 8vw;
  }
}

.titulo::before {
  content: "";
  position: absolute;
  top: -20%;
  left: -10%;
  width: 120%;
  height: 140%;
  background: transparent;
  pointer-events: all;
}

.welcome-image {
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  height: auto;
  border-radius: 20px;
  transition: transform 0.3s ease;
  z-index: 1;
}

.welcome-image:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .welcome-image {
    width: 70vw;
  }
}

.countdown-container {
  position: absolute;
  top: 7%;
  left: 50px;
  transform: translateY(-50%);
  z-index: 1;
}
</style>