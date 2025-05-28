<template>
  <div class="sopa-letras-container" @mousedown.prevent>
    <div class="sopa-header">
      <h2>Sopa de Letras</h2>
      <div class="sopa-explicacion">
        <span class="explicacion-titulo">¿Cómo jugar?</span>
        <span class="explicacion-texto">
          Selecciona con el ratón las letras de las palabras ocultas.<br />
          Puedes marcar palabras en horizontal o vertical, en ambos sentidos.<br />
          ¡Encuentra todas las palabras para completar el reto!
        </span>
      </div>
    </div>
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
  padding: 18px 8px 18px 8px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: unset;
  height: auto;
  box-sizing: border-box;
  background: linear-gradient(135deg, #701515 0%, #a83232 100%);
  border-radius: 18px;
  box-shadow: 0 8px 40px #0007, 0 1.5px 0 #fff2 inset;
  max-width: 700px;
  margin: 72px auto 32px auto; /* Aumenta el margen superior para bajarlo */
}

.sopa-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
  width: 100%;
}

.sopa-letras-container h2 {
  font-size: 2rem;
  color: #ffd700;
  font-weight: 400;
  margin-bottom: 0.2rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px #800000, 0 0 8px #fff8;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif;
}

.sopa-explicacion {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.7rem 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  box-shadow: 0 2px 12px #80000022;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 420px;
}

.explicacion-titulo {
  font-size: 1.1rem;
  color: #ffd700;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 0.2rem;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif;
}

.explicacion-texto {
  color: #fffbe6;
  font-size: 1rem;
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 0.1rem;
}

.sopa-layout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  margin-left: 0;
}

.sopa-palabras {
  background: #333;
  padding: 14px;
  border-radius: 12px;
  min-width: 120px;
  text-align: left;
  box-shadow: 0 2px 12px #0005;
}

.sopa-palabras h3 {
  margin-top: 0;
  font-size: 1rem;
  color: #ffd700;
  font-weight: 400;
  letter-spacing: 1px;
}

.sopa-palabras ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sopa-palabras li {
  margin-bottom: 7px;
  font-weight: 400;
  color: #ffe066;
  transition: color 0.2s, text-decoration 0.2s;
  font-family: 'Poppins', Arial, sans-serif;
  letter-spacing: 1px;
}

.sopa-palabras li.tachada {
  color: #6aff6a;
  text-decoration: line-through;
}

.sopa-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  justify-content: center;
  margin: 10px auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0 2px 12px #0003;
  padding: 6px;
}

.sopa-cell {
  width: 32px;
  height: 32px;
  background-color: #A83232;
  color: white;
  font-size: 18px;
  font-weight: 400;
  font-family: 'Poppins', Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.13);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
}

.sopa-cell.selected {
  background-color: #ffe066;
  color: #800000;
  border: 2px solid #ffd700;
  box-shadow: 0 0 8px #ffd70088;
}

.sopa-cell.found {
  background-color: #2ecc40;
  color: white;
  border: 2px solid #fff;
  box-shadow: 0 0 8px #2ecc40bb;
}

button {
  margin-top: 18px;
  padding: 10px 24px;
  background: linear-gradient(90deg, #ffd700 0%, #a83232 100%);
  border: none;
  color: #800000;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px #0003;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

button:hover {
  background: linear-gradient(90deg, #a83232 0%, #ffd700 100%);
  color: #fff;
  box-shadow: 0 4px 16px #ffd70055;
}

@media (max-width: 1100px) {
  .sopa-letras-container {
    max-width: 99vw;
    padding: 8px;
  }
  .sopa-layout {
    gap: 10px;
  }
  .sopa-grid {
    padding: 2px;
  }
  .sopa-cell {
    width: 22px;
    height: 22px;
    font-size: 11px;
  }
  .sopa-explicacion {
    max-width: 99vw;
    padding: 0.5rem 0.5rem;
  }
}

@media (max-width: 700px) {
  .sopa-letras-container {
    min-height: 0;
    margin: 10px auto;
    border-radius: 10px;
    padding: 4px;
    max-width: 99vw;
  }
  .sopa-header {
    margin-bottom: 0.7rem;
  }
  .sopa-layout {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .sopa-palabras {
    min-width: 0;
    width: 100%;
    padding: 7px;
    border-radius: 8px;
  }
  .sopa-grid {
    grid-template-columns: repeat(10, 1fr);
    padding: 1px;
    border-radius: 8px;
  }
  .sopa-cell {
    width: 15px;
    height: 15px;
    font-size: 8px;
    border-radius: 2px;
  }
  .sopa-explicacion {
    font-size: 0.95rem;
    padding: 0.3rem 0.3rem;
    max-width: 99vw;
  }
  button {
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 6px;
  }
}
</style>
