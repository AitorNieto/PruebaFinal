<script setup>
const emit = defineEmits(['navigate']);
import { ref } from 'vue';

const wobbleText = ref('');

function wobble() {
  wobbleText.value = Array.from('¡BOTIJO PARTY!').map(letter => {
    const wobbleAmount = Math.random() * 20 - 10;
    return `<span style="display: inline-block; transform: rotate(${wobbleAmount}deg)">${letter}</span>`;
  }).join('');
}

setInterval(wobble, 100);
</script>

<template>
  <div class="botijo-container">
    <div class="party-text" v-html="wobbleText"></div>
    
    <div class="materiales-section">
      <h2>Materiales necesarios</h2>
      <ul>
        <li>Arcilla roja (también llamada barro rojo) – preferiblemente arcilla refractaria si vas a cocerla.</li>
        <li>Torno de alfarero (opcional pero recomendable)</li>
        <li>Herramientas básicas de alfarero:
          <ul>
            <li>Esteca o espátula</li>
            <li>Hilo de corte</li>
            <li>Esponja</li>
            <li>Palillo o punzón</li>
          </ul>
        </li>
        <li>Agua</li>
        <li>Engobe o barniz natural (opcional)</li>
        <li>Horno cerámico (cocción entre 900 y 1000 ºC)</li>
      </ul>
      <div class="video-container">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/eUqTjKceKN4"
          title="Tutorial Botijo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <div class="pasos-section">
      <h2>🛠️ Pasos para hacer un botijo</h2>
      <ol>
        <li><b>Preparar la arcilla:</b> Amasa la arcilla para eliminar burbujas de aire y lograr una textura homogénea.</li>
        <li><b>Modelar el cuerpo:</b> Forma una bola de arcilla y colócala sobre el torno o trabaja a mano.</li>
        <li><b>Hacer el cuello y la boca:</b> Aplana una zona superior para abrir un agujero donde irá el cuello.</li>
        <li><b>Colocar el pitorro:</b> Haz un agujero lateral en la parte superior.</li>
        <li><b>Añadir el asa:</b> Modela una tira de arcilla y dale forma curva.</li>
        <li><b>Alisar y decorar:</b> Usa una esponja húmeda para suavizar la superficie.</li>
        <li><b>Secado:</b> Deja secar lentamente en un lugar ventilado durante varios días.</li>
        <li><b>Cocción:</b> Cuece el botijo en un horno cerámico a unos 950 ºC.</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.botijo-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 3vw;
  padding: 2rem;
  position: relative;
  background: #f5f5f5;
}

.materiales-section, .pasos-section {
  flex: 1 1 0;
  margin: 2vw;
  padding: 2rem;
  background: #fff;
  border-radius: 3px;
  box-shadow: 15px 15px 30px rgba(0,0,0,0.15);
  position: relative;
  transform: rotate(-1deg);
  background: 
    linear-gradient(to right, white 0px, transparent 1px) 0 0,
    linear-gradient(to left, white 0px, transparent 1px) 100% 0,
    linear-gradient(to bottom, #e8e8e8 1px, transparent 1px) 0 0;
  background-size: 100% 100%, 100% 100%, 15px 15px;
  background-repeat: no-repeat, no-repeat, repeat;
}

.materiales-section {
  background-color: #ffd;
  transform: rotate(1deg);
}

.pasos-section {
  background-color: #e8f4f8;
  transform: rotate(-1deg);
}

.materiales-section::before, .pasos-section::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 10px;
  background: rgba(255,220,115,0.5);
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}

h2 {
  color: #333;
  font-family: 'Comic Sans MS', cursive;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
}

ul, ol {
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.1rem;
  color: #444;
  padding-left: 2rem;
}

li {
  margin-bottom: 0.8rem;
  position: relative;
}

.materiales-section li::before {
  content: '🎨';
  margin-right: 8px;
}

.pasos-section li::marker {
  color: #ff6b6b;
  font-weight: bold;
}

.video-container {
  margin-top: 2rem;
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  transform: rotate(-1deg);
  transition: transform 0.3s ease;
}

.video-container:hover {
  transform: rotate(1deg) scale(1.02);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}



.party-text {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b6b;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}

@media (max-width: 900px) {
  .botijo-container {
    flex-direction: column;
    padding: 1rem;
  }
  
  .materiales-section, .pasos-section {
    margin: 1rem 0;
    transform: none;
  }
  
  .video-container {
    margin-top: 1rem;
  }
}

@media (max-width: 600px) {
  h2 {
    font-size: 1.5rem;
  }
  
  .materiales-section, .pasos-section {
    padding: 1rem;
    font-size: 0.9rem;
  }
  
}
</style>