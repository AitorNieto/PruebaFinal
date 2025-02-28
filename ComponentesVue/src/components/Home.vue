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

  // Detectar el desplazamiento y aplicar la clase de animación
  const novedadesTitle = document.querySelector('.novedades-title');
  window.addEventListener('scroll', () => {
    const rect = novedadesTitle.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      novedadesTitle.classList.add('slide-in');
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

  <!-- Nuevo div con fondo rojo -->
  <div id="novedades" class="red-background">
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

<template>
  <div class="background">
    <!-- Nuevo div con fondo rojo oscuro y h1 "Ver Videos" -->
    <div class="dark-red-background" @click="$emit('navigate', 'videos')">
      <h1 class="section-title">Ver Videos</h1>
      <div class="season season-1">Temporada 1</div>
      <div class="season season-2">Temporada 2</div>
      <div class="season season-3">Temporada 3</div>
      <div class="season season-4">Temporada 4</div>
    </div>

    <!-- Primer nuevo div grande -->
    <div class="large-red-background" @click="$emit('navigate', 'foro')">
      <h1 class="section-title">Nuestro Foro</h1>
    </div>

    <!-- Segundo nuevo div grande -->
    <div class="large-dark-red-background" @click="changeSection('nosotros')">
      <h1 class="section-title">Sobre Nosotros</h1>
    </div>

    <!-- Barra de desplazamiento -->
    <div class="scrolling-bar">
      <div class="scrolling-text">
        D&B • Kappah • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto •
        D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah •
      </div>
    </div>
  </div>

  <div v-else-if="currentSection === 'nosotros'">
    <Nosotros />
  </div>
</template>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(10deg, rgba(150, 15, 15, 0.8), rgba(165, 47, 47, 0.8)),
    url('@/assets/FondoPrincipal.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 2.5rem;
  color: white;
  text-align: center;
}

.dark-red-background,
.large-red-background,
.large-dark-red-background {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dark-red-background {
  background-color: rgba(100, 0, 0, 0.8);
  position: relative;
}

.large-red-background {
  background-color: rgba(150, 0, 0, 0.8);
}

.large-dark-red-background {
  background-color: rgba(80, 0, 0, 0.8);
}

.season {
  position: absolute;
  font-size: 1.5rem;
  color: #f5f5dc;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  transform: rotate(-10deg);
  animation: spin 5s linear infinite;
}

.season-1 { top: 40px; left: 40px; }
.season-2 { top: 40px; right: 40px; }
.season-3 { bottom: 40px; left: 40px; }
.season-4 { bottom: 40px; right: 40px; }

@keyframes spin {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}

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
  animation: scroll 40s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (max-width: 768px) {
  .section-title { font-size: 1.5rem; }
  .dark-red-background,
  .large-red-background,
  .large-dark-red-background {
    padding: 1rem 0.5rem;
    height: auto;
  }
  .scrolling-bar { font-size: 0.8rem; }
}
</style>
