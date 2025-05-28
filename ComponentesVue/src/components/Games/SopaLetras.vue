<template>
  <div class="sopa-letras-container" @mousedown.prevent>
    <h2>Sopa de Letras</h2>
    <p>Encuentra las palabras ocultas en la sopa de letras.</p>
    <div class="sopa-layout">
      <div class="sopa-palabras">
        <h3>Palabras a buscar:</h3>
        <ul>
          <li
            v-for="word in words"
            :key="word"
            :class="{ tachada: foundWords.includes(word) }"
          >
            {{ word }}
          </li>
        </ul>
      </div>
      <div class="sopa-grid" style="user-select: none;">
        <div
          v-for="(row, rowIndex) in grid"
          :key="rowIndex"
          class="sopa-row"
        >
          <div
            v-for="(letter, colIndex) in row"
            :key="colIndex"
            class="sopa-cell"
            :class="isSelected(rowIndex, colIndex)"
            @mousedown="startSelection(rowIndex, colIndex)"
            @mouseover="continueSelection(rowIndex, colIndex)"
            @mouseup="endSelection"
          >
            {{ letter }}
          </div>
        </div>
      </div>
    </div>
    <button @click="goBack">Volver</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Palabras a buscar (2 fijas y 8 aleatorias)
const words = [
  "RECORD",    // Horizontal izquierda a derecha
  "HORAS",     // Horizontal izquierda a derecha
  "PLAZA",     // Horizontal derecha a izquierda
  "FIESTA",    // Vertical arriba a abajo
  "LIBRO",     // Vertical abajo a arriba
  "CAMINO",    // Horizontal derecha a izquierda
  "VENTANA",   // Vertical arriba a abajo
  "MESA",      // Horizontal izquierda a derecha
  "JUEGO",     // Vertical abajo a arriba
  "TORRE"      // Vertical arriba a abajo
];

// Palabras encontradas
const foundWords = ref([]);

// Celdas marcadas de verde
const foundCells = ref([]);

// Sopa de letras 10x10 con palabras en todas las direcciones y letras aleatorias en los huecos
const baseGrid = [
  // 0    1    2    3    4    5    6    7    8    9
  ["R", "E", "C", "O", "R", "D", "A", "N", "A", "T"], // RECORD (0,0→0,5), VENTANA (0,5→6,5)
  ["O", "Q", "M", "U", "B", "E", "N", "L", "S", "O"], // VENTANA vertical (1,5→6,5)
  ["L", "I", "B", "R", "O", "N", "A", "A", "C", "R"], // LIBRO vertical (6,0→2,0)
  ["A", "S", "D", "E", "V", "T", "T", "I", "J", "R"], // VENTANA vertical (3,5)
  ["H", "O", "R", "A", "S", "A", "N", "E", "Z", "E"], // HORAS (4,0→4,4)
  ["F", "I", "E", "S", "T", "A", "E", "C", "D", "O"], // FIESTA vertical (0,0→5,0)
  ["L", "I", "B", "R", "O", "V", "V", "O", "P", "G"], // LIBRO vertical (6,0→2,0)
  ["O", "N", "I", "M", "A", "C", "Q", "R", "S", "E"], // CAMINO (7,5→7,0) derecha a izquierda
  ["A", "Z", "A", "L", "P", "U", "V", "W", "X", "U"], // PLAZA (8,4→8,0) derecha a izquierda
  ["M", "E", "S", "A", "K", "T", "O", "R", "R", "J"], // MESA (9,0→9,3), TORRE (9,5→9,9)
];

// Rellena los nulls con letras aleatorias
function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}
const grid = ref(
  baseGrid.map(row =>
    row.map(cell => cell ? cell : getRandomLetter())
  )
);

const selectedCells = ref([]);
const selectionDirection = ref(null);

const startSelection = (row, col) => {
  selectedCells.value = [{ row, col }];
  selectionDirection.value = null;
};

const continueSelection = (row, col) => {
  if (selectedCells.value.length === 0) return;

  const { row: startRow, col: startCol } = selectedCells.value[0];

  // Determina la dirección en el primer movimiento
  if (selectedCells.value.length === 1) {
    if (row === startRow && col !== startCol) {
      selectionDirection.value = "horizontal";
    } else if (col === startCol && row !== startRow) {
      selectionDirection.value = "vertical";
    } else {
      // No permitir diagonal ni el mismo punto
      return;
    }
  }

  // Solo permite continuar en la dirección correcta
  if (
    (selectionDirection.value === "horizontal" && row === startRow) ||
    (selectionDirection.value === "vertical" && col === startCol)
  ) {
    // Evita duplicados
    if (!selectedCells.value.some(cell => cell.row === row && cell.col === col)) {
      selectedCells.value.push({ row, col });
    }
  }
};

const endSelection = () => {
  const selectedWord = selectedCells.value
    .map(({ row, col }) => grid.value[row][col])
    .join("");
  const reversedWord = selectedCells.value
    .map(({ row, col }) => grid.value[row][col])
    .reverse()
    .join("");

  // Permite palabras normales y al revés
  let found = "";
  if (words.includes(selectedWord) && !foundWords.value.includes(selectedWord)) {
    found = selectedWord;
  } else if (words.includes(reversedWord) && !foundWords.value.includes(reversedWord)) {
    found = reversedWord;
  }

  if (found) {
    foundWords.value.push(found);
    foundCells.value.push([...selectedCells.value]);
  }

  selectedCells.value = [];
  selectionDirection.value = null;
};

const isSelected = (row, col) => {
  // Si la celda está en alguna palabra encontrada, márcala de verde
  for (const wordCells of foundCells.value) {
    if (wordCells.some(cell => cell.row === row && cell.col === col)) {
      return "found";
    }
  }
  // Si está seleccionada actualmente, márcala de amarillo
  if (selectedCells.value.some(cell => cell.row === row && cell.col === col)) {
    return "selected";
  }
  return "";
};

const emit = defineEmits(["go-back"]);
const goBack = () => {
  emit("go-back");
};
</script>

<style scoped>
.sopa-letras-container {
  text-align: center;
  color: white;
  padding: 20px;
  position: relative;
  /* Elimina el left negativo y usa margin para centrar */
  top: -400px;
  left: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
}

.sopa-layout {
  display: flex;
  justify-content: flex-start; /* Cambia a flex-start */
  align-items: flex-start;
  gap: 40px;
  margin-left: 1200px; /* Mueve todo el layout a la derecha */
}

.sopa-palabras {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  min-width: 150px;
  text-align: left;
}

.sopa-palabras h3 {
  margin-top: 0;
}

.sopa-palabras ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sopa-palabras li {
  margin-bottom: 8px;
  font-weight: bold;
  color: #ffe066;
  transition: color 0.2s, text-decoration 0.2s;
}

.sopa-palabras li.tachada {
  color: #6aff6a;
  text-decoration: line-through;
}

.sopa-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
  justify-content: center;
  margin: 20px auto;
}

.sopa-cell {
  width: 60px;
  height: 60px;
  background-color: #A83232;
  color: white;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  transition: background 0.2s, color 0.2s;
}

.sopa-cell.selected {
  background-color: yellow;
  color: black;
}

.sopa-cell.found {
  background-color: #2ecc40;
  color: white;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: white;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: lightgray;
}
</style>
