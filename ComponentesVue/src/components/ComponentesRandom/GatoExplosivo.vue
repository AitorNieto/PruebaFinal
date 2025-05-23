<template>
  <div class="mundo-gato" :class="{ 'modo-caos': caosActivo }">
    <h1 class="titulo-caotico">¡No Molesteis al Gato! 🐱</h1>
    
    <div 
      class="gato" 
      :style="{ left: gatoX + 'px', top: gatoY + 'px' }"
      @click="lanzarHumo"
      @mouseover="gatoGrita"
    >
      🐱
      <div v-for="(nube, index) in humo" :key="index" class="humo" :style="nube.style">
        <span class="humo-emoji">💨</span>
      </div>
      <div v-if="showSecretMessage" class="speech-bubble">
        "<span class='secret-text'>¿48? Solo un número. Pero algunos números hacen historia.</span>"
      </div>
    </div>

    <button @click="activarCaos" class="boton-caos">
      {{ caosActivo ? "¡PARAR CAOS! 🌪️" : "¡INICIAR CAOS! 💥" }}
    </button>

    <audio ref="miau" src="https://www.soundjay.com/meow/sounds/cat-meow-4.mp3" preload="auto"></audio>
    <audio ref="explosion" src="https://www.soundjay.com/explosion/sounds/explosion-01.mp3" preload="auto"></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gatoX = ref(100);
const gatoY = ref(100);
const humo = ref([]);
const caosActivo = ref(false);
const miau = ref(null);
const explosion = ref(null);
const clickCount = ref(0);
const showSecretMessage = ref(false);

// Movimiento con teclas
const moverGato = (e) => {
  const velocidad = caosActivo.value ? 40 : 20; // Aumentamos la velocidad base
  const smoothing = caosActivo.value ? 1 : 0.8; // Factor de suavizado

  switch(e.key) {
    case 'w': gatoY.value -= velocidad * smoothing; break;
    case 's': gatoY.value += velocidad * smoothing; break;
    case 'a': gatoX.value -= velocidad * smoothing; break;
    case 'd': gatoX.value += velocidad * smoothing; break;
  }
  checkColision();
};

// ¡Explota si choca!
const checkColision = () => {
  const container = document.querySelector('.mundo-gato');
  if (!container) return;
  
  const bounds = container.getBoundingClientRect();
  const maxX = bounds.width - 100; // Restamos el tamaño aproximado del gato
  const maxY = bounds.height - 100;

  if (gatoX.value < 0 || gatoX.value > maxX || gatoY.value < 0 || gatoY.value > maxY) {
    explosion.value.play();
    humo.value = [];
    gatoX.value = maxX / 2;
    gatoY.value = maxY / 2;
  }
};

// Mejoramos el sistema de corazones con menor delay
let isAnimating = false;
const lanzarHumo = () => {
  if (isAnimating) return;
  isAnimating = true;
  miau.value.play();
  clickCount.value++;

  if (clickCount.value === 48) {
    showSecretMessage.value = true;
    setTimeout(() => {
      showSecretMessage.value = false;
      clickCount.value = 0;
    }, 5000);
  }

  const newHumo = [];
  const numHumo = 8;
  for (let i = 0; i < numHumo; i++) {
    const angle = (i / numHumo) * Math.PI * 2;
    const radio = Math.random() * 20 + 30;
    const escala = Math.random() * 0.5 + 0.8;
    const delay = i * 25;

    newHumo.push({
      style: {
        left: `${Math.cos(angle) * radio}px`,
        top: `${Math.sin(angle) * radio}px`,
        opacity: 1,
        transform: `scale(${escala})`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animationDelay: `${delay}ms`
      }
    });
  }
  humo.value = newHumo;
  setTimeout(() => {
    humo.value = [];
    isAnimating = false;
  }, 500);
};

// Modo CAOS
const activarCaos = () => {
  caosActivo.value = !caosActivo.value;
  if (caosActivo.value) {
    explosion.value.play();
  }
};

// Grito al pasar el mouse (¡porque sí!)
const gatoGrita = () => {
  if (caosActivo.value) miau.value.play();
};

// Event listeners
onMounted(() => {
  window.addEventListener('keydown', moverGato);
  const container = document.querySelector('.mundo-gato');
  if (container) {
    const bounds = container.getBoundingClientRect();
    gatoX.value = bounds.width / 2 - 50;
    gatoY.value = bounds.height / 2 - 50;
  }
});
onUnmounted(() => {
  window.removeEventListener('keydown', moverGato);
});
</script>

<style scoped>
/* ESTILOS PSICODÉLICOS MEJORADOS */
.mundo-gato {
  width: 100%;
  max-width: none;
  min-height: 80vh;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  position: relative;
  overflow: hidden;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribuye el espacio verticalmente */
  align-items: center;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.modo-caos {
  background: linear-gradient(45deg, #ff0000, #ffff00);
  animation: fondo-caos 0.1s infinite;
  box-shadow: inset 0 0 150px rgba(255, 0, 0, 0.5);
}

.titulo-caotico {
  position: relative; /* Cambiado de absolute a relative */
  margin-top: -2rem; /* Ajuste fino de la posición */
  width: 100%;
  color: white;
  text-shadow: 0 0 10px #000,
               0 0 20px #ff00ff,
               0 0 30px #ff00ff;
  font-size: 3rem;
  text-align: center;
  transform-origin: center;
  animation: titulo-flotante 3s ease-in-out infinite;
  letter-spacing: 2px;
  font-weight: bold;
}

.gato {
  position: absolute;
  font-size: 5rem;
  cursor: pointer;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); /* Transición más rápida */
  transform-origin: center center;
  z-index: 10;
  user-select: none;
  will-change: transform; /* Optimización de rendimiento */
  margin: auto; /* Centra el gato verticalmente cuando no se mueve */
}

.gato:hover {
  transform: scale(1.2) rotate(5deg);
  filter: drop-shadow(0 0 20px rgba(255, 105, 180, 0.8));
}

.gato:active {
  transform: scale(0.95); /* Efecto de click */
}

.boton-caos {
  position: relative; /* Cambiado de absolute a relative */
  margin-bottom: 2rem;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  background: linear-gradient(45deg, #ff0000, #ff6b6b);
  color: white;
  border: none;
  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
  transition: all 0.3s;
  z-index: 100;
}

.humo {
  position: absolute;
  pointer-events: none;
  font-size: 2.2rem;
  will-change: transform, opacity;
  animation: explotar-humo 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  filter: drop-shadow(0 0 8px #bbb);
}
.humo-emoji {
  opacity: 0.8;
  filter: blur(0.5px);
}
@keyframes explotar-humo {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    transform: scale(0) rotate(360deg) translate(var(--random-x, 100px), var(--random-y, -100px));
    opacity: 0;
  }
}
.speech-bubble {
  position: absolute;
  left: 50%;
  top: -60px;
  transform: translateX(-50%);
  background: #fff;
  color: #800000;
  border-radius: 18px;
  padding: 0.5rem 1.2rem;
  font-size: 1.1rem;
  font-family: 'Montserrat', Arial, sans-serif;
  box-shadow: 0 2px 12px #0002;
  border: 2px solid #ff00ff44;
  z-index: 20;
  min-width: 180px;
  max-width: 260px;
  text-align: center;
  animation: speechIn 0.4s;
}
.secret-text {
  font-size: 0.95rem;
  color: #c40000;
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 4px #fff8, 0 0 2px #ff00ff44;
}
@keyframes speechIn {
  from { opacity: 0; transform: translateX(-50%) scale(0.7); }
  to { opacity: 1; transform: translateX(-50%) scale(1); }
}

@keyframes explotar-corazon {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    transform: scale(0) rotate(360deg) translate(var(--random-x, 100px), var(--random-y, -100px));
    opacity: 0;
  }
}

/* Mejoramos la animación del modo caos */
.modo-caos .gato {
  transition: all 0.1s linear; /* Más rápido en modo caos */
}

.modo-caos .corazon {
  animation-duration: 0.8s; /* Más rápido en modo caos */
}

@keyframes flotar-gato {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  25% { 
    transform: translateY(-10px) rotate(-5deg); 
  }
  75% { 
    transform: translateY(10px) rotate(5deg); 
  }
}

@keyframes titulo-flotante {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

@keyframes fondo-caos {
  0% { filter: hue-rotate(0deg) brightness(1); }
  50% { filter: hue-rotate(180deg) brightness(1.2); }
  100% { filter: hue-rotate(360deg) brightness(1); }
}

/* Ajustes responsive actualizados */
@media (max-width: 768px) {
  .mundo-gato {
    padding: 3rem 1rem;
  }

  .titulo-caotico {
    font-size: 2rem;
    margin-top: -1rem;
  }

  .boton-caos {
    margin-bottom: 1rem;
    padding: 12px 24px;
    font-size: 1rem;
  }
}
</style>