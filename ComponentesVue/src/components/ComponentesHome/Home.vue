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
  import imageSrc from '@/assets/FondoDyB.png';
  import Juegos from '../Games/Juegos.vue';
  import ZDrinks from '../Patrocinadores/ZDrinks.vue';
  import Formulario from './Formulario.vue';
  import BarraInvitados from './Extras/BarraInvitados.vue';
  import Novedades from './Novedades.vue';
  import Confetti from './Extras/confetti.vue';
  import TarjetaZdrinks from './Extras/TarjetaZdrinks.vue';
  import InicioHome from './InicioHome.vue';
  import Footer from './Footer.vue';
// Variables reactivas y configuración
const Posts = ref([]);
const db = useFirestore();
const auth = useFirebaseAuth();
const currentSection = ref('home');
const showCookieAlert = ref(false);
const latestVideoId = ref('g7jLY3Z17uk'); // Video por defecto
const loadingVideo = ref(true);


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
  
  // Descarga los posts del usuario
  descargarPosts();

  // Muestra alerta de cookies después de 2 segundos
  setTimeout(() => {
    showCookieAlert.value = true;
  }, 2000);

  // Detecta el scroll para animar algunos elementos
  
  const videoSection = document.querySelector('.scroll-bg');
  const seasons = document.querySelectorAll('.season');
  window.addEventListener('scroll', () => {
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

function scrollToZDrinks() {
  const section = document.getElementById('patrocinadores');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <StarBackground />
  <Confetti/>
  <div class="home-wrapper">
    <div v-if="currentSection === 'home'">
      <TarjetaZdrinks @go-zdrinks="scrollToZDrinks" />
      <InicioHome />
      <!-- Reemplazar la sección de novedades con el componente -->
      <Novedades />

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
      <Footer @go-juegos="goToJuegosPage" />
      <div v-if="currentSection === 'puzzles'">
      <Puzzles /> <!-- Muestra el componente Puzzles -->
      </div>
    </div>

    <!-- Otras secciones según la navegación -->
    <div v-else-if="currentSection === 'videos'">
      <Videos @navigate="changeSection" @go-zdrinks="currentSection = 'patrocinadores'" />
    </div>
    <div v-else-if="currentSection === 'foro'">
      <Foro @navigate="changeSection" @go-zdrinks="currentSection = 'patrocinadores'" />
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
