<template>
  <div class="background">
    <div class="hero-container">
      <!-- Efecto de partículas o decoración de fondo -->
      <div class="particles"></div>
      
      <!-- Contador en posición absoluta dentro del hero -->
      <Countdown class="countdown-container" />
      
      <!-- Título con efecto mejorado -->
      <div class="title-container">
        <h1 class="titulo">DELIRIOS Y BARBARIES</h1>
        <div class="title-decoration"></div>
      </div>
      
      <!-- Marco decorativo para la imagen -->
      <div class="image-frame">
        <div class="frame-inner">
          <img :src="imageSrc" alt="Imagen de bienvenida" class="welcome-image" />
        </div>
        <div class="frame-decoration"></div>
      </div>
      
      <!-- Panel de colaboración EXACTAMENTE COMO ESTABA ANTES -->
      <div class="collaboration-panel" @click="$emit('go-zdrinks')" style="cursor:pointer;">
        <div class="collaboration-badge">
          <span class="badge-text">ZDrinks</span>
          <span class="badge-line"></span>
        </div>
        <img src="@/assets/ZDrinks.png" alt="Zdrinks" class="partner-logo" />
        <p class="partner-text">Patrocinador Oficial</p>
      </div>
    </div>
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
      #800000,
      rgba(90, 2, 2, 0.89)
    ),
    url('@/assets/FondoPrincipal.png') no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  position: relative;
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

/* Efecto de partículas decorativas */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
    radial-gradient(circle, rgba(255,215,0,0.05) 1px, transparent 1px);
  background-size: 30px 30px, 40px 40px;
  z-index: 0;
  animation: particleMove 120s linear infinite;
}

@keyframes particleMove {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 1000px 500px, -500px 250px; }
}

/* Mejoras para el título */
.title-container {
  position: relative;
  margin: 0.8% auto 1.5% auto;
  z-index: 2;
}

.title-decoration {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  z-index: -1;
}

.titulo {
  font-size: 4.7vw;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif;
  text-align: center;
  position: relative;
  text-shadow: 3px 3px 3px #800000;
  transition: all 0.4s ease;
  z-index: 2;
  letter-spacing: 1px;
  margin: 0;
  padding: 0 20px;
}

.titulo:hover {
  color: #800000;
  text-shadow: 2px 2px 8px #bbb6b6, 0 0 2px #a30000;
  transform: scale(1.02);
}

/* Marco decorativo para la imagen */
.image-frame {
  position: relative;
  width: 87vw;
  max-width: 1200px;
  min-width: 320px;
  margin: 0 auto;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  box-shadow: 
    0 0 0 1px rgba(255, 215, 0, 0.3),
    0 0 30px rgba(0, 0, 0, 0.5),
    inset 0 0 10px rgba(255, 255, 255, 0.1);
  z-index: 1;
  transition: all 0.3s ease;
}

.image-frame:hover {
  transform: scale(1.01);
  box-shadow: 
    0 0 0 1px rgba(255, 215, 0, 0.5),
    0 0 40px rgba(0, 0, 0, 0.7),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
}

.frame-inner {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.welcome-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.image-frame:hover .welcome-image {
  transform: scale(1.02);
}

.frame-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  pointer-events: none;
}

/* Panel de colaboración EXACTAMENTE COMO ESTABA ANTES */
.collaboration-panel {
  position: absolute;
  top: 300px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 220px;
  z-index: 2;
  transition: box-shadow 0.3s, background 0.3s;
}

.collaboration-panel:hover {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.collaboration-badge {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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
  width: 40px;
  background: linear-gradient(to right, #ffffff, transparent);
  margin-left: 12px;
}

.partner-logo {
  width: 100%;
  max-width: 160px;
  height: auto;
  margin: 10px 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), filter 0.3s;
  will-change: transform, filter;
}

.partner-logo:hover {
  transform: scale(1.08) rotate(-3deg);
  filter: brightness(1.15) drop-shadow(0 2px 8px #fafafa88);
}

.partner-text {
  color: white;
  font-size: 1rem;
  margin-top: 8px;
  font-style: italic;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), filter 0.3s;
  will-change: transform, filter;
}

.partner-text:hover {
  transform: scale(1.08) rotate(-3deg);
  filter: brightness(1.15) drop-shadow(0 2px 8px #ffd70088);
}

/* Contador en posición absoluta dentro del hero */
.countdown-container {
  position: absolute;
  top: 350px;
  left: 30px;
  z-index: 2;
}

/* Ajustes responsive */
@media (max-width: 768px) {
  .hero-container {
    padding-top: 2rem;
  }

  .titulo {
    font-size: 8vw;
    margin-top: 1rem;
  }

  .image-frame {
    width: 92vw;
    padding: 10px;
    margin-top: 1rem;
  }

  /* El contador se muestra debajo de la imagen principal */
  .countdown-container {
    position: relative !important;
    top: unset !important;
    left: unset !important;
    margin: 1.5rem auto 1.5rem auto !important;
    display: block !important;
    width: fit-content;
    z-index: 2;
  }

  /* El panel de patrocinadores debajo del contador */
  .collaboration-panel {
    position: relative !important;
    top: unset !important;
    right: unset !important;
    margin: 1rem auto 0 auto !important;
    width: 160px;
    padding: 12px;
    align-self: center;
    z-index: 2;
  }
}

@media (max-width: 480px) {
  .collaboration-panel {
    width: 140px;
    padding: 10px;
  }

  .partner-logo {
    max-width: 120px;
  }
  
  .title-decoration {
    width: 80%;
  }
}
</style>