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
  </div>
</template>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-wrapper {
  width: 100%;
  min-height: 100vh;
}

.spectacular-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgb(43, 16, 16) 20%, transparent 20%);
  background-size: 10px 10px;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 50px;
  z-index: -1;
}

.spectacular-button:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.spectacular-button:hover::before {
  opacity: 1;
}

.spectacular-button:active {
  transform: translateY(-2px) scale(0.98);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Navegación: Fondo desplazable para "Ver Videos" */
.scroll-bg {
  width: 100%;
  height: 400px;
  background: url('@/assets/Videos.png') repeat-x,
              url('@/assets/Videos.png') repeat-x;
  background-size: contain;
  background-position: 0 0, 0 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: scrollBg 35s linear infinite;
}

@keyframes scrollBg {
  from { background-position: 0 0, 0 100%; }
  to { background-position: 100% 0, 100% 100%; }
}

/* Estilos para el Foro */
.foro-background {
  background: url('@/assets/Foro.webp') no-repeat center bottom;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}

.foro-content {
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  bottom: 10px;
}

/* Temporadas */
.season {
  position: absolute;
  font-size: 1.5rem;
  color: #f5f5dc;
  background-color: rgba(0,0,0,0.5);
  padding: 10px;
  border-radius: 5px;
  transform: rotate(-10deg);
  opacity: 0;
  transition: opacity 0.5s, transform 1s;
}

.season.bounce-in {
  opacity: 1;
  animation: bounce-in 1s ease-out;
}

@keyframes bounce-in {
  0% { transform: translateX(-1000px) rotate(-10deg); }
  60% { transform: translateX(30px) rotate(-10deg); }
  80% { transform: translateX(-10px) rotate(-10deg); }
  100% { transform: translateX(0) rotate(-10deg); }
}

.season.spin {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
}

/* Divs grandes para secciones */
.large-red-background {
  width: 100%;
  height: 400px;
  background-color: rgba(150,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.large-dark-red-background {
  width: 100%;
  height: 400px;
  background-color: rgba(80,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.random-background {
  background: linear-gradient(135deg, #800080 60%, #ff69b4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.random-section-content {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
}

.section-title {
  /* Reemplaza la clase con la que ya tenga el botón */
  background-color: #ffffff; /* Fondo claro para mayor contraste */
  color: #800000; /* Texto en rojo oscuro */
  border: 2px solid #800000; /* Borde para resaltar */
  padding: 10px 20px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.section-title:hover {
  background-color: #800000;
  color: #ffffff;
  border: 2px solid #ffffff;
}

.patrocinadores-title {
  font-size: 3.5rem;
  color: #ffd700;
  text-align: center;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 10px rgba(255,215,0,0.5),
               0 0 20px rgba(255,215,0,0.3),
               0 0 30px rgba(255,215,0,0.2),
               0 0 40px rgba(255,0,0,0.1);
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 1s, transform 1s;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

.patrocinadores-title.slide-in {
  opacity: 1;
  transform: translateX(0);
}

.form-container {
  position: relative;
  z-index: 10000 !important;
  pointer-events: auto !important;
  background: white;
}

/* Responsive para Home */
@media (max-width: 1200px) {
  .home-wrapper {
    padding: 0 1vw;
  }
  .large-red-background,
  .large-dark-red-background,
  .scroll-bg,
  .foro-background {
    height: 280px;
  }
  .patrocinadores-title {
    font-size: 2.2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 900px) {
  .home-wrapper {
    padding: 0 2vw;
  }
  .large-red-background,
  .large-dark-red-background,
  .scroll-bg,
  .foro-background {
    height: 180px;
  }
  .patrocinadores-title {
    font-size: 1.5rem;
    margin-top: 1.2rem;
    margin-bottom: 0.7rem;
  }
  .section-title {
    font-size: 1rem;
    padding: 8px 12px;
  }
}

@media (max-width: 600px) {
  .home-wrapper {
    padding: 0 2vw;
  }
  .large-red-background,
  .large-dark-red-background,
  .scroll-bg,
  .foro-background {
    height: 110px;
    min-height: 90px;
  }
  .patrocinadores-title {
    font-size: 1.1rem;
    margin-top: 0.7rem;
    margin-bottom: 0.4rem;
  }
  .section-title {
    font-size: 0.9rem;
    padding: 6px 8px;
    border-radius: 6px;
  }
  .form-container {
    padding: 0.5rem;
  }
  .foro-content {
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
  }
}

/* Botón espectacular más adaptable */
.spectacular-button {
  font-size: 1.2rem;
  padding: 12px 28px;
  border-radius: 12px;
  border: none;
  background: #800000;
  color: #fff;
  font-weight: bold;
  margin: 1rem 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

@media (max-width: 900px) {
  .spectacular-button {
    font-size: 1rem;
    padding: 10px 18px;
    border-radius: 10px;
  }
}

@media (max-width: 600px) {
  .spectacular-button {
    font-size: 0.95rem;
    padding: 8px 10px;
    border-radius: 8px;
  }
}

/* Responsive para temporadas */
@media (max-width: 600px) {
  .season {
    font-size: 1rem;
    padding: 6px;
  }
}

/* Responsive para el foro */
@media (max-width: 600px) {
  .foro-content {
    font-size: 0.9rem;
    padding: 0.3rem 0.5rem;
  }
}

.random-flex-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.materiales-section,
.pasos-section {
  flex: 1 1 320px;
  min-width: 280px;
  max-width: 500px;
  background: rgba(80,0,40,0.85);
  border-radius: 14px;
  padding: 1.7rem 2rem;
  color: #fff;
  box-shadow: 0 2px 16px rgba(128,0,64,0.10);
}

.materiales-section h2,
.pasos-section h2 {
  color: #ffd700;
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
}

.materiales-section ul,
.pasos-section ol {
  color: #fff;
}

.materiales-section ul ul {
  color: #ffe4e1;
}

.pasos-section li {
  margin-bottom: 0.8rem;
}

@media (max-width: 900px) {
  .random-flex-container {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .materiales-section,
  .pasos-section {
    max-width: 100%;
  }
}
</style>
