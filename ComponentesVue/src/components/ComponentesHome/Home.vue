<script setup>
  import { ref, onMounted } from 'vue';
  import { useFirestore, useFirebaseAuth } from 'vuefire';
  import { collection, onSnapshot } from 'firebase/firestore';
  import Countdown from './Extras/Countdown.vue';
  import Nosotros from '../ComponentesNosotros/Nosotros.vue';
  import Foro from '../ComponentesForo/Foro.vue';
  import Videos from '../ComponenteVideos/Videos.vue';
  import CookieAlert from './Extras/CookieAlert.vue';
  import StarBackground from './Extras/StarBackground.vue';
  import axios from 'axios';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import imageSrc from '@/assets/DyBia.png';
  import Juegos from '../Games/Juegos.vue';
  import ZDrinks from '../Patrocinadores/ZDrinks.vue';
  import Formulario from './Formulario.vue';
  import BarraInvitados from './Extras/BarraInvitados.vue';
// Variables reactivas y configuración
const Posts = ref([]);
const db = useFirestore();
const auth = useFirebaseAuth();
const currentSection = ref('home');
const showCookieAlert = ref(false);
const latestVideoId = ref('g7jLY3Z17uk'); // Video por defecto
const loadingVideo = ref(true);

// API de YouTube (usa la variable de entorno)
const CHANNEL_ID = 'UCWYxQaXnpQVzXaO1Yz4VyWQ';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;


// Función para obtener el último video del canal
const fetchLatestVideo = async () => {
  try {
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
    latestVideoId.value = 'Hs2FQvz-Qn4'; // Video de respaldo
  } finally {
    loadingVideo.value = false;
  }
};

// Función para cambiar de sección y hacer scroll suave
function changeSection(section) {
  currentSection.value = section;
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Función para descargar posts desde Firebase
function descargarPosts() {
  if (!auth.currentUser) {
    console.error('No hay usuario autenticado');
    return;
  }
  const collectionRef = collection(db, `Profiles/${auth.currentUser.uid}/Posts`);
  onSnapshot(collectionRef, (snapshot) => {
    Posts.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  });
}

onMounted(async () => {
  // Inicializa AOS para animaciones
  AOS.init({ duration: 1000, once: true });
  
  // Obtiene el último video y programa actualizaciones cada 30 minutos
  await fetchLatestVideo();
  setTimeout(() => {
    setInterval(fetchLatestVideo, 1800000);
  }, 3000);

  // Descarga los posts del usuario
  descargarPosts();

  // Muestra alerta de cookies después de 2 segundos
  setTimeout(() => {
    showCookieAlert.value = true;
  }, 2000);

  // Detecta el scroll para animar algunos elementos
  const novedadesTitle = document.querySelector('.novedades-title');
  const videoSection = document.querySelector('.scroll-bg');
  const seasons = document.querySelectorAll('.season');
  window.addEventListener('scroll', () => {
    if (novedadesTitle) {
      const rect = novedadesTitle.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        novedadesTitle.classList.add('slide-in');
      }
    }
    if (videoSection) {
      const rect = videoSection.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        seasons.forEach(season => {
          season.classList.add('bounce-in');
          season.addEventListener('animationend', () => {
            season.classList.remove('bounce-in');
            season.classList.add('spin');
          }, { once: true });
        });
      }
    }
  });
});


function goToJuegosPage() {
  currentSection.value = 'juegos';
}
</script>

<template>
  <StarBackground />
  <div class="home-wrapper">
    <div v-if="currentSection === 'home'">
      <div class="background">
      <div class="hero-container">
        <h1 class="titulo">DELIRIOS Y BARBARIES</h1>
        <img :src="imageSrc" alt="Imagen de bienvenida" class="welcome-image" />
      </div>
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
                  <h2 class="episode-title">Último Video</h2>
                  <div class="episode-underline"></div>
                </div>
                <div class="video-wrapper">
                  <div class="video-container">
                    <iframe
                      width="560"
                      height="315"
                      :src="'https://www.youtube.com/embed/' + latestVideoId"
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

      <!-- Navegación: sección "Ver Videos" con fondo desplazable -->
      <div id="podcast" class="scroll-bg">
        <button class="spectacular-button" @click="changeSection('videos')">
          Ver Videos
        </button>
      </div>

      <div id="foro" class="large-red-background foro-background">
        <button class="spectacular-button" @click="changeSection('foro')">
          Nuestro Foro
        </button>
      </div>

      <!-- Componente Nosotros -->
      <Nosotros />
       <!-- Título Patrocinadores -->
      <h2 id="patrocinadores" class="patrocinadores-title" :class="{ 'slide-in': true }">PATROCINADORES</h2>
 <!-- Componente ZDrinks -->
      <ZDrinks />    
      <!-- Componente Formulario -->
       <h2 id="contacto" class="patrocinadores-title" :class="{ 'slide-in': true }">FORMULARIO</h2>
      <Formulario/>   
      <!-- Barra de desplazamiento extra (amigable y con info) -->
      
      
      <!-- Footer -->
      <footer class="site-footer">
        <span class="puzzle-emoji" @click="goToJuegosPage">🧩</span>
        <div class="footer-content">
          <div class="footer-social">
            <h3 class="footer-title">Síguenos en nuestras Redes!</h3>
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
              <a href="https://x.com/deliriosyBarb" target="_blank" class="social-link twitter">
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
      <div v-if="currentSection === 'puzzles'">
      <Puzzles /> <!-- Muestra el componente Puzzles -->
      </div>
    </div>

    <!-- Otras secciones según la navegación -->
    <div v-else-if="currentSection === 'videos'">
      <Videos @navigate="changeSection" />
    </div>
    <div v-else-if="currentSection === 'foro'">
      <Foro @navigate="changeSection" />
    </div>


    <!-- Alerta de cookies -->
    <CookieAlert v-if="showCookieAlert" />
    <!-- Barra de invitados siempre visible abajo en Home -->
    <BarraInvitados />
  </div>
  <div v-if="currentSection === 'juegos'">
    <Juegos @navigate="changeSection" />
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

/* Botón legendario */
.spectacular-button {
  display: block;
  margin: 0 auto;
  padding: 20px 40px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #360a0a, #ff0000);
  border: none;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgb(0, 0, 0);
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
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
}

/* Título principal */
.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
  text-align: center;
}

.titulo {
  font-size: 4.7vw;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Georgia', serif;
  text-align: center;
  margin: 2.8%;
  position: absolute;
  top: 0%; /* Centra verticalmente */
  left: 20%; /* Centra horizontalmente */
    text-shadow: 3px 3px 3px rgba(114, 36, 36, 0.8);
  transition: color 0.5s ease, text-shadow 2s ease; /* Transición solo para color y sombra */
  z-index: 2; /* Asegura que el título esté por encima de otros elementos */
}

.titulo:hover {
  color: #ffd700; /* Cambia el color al pasar el ratón */
  text-shadow: 3px 3px 3px rgba(255, 255, 255, 0.8); /* Cambia el efecto de sombra */
}   

@media (max-width: 768px) {
  .titulo {
    font-size: 8vw;
  }
}
.welcome-image {
  width: 50vw;
  max-width: 600px;
  height: auto;
  margin: 0 auto;
  display: block;
  border-radius: 20px;
  transition: transform 0.3s ease; /* Solo afecta a la transformación de la imagen */
  z-index: 1; /* Asegura que la imagen esté detrás del título */
}

.welcome-image:hover {
  transform: scale(1.05); /* Aumenta ligeramente el tamaño al pasar el ratón */
}
@media (max-width: 768px) {
  .welcome-image {
    width: 70vw;
  }
}

.titulo::before {
  content: "";
  position: absolute;
  top: -20%;
  left: -10%;
  width: 120%;
  height: 140%;
  background: transparent;
  pointer-events: all; /* Permite detectar el hover en un área más grande */
}

.titulo:hover {
  color: #722424;
  transform: scale(1.05);
  text-shadow: 3px 3px 3px rgba(255, 255, 255, 0.8);
}


@keyframes delirio {
  0%, 100% {
    transform: scale(1);
    color: #ffd700;
  }
  50% {
    transform: scale(1.2);
    color: #ff4500;
  }
}

/* Imagen de bienvenida */
.welcome-image {
  width: 100%;
  max-width: 1200px;
  margin-top: -3%;
  height: auto;
  border-radius: 20px;
  transition: transform 0.3s ease;
  z-index: 1;
}

.welcome-image:hover {
  transform: scale(1.05);
}

/* Countdown */
.countdown-container {
  position: absolute;
  top: 7%;
  left: 50px;
  transform: translateY(-50%);
  z-index: 1;
}

/* Sección de Novedades */
.red-background {
  width: 100%;
  background: 
    linear-gradient(135deg, rgba(20, 0, 0, 0.9), rgba(80, 0, 0, 0.95)),
    url('https://imgur.com/gallery/wallpaper-years-rO3XClp#/t/wallpaper') center/cover;
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 100px rgba(0, 0, 0, 0.8),
    inset 0 0 300px rgba(136, 0, 0, 0.4);
}

/* Título "Novedades" (combinado con efecto slide-in) */
.novedades-title {
  font-size: 5.5rem;
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
}

.novedades-title.slide-in {
  opacity: 1;
  transform: translateX(0);
}

/* Último Video */
.ultimo-video {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem;
  background: rgba(20, 0, 0, 0.8);
  border-radius: 40px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 0 70px rgba(0,0,0,0.5),
              inset 0 0 50px rgba(255,215,0,0.05);
  transform: perspective(1000px) rotateX(5deg);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.ultimo-video:hover {
  transform: perspective(1000px) rotateX(0deg) translateY(-10px);
  box-shadow: 0 0 100px rgba(0,0,0,0.7),
              inset 0 0 70px rgba(255,215,0,0.1);
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
  text-shadow: 0 0 15px rgba(255,215,0,0.4),
               0 0 30px rgba(255,215,0,0.2);
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
  animation: underlinePulse 3s infinite;
}

@keyframes underlinePulse {
  0%, 100% { opacity: 0.5; width: 200px; }
  50% { opacity: 1; width: 250px; }
}

/* Video Wrapper y Contenedor */
.video-wrapper {
  position: relative;
  border: 3px solid rgba(255,215,0,0.3);
  border-radius: 25px;
  padding: 5px;
  background: linear-gradient(45deg, #ffd700, #ff4500);
  box-shadow: 0 0 40px rgba(136,25,25,0.6),
              inset 0 0 30px rgba(255,215,0,0.3);
  animation: borderGlow 4s infinite;
}

@keyframes borderGlow {
  0%, 100% {
    box-shadow: 0 0 40px rgba(136,25,25,0.6),
                inset 0 0 30px rgba(255,215,0,0.3);
    border-color: rgba(255,215,0,0.3);
  }
  50% {
    box-shadow: 0 0 60px rgba(136,25,25,0.8),
                inset 0 0 50px rgba(255,215,0,0.5);
    border-color: rgba(255,215,0,0.5);
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
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
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

.section-title {  /* Reemplaza la clase con la que ya tenga el botón */
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
.section-title:hover {  background-color: #800000;
  color: #ffffff;
  border: 2px solid #ffffff;
}


/* Footer */
.site-footer {
  background: linear-gradient(135deg, #1a1a1a, #000000);
  color: #ffffff;
  padding: 1.5rem 0; /* Menos padding para reducir la altura */
  position: relative;
  overflow: hidden;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.5); /* Sombra más sutil */
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem; /* Menor separación entre elementos */
}

.puzzle-emoji {
  font-size: 24px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  filter: brightness(0) invert(0); /* Hace que el emoji sea negro */
  transition: filter 0.3s ease-in-out;
}

.puzzle-emoji:hover {
  filter: brightness(1) invert(1); /* Invierte los colores para que sea claro al pasar el ratón */
}


.footer-social{
  text-align: center;
}

.footer-info {
  flex: 1 1 300px;
  text-align: center;
}

.footer-title {
  font-size: 1.4rem; /* Tamaño reducido */
  margin-bottom: 0.5rem;
  color: #ffd700;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem; /* Menor gap */
}

.social-link {
  padding: 0.3rem;
  width: 40px;  /* Íconos un poco más pequeños */
  height: 40px;
  color: white;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgb(0, 0, 0);
  transition: all 0.4s ease;
}
.footer-bottom {
  text-align: center;
  padding-top: 0.5rem;
  font-size: 0.9rem;
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
</style>
