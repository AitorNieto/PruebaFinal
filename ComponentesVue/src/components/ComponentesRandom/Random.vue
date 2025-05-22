<script setup>
const emit = defineEmits(['navigate']);
</script>

<template>
  <div class="random-flex-container">
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
    </div>

    <div class="pasos-section">
      <h2>🛠️ Pasos para hacer un botijo</h2>
      <ol>
        <li><b>Preparar la arcilla:</b> Amasa la arcilla para eliminar burbujas de aire y lograr una textura homogénea. Mantén una parte húmeda para modelar los detalles (pitorro, asa, etc.).</li>
        <li><b>Modelar el cuerpo:</b> Forma una bola de arcilla y colócala sobre el torno o trabaja a mano. Da forma de esfera achatada o algo ovoide. Asegúrate de dejarlo hueco por dentro. Puedes usar la técnica del vaciado si es una bola maciza (hacer un hueco dentro).</li>
        <li><b>Hacer el cuello y la boca:</b> Aplana una zona superior para abrir un agujero donde irá el cuello (por donde se llena el agua). Modela un tubo corto para el cuello y únelo con barbotina (mezcla de barro y agua como “pegamento”).</li>
        <li><b>Colocar el pitorro:</b> Haz un agujero lateral en la parte superior. Modela un pequeño tubo cónico (el pitorro por donde se bebe) y colócalo ahí. Asegúrate de que quede bien unido y sellado.</li>
        <li><b>Añadir el asa:</b> Modela una tira de arcilla y dale forma curva. Une el asa desde la parte superior del cuello al cuerpo del botijo.</li>
        <li><b>Alisar y decorar:</b> Usa una esponja húmeda para suavizar la superficie. Puedes decorar con grabados o engobes naturales si lo deseas.</li>
        <li><b>Secado:</b> Deja secar lentamente en un lugar ventilado durante varios días. Evita corrientes de aire directas para que no se agriete.</li>
        <li><b>Cocción:</b> Cuece el botijo en un horno cerámico a unos 950 ºC durante varias horas. Si no se cuece bien, el botijo puede filtrar o romperse.</li>
      </ol>
    </div>
    <button class="spectacular-button-alocado" @click="emit('navigate', 'home')">	
      Volver al Home
    </button>
  </div>
</template>

<style>
/* CSS ultra alocado, psicodélico y espectacular para TODO el componente */
.random-flex-container {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 3vw;
  background: repeating-linear-gradient(120deg, #00ffe7 0 10%, #ff00c8 10% 20%, #fffb00 20% 30%, #00ffe7 30% 40%, #ff00c8 40% 50%, #fffb00 50% 60%, #00ffe7 60% 70%, #ff00c8 70% 80%, #fffb00 80% 100%);
  background-size: 400% 400%;
  animation: fondoPsycho 7s linear infinite alternate;
  border: 8px double #ff00c8;
  box-shadow: 0 0 80px 20px #fffb00cc, 0 0 40px 10px #00ffe7cc inset;
  filter: hue-rotate(0deg) brightness(1.2) saturate(1.5);
  position: relative;
}
@keyframes fondoPsycho {
  0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
  100% { background-position: 100% 50%; filter: hue-rotate(360deg); }
}
.materiales-section, .pasos-section {
  flex: 1 1 0;
  margin: 2vw 0;
  border-radius: 3rem 0.5rem 3rem 0.5rem;
  box-shadow: 0 8px 32px 0 #00ffe7cc, 0 1.5px 8px #ff00c888, 0 0 32px #fffb00aa;
  background: repeating-linear-gradient(135deg, #ff00c8 0 10%, #00ffe7 10% 20%, #fffb00 20% 30%, #ff00c8 30% 40%, #00ffe7 40% 50%, #fffb00 50% 60%, #ff00c8 60% 70%, #00ffe7 70% 80%, #fffb00 80% 100%);
  border: 6px dashed #fffb00;
  padding: 2.5rem 2rem 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  font-size: 1.25rem;
  transition: transform 0.3s, box-shadow 0.3s, filter 0.3s;
  position: relative;
  animation: seccionGlow 2.5s infinite alternate;
}
@keyframes seccionGlow {
  0% { filter: hue-rotate(0deg) brightness(1.1); }
  100% { filter: hue-rotate(360deg) brightness(1.3); }
}
.materiales-section:hover, .pasos-section:hover {
  transform: scale(1.09) rotate(-2deg);
  box-shadow: 0 24px 64px 0 #ff00c8cc, 0 4px 24px #00ffe7cc, 0 0 64px #fffb00cc;
  z-index: 3;
  filter: hue-rotate(180deg) brightness(1.5) saturate(2);
}
.materiales-section h2, .pasos-section h2 {
  color: #fffb00;
  margin-bottom: 1.3rem;
  font-size: 2.1rem;
  text-align: center;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  letter-spacing: 0.14em;
  text-shadow: 0 1px 8px #00ffe7, 0 0 8px #ff00c8, 0 0 16px #fffb00;
  filter: hue-rotate(240deg);
  animation: h2Anim 2.5s infinite alternate;
  background: repeating-linear-gradient(90deg, #ff00c8 0 20%, #00ffe7 20% 40%, #fffb00 40% 60%, #ff00c8 60% 80%, #00ffe7 80% 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@keyframes h2Anim {
  0% { letter-spacing: 0.14em; filter: blur(0.5px); }
  100% { letter-spacing: 0.24em; filter: blur(2.5px); }
}
.materiales-section ul, .pasos-section ol {
  color: #00ffe7;
  font-size: 1.18rem;
  margin: 0;
  padding-left: 1.3rem;
  font-family: 'Fira Mono', 'Consolas', monospace;
  background: linear-gradient(90deg, #ff00c8 0%, #fffb00 100%);
  border-radius: 1.2rem;
  box-shadow: 0 1px 12px #00ffe722, 0 0 8px #fffb00aa;
  border: 2px solid #ff00c8;
  animation: ulAnim 4s infinite alternate;
}
@keyframes ulAnim {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.materiales-section ul ul {
  color: #fffb00;
  margin-left: 1.3rem;
  background: none;
  border: none;
  box-shadow: none;
}
.materiales-section li, .pasos-section li {
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 1px 0 #fff, 0 0 8px #00ffe7, 0 0 8px #ff00c8;
  filter: hue-rotate(60deg);
  animation: liAnim 2.5s infinite alternate;
}
@keyframes liAnim {
  0% { color: #fffb00; }
  50% { color: #00ffe7; }
  100% { color: #ff00c8; }
}
.spectacular-button-alocado {
  margin-top: 2.5rem;
  background: repeating-linear-gradient(90deg, #ff00c8 0 20%, #00ffe7 20% 40%, #fffb00 40% 60%, #ff00c8 60% 80%, #00ffe7 80% 100%);
  color: #fff;
  border: none;
  border-radius: 2.5rem;
  padding: 1.2rem 3rem;
  font-size: 1.5rem;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 32px #ff00c888, 0 0 16px #fffb00aa;
  letter-spacing: 0.12em;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s, filter 0.2s;
  text-shadow: 0 1px 8px #fff8, 0 0 8px #00ffe7;
  animation: botonAnim 1.5s infinite alternate, h2Anim 4s infinite alternate;
  border: 4px double #fffb00;
}
@keyframes botonAnim {
  0% { transform: scale(1); box-shadow: 0 4px 16px #ff00c888; }
  100% { transform: scale(1.13) rotate(-3deg); box-shadow: 0 16px 48px #fffb00cc; filter: hue-rotate(180deg) brightness(1.5); }
}
.spectacular-button-alocado:hover {
  background: repeating-linear-gradient(90deg, #00ffe7 0 20%, #fffb00 20% 40%, #ff00c8 40% 60%, #00ffe7 60% 80%, #fffb00 80% 100%);
  transform: scale(1.18) rotate(2deg);
  box-shadow: 0 24px 64px #ff00c8cc, 0 0 32px #fffb00cc;
  filter: hue-rotate(90deg) brightness(1.7) saturate(2);
}
@media (max-width: 900px) {
  .random-flex-container {
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
    padding: 1rem 0;
  }
  .materiales-section, .pasos-section {
    max-width: 98vw;
    margin: 0 0 2.5rem 0;
    min-width: 0;
  }
}
@media (max-width: 600px) {
  .materiales-section h2, .pasos-section h2 {
    font-size: 1.2rem;
  }
  .materiales-section, .pasos-section {
    padding: 1.1rem 0.5rem;
    font-size: 1rem;
    min-width: 0;
    max-width: 100vw;
  }
  .spectacular-button {
    font-size: 1.1rem;
    padding: 0.7rem 1.2rem;
  }
}
</style>