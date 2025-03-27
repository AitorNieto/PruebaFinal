<template>
    <div class="sopa-letras">
      <h1>Sopa de Letras 🧩</h1>
      <p>Encuentra las palabras ocultas en la sopa de letras.</p>
  
      <div class="sopa-grid">
        <div
          v-for="(row, rowIndex) in grid"
          :key="rowIndex"
          class="sopa-row"
        >
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="sopa-cell"
            :class="{ selected: isSelected(rowIndex, colIndex) }"
            @click="selectCell(rowIndex, colIndex)"
          >
            {{ cell }}
          </div>
        </div>
      </div>
  
      <button class="back-button" @click="$emit('go-back')">🔙 Volver</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { defineEmits } from "vue";
  
  const emit = defineEmits(["go-back"]);
  
  // Matriz de la Sopa de Letras
  const grid = ref([
    ["M", "&", "B", "&", "C", "C"],
    ["J", "O", "B", "E", "&", "B"],
    ["B", "I", "N", "G", "H", "&"],
    ["I", "J", "M", "Z", "M", "D"],
    ["&", "J", "K", "M", "O", "D"],
    ["D", "A", "N", "I", "Y", "N"],
  ]);
  
  // Estado de las celdas seleccionadas
  const selectedCells = ref([]);
  
  // Función para seleccionar celdas
  const selectCell = (row, col) => {
    const cellIndex = `${row}-${col}`;
    if (!selectedCells.value.includes(cellIndex)) {
      selectedCells.value.push(cellIndex);
    }
  };
  
  // Verifica si una celda está seleccionada
  const isSelected = (row, col) => {
    return selectedCells.value.includes(`${row}-${col}`);
  };
  </script>
  
  <style scoped>
  .sopa-letras {
    text-align: center;
    color: white;
    padding: 20px;
    top: -500px;
  }
  
  .sopa-grid {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    gap: 5px;
    justify-content: center;
    margin: 20px auto;
  }
  
  .sopa-row {
    display: flex;
    justify-content: center;
  }
  
  .sopa-cell {
    width: 40px;
    height: 40px;
    background-color: #a83232;
    color: white;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .sopa-cell.selected {
    background-color: #ffcc00; /* Amarillo cuando se selecciona */
    color: black;
  }
  
  .back-button {
    background-color: #8b1e1e;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  .back-button:hover {
    background-color: #a83232;
  }
  </style>
  