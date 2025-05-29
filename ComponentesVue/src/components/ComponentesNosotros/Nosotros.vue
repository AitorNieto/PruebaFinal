<template>
  <div>
    <div id="nosotros" class="dark-red-background">
      <div class="title-wrapper">
        <h1 class="nosotros-title">Conoce a Nuestro Equipo</h1>
      </div>   
      <div class="image-container">
        <div class="image-box">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="@/assets/Jimmy.png" alt="Imagen 1" class="additional-image" />
              </div>
              <div class="flip-card-back">
                <img src="@/assets/TraseraCarta.jpg" alt="Carta" class="card-image" />
                <div class="card-info">
                </div>
              </div>
            </div>
          </div>
          <div class="nombre-integrante">Jimmy</div>
        </div>
        <div class="image-box">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="@/assets/Lomas.png" alt="Imagen 2" class="additional-image" />
              </div>
              <div class="flip-card-back">
                <img src="@/assets/TraseraCarta.jpg" alt="Carta" class="card-image" />
                <div class="card-info">
                </div>
              </div>
            </div>
          </div>
          <div class="nombre-integrante">Dani</div>
        </div>
        <div class="image-box">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="@/assets/Monzon.png" alt="Imagen 3" class="additional-image" />
              </div>
              <div class="flip-card-back">
                <img src="@/assets/TraseraCarta.jpg" alt="Carta" class="card-image" />
                <div class="card-info">
                </div>
              </div>
            </div>
          </div>
          <div class="nombre-integrante">Monzon</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const content = ref(null);
// Una vez que el componente se monte, agregamos la clase "slide-in" al título
onMounted(() => {
  const titleElement = document.querySelector('.nosotros-title');
  if (titleElement) {
    titleElement.classList.add('slide-in');
  }
});
</script>

<style scoped>
.nosotros-title {
  font-size: 3.5rem;
  color: #cec8a4;
  text-align: center;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif;
  font-stretch: condensed;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateX(-100%);
  transition: 
    opacity 1s, 
    transform 1s,
    box-shadow 0.3s,
    filter 0.3s,
    scale 0.3s;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
}
.nosotros-title.slide-in {
  opacity: 1;
  transform: translateX(0);
}
.nosotros-title:hover {
  filter: brightness(1.2);
  transform: translateX(0) scale(1.05) rotate(-1deg);
}
/* Contenedor del título fijo */
.title-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; 
  height: auto;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Imagen del título centrada */
.title-image {
  width: 100vw; 
  max-height: 20vh;
  object-fit: cover; 
  object-position: center center;
}
.content {
  padding-top: 5vh;
  background-color: #7c0707;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
}

/* Título de la sección */
.section-title {
  font-size: 2.5rem;
  color: white;
  margin-top: 30vh;
  margin-bottom: 1rem;
  
}

/* Texto de bienvenida */
.welcome-text {
  font-size: 1.2rem;
  color: white;
  margin-top: 10vh; 
  margin-bottom: 2rem;
  max-width: 800px;
  border: 2px solid white; 
  padding: 1rem; 
  border-radius: 10px;
}

/* Imagen dentro del contenido */
.group-image {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dark-red-background {
  background-color: #4b0000;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  margin-top:0; 
  width: 100%;
  min-height: 50vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.image-box {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
}

.additional-image {
  width: 100%;
  max-width: 300px; 
  height: auto;
  display: block;
  border-radius: 10px; 
}

/* Estilos para la tarjeta de volteo */
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 400px;
  perspective: 1000px; 
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px; 
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: transparent;
  color: black;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.card-info {
  z-index: 2;
  color: #800000;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px; 
  font-weight: bold; 
}

.nombre-integrante {
  margin-top: 14px;
  font-size: 1.25rem;
  color: #d8f5f9;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif;
  letter-spacing: 1.5px;
  text-align: center;
  text-shadow: 0 2px 8px #800000, 0 0 8px #fff8;
  background: rgba(128,0,0,0.08);
  border-radius: 8px;
  padding: 4px 0 2px 0;
  font-weight: 400;
  transition: background 0.2s, color 0.2s;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px #80000022;
}

/* RESPONSIVE: Cartas en columna y más pequeñas en pantallas pequeñas */
@media (max-width: 900px) {
  .image-container {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
  }
  .image-box {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    padding: 0;
  }
  .flip-card {
    width: 220px;
    height: 290px;
  }
  .additional-image {
    max-width: 220px;
  }
}
@media (max-width: 600px) {
  .flip-card {
    width: 150px;
    height: 200px;
  }
  .additional-image {
    max-width: 150px;
  }
  .image-box {
    max-width: 170px;
  }
  .nosotros-title {
    font-size: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>