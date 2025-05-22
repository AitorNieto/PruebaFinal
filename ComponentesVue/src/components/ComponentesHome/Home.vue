<script setup>
  import { ref, onMounted } from 'vue';
  import { useFirestore, useFirebaseAuth } from 'vuefire';
  import { collection, onSnapshot } from 'firebase/firestore';
  import Nosotros from '../ComponentesNosotros/Nosotros.vue';
  import Foro from '../ComponentesForo/Foro.vue';
  import Videos from '../ComponenteVideos/Videos.vue';
  import CookieAlert from './Extras/CookieAlert.vue';
  import StarBackground from './Extras/StarBackground.vue';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import Juegos from '../Games/Juegos.vue';
  import ZDrinks from '../Patrocinadores/ZDrinks.vue';
  import Formulario from './Formulario.vue';
  import BarraInvitados from './Extras/BarraInvitados.vue';
  import Novedades from './Novedades.vue';
  import Confetti from './Extras/Confetti.vue';
  import TarjetaZdrinks from './Extras/TarjetaZdrinks.vue';
  import InicioHome from './InicioHome.vue';
  import Footer from './Footer.vue';
  import Menu from './Menu.vue';
  import Perfil from '../ComponentesPerfil/Perfil.vue';
// Variables reactivas y configuración
const Posts = ref([]);
const db = useFirestore();
const auth = useFirebaseAuth();
const currentSection = ref('home');
const showCookieAlert = ref(false);


// Función para cambiar de sección y hacer scroll suave
function changeSection(section) {
  currentSection.value = section;
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
  <!-- SOLO muestra el menú en la sección home -->
  <Menu v-if="currentSection === 'home'" :currentView="currentSection" @navigate="changeSection" />
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
   
    </div>

    <!-- Otras secciones según la navegación -->
    <div v-else-if="currentSection === 'videos'">
      <Videos @navigate="changeSection" />
    </div>
    <div v-else-if="currentSection === 'foro'">
      <Foro @navigate="changeSection" />
    </div>
    <!-- AÑADE esto para el perfil -->
    <div v-else-if="currentSection === 'profile'">
      <Perfil @navigate="changeSection" />
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
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif !important;
  font-stretch: condensed;
  font-weight: 700;
  letter-spacing: 1px;
}

.home-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #800000 !important;
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
  color: #cec8a4;
  text-align: center;
  font-family: 'Cinzel', serif;
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

.patrocinadores-title.slide-in {
  opacity: 1;
  transform: translateX(0);
}

.patrocinadores-title:hover {
  filter: brightness(1.2);
  transform: translateX(0) scale(1.05) rotate(-1deg);
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
</style>
