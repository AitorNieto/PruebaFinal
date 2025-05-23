<script setup>
const emit = defineEmits(['navigate']);
import Idiomas from './Idiomas.vue';
import GatoExplosivo from './GatoExplosivo.vue';
import Botijo from './Botijo.vue';
import { ref } from 'vue';



function toggleRainbowMode() {
  isRainbowMode.value = !isRainbowMode.value;
  document.body.style.transition = 'all 0.5s';
  if (isRainbowMode.value) {
    startRainbowParty();
  }
}

function startRainbowParty() {
  if (!isRainbowMode.value) return;
  const hue = Math.random() * 360;
  document.body.style.backgroundColor = `hsl(${hue}, 70%, 95%)`;
  setTimeout(startRainbowParty, 1000);
}
</script>

<template>
  <button class="volver-button" @click="emit('navigate', 'home')">
      Volver al Home
  </button>
  <div class="random-flex-container" :class="{ 'rainbow-mode': isRainbowMode }">
    <div class="crazy-corner" @click="toggleRainbowMode">{{ danceEmoji }}</div>
    <div class="floating-letters">
      <span v-for="(letter, index) in letters" :key="index" 
            :style="{ animationDelay: index * 0.5 + 's' }">
        {{ letter }}
      </span>
    </div>

    <Botijo />
  </div>
  <Idiomas />
  <div class="confetti"></div>
  <div class="confetti confetti-2"></div>
  <div class="confetti confetti-3"></div>
  <GatoExplosivo />
  
</template>

<style scoped>

.random-flex-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* Floating elements */
.floating-letters {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-letters span {
  position: absolute;
  font-size: 2rem;
  animation: floatAround 20s linear infinite;
}

/* Animations */
@keyframes floatAround {
  0% { transform: translate(0, 100vh) rotate(0deg); }
  25% { transform: translate(25vw, 75vh) rotate(90deg); }
  50% { transform: translate(50vw, 50vh) rotate(180deg); }
  75% { transform: translate(75vw, 25vh) rotate(270deg); }
  100% { transform: translate(100vw, 0) rotate(360deg); }
}

/* Rainbow mode */
.random-flex-container.rainbow-mode {
  animation: rainbowBg 5s linear infinite;
}

@keyframes rainbowBg {
  0% { background: hsl(0, 70%, 95%); }
  33% { background: hsl(120, 70%, 95%); }
  66% { background: hsl(240, 70%, 95%); }
  100% { background: hsl(360, 70%, 95%); }
}
.crazy-corner {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 3rem;
  cursor: pointer;
  animation: bounce 1s infinite;
  z-index: 1000;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Confetti */
.confetti {
  position: fixed;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  animation: float 8s ease-in-out infinite;
}

.confetti-2 {
  left: 20%;
  animation-delay: -2s;
  animation-duration: 7s;
  background: #ffd;
}

.confetti-3 {
  right: 30%;
  animation-delay: -4s;
  animation-duration: 6s;
  background: #e8f4f8;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-100px) rotate(180deg); }
}


.spectacular-button-alacado:hover {
  transform: scale(1.05) rotate(2deg);
}

/* Responsive */
@media (max-width: 768px) {
  .crazy-corner {
    font-size: 2rem;
  }
  
  .spectacular-button-alacado {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .full-width-section {
    margin: 1rem -1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .floating-letters span,
  .rainbow-mode,
  .crazy-corner,
  .confetti {
    animation: none;
  }
}

.full-width-section {
  width: 100vw;
  margin: 2rem -2rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.volver-button {
  position: fixed; /* Fija el botón en la ventana */
  bottom: 2rem;
  right: 2rem;
  z-index: 9999; /* Asegura que esté siempre por encima de otros elementos */
  padding: 1rem 2rem;
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.2rem;
  color: white;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

/* Ajuste responsive para el botón */
@media (max-width: 768px) {
  .volver-button {
    bottom: 1rem;
    right: 1rem;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>