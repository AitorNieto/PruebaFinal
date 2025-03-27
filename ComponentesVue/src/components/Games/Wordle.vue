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
  
  const wordToGuess = ref("AUDIO"); // Cambia esto por una palabra aleatoria si quieres
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
    if (rowIndex >= currentRow.value) return "";
    const letter = attempts.value[rowIndex][colIndex];
    if (letter === wordToGuess.value[colIndex]) return "correct";
    if (wordToGuess.value.includes(letter)) return "present";
    return "absent";
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
  