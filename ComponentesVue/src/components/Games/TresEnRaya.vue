<template>
  <div class="tres-en-raya-page">
    <h1>¡Bienvenido al Tres en Raya!</h1>
    <p>Aquí puedes jugar al clásico juego de Tres en Raya.</p>

    <!-- Tablero del Tres en Raya -->
    <div class="board">
      <div
        v-for="(cell, index) in board"
        :key="index"
        class="cell"
        :class="{ disabled: cell }"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>

    <!-- Mensaje del estado del juego -->
    <p v-if="winner" class="winner-message">
      ¡{{ winner === 'Empate' ? 'Es un empate' : `Ganador: ${winner}` }}!
    </p>
    <p v-else class="turn-message">Turno de: {{ currentPlayer }}</p>

    <!-- Botones -->
    <button class="reset-button" @click="resetGame">Reiniciar Juego</button>
    <button class="back-button" @click="goBack">⬅ Volver</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['go-back']);

// Tablero inicial vacío
const board = ref(Array(9).fill(''));

// Jugador actual
const currentPlayer = ref('X');

// Ganador del juego
const winner = ref(null);

// Realizar un movimiento
const makeMove = (index) => {
  if (!board.value[index] && !winner.value) {
    board.value[index] = currentPlayer.value;
    if (checkWinner()) {
      winner.value = currentPlayer.value;
    } else if (board.value.every((cell) => cell)) {
      winner.value = 'Empate';
    } else {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
    }
  }
};

// Verificar si hay un ganador
const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      board.value[a] &&
      board.value[a] === board.value[b] &&
      board.value[a] === board.value[c]
    );
  });
};

// Reiniciar el juego
const resetGame = () => {
  board.value = Array(9).fill('');
  currentPlayer.value = 'X';
  winner.value = null;
};

// Volver a la vista anterior
const goBack = () => {
  emit('go-back');
};
</script>

<style scoped>
.tres-en-raya-page {
  text-align: center;
  color: white;
  padding: 20px;
  position: relative; /* Permite ajustar la posición */
  top: -500px; /* Mueve el contenido hacia arriba */
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 300px;
  margin: 20px auto;
}

.cell {
  width: 100px;
  height: 100px;
  background-color: #a83232;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cell.disabled {
  cursor: not-allowed;
  background-color: #701515;
}

.cell:hover:not(.disabled) {
  background-color: #830f0f;
}

.winner-message {
  font-size: 1.5rem;
  color: #ffd700;
  margin-top: 20px;
}

.turn-message {
  font-size: 1.2rem;
  color: #ffffff;
  margin-top: 10px;
}

.reset-button,
.back-button {
  background-color: #830f0f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
}

.reset-button:hover,
.back-button:hover {
  background-color: #a83232;
}

:global(body) {
  background-color: #701515; /* Granate oscuro */
}
</style>