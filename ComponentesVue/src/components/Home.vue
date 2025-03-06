<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore, useFirebaseAuth } from 'vuefire';
import { collection, onSnapshot } from "firebase/firestore";
import imageSrc from '@/assets/DYB.png';
import Countdown from './Countdown.vue';
import Nosotros from './Nosotros.vue';
import Foro from './Foro.vue';
import CookieAlert from './CookieAlert.vue';

const Posts = ref([]);
const db = useFirestore();
const auth = useFirebaseAuth();
const currentSection = ref('home');
const showCookieAlert = ref(false);

function descargarPosts() {
  if (!auth.currentUser) {
    console.error('No hay usuario autenticado');
    return;
  }

  const collectionRef = collection(db, `Profiles/${auth.currentUser.uid}/Posts`);
  onSnapshot(collectionRef, (snapshot) => {
    Posts.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
}

function changeSection(section) {
  currentSection.value = section;
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  descargarPosts();

  // Mostrar alerta de cookies después de un breve retraso
  setTimeout(() => {
    showCookieAlert.value = true;
  }, 3000); // 3 segundos de retraso

  // Detectar el desplazamiento y aplicar la clase de animación
  const novedadesTitle = document.querySelector('.novedades-title');
  const videoSection = document.querySelector('.dark-red-background');
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
</script>

<template>
  <div v-if="currentSection === 'home'">
    <div class="background">
      <h1 class="title">DELIRIOS Y BARBARIES</h1>
      <img :src="imageSrc" alt="Imagen de bienvenida" class="welcome-image" />
      <Countdown class="countdown-container" />
    </div>

    <!-- Sección de Novedades -->
    <div id="novedades" class="red-background">
      <h1 class="novedades-title">Novedades</h1>
      <div class="home-content">
        <div class="content-row">
          <div class="ultimo-video">
            <h2>Último Video</h2>
            <div class="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/VIDEO_ID"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Secciones de Navegación -->
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

    <!-- Barra de desplazamiento -->
    <div class="scrolling-bar">
      <div class="scrolling-text">
        D&B • Kappah • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah •
      </div>
    </div>
  </div>

  <div v-else-if="currentSection === 'foro'">
    <Foro @navigate="changeSection" />
  </div>

  <div v-else-if="currentSection === 'resenas'">
    <Reseñas />
  </div>

  <div v-else-if="currentSection === 'nosotros'">
    <Nosotros />
  </div>

  <!-- Componente de alerta de cookies -->
  <CookieAlert v-if="showCookieAlert" />
</template>

<style scoped>
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
  background-color: rgba(124, 7, 7, 0.8); /* Fondo rojo */
  padding: 2rem 1rem; /* Espacio adicional */
  padding-bottom: 4rem; /* Añade más espacio debajo */
}

/* Nuevo fondo rojo oscuro */
.dark-red-background {
  width: 100%;
  height: 400px; /* Ajusta la altura según sea necesario */
  background-color: rgba(100, 0, 0, 0.8); /* Fondo rojo oscuro */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Necesario para posicionar las temporadas */
}

/* Temporadas */
.season {
  position: absolute;
  font-size: 1.5rem;
  color: #f5f5dc; /* Blanco crema */
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  transform: rotate(-10deg); /* Ajusta el ángulo de rotación */
  opacity: 0; /* Inicialmente oculto */
  transition: opacity 0.5s, transform 1s; /* Transición suave */
}

.season-1 {
  top: 40px;
  left: 40px;
}

.season-2 {
  top: 40px;
  right: 40px;
}

.season-3 {
  bottom: 40px;
  left: 40px;
}

.season-4 {
  bottom: 40px;
  right: 40px;
}

.season.bounce-in {
  opacity: 1; /* Visible */
  animation: bounce-in 1s ease-out;
}

@keyframes bounce-in {
  0% {
    transform: translateX(-1000px) rotate(-10deg);
  }
  60% {
    transform: translateX(30px) rotate(-10deg);
  }
  80% {
    transform: translateX(-10px) rotate(-10deg);
  }
  100% {
    transform: translateX(0) rotate(-10deg);
  }
}

.season.spin {
  animation: spin 5s linear infinite; /* Añade la animación de rotación */
}

@keyframes spin {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}

/* Primer nuevo div grande */
.large-red-background {
  width: 100%;
  height: 400px; /* Ajusta la altura según sea necesario */
  background-color: rgba(150, 0, 0, 0.8); /* Fondo rojo más claro */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Añade un cursor de puntero para indicar que es clicable */
}

/* Segundo nuevo div grande */
.large-dark-red-background {
  width: 100%;
  height: 400px; /* Ajusta la altura según sea necesario */
  background-color: rgba(80, 0, 0, 0.8); /* Fondo rojo más oscuro */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Añade un cursor de puntero para indicar que es clicable */
}

/* Título para los nuevos divs grandes */
.large-div-title {
  font-size: 2.5rem;
  color: white;
  text-align: center;
}

/* Sección de contenido extra */
.home-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; /* Espacio vertical entre secciones */
}

/* Fila de contenido */
.content-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  align-items: flex-start; /* Alinea los elementos al inicio para que estén a la misma altura */
}

/* Título "Novedades" */
.novedades-title {
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 2rem;
  opacity: 0; /* Inicialmente oculto */
  transform: translateX(-100%); /* Fuera de la pantalla a la izquierda */
  transition: opacity 1s, transform 1s; /* Transición suave */
}

.novedades-title.slide-in {
  opacity: 1; /* Visible */
  transform: translateX(0); /* En su posición final */
}

/* Último Video */
.ultimo-video {
  max-width: 48%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px; /* Alinea el video a la misma altura que "Quiénes Somos" */
  height: 400px; /* Ajusta la altura según sea necesario */
  animation: blink 1s infinite; /* Añade la animación de parpadeo */
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.ultimo-video h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #960f0f;
}

/* Contenedor para el iframe (para mantener proporción 16:9) */
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

/* Título "Ver Videos" */
.ver-videos-title {
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-top: 2rem;
  height: 400px; /* Ajusta la altura según sea necesario */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Barra de desplazamiento */
.scrolling-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(124, 7, 7, 0.8);
  color: white;
  overflow: hidden;
  white-space: nowrap;
}

.scrolling-text {
  display: inline-block;
  padding-left: 100%;
  animation: scroll 40s linear infinite; /* Ajusta la duración de la animación */
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Ajusta para que el texto se repita sin interrupciones */
  }
}
</style>