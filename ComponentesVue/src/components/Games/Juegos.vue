<template>
  <div>
    <!-- Vista principal de Juegos -->
    <div v-if="currentView === 'juegos'" class="puzzles-container">
      <h1>Bienvenido a la página de Puzzles 🧩</h1>
      <p>Aquí podrás encontrar información sobre los puzzles.</p>

      <!-- Contenedor principal para alinear los juegos -->
      <div class="games-container">
        <!-- Contenedor de la Sopa de Letras -->
        <div class="sopa-letras-container" @click="goToSopaLetras">
          <div class="sopa-grid">
            <div v-for="(cell, index) in sopaLetrasPreview" :key="index" class="sopa-cell">
              {{ cell }}
            </div>
          </div>
        </div>

        <!-- Contenedor del Tres en Raya -->
        <div class="tres-en-raya-container" @click="goToTresEnRaya">
          <div class="grid">
            <div v-for="(cell, index) in board" :key="index" class="cell">
              <span v-if="cell" class="piece">{{ cell }}</span>
            </div>
          </div>
        </div>

        <!-- Contenedor del Wordle -->
        <div class="wordle-container" @click="goToWordle">
          <div class="wordle-row">
            <div v-for="(letter, index) in wordlePreview" :key="index" class="wordle-cell">
              {{ letter }}
            </div>
          </div>
        </div>

        <!-- Contenedor del Crucigrama -->
        <div class="crucigrama-container" @click="goToCrucigrama">
          <div class="crucigrama-grid">
            <div v-for="(row, rowIndex) in crucigramaPreview" :key="rowIndex" class="crucigrama-row">
              <div
                v-for="(cell, colIndex) in row"
                :key="colIndex"
                class="crucigrama-cell"
                :class="{ 'filled': cell !== '' }"
              >
                {{ cell }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de los juegos individuales -->
    <TresEnRaya v-if="currentView === 'tresenraya'" @go-back="goBack" />
    <Wordle v-if="currentView === 'wordle'" @go-back="goBack" />
    <SopaLetras v-if="currentView === 'sopaletras'" @go-back="goBack" />

  </div>
</template>



<script setup>
import { ref } from "vue";
import TresEnRaya from './TresEnRaya.vue';
import Wordle from "./Wordle.vue";
import SopaLetras from "./SopaLetras.vue";


// Controlar la vista actual
const currentView = ref('juegos');

// Tablero con letras "D" y "B" colocadas estratégicamente
const board = ref([
  "D", "B", "",
  "", "D", "B",
  "B", "", "D"
]);

// Vista previa de la sopa de letras (5x5)
const sopaLetrasPreview = ref([
  "M", "&", "B", "&", "C", "C",
  "J", "O", "B", "E", "&", "B",
  "B", "I", "N", "G", "H", "&",
  "I", "J", "M", "Z", "M", "D",
  "&", "J", "K", "M", "O", "D",
  "D", "A", "N", "I", "Y" ,"N"
]);

// Cambiar a la vista del Tres en Raya
const goToTresEnRaya = () => {
  currentView.value = 'tresenraya';
};

// Cambiar a la vista del Wordle
const goToWordle = () => {
  currentView.value = "wordle";
};

// Cambiar a la vista de la Sopa de Letras
const goToSopaLetras = () => {
  currentView.value = "sopaletras";
};

// Volver a la vista principal de Juegos
const goBack = () => {
  currentView.value = 'juegos';
};

const wordlePreview = ref(["W", "O", "R", "D", "L", "E"]);

const crucigramaPreview = ref([
  "C", "A", "S", "A", "", "",
  "", "O", "", "I", "", "",
  "P", "E", "R", "R", "O", "",
  "", "", "U", "", "", "",
  "", "", "E", "", "", "",
  "", "", "S", "", "", ""
]);

// Cambiar a la vista del Crucigrama
const goToCrucigrama = () => {
  console.log("Ir a la vista del crucigrama");
};

</script>

<style scoped>
:global(body) {
  background-color: #701515; /* Granate oscuro */
  margin: 0;
  padding: 0;
}

.puzzles-container {
  position: relative;
  top: -500px;
  text-align: center;
  color: white;
  padding: 20px;
}

/* Contenedor principal para alinear los juegos */
.games-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px; /* Espaciado entre los divs */
  margin-top: 20px;
}

/* Contenedor de la Sopa de Letras */
.sopa-letras-container {
  background-color: #8B1E1E; /* Un tono más claro de granate */
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer; /* Cambia el cursor para indicar que es clicable */
  transition: transform 0.2s ease;
}

.sopa-letras-container:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el ratón */
}

.sopa-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Cinco columnas */
  gap: 5px;
  width: 90%;
  height: 90%;
}

.sopa-cell {
  background-color: #A83232; /* Otro tono más claro de granate */
  color: white;
  font-size: 16px; /* Ajusta el tamaño de la fuente */
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra para efecto 3D */
}

/* Contenedor del Tres en Raya */
.tres-en-raya-container {
  background-color: #8B1E1E; /* Un tono más claro de granate */
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer; /* Cambia el cursor para indicar que es clicable */
  transition: transform 0.2s ease;
}

.tres-en-raya-container:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el ratón */
}

/* Contenedor del Wordle */
.wordle-container {
  background-color: #8B1E1E; /* Un tono más claro de granate */
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer; /* Cambia el cursor para indicar que es clicable */
  transition: transform 0.2s ease;
  overflow: hidden; /* Evita que el contenido sobresalga */
}

.wordle-container:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el ratón */
}

.wordle-row {
  display: flex; /* Alinea las letras en una fila */
  gap: 5px; /* Espaciado entre las letras */
  margin-top: 10px;
  justify-content: center; /* Centra las letras horizontalmente */
  align-items: center; /* Centra las letras verticalmente */
}

.wordle-cell {
  width: 30px; /* Ajusta el ancho para que las letras quepan dentro del contenedor */
  height: 30px; /* Ajusta la altura para que las letras sean proporcionales */
  background-color: #A83232; /* Otro tono más claro de granate */
  color: white;
  font-size: 20px; /* Ajusta el tamaño de la fuente */
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra para efecto 3D */
}

.wordle-cell:hover {
  background-color: #830f0f; /* Efecto de hover */
}

/* Estilo del tablero */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 90%;
  height: 90%;
}

/* Estilo de cada celda */
.cell {
  background-color: #A83232; /* Otro tono más claro de granate */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

/* Fichas (D, &, B) con estilo de piezas de juego */
.piece {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: white; /* Color de ficha */
  color: black; /* Letra en negro para contraste */
  font-size: 32px;
  font-weight: bold;
  font-family: "Arial Black", sans-serif; /* Fuente gruesa */
  border-radius: 50%; /* Hace que parezca una ficha redonda */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra para efecto 3D */
}

.crucigrama-container {
  background-color: #8B1E1E; /* Un tono más claro de granate */
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer; /* Cambia el cursor para indicar que es clicable */
  transition: transform 0.2s ease;
  grid-column: span 3; /* Ocupa todo el ancho de la fila */
  justify-self: center; /* Centrado horizontal */
  margin-top: -0px;
}


.crucigrama-container:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el ratón */
}

/* Estructura del Crucigrama */
.crucigrama-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Seis columnas */
  gap: 5px;
  width: 90%;
  height: 90%;
}

/* Celdas del Crucigrama */
.crucigrama-cell {
  background-color: #A83232; /* Otro tono más claro de granate */
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra para efecto 3D */
}

.filled {
  background-color: #ffffff !important;
  color: black;
}
</style>
