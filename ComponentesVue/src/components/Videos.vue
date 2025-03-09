<template>
  <div class="videos-page">
    <!-- Título con imagen de cabecera -->
    <div class="title-container">
      <img :src="fotoTitulo" alt="Título Videos" class="title-image" />
    </div>

    <div class="videos-container">
      <!-- Botón para volver al inicio -->
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
        <span>Volver al Inicio</span>
      </button>

      <!-- Título principal de la sección -->
      <h1 class="main-title">Delirios y Barbaries</h1>
      
      <!-- Menú de temporadas -->
      <div class="seasons-nav">
        <button 
          v-for="season in 4" 
          :key="season"
          :class="['season-button', { active: currentSeason === season }]"
          @click="selectSeason(season)"
        >
          <span class="season-number">{{ season }}</span>
          <span class="season-text">Temporada</span>
        </button>
      </div>

      <!-- Contenido de la temporada seleccionada -->
      <div class="season-content">
        <div v-if="loading" class="loading">
          <div class="loader"></div>
          <span>Cargando episodios...</span>
        </div>

        <div v-else class="episodes-carousel">
          <button class="nav-button prev" @click="scrollLeft" :disabled="isAtStart">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="episodes-wrapper" ref="episodesWrapper">
            <div 
              v-for="video in currentSeasonVideos" 
              :key="video.id" 
              class="episode-card"
              @click="openVideo(video)"
            >
              <div class="thumbnail-container">
                <div v-if="video.isPlaying" class="video-container">
                  <iframe
                    :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <template v-else>
                  <img :src="video.thumbnail" :alt="video.title">
                  <div class="play-overlay" @click.stop="playVideo(video)">
                    <i class="fas fa-play"></i>
                  </div>
                </template>
              </div>
              <div class="episode-info">
                <h3>{{ video.title }}</h3>
              </div>
            </div>
          </div>
          
          <button class="nav-button next" @click="scrollRight" :disabled="isAtEnd">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import fotoTitulo from '@/assets/fotoTitulo.jpeg';

const emit = defineEmits(['navigate']);
const currentSeason = ref(1);
const loading = ref(true);
const episodesWrapper = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const videos = ref([
  {
    season: 1,
    episodes: [
      {
        id: '9I0KODX5IlY',
        title: 'El Misterio de la Ouija | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/9I0KODX5IlY/maxresdefault.jpg'
      },
      {
        id: 'Hs2FQvz-Qn4',
        title: 'La Casa Encantada | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/Hs2FQvz-Qn4/maxresdefault.jpg'
      },
      {
        id: 'XcJ_zOxAJ_w',
        title: 'El Ritual | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/XcJ_zOxAJ_w/maxresdefault.jpg'
      },
      {
        id: 'YwJ_y05zShQ',
        title: 'La Niña del Pozo | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/YwJ_y05zShQ/maxresdefault.jpg'
      },
      {
        id: '9X-yKQg-KRY',
        title: 'El Hospital Abandonado | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/9X-yKQg-KRY/maxresdefault.jpg'
      }
    ]
  },
  {
    season: 2,
    episodes: [
      {
        id: 'mK7nG_yKJJk',
        title: 'El Bosque Maldito | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/mK7nG_yKJJk/maxresdefault.jpg'
      },
      {
        id: 'L2J_5CNnCy0',
        title: 'La Mansión Embrujada | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/L2J_5CNnCy0/maxresdefault.jpg'
      },
      {
        id: 'QZD73jh9ZeU',
        title: 'El Cementerio | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/QZD73jh9ZeU/maxresdefault.jpg'
      },
      {
        id: 'PZH_WpwseoY',
        title: 'La Carretera Maldita | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/PZH_WpwseoY/maxresdefault.jpg'
      }
    ]
  },
  {
    season: 3,
    episodes: [
      {
        id: 'kX7vx2XUKzI',
        title: 'El Túnel | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/kX7vx2XUKzI/maxresdefault.jpg'
      },
      {
        id: '2X-pPR5u5jY',
        title: 'La Bruja | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/2X-pPR5u5jY/maxresdefault.jpg'
      },
      {
        id: 'vqk1ApfdzJ4',
        title: 'El Payaso | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/vqk1ApfdzJ4/maxresdefault.jpg'
      },
      {
        id: 'UwYvgK2IwBg',
        title: 'El Espejo | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/UwYvgK2IwBg/maxresdefault.jpg'
      }
    ]
  },
  {
    season: 4,
    episodes: [
      {
        id: 'H5_b-GSbbM4',
        title: 'La Muñeca | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/H5_b-GSbbM4/maxresdefault.jpg'
      },
      {
        id: 'sKvMSc7ETd4',
        title: 'El Ático | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/sKvMSc7ETd4/maxresdefault.jpg'
      },
      {
        id: 'gKkgCkHD_xo',
        title: 'La Casa de las Brujas | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/gKkgCkHD_xo/maxresdefault.jpg'
      },
      {
        id: 'IQp1TZk3Fqg',
        title: 'El Sótano | Delirios y Barbaries',
        thumbnail: 'https://img.youtube.com/vi/IQp1TZk3Fqg/maxresdefault.jpg'
      }
    ]
  }
]);

const currentSeasonVideos = computed(() => {
  return videos.value.find(s => s.season === currentSeason.value)?.episodes || [];
});

const scrollRight = () => {
  if (episodesWrapper.value) {
    const scrollAmount = episodesWrapper.value.clientWidth;
    episodesWrapper.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

const scrollLeft = () => {
  // Deshabilitado: solo se usa el botón derecho
  return;
};

const selectSeason = (season) => {
  currentSeason.value = season;
};

const goBack = () => {
  emit('navigate', 'home');
};

const checkScrollPosition = () => {
  if (episodesWrapper.value) {
    const { scrollLeft, scrollWidth, clientWidth } = episodesWrapper.value;
    isAtStart.value = scrollLeft <= 0;
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 10;
  }
};

onMounted(() => {
  loading.value = false;
  if (episodesWrapper.value) {
    episodesWrapper.value.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
  }
});

const selectedVideo = ref(null);

const openVideo = (video) => {
  selectedVideo.value = video;
  document.body.style.overflow = 'hidden';
};

const closeVideo = () => {
  selectedVideo.value = null;
  document.body.style.overflow = 'auto';
};

const playVideo = (video) => {
  // Detener todos los videos
  videos.value.forEach(season => {
    season.episodes.forEach(ep => {
      ep.isPlaying = false;
    });
  });
  // Activar el video seleccionado
  video.isPlaying = true;
};

// Inicializar isPlaying en false
videos.value.forEach(season => {
  season.episodes.forEach(episode => {
    episode.isPlaying = false;
  });
});
</script>

<style scoped>
/* Fondo general, tipografía y layout */
.videos-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10,10,10,0.97), rgba(30,0,0,0.97));
  color: #e0e0e0;
  position: relative;
  overflow-x: hidden;
  padding-top: 60px;
  font-family: 'Roboto', sans-serif;
}
.videos-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 25% 25%, rgba(139,0,0,0.15), transparent 60%),
              radial-gradient(circle at 75% 75%, rgba(255,215,0,0.1), transparent 60%);
  pointer-events: none;
}

/* Cabecera con imagen */
.title-container {
  height: 300px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  box-shadow: 0 4px 30px rgba(0,0,0,0.8);
}
.title-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  transform: scale(1.05);
  transition: transform 0.5s ease;
}
.title-container:hover .title-image {
  transform: scale(1.1);
}

/* Contenedor principal de videos */
.videos-container {
  max-width: 1200px;
  margin: -30px auto 2rem;
  padding: 2rem;
  position: relative;
  z-index: 2;
  background: rgba(5,5,5,0.85);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(139,0,0,0.3);
  box-shadow: 0 10px 30px rgba(0,0,0,0.7), inset 0 0 20px rgba(139,0,0,0.2);
}

/* Botón volver */
.back-button {
  background: linear-gradient(45deg, #8b0000, #ff4500);
  border: none;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.back-button:hover {
  background: linear-gradient(45deg, #ff4500, #8b0000);
}

/* Título principal */
.main-title {
  font-size: 3.5rem;
  text-align: center;
  margin: 0.5rem 0 2rem;
  background: linear-gradient(45deg, #ffd700, #ff4500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(139,0,0,0.7);
  animation: titlePulse 3s infinite;
}
@keyframes titlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* Menú de temporadas */
.seasons-nav {
  background: rgba(0,0,0,0.95);
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  border-radius: 15px;
  margin: 0 auto 2rem;
  width: fit-content;
  box-shadow: 0 0 40px rgba(0,0,0,0.5),
              0 0 20px rgba(139,0,0,0.3),
              inset 0 0 15px rgba(255,215,0,0.1);
}
.season-button {
  background: rgba(20,20,20,0.9);
  border: 2px solid rgba(139,0,0,0.4);
  color: #ffd700;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  min-width: 150px;
  position: relative;
  overflow: hidden;
}
.season-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #8b0000, #ffd700);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.season-button:hover::before,
.season-button.active::before {
  opacity: 0.2;
}
.season-button:hover,
.season-button.active {
  transform: translateY(-5px);
  border-color: #ffd700;
  box-shadow: 0 10px 20px rgba(0,0,0,0.4),
              0 0 30px rgba(139,0,0,0.3);
}
.season-number {
  font-size: 1.8rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.3rem;
  background: linear-gradient(45deg, #ffd700, #ff4500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(255,215,0,0.3);
}
.season-text {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
}

/* Contenido de episodios - carrusel */
.episodes-carousel {
  position: relative;
  padding: 0 4rem;
  margin: 2rem 0;
  overflow: hidden;
}
.episodes-wrapper {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2rem 0;
}
.episodes-wrapper::-webkit-scrollbar {
  display: none;
}
.episode-card {
  flex: 0 0 350px;
  background: rgba(20, 20, 20, 0.95);
  border: 2px solid rgba(139, 0, 0, 0.4);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  margin: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.thumbnail-container {
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  background: #000;
  border-radius: 12px 12px 0 0;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.3);
}

.episode-card:has(.video-container) {
  transform: scale(1.02);
  border-color: #ffd700;
  box-shadow: 
    0 20px 40px rgba(0,0,0,0.8),
    0 0 30px rgba(139, 0, 0, 0.6);
  z-index: 2;
}

.episode-info {
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(20,20,20,0.95));
}

.episode-info h3 {
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  color: #e0e0e0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.episodes-wrapper {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 1.5rem 0;
  margin: 0 -10px;
}
.episode-card:hover {
  transform: translateY(-15px) scale(1.03);
  border-color: #ffd700;
  box-shadow: 0 25px 50px rgba(0,0,0,0.8),
              0 0 30px rgba(139,0,0,0.6),
              inset 0 0 20px rgba(255,215,0,0.2);
}
.thumbnail-container {
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
}
.thumbnail-container img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.episode-card:hover .thumbnail-container img {
  transform: scale(1.08);
}
.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.play-overlay i {
  font-size: 4rem;
  color: #ffd700;
  transform: scale(0.8) translateY(20px);
  transition: transform 0.4s ease;
  text-shadow: 0 0 30px rgba(139,0,0,0.8);
}
.episode-card:hover .play-overlay {
  opacity: 1;
  backdrop-filter: blur(3px);
}
.episode-card:hover .play-overlay i {
  transform: scale(1) translateY(0);
}
.episode-preview {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
  padding: 2rem 1rem 1rem;
  transform: translateY(100%);
  transition: transform 0.4s ease;
}
.episode-card:hover .episode-preview {
  transform: translateY(0);
}
.episode-info {
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(20,20,20,0.95));
  text-align: center;
}
.episode-info h3 {
  color: #ffd700;
  font-size: 1.1rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  transition: color 0.3s ease, transform 0.3s ease;
}
.episode-card:hover .episode-info h3 {
  color: #ff7f50;
  transform: translateX(4px);
}

/* Navegación del carrusel */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(139,0,0,0.9);
  border: 2px solid #ffd700;
  color: #ffd700;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
.nav-button:hover:not(:disabled) {
  background: #ffd700;
  color: #8b0000;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 30px rgba(255,215,0,0.3), 0 0 50px rgba(139,0,0,0.4);
}
.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.prev { left: 0; }
.next { right: 0; }

/* Loader */
.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.5rem;
  color: #ffd700;
}
.loader {
  width: 60px;
  height: 60px;
  border: 4px solid #ffd700;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .videos-page {
    padding-top: 50px;
  }
  .title-container {
    height: 200px;
  }
  .videos-container {
    margin: -20px auto 0;
    padding: 1rem;
  }
  .main-title {
    font-size: 2.5rem;
    margin: 0.5rem 0 1.5rem;
  }
  .seasons-nav {
    padding: 0.8rem;
    gap: 1rem;
  }
  .season-button {
    padding: 0.6rem 1rem;
    min-width: 100px;
  }
  .episodes-grid,
  .episodes-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}
</style>
