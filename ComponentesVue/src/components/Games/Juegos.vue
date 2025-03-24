<template>
  <div>
    <!-- Vista principal de Juegos -->
    <div v-if="currentView === 'juegos'" class="puzzles-container">
      <h1>Bienvenido a la página de Puzzles 🧩</h1>
      <p>Aquí podrás encontrar información sobre los puzzles.</p>
  
      <div class="tres-en-raya-container" @click="goToTresEnRaya">
        <div class="grid">
          <div v-for="(cell, index) in board" :key="index" class="cell">
            <span v-if="cell" class="piece">{{ cell }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista del componente TresEnRaya -->
    <TresEnRaya v-else @go-back="goBack" />
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import TresEnRaya from './TresEnRaya.vue';

// Controlar la vista actual
const currentView = ref('juegos');

// Tablero con letras "D" y "B" colocadas estratégicamente
const board = ref([
  "D", "B", "",
  "", "D", "B",
  "B", "", "D"
]);

// Cambiar a la vista del Tres en Raya
const goToTresEnRaya = () => {
  currentView.value = 'tresenraya';
};

// Volver a la vista principal de Juegos
const goBack = () => {
  currentView.value = 'juegos';
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

/* Contenedor del Tres en Raya */
.tres-en-raya-container {
  background-color: #8B1E1E; /* Un tono más claro de granate */
  width: 200px;
  height: 200px;
  margin: 20px auto;
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

/* Fichas (D y B) con estilo de piezas de juego */
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
</style>
