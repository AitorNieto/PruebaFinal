<template>
  <div class="contenedor-lituano">
    <h1 class="titulo-llamativo">
      ¡APRENDE LITUANO CARA ANCHOA! 
      <span class="emoji-giratorio">🤪</span>
    </h1>

    <div class="tarjeta-palabra" @click="siguientePalabra">
      <div class="lado-lituano" :class="{ 'girando': girando }">
        <p class="texto-grande">{{ palabrasLituano[palabraActual].lituano }}</p>
        <p class="emoji">{{ palabrasLituano[palabraActual].emoji }}</p>
      </div>
      <div class="lado-espanol" :class="{ 'girando': girando }">
        <p class="texto-grande">{{ palabrasLituano[palabraActual].español }}</p>
        <p class="emoji">{{ palabrasLituano[palabraActual].emoji }}</p>
      </div>
    </div>

    <button @click="siguientePalabra" class="boton-loco">
      ¡SIGUIENTE PALABRA! 
      <span class="emoji-boton">👉</span>
    </button>

    <div v-if="showConfetti" class="confetti"></div>
    <div v-if="showConfetti" class="confetti confetti-2"></div>
    <div v-if="showConfetti" class="confetti confetti-3"></div>

    <audio ref="audioClick" src="https://www.soundjay.com/buttons/sounds/button-09.mp3" preload="auto"></audio>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const palabraActual = ref(0);
    const girando = ref(false);
    const showConfetti = ref(false);
    const audioClick = ref(null);

    const palabrasLituano = [
      { lituano: "Labas", español: "Hola", emoji: "👋" },
      { lituano: "Ačiū", español: "Gracias", emoji: "🙏" },
      { lituano: "Taip", español: "Sí", emoji: "👍" },
      { lituano: "Ne", español: "No", emoji: "👎" },
      { lituano: "Obuolys", español: "Manzana", emoji: "🍎" },
      { lituano: "Šuo", español: "Perro", emoji: "🐶" },
      { lituano: "Katinas", español: "Gato", emoji: "🐱" },
      { lituano: "Linksma!", español: "¡Divertido!", emoji: "🎉" },
      { lituano: "tsacdopdrocer", español: "Misterio", emoji: "❓" },

    ];

    const siguientePalabra = () => {
      girando.value = true;
      showConfetti.value = true;
      
      if (audioClick.value) {
        audioClick.value.play(); // ¡Sonido divertido!
      }

      setTimeout(() => {
        palabraActual.value = (palabraActual.value + 1) % palabrasLituano.length;
        girando.value = false;
      }, 500);

      setTimeout(() => {
        showConfetti.value = false;
      }, 1500);
    };

    return {
      palabraActual,
      girando,
      showConfetti,
      palabrasLituano,
      siguientePalabra,
      audioClick,
    };
  },
};
</script>

<style scoped>
.contenedor-lituano {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  position: relative;
  overflow: hidden;
  min-height: 80vh; /* Reducimos la altura */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribuye el espacio uniformemente */
  align-items: center;
  gap: 2rem; /* Espaciado entre elementos */
}

.titulo-llamativo {
  position: relative; /* Cambiamos a relative */
  top: 0;
  left: 0;
  transform: none; /* Eliminamos la transformación */
  width: 100%;
  font-size: 2rem;
  color: #ff00aa;
  text-shadow: 3px 3px 0 #fff, 5px 5px 0 #ff00aa;
  margin: 1rem 0; /* Ajustamos el margen */
}

.emoji-giratorio {
  display: inline-block;
  animation: girar 3s linear infinite;
}

.tarjeta-palabra {
  max-width: 800px;
  width: 90%;
  background: white;
  border-radius: 15px;
  padding: 2rem;
  cursor: pointer;
  perspective: 1000px;
  transition: transform 0.5s;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  margin: auto; /* Centramos la tarjeta */
  position: relative;
}

.tarjeta-palabra:hover {
  transform: scale(1.05) rotate(2deg);
}

.lado-lituano, .lado-espanol {
  backface-visibility: hidden;
  transition: transform 0.6s;
}

.lado-espanol {
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.girando .lado-lituano {
  transform: rotateY(180deg);
}

.girando .lado-espanol {
  transform: rotateY(0deg);
}

.texto-grande {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #ff00aa;
}

.emoji {
  font-size: 3rem;
  margin: 0.5rem 0;
}

.boton-loco {
  position: relative; /* Cambiamos a relative */
  bottom: 0;
  left: 0;
  transform: none; /* Eliminamos la transformación */
  margin: 1rem 0; /* Ajustamos el margen */
  background: linear-gradient(45deg, #ff00aa, #ff0066);
  border: none;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 0, 170, 0.4);
  transition: all 0.3s;
  font-weight: bold;
  text-transform: uppercase;
}

.boton-loco:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 20px rgba(255, 0, 170, 0.6);
}

.emoji-boton {
  animation: saltar 0.5s infinite alternate;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f00;
  animation: confetti-fall 2s linear forwards;
}

.confetti-2 { background-color: #0f0; left: 20%; }
.confetti-3 { background-color: #00f; left: 80%; }

/* ANIMACIONES LOCAS */
@keyframes titulo-bailando {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

@keyframes girar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes saltar {
  from { transform: translateY(0); }
  to { transform: translateY(-5px); }
}

@keyframes confetti-fall {
  0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .contenedor-lituano {
    min-height: 70vh; /* Altura más pequeña en móvil */
    padding: 1rem;
    gap: 1rem;
  }

  .titulo-llamativo {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }

  .texto-grande {
    font-size: 1.8rem;
  }

  .tarjeta-palabra {
    width: 95%;
    padding: 1rem;
  }

  .boton-loco {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .emoji {
    font-size: 2.5rem;
  }
}

/* Ajuste para pantallas muy pequeñas */
@media (max-height: 600px) {
  .contenedor-lituano {
    min-height: auto;
    padding: 1rem 0;
  }

  .titulo-llamativo {
    font-size: 1.3rem;
  }
}
</style>