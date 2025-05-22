<script setup>
const emit = defineEmits(['navigate']);
</script>

<template>
  <div class="random-layout">
    <h2 class="random-title">Cómo hacer un botijo</h2>
    <div class="random-content-horizontal">
      <div class="pasos-section-horizontal">
        <div class="pasos-columns-horizontal">
          <ol start="1">
            <li><b>Preparar la arcilla:</b> Amasa la arcilla para eliminar burbujas de aire y lograr una textura homogénea. Mantén una parte húmeda para modelar los detalles (pitorro, asa, etc.).</li>
            <li><b>Modelar el cuerpo:</b> Forma una bola de arcilla y colócala sobre el torno o trabaja a mano. Da forma de esfera achatada o algo ovoide. Asegúrate de dejarlo hueco por dentro. Puedes usar la técnica del vaciado si es una bola maciza (hacer un hueco dentro).</li>
            <li><b>Hacer el cuello y la boca:</b> Aplana una zona superior para abrir un agujero donde irá el cuello (por donde se llena el agua). Modela un tubo corto para el cuello y únelo con barbotina (mezcla de barro y agua como “pegamento”).</li>
            <li><b>Colocar el pitorro:</b> Haz un agujero lateral en la parte superior. Modela un pequeño tubo cónico (el pitorro por donde se bebe) y colócalo ahí. Asegúrate de que quede bien unido y sellado.</li>
          </ol>
          <ol start="5">
            <li><b>Añadir el asa:</b> Modela una tira de arcilla y dale forma curva. Une el asa desde la parte superior del cuello al cuerpo del botijo.</li>
            <li><b>Alisar y decorar:</b> Usa una esponja húmeda para suavizar la superficie. Puedes decorar con grabados o engobes naturales si lo deseas.</li>
            <li><b>Secado:</b> Deja secar lentamente en un lugar ventilado durante varios días. Evita corrientes de aire directas para que no se agriete.</li>
            <li><b>Cocción:</b> Cuece el botijo en un horno cerámico a unos 950 ºC durante varias horas. Si no se cuece bien, el botijo puede filtrar o romperse.</li>
          </ol>
        </div>
      </div>
      <div class="materiales-section-horizontal">
        <h3>Materiales necesarios</h3>
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
      <div class="video-section-horizontal">
        <h3 class="video-title">Vídeo</h3>
        <div class="video-responsive-horizontal">
          <iframe
            src="https://www.youtube.com/embed/O23ku32T7dY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <button class="spectacular-button" @click="emit('navigate', 'home')">
      Volver al Home
    </button>
  </div>
</template>

<style>
/* CSS aún más raro, psicodélico y colorido para la sección Random */
.random-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: repeating-linear-gradient(120deg, #00ffe7 0 10%, #ff00c8 10% 20%, #fffb00 20% 30%, #00ffe7 30% 40%, #ff00c8 40% 50%, #fffb00 50% 60%, #00ffe7 60% 70%, #ff00c8 70% 80%, #fffb00 80% 100%);
  background-size: 300% 300%;
  animation: fondoPsycho 8s linear infinite alternate;
}
@keyframes fondoPsycho {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.random-title {
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  font-size: 3.2rem;
  letter-spacing: 0.18em;
  color: #fff;
  text-shadow: 0 0 16px #00ffe7, 0 0 32px #ff00c8, 0 0 8px #fffb00;
  margin: 2.5rem 0 2rem 0;
  text-align: center;
  background: linear-gradient(90deg, #ff00c8, #00ffe7, #fffb00, #ff00c8, #00ffe7);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleAnim 1.5s infinite alternate, titleHue 6s linear infinite;
}
@keyframes titleAnim {
  0% { letter-spacing: 0.18em; filter: blur(0.5px); }
  100% { letter-spacing: 0.28em; filter: blur(2.5px); }
}
@keyframes titleHue {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.random-content-horizontal {
  display: flex;
  flex-direction: row;
  gap: 4vw;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 1500px;
  margin-bottom: 2.5rem;
  z-index: 2;
  filter: drop-shadow(0 0 16px #ff00c8) drop-shadow(0 0 8px #00ffe7);
}
.pasos-section-horizontal,
.materiales-section-horizontal,
.video-section-horizontal {
  border-radius: 2.5rem 0.5rem 2.5rem 0.5rem;
  box-shadow: 0 8px 32px 0 #00ffe7cc, 0 1.5px 8px #ff00c888, 0 0 32px #fffb00aa;
  background: repeating-linear-gradient(135deg, #ff00c8 0 10%, #00ffe7 10% 20%, #fffb00 20% 30%, #ff00c8 30% 40%, #00ffe7 40% 50%, #fffb00 50% 60%, #ff00c8 60% 70%, #00ffe7 70% 80%, #fffb00 80% 100%);
  border: 4px dashed #fffb00;
  padding: 2.5rem 2rem 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
  max-width: 440px;
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 1.22rem;
  transition: transform 0.3s, box-shadow 0.3s, filter 0.3s;
  position: relative;
  animation: seccionGlow 3s infinite alternate;
}
@keyframes seccionGlow {
  0% { filter: hue-rotate(0deg) brightness(1.1); }
  100% { filter: hue-rotate(360deg) brightness(1.3); }
}
.pasos-section-horizontal:hover,
.materiales-section-horizontal:hover,
.video-section-horizontal:hover {
  transform: scale(1.07) rotate(-2deg);
  box-shadow: 0 24px 64px 0 #ff00c8cc, 0 4px 24px #00ffe7cc, 0 0 64px #fffb00cc;
  z-index: 3;
  filter: hue-rotate(180deg) brightness(1.5) saturate(2);
}
.pasos-section-horizontal {
  background: repeating-linear-gradient(120deg, #fffb00 0 20%, #00ffe7 20% 40%, #ff00c8 40% 60%, #fffb00 60% 80%, #00ffe7 80% 100%);
  border-left: 8px double #00ffe7;
  border-right: 8px double #ff00c8;
}
.pasos-columns-horizontal {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
.pasos-columns-horizontal ol {
  flex: 1 1 0;
  color: #fffb00;
  font-size: 1.22rem;
  padding-left: 1.3rem;
  margin: 0;
  font-family: 'Fira Mono', 'Consolas', monospace;
  background: linear-gradient(90deg, #00ffe7 0%, #ff00c8 100%);
  border-radius: 1.5rem;
  box-shadow: 0 1px 12px #ff00c822, 0 0 8px #fffb00aa;
  padding-bottom: 0.7rem;
  border: 2px solid #fffb00;
  animation: olAnim 4s infinite alternate;
}
@keyframes olAnim {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.pasos-columns-horizontal li {
  margin-bottom: 1rem;
  line-height: 1.6;
  font-weight: 700;
  text-shadow: 0 1px 0 #fff, 0 0 8px #ff00c8;
  filter: hue-rotate(120deg);
  animation: liAnim 2.5s infinite alternate;
}
@keyframes liAnim {
  0% { color: #fffb00; }
  50% { color: #00ffe7; }
  100% { color: #ff00c8; }
}
.materiales-section-horizontal {
  background: repeating-linear-gradient(120deg, #00ffe7 0 20%, #ff00c8 20% 40%, #fffb00 40% 60%, #00ffe7 60% 80%, #ff00c8 80% 100%);
  border-left: 8px double #ff00c8;
  border-right: 8px double #fffb00;
}
.materiales-section-horizontal h3 {
  color: #fffb00;
  margin-bottom: 1.3rem;
  font-size: 1.35rem;
  text-align: center;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  letter-spacing: 0.12em;
  text-shadow: 0 1px 8px #00ffe7, 0 0 8px #ff00c8;
  filter: hue-rotate(240deg);
  animation: h3Anim 3s infinite alternate;
}
@keyframes h3Anim {
  0% { color: #fffb00; }
  50% { color: #00ffe7; }
  100% { color: #ff00c8; }
}
.materiales-section-horizontal ul {
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
.materiales-section-horizontal ul ul {
  color: #fffb00;
  margin-left: 1.3rem;
  background: none;
  border: none;
  box-shadow: none;
}
.materiales-section-horizontal li {
  margin-bottom: 0.8rem;
  font-weight: 600;
  text-shadow: 0 1px 0 #fff, 0 0 8px #00ffe7;
  filter: hue-rotate(60deg);
  animation: liAnim 2.5s infinite alternate;
}
.video-section-horizontal {
  background: repeating-linear-gradient(120deg, #ff00c8 0 20%, #fffb00 20% 40%, #00ffe7 40% 60%, #ff00c8 60% 80%, #fffb00 80% 100%);
  border-left: 8px double #fffb00;
  border-right: 8px double #00ffe7;
  align-items: center;
  justify-content: center;
}
.video-title {
  color: #00ffe7;
  margin-bottom: 1.3rem;
  font-size: 1.45rem;
  text-align: center;
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  letter-spacing: 0.12em;
  text-shadow: 0 1px 8px #ff00c8, 0 0 8px #fffb00;
  filter: hue-rotate(120deg);
  animation: h3Anim 3s infinite alternate;
}
.video-responsive-horizontal {
  position: relative;
  padding-bottom: 40%; /* Más grande y panorámico */
  height: 0;
  overflow: hidden;
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 #00ffe7cc, 0 2px 12px #ff00c888, 0 0 32px #fffb00aa;
  background: linear-gradient(90deg, #ff00c8 0%, #00ffe7 100%);
  width: 100%;
  max-width: 640px;
  min-width: 320px;
  margin: 0 auto;
  border: 5px dotted #fffb00;
  animation: videoGlow 2.5s infinite alternate, olAnim 6s infinite alternate;
}
@keyframes videoGlow {
  0% { box-shadow: 0 8px 32px 0 #00ffe7cc, 0 2px 12px #ff00c888, 0 0 32px #fffb00aa; }
  100% { box-shadow: 0 24px 64px 0 #ff00c8cc, 0 4px 24px #00ffe7cc, 0 0 64px #fffb00cc; }
}
.video-responsive-horizontal iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 2rem;
  filter: hue-rotate(180deg) contrast(1.2) saturate(1.5);
  animation: iframeAnim 4s infinite alternate;
}
@keyframes iframeAnim {
  0% { filter: hue-rotate(0deg) contrast(1.2) saturate(1.5); }
  100% { filter: hue-rotate(360deg) contrast(1.5) saturate(2); }
}
.spectacular-button {
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
  animation: botonAnim 1.5s infinite alternate, h3Anim 4s infinite alternate;
  border: 4px double #fffb00;
}
@keyframes botonAnim {
  0% { transform: scale(1); box-shadow: 0 4px 16px #ff00c888; }
  100% { transform: scale(1.13) rotate(-3deg); box-shadow: 0 16px 48px #fffb00cc; filter: hue-rotate(180deg) brightness(1.5); }
}
.spectacular-button:hover {
  background: repeating-linear-gradient(90deg, #00ffe7 0 20%, #fffb00 20% 40%, #ff00c8 40% 60%, #00ffe7 60% 80%, #fffb00 80% 100%);
  transform: scale(1.18) rotate(2deg);
  box-shadow: 0 24px 64px #ff00c8cc, 0 0 32px #fffb00cc;
  filter: hue-rotate(90deg) brightness(1.7) saturate(2);
}
@media (max-width: 1200px) {
  .random-content-horizontal {
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
  }
  .video-section-horizontal, .materiales-section-horizontal, .pasos-section-horizontal {
    max-width: 98vw;
    margin: 0 0 2.5rem 0;
    min-width: 0;
  }
  .video-responsive-horizontal {
    max-width: 98vw;
    min-width: 0;
  }
}
@media (max-width: 700px) {
  .random-title {
    font-size: 1.7rem;
  }
  .random-content-horizontal {
    gap: 1.2rem;
  }
  .pasos-section-horizontal,
  .materiales-section-horizontal,
  .video-section-horizontal {
    padding: 1.1rem 0.5rem;
    font-size: 1rem;
    min-width: 0;
    max-width: 100vw;
  }
  .video-responsive-horizontal {
    max-width: 100vw;
    min-width: 0;
    border-width: 2px;
  }
  .spectacular-button {
    font-size: 1.1rem;
    padding: 0.7rem 1.2rem;
  }
}
</style>