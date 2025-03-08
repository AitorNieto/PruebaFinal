<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useFirestore, useFirebaseAuth } from 'vuefire';
import { collection, onSnapshot } from "firebase/firestore";
import imageSrc from '@/assets/DyBia.png';
import Countdown from './Countdown.vue';
import Nosotros from './Nosotros.vue';
import Foro from './Foro.vue';
import CookieAlert from './CookieAlert.vue';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Posts = ref([]);
const db = useFirestore();
const auth = useFirebaseAuth();
const currentSection = ref('home');
const showCookieAlert = ref(false);
const latestVideoId = ref('');
const loadingVideo = ref(true); // Para manejar el estado de carga del video

// API de YouTube
const CHANNEL_ID = 'UCWYxQaXnpQVzXaO1Yz4VyWQ';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Usa variables de entorno

// Función para obtener el último video del canal
const fetchLatestVideo = async () => {
  try {
    loadingVideo.value = true; // Iniciamos carga
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: API_KEY,
        channelId: CHANNEL_ID,
        part: 'snippet',
        order: 'date',
        maxResults: 1,
        type: 'video'
      }
    });

    if (response.data.items && response.data.items.length > 0) {
      latestVideoId.value = response.data.items[0].id.videoId;
    } else {
      latestVideoId.value = 'Hs2FQvz-Qn4'; // Video de respaldo
    }
  } catch (error) {
    console.error('Error obteniendo el último video:', error.response?.data || error.message);
    latestVideoId.value = 'Hs2FQvz-Qn4'; // Video de respaldo si falla la API
  } finally {
    loadingVideo.value = false; // Finaliza carga
  }
};

// Llamar a la API al montar el componente
onMounted(async () => {
  await fetchLatestVideo();

  // Refrescar el video cada 10 minutos (600,000 ms)
  setInterval(fetchLatestVideo, 600000);

  // Mostrar alerta de cookies después de 3 segundos
  setTimeout(() => {
    showCookieAlert.value = true;
  }, 3000);
});
onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true
  });
});

// Añadir esta función
const changeSection = (section) => {
  currentSection.value = section;
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="home-wrapper">
    <div v-if="currentSection === 'home'">
      <div class="background">
        <h1 class="title">DELIRIOS Y BARBARIES</h1>
        <img :src="imageSrc" alt="Imagen de bienvenida" class="welcome-image" />
        <Countdown class="countdown-container" />
      </div>

      <!-- Sección de Novedades -->
      <div id="novedades" class="red-background">
        <div class="novedades-container">
          <div class="title-wrapper">
            <div class="title-decoration left"></div>
            <h1 class="novedades-title">Novedades</h1>
            <div class="title-decoration right"></div>
          </div>
          
          <div class="home-content">
            <div class="content-row">
              <div class="ultimo-video">
                <div class="episode-header">
                  <h2 class="episode-title">Último Episodio</h2>
                  <div class="episode-underline"></div>
                </div>
                
                <div class="video-wrapper">
                  <div class="video-container">
                    <div class="video-frame">
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/g7jLY3Z17uk"
                        title="Último episodio de Delirios y Barbaries"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Otras secciones -->
      <div id="podcast" class="dark-red-background" @click="changeSection('videos')">
        <h1 class="section-title">Ver Videos</h1>
        <div class="season season-1">Temporada 1</div>
        <div class="season season-2">Temporada 2</div>
        <div class="season season-3">Temporada 3</div>
        <div class="season season-4">Temporada 4</div>
      </div>

      <div id="foro" class="large-red-background" @click="changeSection('foro')">
        <h1 class="section-title">Nuestro Foro</h1>
      </div>

      <div id="sobre-nosotros" class="large-dark-red-background" @click="changeSection('nosotros')">
        <h1 class="section-title">Sobre Nosotros</h1>
      </div>
    </div>

    <div v-else-if="currentSection === 'foro'">
      <Foro @navigate="changeSection" />
    </div>

    <div v-else-if="currentSection === 'nosotros'">
      <Nosotros />
    </div>

    <CookieAlert v-if="showCookieAlert" />
  </div>
</template>

<style scoped>
.home-wrapper {
  width: 100%;
  min-height: 100vh;
}

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Fondo principal */
.background {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
      10deg,
      rgba(150, 15, 15, 0.8),
      rgba(165, 47, 47, 0.8)
    ),
    url('@/assets/FondoPrincipal.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Título principal */
.title {
  font-size: 5rem; /* Aumenta el tamaño del título */
  font-weight: bold;
  color: #ffd700; /* Dorado */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Cinzel', serif; /* Fuente estilizada */
  animation: delirio 3s infinite;
}

@keyframes delirio {
  0%, 100% {
    transform: scale(1);
    color: #ffd700;
  }
  50% {
    transform: scale(1.2);
    color: #ff4500; /* Naranja */
  }
}

/* Imagen de bienvenida */
.welcome-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 20px; /* Bordes redondeados */ 
  transition: transform 0.3s ease; /* Transiciones suaves */
}

.welcome-image:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el ratón */ 
}

/* Countdown (posición absoluta) */
.countdown-container {
  position: absolute;
  top: 20%; /* Ajusta este valor para mover el contador más arriba */
  left: 40px; /* Ajusta este valor para mover el contador más a la derecha */
  transform: translateY(-50%);
}

/* Nuevo fondo rojo */
.red-background {
  width: 100%;
  background: linear-gradient(135deg, rgba(124, 7, 7, 0.97), rgba(80, 0, 0, 0.97));
  padding: 6rem 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.05) 0%, transparent 50%);
  animation: particleFloat 20s infinite linear;
}

.novedades-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.novedades-title {
  font-size: 5rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 3rem;
  font-family: 'Cinzel', serif;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3),
    0 0 30px rgba(255, 215, 0, 0.2);
  position: relative;
  animation: titleGlow 3s infinite;
}
.ultimo-video {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  box-shadow: 
    0 0 50px rgba(0, 0, 0, 0.3),
    inset 0 0 30px rgba(255, 215, 0, 0.05);
}
.video-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  border-radius: 20px;
  padding: 4px;
  background: linear-gradient(45deg, #ffd700, #ff4500);
  box-shadow: 0 0 30px rgba(136, 25, 25, 0.5);
}
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  height: 0;
  overflow: hidden;
  border-radius: 16px;
  background: #000;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .ultimo-video {
    padding: 1rem;
  }
  
  .video-wrapper {
    padding: 2px;
  }
}
</style>
<style scoped>
/* ... estilos existentes hasta dark-red-background ... */

.dark-red-background {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, rgba(100, 0, 0, 0.95), rgba(60, 0, 0, 0.95));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
}

.dark-red-background:hover {
  transform: translateY(-5px);
  box-shadow: 
    inset 0 0 70px rgba(0, 0, 0, 0.6),
    0 10px 20px rgba(0, 0, 0, 0.4);
}

.section-title {
  font-size: 3.5rem;
  color: #ffd700;
  font-family: 'Cinzel', serif;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
}

.dark-red-background:hover .section-title {
  transform: scale(1.1);
  color: #ff4500;
}

.season {
  position: absolute;
  font-size: 1.8rem;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.6);
  padding: 15px 25px;
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.4s ease;
}

.season:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: scale(1.1) rotate(0deg) !important;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.season-1 {
  top: 40px;
  left: 40px;
  transform: rotate(-15deg);
}

.season-2 {
  top: 40px;
  right: 40px;
  transform: rotate(15deg);
}

.season-3 {
  bottom: 40px;
  left: 40px;
  transform: rotate(15deg);
}

.season-4 {
  bottom: 40px;
  right: 40px;
  transform: rotate(-15deg);
}

.large-red-background {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, rgba(150, 0, 0, 0.95), rgba(100, 0, 0, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.large-red-background:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.large-red-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.large-red-background:hover::before {
  opacity: 1;
}

.large-dark-red-background {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, rgba(80, 0, 0, 0.95), rgba(40, 0, 0, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.large-dark-red-background:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.large-dark-red-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.large-dark-red-background:hover::before {
  opacity: 1;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
  
  .season {
    font-size: 1.4rem;
    padding: 10px 20px;
  }
  
  .season-1, .season-2 {
    top: 20px;
  }
  
  .season-3, .season-4 {
    bottom: 20px;
  }
  
  .season-1, .season-3 {
    left: 20px;
  }
  
  .season-2, .season-4 {
    right: 20px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .season {
    font-size: 1.2rem;
    padding: 8px 15px;
  }
}
</style>