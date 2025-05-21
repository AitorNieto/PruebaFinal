<template>
  <div class="background">
    <div class="hero-container">
      <h1 class="titulo">DELIRIOS Y BARBARIES</h1>
      <img :src="imageSrc" alt="Imagen de bienvenida" class="welcome-image" />
      <!-- Panel de colaboración fuera del content-wrapper y pegado al borde derecho -->
      <div class="collaboration-panel">
        <div class="collaboration-badge">
          <span class="badge-text">ZDrinks</span>
          <span class="badge-line"></span>
        </div>
        <img src="@/assets/ZDrinks.png" alt="Zdrinks" class="partner-logo" />
        <p class="partner-text">Patrocinador Oficial</p>
      </div>
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
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  position: relative;
  text-align: center;
  padding-top: 3.5rem;
}

.welcome-image {
  width: 70vw;
  max-width: 1000px;
  min-width: 320px;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin: 2rem auto 0 auto;
  display: block;
  transition: transform 0.3s;
  /* Borde eliminado */
}

.welcome-image:hover {
  transform: scale(1.03);
}

/* Panel de colaboración pegado al borde derecho de la pantalla */
.collaboration-panel {
  position: fixed;
  top: 60px;
  right: 0;
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px 0 0 15px;
  padding: 30px 18px 30px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 260px;
  max-width: 320px;
  min-width: 180px;
  margin-right: 0;
  z-index: 1002;
}

.collaboration-badge {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.badge-text {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: nowrap;
}

.badge-line {
  height: 1px;
  width: 50px;
  background: linear-gradient(to right, #ffffff, transparent);
  margin-left: 15px;
}

.partner-logo {
  width: 100%;
  max-width: 180px;
  height: auto;
  margin: 15px 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.partner-text {
  color: white;
  font-size: 1.1rem;
  margin-top: 10px;
  font-style: italic;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.titulo {
  font-size: 4.7vw;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Georgia', serif;
  text-align: center;
  margin: 1.2% auto 0 auto;
  position: static;
  text-shadow: 3px 3px 3px rgba(114, 36, 36, 0.8);
  transition: color 0.5s ease, text-shadow 2s ease;
  z-index: 2;
}

.countdown-container {
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 1001;
}

/* RESPONSIVE: Panel y contador abajo en móvil, ambos visibles */
@media (max-width: 900px) {
  .welcome-image {
    width: 95vw;
    max-width: 98vw;
    margin: 0 auto;
  }
  .collaboration-panel {
    top: 10px;
    right: 0;
    left: auto;
    bottom: auto;
    transform: none;
    width: 80vw;
    max-width: 320px;
    border-radius: 15px 0 0 15px;
    padding: 12px 8px 12px 14px;
  }
  .countdown-container {
    top: 10px;
    left: 0;
    right: auto;
    bottom: auto;
    transform: none;
  }
}

@media (max-width: 768px) {
  .titulo {
    font-size: 8vw;
  }
  .badge-text {
    font-size: 1rem;
  }
  .partner-text {
    font-size: 0.9rem;
  }
}
</style>