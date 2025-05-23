<template>
  <div class="videos-page">
    <div class="title-container">
      <img :src="fotoTitulo" alt="Título Videos" class="title-image" />
      <div class="title-overlay"></div>
    </div>

    <div class="videos-container">
      <button class="fancy-button back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
        <span>Volver al Inicio</span>
        <div class="button-glow"></div>
      </button>

      <h1 class="main-title">Delirios y Barbaries</h1>
      
      <div class="seasons-nav">
        <button 
          v-for="season in seasons" 
          :key="season"
          :class="['season-button', { active: currentSeason === season }]"
          @click="selectSeason(season)"
        >
          <div class="season-content">
            <span class="season-number">{{ season }}</span>
            <span class="season-text">Temporada</span>
          </div>
          <div class="button-glow"></div>
        </button>
      </div>

      <div class="episodes-scroll">
        <div 
          class="episodes-wrapper" 
          ref="episodesWrapper"
          @mousedown="startDragging"
          @mousemove="moveScroll"
          @mouseup="stopDragging"
          @mouseleave="stopDragging"
          :class="{ 'dragging': isDragging }"
        >
          <div 
            v-for="video in currentSeasonVideos" 
            :key="video.id" 
            class="video-card"
            :class="{ 'video-playing': video.playing }"
          >
            <div class="video-container" 
                 @click="openVideo(video, $event)"
                 @mousedown.stop="startDragging"
                 @mousemove.stop="moveScroll"
                 @mouseup.stop="stopDragging"
                 @mouseleave.stop="stopDragging">
              <template v-if="!video.playing">
                <div class="video-thumbnail">
                  <img :src="video.thumbnail" :alt="video.title">
                  <div class="play-overlay">
                    <i class="fas fa-play"></i>
                  </div>
                </div>
              </template>
              <template v-else>
                <iframe
                  :src="`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </template>
            </div>
            <div class="video-info">
              <h3>{{ video.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reemplazar la sección de shorts con el componente -->
    <ShortsYoutube />
    <VideosTiktok />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { videoList, availableSeasons } from './videoData';
import fotoTitulo from '@/assets/fotoTitulo.jpeg';
import ShortsYoutube from './ShortsYoutube.vue';
import VideosTiktok from './VideosTiktok.vue';

// Variables esenciales
const currentSeason = ref(4);
const episodesWrapper = ref(null);
const videos = ref(videoList);
const seasons = availableSeasons;
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const clickStartTime = ref(0); 
const clickStartX = ref(0); 
const clickTimeout = ref(null);

// Añadir estas variables para mejor control
const isClick = ref(true); 
const moveDistance = ref(0); 

// Computed
const currentSeasonVideos = computed(() => {
  const seasonData = videos.value.find(s => s.season === currentSeason.value);
  return seasonData ? seasonData.episodes : [];
});

// Funciones principales
const selectSeason = (season) => {
  // Resetear el estado de reproducción de todos los videos
  videos.value.forEach(seasonData => {
    if (seasonData.episodes) {
      seasonData.episodes.forEach(ep => {
        ep.playing = false;
      });
    }
  });
  currentSeason.value = season;
};

const emit = defineEmits(['navigate']);
const goBack = () => emit('navigate', 'home');

const openVideo = (video, event) => {
  // Prevenir la propagación del evento
  event?.stopPropagation();
  
  // Solo reproducir si fue un click y no un arrastre
  if (isDragging.value || moveDistance.value > 5) return;
  
  try {
    const seasonData = videos.value.find(s => s.season === currentSeason.value);
    if (seasonData) {
      // Primero cerrar todos los videos excepto el actual
      seasonData.episodes.forEach(ep => {
        if (ep.id !== video.id) {
          ep.playing = false;
        }
      });
    }
    // Cambiar el estado del video actual
    video.playing = !video.playing;
  } catch (err) {
    console.error('Error al reproducir el video:', err);
  }
};

// Funciones de arrastre
const startDragging = (e) => {
  if (e.button !== 0) return;
  isClick.value = true;
  isDragging.value = false;
  startX.value = e.pageX;
  scrollLeft.value = episodesWrapper.value.scrollLeft;
  clickStartTime.value = Date.now();
  clickStartX.value = e.pageX;
  moveDistance.value = 0;
};

const moveScroll = (e) => {
  if (!e.buttons) return;
  const x = e.pageX;
  const walk = x - startX.value;
  moveDistance.value = Math.abs(x - clickStartX.value);
  
  if (moveDistance.value > 5) {
    isDragging.value = true;
    episodesWrapper.value.scrollLeft = scrollLeft.value - walk;
  }
};

const stopDragging = (e) => {
  if (moveDistance.value < 5) {
    isDragging.value = false;
  }
  
  setTimeout(() => {
    isDragging.value = false;
    moveDistance.value = 0;
    isClick.value = true;
  }, 50);
};

// Lifecycle hooks
onMounted(() => {
  // Scroll suave al inicio de la página
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  window.addEventListener('mouseup', stopDragging);
  window.addEventListener('mouseleave', stopDragging);
});

onUnmounted(() => {
  // Limpiar el timeout al desmontar
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value);
  }
  window.removeEventListener('mouseup', stopDragging);
  window.removeEventListener('mouseleave', stopDragging);
});
</script>

<style scoped>

.videos-page {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 10% 20%, rgba(128, 0, 0, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(76, 0, 0, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #000000 0%, #1a0000 100%);
  padding: 0; 
  position: relative;
  overflow-x: hidden; 
}

/* Cabecera */
.title-container {
  height: 300px; 
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  background: #000;
}
.title-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block;
  margin: 0 auto;
}

.title-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.3),
    rgba(80, 0, 0, 0.5)
  );
  pointer-events: none;
}

.videos-container {
  width: 100%;
  max-width: none;
  margin-top: -2rem; 
  position: relative;
  z-index: 1; 
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    inset 0 0 30px rgba(128, 0, 0, 0.3);
}


.episodes-scroll {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
}

.back-button {
  margin: 3rem auto 2rem;
  display: block; 
  z-index: 2;
}

/* Modificar el contenedor de episodios para el drag */
.episodes-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem 6rem;
  overflow-x: auto;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: cursor 0.2s ease;
}

.episodes-wrapper.dragging {
  cursor: grabbing;
  scroll-behavior: auto;
}

.video-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.episodes-wrapper.dragging .video-card {
  pointer-events: none;
}

/* Mejoramos la apariencia del scroll */
.episodes-wrapper::-webkit-scrollbar {
  height: 0;
  width: 0;
  background: transparent;
}

/* Aseguramos que los videos no se clickeen mientras se arrastra */
.video-card {
  pointer-events: auto;
  flex: 0 0 auto; 
  user-select: none;
}

.episodes-wrapper.dragging .video-card {
  pointer-events: none;
}

/* Eliminamos los estilos de las flechas de navegación que ya no usamos */
.nav-arrow {
  display: none;
}

/* Mejoramos el scroll suave */
.episodes-wrapper {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* Opcional: Añadir un indicador sutil de scroll */
.episodes-scroll::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 215, 0, 0.3), 
    transparent
  );
  border-radius: 2px;
  opacity: 0.5;
  pointer-events: none;
}

.nav-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border: none;
  background: rgba(80, 0, 0, 0.95); 
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  box-shadow: 
    inset 0 0 8px rgba(255, 215, 0, 0.3); 
}

.nav-arrow.left {
  left: 0;
  border-radius: 0 30px 30px 0;
  box-shadow: 
    5px 0 15px rgba(0, 0, 0, 0.3),
    inset -2px 0 8px rgba(255, 215, 0, 0.3);
  padding-left: 10px;
}

.nav-arrow.right {
  right: 0;
  border-radius: 30px 0 0 30px;
  box-shadow: 
    -5px 0 15px rgba(0, 0, 0, 0.3),
    inset 2px 0 8px rgba(255, 215, 0, 0.3);
  padding-right: 10px;
}


.nav-arrow:hover:not(:disabled) {
  background: rgba(255, 215, 0, 0.3); 
  box-shadow: 
    0 0 25px rgba(255, 215, 0, 0.4),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
}

.nav-arrow.left:hover:not(:disabled) {
  box-shadow: 
    5px 0 25px rgba(255, 215, 0, 0.4),
    inset -2px 0 15px rgba(255, 255, 255, 0.2);
}

.nav-arrow.right:hover:not(:disabled) {
  box-shadow: 
    -5px 0 25px rgba(255, 215, 0, 0.4),
    inset 2px 0 15px rgba(255, 255, 255, 0.2);
}

.nav-arrow:disabled {
  opacity: 0;
  cursor: default;
  pointer-events: none;
}

.nav-arrow i {
  transition: transform 0.3s ease;
}

.nav-arrow:hover i {
  transform: scale(1.2);
}


.episodes-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem 6rem;
  overflow-x: auto;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.episodes-wrapper.dragging {
  cursor: grabbing;
  scroll-behavior: auto; 
}

.episodes-wrapper.dragging .video-card {
  pointer-events: none;
}

/* Título principal */
.main-title {
  font-size: 4.5rem;
  text-align: center;
  margin: 2rem 0;
  background: linear-gradient(45deg, #ffffff, #ffd700);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.3); 
  font-weight: 800;
  letter-spacing: 2px;
  animation: titleGlow 3s infinite;
}
@keyframes titleGlow {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3)); }
  50% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(255, 215, 0, 0.5)); }
}

/* Botón "Volver al Inicio" */
.fancy-button {
  background: linear-gradient(45deg, #600000, #800000); 
  color: #fff;
  padding: 1rem 2rem;
  border: 1px solid rgba(255, 215, 0, 0.2); 
  border-radius: 8px;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3),
              inset 0 0 20px rgba(255, 255, 255, 0.05);
}
.fancy-button::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #ffd700, #800000); 
  z-index: -1;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.fancy-button:hover {
  transform: translateY(-3px);
  background: linear-gradient(45deg, #800000, #a00000);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4),
              inset 0 0 30px rgba(255, 215, 0, 0.1); 
}
.fancy-button:hover::after {
  opacity: 1;
}

/* Menú de temporadas */
.seasons-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  box-shadow: inset 0 0 20px rgba(128, 0, 0, 0.2);
}
.season-button {
  background: rgba(80, 0, 0, 0.8); 
  border: 1px solid rgba(255, 215, 0, 0.3); 
  padding: 1.5rem 2.5rem;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;
  cursor: pointer;
}
.season-button:hover,
.season-button.active {
  background: linear-gradient(45deg, #800000, #600000); 
  border-color: #ffd700; 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 215, 0, 0.3); 
  transform: translateY(-5px);
}
.season-number {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Tarjeta de video */
.video-card {
  width: 400px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 215, 0, 0.2); 
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
.video-card:hover {
  transform: translateY(-10px);
  border-color: #ffd700; 
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
              0 0 50px rgba(255, 215, 0, 0.2); 
}

/* Video container y contenido */
.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
}
.video-thumbnail, iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}
.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);
}
.video-card:hover .play-overlay {
  opacity: 1;
}
.play-overlay i {
  font-size: 4rem;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  transform: scale(0.8);
  transition: all 0.3s ease;
}
.video-card:hover .play-overlay i {
  transform: scale(1);
}

/* Modifica el fondo del video info */
.video-info {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(80, 0, 0, 0.95));
}
.video-info h3 {
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.4;
  text-align: center;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Episodes wrapper */
.episodes-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem 6rem;
  overflow-x: auto;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.episodes-wrapper.dragging {
  cursor: grabbing;
  scroll-behavior: auto; 
}

.episodes-wrapper.dragging .video-card {
  pointer-events: none;
}

/* Ocultar scrollbar pero mantener funcionalidad */
.episodes-wrapper::-webkit-scrollbar {
  display: none;
}

/* Estilos para la sección de shorts */
.shorts-section {
  padding: 4rem 2rem;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.95), 
    rgba(80, 0, 0, 0.95)
  );
  border-top: 1px solid rgba(255, 215, 0, 0.3);
  margin-top: 4rem;
}

.shorts-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #ffffff, #ffd700);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  animation: titleGlow 3s infinite;
}

.shorts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.short-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.4s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.short-card:hover {
  transform: translateY(-10px);
  border-color: #ffd700;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(255, 215, 0, 0.2);
}

.short-container {
  position: relative;
  width: 100%;
  padding-top: 177.77%;
}

.short-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
}

.short-info {
  padding: 1.5rem;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.95), 
    rgba(80, 0, 0, 0.8)
  );
}

.short-info h3 {
  color: #ffffff;
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #ffffff;
  font-size: 1.2rem;
}

.error {
  color: #ff0000;
}

/* Mejora los estilos del iframe */
iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  transition: opacity 0.3s ease;
  background: #000000;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000000;
  overflow: hidden;
}

/* Ajustes responsive */
@media (max-width: 1200px) {
  .video-card {
    width: 350px;
  }

  .seasons-nav {
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .main-title {
    font-size: 3rem;
  }

  .title-container {
    height: 250px;
  }

  .episodes-wrapper {
    padding: 1.5rem;
  }

  .season-button {
    padding: 1.2rem 2rem;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
    margin: 1.5rem 0;
  }

  .title-container {
    height: 200px;
  }

  .seasons-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 0.8rem;
  }

  .season-button {
    padding: 1rem 1.5rem;
    font-size: 0.9rem;
    flex: 1 1 calc(50% - 1rem);
    min-width: 150px;
  }

  .video-card {
    width: 300px;
  }

  .episodes-wrapper {
    padding: 1rem;
    gap: 1rem;
  }

  .video-info h3 {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}

@media (max-width: 480px) {
  .videos-page {
    padding-bottom: 2rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .title-container {
    height: 150px;
  }

  .fancy-button {
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
    width: 90%;
    max-width: 280px;
    margin: 1.5rem auto;
  }

  .season-button {
    width: 100%;
    min-width: 0;
    padding: 0.8rem;
  }

  .video-card {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .episodes-wrapper {
    padding: 0.5rem;
  }

  .video-info h3 {
    font-size: 0.85rem;
    padding: 0.6rem;
  }
}

/* Optimizaciones para dispositivos táctiles */
@media (hover: none) {
  .video-card:hover,
  .season-button:hover,
  .fancy-button:hover {
    transform: none;
  }

  .video-card:active,
  .season-button:active,
  .fancy-button:active {
    transform: scale(0.98);
  }

  .play-overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.3);
  }
}

/* Optimizaciones de rendimiento */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* Mejoras de accesibilidad táctil */
@media (pointer: coarse) {
  .episodes-wrapper {
    scroll-snap-type: x mandatory;
  }

  .video-card {
    scroll-snap-align: center;
  }
}
</style>
