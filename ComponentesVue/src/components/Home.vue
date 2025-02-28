<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore, useFirebaseAuth } from 'vuefire';
import { doc, getDocs, collection, addDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import imageSrc from '@/assets/DYB.png';
import Countdown from './Countdown.vue';
import Nosotros from './Nosotros.vue';

const Posts = ref([]);
const db = useFirestore();
const auth = useFirebaseAuth();
const currentSection = ref('home');

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
}

onMounted(() => {
  descargarPosts();
});
</script>

<template>
  <div v-if="currentSection === 'home'">
    <div class="background">
      <h1 class="title">DELIRIOS Y BARBARIES</h1>
      <img :src="imageSrc" alt="Imagen de bienvenida" class="welcome-image" />
      <Countdown class="countdown-container" />
    </div>

    <!-- Nuevo div con fondo rojo -->
    <div class="red-background">
      <!-- Título "Novedades" centrado -->
      <h1 class="novedades-title">Novedades</h1>
      <!-- Sección de contenido extra debajo (Último Video) -->
      <div class="home-content">
        <div class="content-row">
          <!-- Último Video -->
          <div class="ultimo-video">
            <h2>Último Video</h2>
            <!-- Ajusta el 'src' de tu iframe al video de YouTube que desees mostrar -->
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

    <!-- Nuevo div con fondo rojo oscuro y h1 "Ver Videos" -->
    <div class="dark-red-background">
      <h1 class="ver-videos-title">Ver Videos</h1>
      <div class="season season-1">Temporada 1</div>
      <div class="season season-2">Temporada 2</div>
      <div class="season season-3">Temporada 3</div>
      <div class="season season-4">Temporada 4</div>
    </div>

    <!-- Primer nuevo div grande -->
    <div class="large-red-background">
      <h1 class="large-div-title">Nuestro Foro</h1>
    </div>

    <!-- Segundo nuevo div grande -->
    <div class="large-dark-red-background" @click="changeSection('nosotros')">
      <h1 class="large-div-title">Sobre Nosotros</h1>
    </div>

    <!-- Barra de desplazamiento -->
    <div class="scrolling-bar">
      <div class="scrolling-text">
        D&B • Kappah • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah • D&B • Kappah • 
        D&B • Kappah • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah • D&B • Kappah • 
        D&B • Kappah • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah • D&B • Kappah • 
        D&B • Kappah • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah • D&B • Kappah • 
      </div>
    </div>
  </div>

  <div v-else-if="currentSection === 'nosotros'">
    <Nosotros />
  </div>
</template>

<style scoped>
/* Reset y tipografías */
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
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

/* Imagen de bienvenida */
.welcome-image {
  width: 100%;
  max-width: 800px;
  height: auto;
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
  animation: spin 5s linear infinite; /* Añade la animación de rotación */
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
}

/* Último Video */
.ultimo-video {
  max-width: 48%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px; /* Alinea el video a la misma altura que "Quiénes Somos" */
  height: 400px; /* Ajusta la altura según sea necesario */
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
