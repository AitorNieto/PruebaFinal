<template>
    <div class="wordle-div">
      <h1>Wordle</h1>
      <p>Adivina la palabra en 6 intentos</p>
  
      <!-- Tablero del Wordle -->
      <div class="grid">
        <div v-for="(row, rowIndex) in attempts" :key="rowIndex" class="row">
          <div
            v-for="(letter, colIndex) in row"
            :key="colIndex"
            class="cell"
            :class="getCellColor(rowIndex, colIndex)"
          >
            {{ letter }}
          </div>
        </div>
      </div>
  
      <!-- Mensaje de victoria o derrota -->
      <p v-if="gameStatus" class="game-message">{{ gameStatus }}</p>
  
      <!-- Entrada de palabra -->
      <div class="input-container">
        <input
          v-if="!gameStatus"
          v-model="currentWord"
          type="text"
          maxlength="5"
          placeholder="Escribe aquí"
          @keyup.enter="checkWord"
        />
        <button v-if="!gameStatus" @click="checkWord">Enviar</button>
      </div>
  
      <!-- Botones -->
      <div class="buttons-container">
        <button @click="resetGame">Reiniciar</button>
        <button @click="goBack">⬅ Volver</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";

const emit = defineEmits(["go-back"]);

// Array de palabras de 5 letras relacionadas con el podcast
const palabrasPodcast = [
  "RISAS",
  "LOCOS",
  "VOCES",
  "RADIO",
  "RISAS",
  "FANSY",
  "TOPOS",
  "GRITO",
  "JUEGO",
  "BROMA",
  "DEBAT",
  "TOMAS",
  "FINAL",
  "RISAS",
  "DELIR",
  "BARBA",
  "AMIGO",
  "MICRO",
  "LETRA",
  "SONAR"
];

// Selecciona la palabra del día según la fecha (cambia cada 24h)
const hoy = new Date();
const diasDesdeEpoch = Math.floor(hoy.getTime() / (1000 * 60 * 60 * 24));
const palabraDelDia = palabrasPodcast[diasDesdeEpoch % palabrasPodcast.length];

const wordToGuess = ref(palabraDelDia);
const attempts = ref(Array(6).fill("").map(() => Array(5).fill("")));
const currentRow = ref(0);
const currentWord = ref("");
const gameStatus = ref(null);
  
  // Verifica la palabra ingresada
  const checkWord = () => {
    if (currentWord.value.length !== 5) return; // Solo palabras de 5 letras
  
    // Convertir en array para modificar el tablero
    const wordArray = currentWord.value.toUpperCase().split("");
    attempts.value[currentRow.value] = wordArray;
  
    if (currentWord.value.toUpperCase() === wordToGuess.value) {
      gameStatus.value = "¡Ganaste! 🎉";
    } else if (currentRow.value === 5) {
      gameStatus.value = `Perdiste. La palabra era: ${wordToGuess.value}`;
    } else {
      currentRow.value++;
    }
  
    currentWord.value = ""; // Reset input
  };
  
  // Define los colores de las celdas según la comparación
  const getCellColor = (rowIndex, colIndex) => {
    // Si la fila es la acertada y el juego está ganado, todo verde
    if (
      gameStatus.value &&
      attempts.value[rowIndex].join("") === wordToGuess.value &&
      gameStatus.value.includes("¡Ganaste!")
    ) {
      return "correct";
    }

    if (rowIndex >= currentRow.value) return "";
    const guess = attempts.value[rowIndex];
    const target = wordToGuess.value.split("");

    // Paso 1: Marca las letras correctas (verde)
    const colorArray = Array(5).fill("");
    const targetUsed = Array(5).fill(false);

    for (let i = 0; i < 5; i++) {
      if (guess[i] === target[i]) {
        colorArray[i] = "correct";
        targetUsed[i] = true;
      }
    }

    // Paso 2: Marca las letras presentes (amarillo) solo si quedan disponibles
    for (let i = 0; i < 5; i++) {
      if (colorArray[i]) continue;
      for (let j = 0; j < 5; j++) {
        if (!targetUsed[j] && guess[i] === target[j]) {
          colorArray[i] = "present";
          targetUsed[j] = true;
          break;
        }
      }
      if (!colorArray[i]) colorArray[i] = "absent";
    }

    return colorArray[colIndex];
  };
  
  // Reiniciar el juego
  const resetGame = () => {
    attempts.value = Array(6).fill("").map(() => Array(5).fill(""));
    currentRow.value = 0;
    gameStatus.value = null;
    currentWord.value = "";
  };
  
  // Volver a la pantalla anterior
  const goBack = () => {
    emit("go-back");
  };
  </script>
  
  <style scoped>
  .wordle-div {
    text-align: center;
    color: white;
    padding: 20px;
    position: relative;
    top: -800px;  /* Mueve el contenido más arriba */
  }
  
  .grid {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    gap: 5px;
    margin: 20px auto;
    width: 300px;
  }
  
  .row {
    display: flex;
    gap: 5px;
    justify-content: center;
  }
  
  .cell {
    width: 50px;
    height: 50px;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #444;
    color: white;
  }
  
  .correct {
    background-color: #4caf50; /* Verde */
  }
  
  .present {
    background-color: #ffc107; /* Amarillo */
  }
  
  .absent {
    background-color: #666666; /* Gris oscuro */
  }
  
  .input-container {
    margin-top: 10px;
  }
  
  input {
    width: 150px;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    background-color: #8b1e1e;
    border-radius: 5px;
    color: white;
  }
  
  .buttons-container {
    margin-top: 15px;
  }
  
  button {
    background-color: #8b1e1e;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
  }
  
  button:hover {
    background-color: #a83232;
  }
  
  .game-message {
    font-size: 1.5rem;
    color: #ffd700;
    margin-top: 20px;
  }
  </style>
