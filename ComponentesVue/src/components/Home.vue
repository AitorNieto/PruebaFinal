<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore, useFirebaseAuth } from 'vuefire';
import Countdown from './Countdown.vue';
import Nosotros from './Nosotros.vue';
import Foro from './Foro.vue';
import Videos from './Videos.vue'; // ¡Importa tu componente Videos!
import CookieAlert from './CookieAlert.vue';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import imageSrc from '@/assets/DyBia.png';

const Posts = ref([]);
const db = useFirestore();
const auth = useFirebaseAuth();
const currentSection = ref('home');
const showCookieAlert = ref(false);
const latestVideoId = ref('');
const loadingVideo = ref(true);

// API de YouTube
const CHANNEL_ID = 'UCWYxQaXnpQVzXaO1Yz4VyWQ';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Usa variables de entorno

// Función para obtener el último video del canal
const fetchLatestVideo = async () => {
  try {
    // Variables reactivas
    const latestVideoId = ref('g7jLY3Z17uk'); // Video por defecto
    const loadingVideo = ref(false);
    const currentSection = ref('home');

    // Configuración de la API de YouTube
    const API_KEY = 'TU_API_KEY'; // Reemplaza con tu API key real
    const CHANNEL_ID = 'UCWYxQaXnpQVzXaO1Yz4VyWQ';

    // Función para obtener el último video
    const fetchLatestVideo = async () => {
      try {
        // Si no hay API_KEY, usar video por defecto
        if (!API_KEY || API_KEY === 'TU_API_KEY') {
          console.log('Using default video');
          return;
        }

        loadingVideo.value = true;
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
        }
      } catch (error) {
        console.error('Error obteniendo el último video:', error);
        // Mantener el video por defecto en caso de error
      } finally {
        loadingVideo.value = false;
      }
    };

    // Manejo del montaje del componente
    onMounted(() => {
      try {
        fetchLatestVideo();
      } catch (error) {
        console.error('Error en mounted:', error);
      }
    });

    // Función para cambiar sección
    const changeSection = (section) => {
      currentSection.value = section;
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
  } catch (error) {
    console.error('Error obteniendo el último video:', error.response?.data || error.message);
    latestVideoId.value = 'Hs2FQvz-Qn4'; // Video de respaldo si falla la API
  } finally {
    loadingVideo.value = false; // Finaliza carga
  }
};

onMounted(async () => {
  await fetchLatestVideo();
  // Inicia el setInterval después de 3000 milisegundos
  setTimeout(() => {
    setInterval(fetchLatestVideo, 1800000);
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
      <!-- Reemplaza tu footer actual con este -->
      <footer class="site-footer">
        <div class="footer-content">
          <div class="footer-social">
            <h3 class="footer-title">Siguenos en nuestras Redes!</h3>
            <div class="social-links">
              <a href="https://youtube.com/@DeliriosyBarbaries" target="_blank" class="social-link youtube">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="https://twitch.tv/deliriosybarbaries" target="_blank" class="social-link twitch">
                <i class="fab fa-twitch"></i>
              </a>
              <a href="https://instagram.com/deliriosybarbaries" target="_blank" class="social-link instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href= "https://x.com/deliriosyBarb" target="_blank" class="social-link twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.tiktok.com/@deliriosybarbaries?lang=es" target="_blank" class="social-link tiktok">
                <i class="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Delirios y Barbaries. Todos los derechos reservados.</p>
        </div>
      </footer>
      
    </div>
    

      <!-- Nuevo bloque para Videos -->
      <div v-else-if="currentSection === 'videos'">
      <Videos @navigate="changeSection" />
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
/* Actualización de la sección de novedades */
.red-background {
  width: 100%;
  background: 
    linear-gradient(135deg, rgba(20, 0, 0, 0.9), rgba(80, 0, 0, 0.95)),
    url('https://imgur.com/gallery/wallpaper-years-rO3XClp#/t/wallpaper') center/cover;
  padding: 3rem 1rem; /* Reducido */
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 100px rgba(0, 0, 0, 0.8),
    inset 0 0 300px rgba(136, 0, 0, 0.4);
}
.ultimo-video {
  width: 100%;
  max-width: 800px; /* Reducido de 1200px */
  margin: 0 auto;
  padding: 2rem; /* Reducido */
  background: rgba(20, 0, 0, 0.8);
  border-radius: 40px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 215, 0, 0.2);
  box-shadow: 
    0 0 70px rgba(0, 0, 0, 0.5),
    inset 0 0 50px rgba(255, 215, 0, 0.05);
  transform: perspective(1000px) rotateX(5deg);
}
.episode-title {
  font-size: 2.5rem; /* Reducido de 3.2rem */
  color: #ffd700;
  text-align: center;
  font-family: 'Cinzel', serif;
  margin-bottom: 1rem;
  text-shadow: 
    0 0 15px rgba(255, 215, 0, 0.4),
    0 0 30px rgba(255, 215, 0, 0.2);
  animation: episodePulse 4s infinite;
}
.video-wrapper {
  max-width: 700px; /* Añadido para limitar el ancho */
  margin: 0 auto;
}

@media (max-width: 768px) {
  .ultimo-video {
    padding: 1.5rem;
    max-width: 95%;
  }
  
  .episode-title {
    font-size: 2rem;
  }
}
.novedades-title {
  font-size: 3.5rem; /* Reducido de 5.5rem */
  margin-bottom: 1rem;
}
/* Media queries actualizados */
@media (max-width: 768px) {
  .red-background {
    padding: 2rem 1rem;
  }
  .novedades-title {
    font-size: 2.5rem;
  }
  .episode-title {
    font-size: 1.8rem;
  }
  .ultimo-video {
    padding: 1rem;
    max-width: 95%;
  }
}
.novedades-title {
  font-size: 5.5rem;
  color: #ffd700;
  text-align: center;
  font-family: 'Cinzel', serif;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3),
    0 0 30px rgba(255, 215, 0, 0.2),
    0 0 40px rgba(255, 0, 0, 0.1);
  animation: titleFloat 6s ease-in-out infinite;
  transform-style: preserve-3d;
}

@keyframes titleFloat {
  0%, 100% { transform: translateZ(0px); }
  50% { transform: translateZ(50px); }
}
.ultimo-video {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem;
  background: rgba(20, 0, 0, 0.8);
  border-radius: 40px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 215, 0, 0.2);
  box-shadow: 
    0 0 70px rgba(0, 0, 0, 0.5),
    inset 0 0 50px rgba(255, 215, 0, 0.05);
  transform: perspective(1000px) rotateX(5deg);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.ultimo-video:hover {
  transform: perspective(1000px) rotateX(0deg) translateY(-10px);
  box-shadow: 
    0 0 100px rgba(0, 0, 0, 0.7),
    inset 0 0 70px rgba(255, 215, 0, 0.1);
}

.episode-header {
  margin-bottom: 3rem;
  position: relative;
}

.episode-title {
  font-size: 3.2rem;
  color: #ffd700;
  text-align: center;
  font-family: 'Cinzel', serif;
  margin-bottom: 1rem;
  text-shadow: 
    0 0 15px rgba(255, 215, 0, 0.4),
    0 0 30px rgba(255, 215, 0, 0.2);
  animation: episodePulse 4s infinite;
}

@keyframes episodePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.episode-underline {
  width: 200px;
  height: 3px;
  margin: 0 auto;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  position: relative;
  animation: underlinePulse 3s infinite;
}

@keyframes underlinePulse {
  0%, 100% { opacity: 0.5; width: 200px; }
  50% { opacity: 1; width: 250px; }
}

.video-wrapper {
  position: relative;
  border: 3px solid rgba(255, 215, 0, 0.3);
  border-radius: 25px;
  padding: 5px;
  background: linear-gradient(45deg, #ffd700, #ff4500);
  box-shadow: 
    0 0 40px rgba(136, 25, 25, 0.6),
    inset 0 0 30px rgba(255, 215, 0, 0.3);
  animation: borderGlow 4s infinite;
}

@keyframes borderGlow {
  0%, 100% {
    box-shadow: 
      0 0 40px rgba(136, 25, 25, 0.6),
      inset 0 0 30px rgba(255, 215, 0, 0.3);
    border-color: rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 
      0 0 60px rgba(136, 25, 25, 0.8),
      inset 0 0 50px rgba(255, 215, 0, 0.5);
    border-color: rgba(255, 215, 0, 0.5);
  }
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  height: 0;
  overflow: hidden;
  border-radius: 20px;
  background: #000;
  transform: translateZ(0);
}

.video-container::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ffd700, #ff4500, #ffd700);
  z-index: -1;
  animation: borderRotate 6s linear infinite;
  border-radius: 22px;
}

@keyframes borderRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Media queries actualizados */
@media (max-width: 768px) {
  .novedades-title {
    font-size: 3.5rem;
  }
  
  .episode-title {
    font-size: 2.5rem;
  }
  
  .ultimo-video {
    padding: 1.5rem;
  }
  
  .title-decoration {
    width: 150px;
  }
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
.site-footer {
  background: linear-gradient(135deg, #1a1a1a, #000000);
  color: #ffffff;
  padding: 3rem 0 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.7);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-social,
.footer-info {
  flex: 1 1 300px;
  text-align: center;
}

.footer-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #ffd700;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
.social-link {
  position: relative;
  overflow: hidden;
  color: #ffffff;
  font-size: 1.8rem;
  transition: all 0.4s ease;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.youtube {
  position: relative;
  overflow: hidden;
}

.youtube:hover {
  color: #fff;
  border-color: #ff0000;
  background: linear-gradient(45deg, #ff0000, #cc0000);
  box-shadow: 
    0 0 20px rgba(255, 0, 0, 0.3),
    0 0 40px rgba(204, 0, 0, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}

.youtube::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff0000, #cc0000, #ff0000);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.twitch {
  position: relative;
  overflow: hidden;
}

.twitch:hover {
  color: #fff;
  border-color: #6441a5;
  background: linear-gradient(45deg, #6441a5, #9146ff);
  box-shadow: 
    0 0 20px rgba(100, 65, 165, 0.3),
    0 0 40px rgba(145, 70, 255, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}

.twitch::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #6441a5, #9146ff, #6441a5);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.instagram {
  position: relative;
  overflow: hidden;
}

.instagram:hover {
  color: #fff;
  border-color: #e1306c;
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
  box-shadow: 
    0 0 20px rgba(225, 48, 108, 0.3),
    0 0 40px rgba(131, 58, 180, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}

.instagram::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d, #405de6);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.twitter {
  position: relative;
  overflow: hidden;
}

.twitter:hover {
  color: #fff;
  border-color: #000000;
  background: linear-gradient(45deg, #000000, #14171A);
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(20, 23, 26, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}

.twitter::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #000000, #14171A, #000000);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.tiktok {
  position: relative;
  overflow: hidden;
}

.tiktok:hover {
  color: #fff;
  border-color: #000000;
  background: linear-gradient(45deg, #000000, #25F4EE, #FE2C55);
  box-shadow: 
    0 0 20px rgba(37, 244, 238, 0.3),
    0 0 40px rgba(254, 44, 85, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}

.tiktok::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #000000, #25F4EE, #FE2C55, #000000);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.social-link:hover::before {
  opacity: 1;
  animation: socialGlow 2s linear infinite;
}

@keyframes socialGlow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}
</style>