<template>
    <div class="sopa-letras-container">
      <h2>Sopa de Letras</h2>
      <p>Encuentra las palabras ocultas en la sopa de letras.</p>
      <div class="sopa-grid">
        <div
          v-for="(row, rowIndex) in grid"
          :key="rowIndex"
          class="sopa-row"
        >
          <div
            v-for="(letter, colIndex) in row"
            :key="colIndex"
            class="sopa-cell"
            :class="{ selected: isSelected(rowIndex, colIndex) }"
            @mousedown="startSelection(rowIndex, colIndex)"
            @mouseover="continueSelection(rowIndex, colIndex)"
            @mouseup="endSelection"
          >
            {{ letter }}
          </div>
        </div>
      </div>
      <button @click="goBack">Volver</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const emit = defineEmits(["go-back"]);
  
  const grid = ref([
    ["M", "A", "N", "Z", "A"],
    ["O", "L", "I", "V", "O"],
    ["T", "O", "M", "A", "T"],
    ["U", "V", "A", "P", "O"],
    ["N", "A", "R", "A", "N"]
  ]);
  
  const words = ["MANZANA", "OLIVO", "TOMATE", "UVA", "NARANJA"];
  
  const selectedCells = ref([]);
  
  const startSelection = (row, col) => {
    selectedCells.value = [{ row, col }];
  };
  
  const continueSelection = (row, col) => {
    if (selectedCells.value.length > 0) {
      selectedCells.value.push({ row, col });
    }
  };
  
  const endSelection = () => {
    const selectedWord = selectedCells.value
      .map(({ row, col }) => grid.value[row][col])
      .join("");
    
    if (words.includes(selectedWord)) {
      alert(`¡Encontraste la palabra: ${selectedWord}!`);
    }
  
    selectedCells.value = [];
  };
  
  const isSelected = (row, col) => {
    return selectedCells.value.some(cell => cell.row === row && cell.col === col);
  };
  
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
    top: -400px;
    left: -400;
  }
  
  .sopa-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
    justify-content: center;
    margin: 20px auto;
  }
  
  .sopa-cell {
    width: 50px;
    height: 50px;
    background-color: #A83232;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  }
  
  .sopa-cell.selected {
    background-color: yellow;
    color: black;
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
  