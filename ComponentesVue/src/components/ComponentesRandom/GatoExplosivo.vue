<template>
  <div class="mundo-gato" :class="{ 'modo-caos': caosActivo }">
    <h1 class="titulo-caotico">¡No Molesteis al Gato! 🐱</h1>
    
    <div 
      class="gato" 
      :style="{ left: gatoX + 'px', top: gatoY + 'px' }"
      @click="lanzarCorazones"
      @mouseover="gatoGrita"
    >
      🐱
      <div v-for="(corazon, index) in corazones" :key="index" class="corazon" :style="corazon.style">
        ❤️
      </div>
      <div v-if="showSecretMessage" class="speech-bubble">
        "¿48? Solo un número. Pero algunos números hacen historia."
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
const corazones = ref([]);
const caosActivo = ref(false);
const miau = ref(null);
const explosion = ref(null);
const clickCount = ref(0);
const showSecretMessage = ref(false);

// Movimiento con teclas
const moverGato = (e) => {
  const velocidad = caosActivo.value ? 30 : 10;
  switch(e.key) {
    case 'w': gatoY.value -= velocidad; break;
    case 's': gatoY.value += velocidad; break;
    case 'a': gatoX.value -= velocidad; break;
    case 'd': gatoX.value += velocidad; break;
  }
  checkColision();
};

// ¡Explota si choca!
const checkColision = () => {
  if (gatoX.value < 0 || gatoX.value > 500 || gatoY.value < 0 || gatoY.value > 500) {
    explosion.value.play();
    corazones.value = []; // Limpiar corazones
    gatoX.value = 100;
    gatoY.value = 100;
  }
};

// Corazones al hacer clic
const lanzarCorazones = () => {
  miau.value.play();
  clickCount.value++;
  
  // Mensaje secreto al click 48
  if (clickCount.value === 48) {
    showSecretMessage.value = true;
    setTimeout(() => {
      showSecretMessage.value = false;
      clickCount.value = 0; // Reiniciar contador después de que desaparezca el mensaje
    }, 5000);
  }

  for (let i = 0; i < 5; i++) {
    corazones.value.push({
      style: {
        left: `${Math.random() * 50}px`,
        top: `${Math.random() * 50}px`,
        opacity: 1,
        transform: `scale(${Math.random() * 2})`
      }
    });
    setTimeout(() => {
      corazones.value.shift();
    }, 1000);
  }
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
});
onUnmounted(() => {
  window.removeEventListener('keydown', moverGato);
});
</script>

<style scoped>
/* ESTILOS PSICODÉLICOS */
.mundo-gato {
  width: 600px;
  height: 600px;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  transition: all 0.5s;
}

.modo-caos {
  background: linear-gradient(45deg, #ff0000, #ffff00);
  animation: fondo-caos 0.1s infinite;
}

.titulo-caotico {
  color: white;
  text-shadow: 0 0 10px #000;
  font-size: 2.5rem;
  text-align: center;
  padding-top: 20px;
  animation: titulo-temblor 0.3s infinite;
}

.gato {
  position: absolute;
  font-size: 3rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.gato:hover {
  transform: scale(1.2);
}

.corazon {
  position: absolute;
  animation: flotar 1s ease-out forwards;
}

.boton-caos {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s;
}

.boton-caos:hover {
  background: #ff0000;
  transform: translateX(-50%) scale(1.1);
}

/* ANIMACIONES LOCAS */
@keyframes flotar {
  to {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes fondo-caos {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

@keyframes titulo-temblor {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.speech-bubble {
  position: absolute;
  background: white;
  border-radius: 20px;
  padding: 15px;
  min-width: 200px;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  border: 3px solid #000;
  animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1000;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-top-color: #000;
}

@keyframes popIn {
  0% {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  80% {
    transform: translateX(-50%) scale(1.2);
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}
</style>