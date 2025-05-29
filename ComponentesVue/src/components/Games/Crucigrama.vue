<template>
  <div class="crucigrama-main">
    <h2>Crucigrama</h2>
    <p class="crucigrama-desc">
      Haz clic en la pista o en la casilla inicial de la palabra para escribirla.<br>
      Si es correcta, se colocará automáticamente en el crucigrama.<br>
      Pulsa "Volver" para regresar a la selección de juegos.
    </p>
    <div class="crucigrama-board">
      <div
        v-for="(row, rowIndex) in grid"
        :key="rowIndex"
        class="crucigrama-row"
      >
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="crucigrama-cell"
          :class="{
            black: cell.isBlack,
            filled: cell.isFilled,
            selected: isSelectedCell(rowIndex, colIndex)
          }"
          @click="selectCell(rowIndex, colIndex)"
        >
          <span v-if="!cell.isBlack && cell.isFilled">{{ cell.letter }}</span>
        </div>
      </div>
    </div>
    <div class="crucigrama-clues">
      <h3>Pistas:</h3>
      <ul>
        <li
          v-for="(word, idx) in words"
          :key="idx"
          :class="{ clueSelected: selectedWordIndex === idx }"
          @click="selectWord(idx)"
          style="cursor:pointer"
        >
          <b>{{ word.direction === 'across' ? 'Horizontal' : 'Vertical' }} {{ word.number }}:</b>
          {{ word.clue }}
        </li>
      </ul>
    </div>
    <div class="input-zone" v-if="selectedWordIndex !== null">
      <input
        v-model="userWord"
        @keyup.enter="tryWord"
        placeholder="Escribe la palabra y pulsa Enter"
        class="cruci-input"
        ref="inputRef"
      />
      <button @click="tryWord">Comprobar</button>
      <div v-if="message" class="cruci-message">{{ message }}</div>
    </div>
    <button class="volver-btn" @click="goBack">Volver</button>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

// Palabras y posiciones (añadidas más palabras)
const words = [
  {
    word: "LIMON",
    clue: "Fruto amarillo y ácido",
    direction: "across",
    row: 0,
    col: 0,
    number: 1
  },
  {
    word: "Mono",
    clue: "Animal juguetón que vive en los árboles",
    direction: "down",
    row: 0,
    col: 2,
    number: 2
  },
  {
    word: "AZUL",
    clue: "Color del cielo despejado",
    direction: "across",
    row: 2,
    col: 4,
    number: 3
  },
  {
    word: "MAL",
    clue: "Sentimiento negativo o doloroso",
    direction: "down",
    row: 0,
    col: 7,
    number: 4
  },
  {
    word: "ROJO",
    clue: "Color de una manzana",
    direction: "across",
    row: 5,
    col: 1,
    number: 5
  },
  {
    word: "SOL",
    clue: "Estrella que da luz a la Tierra",
    direction: "down",
    row: 3,
    col: 9,
    number: 6
  },
  {
    word: "PERRO",
    clue: "Animal que ladra",
    direction: "across",
    row: 7,
    col: 3,
    number: 7
  },
  {
    word: "OZIL",
    clue: "Ex jugador del madrid famoso por su visión de juego",
    direction: "down",
    row: 1,
    col: 5,
    number: 8
  }
];

// Tamaño del crucigrama
const size = 10;

// Inicializa el grid vacío
const grid = ref(
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      isBlack: true,
      letter: "",
      isFilled: false,
      wordIndexes: []
    }))
  )
);

// Marca las posiciones de las palabras en el grid
words.forEach((wordObj, idx) => {
  let { word, direction, row, col } = wordObj;
  for (let i = 0; i < word.length; i++) {
    let r = row, c = col;
    if (direction === "across") c += i;
    else r += i;
    grid.value[r][c].isBlack = false;
    grid.value[r][c].letter = word[i];
    grid.value[r][c].wordIndexes.push(idx);
  }
});

// Estado para la palabra introducida y mensajes
const userWord = ref("");
const message = ref("");
const selectedWordIndex = ref(null);
const selectedCell = ref({ row: null, col: null });
const inputRef = ref(null);

// Selecciona una pista o casilla inicial
function selectWord(idx) {
  selectedWordIndex.value = idx;
  userWord.value = "";
  // Selecciona la celda inicial de la palabra
  selectedCell.value = {
    row: words[idx].row,
    col: words[idx].col
  };
  nextTick(() => {
    inputRef.value && inputRef.value.focus();
  });
}

function selectCell(row, col) {
  const cell = grid.value[row][col];
  if (cell.isBlack || !cell.wordIndexes.length) return;
  // Selecciona la primera palabra que pase por esa celda
  selectWord(cell.wordIndexes[0]);
}

function isSelectedCell(row, col) {
  if (selectedWordIndex.value === null) return false;
  const word = words[selectedWordIndex.value];
  let r = word.row, c = word.col;
  for (let i = 0; i < word.word.length; i++) {
    if (r === row && c === col) return true;
    if (word.direction === "across") c++;
    else r++;
  }
  return false;
}

// Cuando el usuario introduce una palabra
function tryWord() {
  if (selectedWordIndex.value === null) return;
  const input = userWord.value.trim().toUpperCase();
  const wordObj = words[selectedWordIndex.value];
  if (input === wordObj.word) {
    // Coloca la palabra en el grid
    let { word, direction, row, col } = wordObj;
    for (let i = 0; i < word.length; i++) {
      let r = row, c = col;
      if (direction === "across") c += i;
      else r += i;
      grid.value[r][c].isFilled = true;
    }
    message.value = `¡Correcto! "${word}" colocada.`;
    selectedWordIndex.value = null;
    userWord.value = "";
  } else {
    message.value = "Palabra incorrecta o ya colocada.";
  }
  setTimeout(() => (message.value = ""), 2000);
}

// Botón volver
const emit = defineEmits(["go-back"]);
const goBack = () => emit("go-back");
</script>

<style scoped>
.crucigrama-main {
  text-align: center;
  color: #fff;
  padding: 30px 0 0 0;
}

.crucigrama-desc {
  color: #ffe066;
  margin-bottom: 20px;
}

.crucigrama-board {
  display: inline-block;
  margin-bottom: 30px;
}

.crucigrama-row {
  display: flex;
}

.crucigrama-cell {
  width: 32px;
  height: 32px;
  border: 2px solid #ffd700;
  background: #fff;
  margin: 1px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #800000;
  cursor: pointer;
  transition: background 0.2s;
}

.crucigrama-cell.black {
  background: #222;
  border: 2px solid #444;
  cursor: default;
}

.crucigrama-cell.filled {
  background: #b6ffb6;
  color: #1a1a1a;
}

.crucigrama-cell.selected {
  background: #ffe066 !important;
  color: #800000 !important;
}

.crucigrama-clues {
  margin: 20px auto 30px auto;
  background: #222;
  color: #ffe066;
  border-radius: 10px;
  padding: 15px 30px;
  max-width: 400px;
  text-align: left;
}

.clueSelected {
  background: #ffe066;
  color: #800000;
  border-radius: 5px;
  padding: 2px 6px;
}

.input-zone {
  margin: 20px auto 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cruci-input {
  padding: 8px 16px;
  font-size: 1.1rem;
  border-radius: 6px;
  border: 1px solid #ffd700;
  margin-bottom: 10px;
  width: 250px;
  text-align: center;
}

.cruci-message {
  color: #ffe066;
  margin-top: 5px;
  min-height: 24px;
}

.volver-btn {
  margin-top: 20px;
  padding: 10px 30px;
  background: #ffd700;
  color: #800000;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.volver-btn:hover {
  background: #ffe066;
}
</style>