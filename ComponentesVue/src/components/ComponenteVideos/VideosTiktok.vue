<template>
  <div class="tiktok-container">
    <h2 class="tiktok-title">Videos Populares de TikTok</h2>
    <div class="tiktok-grid">
      <div v-for="tiktok in tiktoks" :key="tiktok.id" class="tiktok-card">
        <div class="tiktok-video-wrapper">
          <div class="tiktok-video-container">
            <iframe
              :src="`https://www.tiktok.com/embed/v2/${tiktok.id}?lang=es-ES`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div class="video-info">
          <h3>{{ tiktok.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tiktoks = ref([
  {
    id: '7221792783005142277',
  },
  {
    id: '7207429664434916614',
    
  },
  {
    id: '7225749144240016646',
    
  },
  {
    id: '7221882472210910469',
    
  }
]);
</script>

<style scoped>
.tiktok-container {
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.95), 
    rgba(80, 0, 0, 0.95)
  );
  border-top: 1px solid rgba(255, 215, 0, 0.3);
  margin-top: 2rem;
}

.tiktok-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 4rem;
  background: linear-gradient(45deg, #ffffff, #ffd700);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  animation: titleGlow 3s infinite;
}

@keyframes titleGlow {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3)); }
  50% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(255, 215, 0, 0.5)); }
}

.tiktok-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 2rem;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Para móviles: un tiktok debajo de otro */
@media (max-width: 768px) {
  .tiktok-grid {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-width: 420px;
    padding: 0 0.5rem;
  }
}

.tiktok-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(255, 215, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tiktok-video-wrapper {
  position: relative;
  width: 100%;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiktok-video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  max-width: 320px;
  min-width: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiktok-video-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px 12px 0 0;
  display: block;
}

.video-info {
  padding: 1.5rem;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.95), 
    rgba(80, 0, 0, 0.8)
  );
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.video-info h3 {
  color: #ffffff;
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Tablets */
@media (max-width: 1024px) {
  .tiktok-title {
    font-size: 2.5rem;
  }

  .tiktok-grid {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
    gap: 1.2rem;
    padding: 0 0.5rem;
  }

  .tiktok-container {
    padding: 4rem 1rem;
  }

  .tiktok-video-container {
    max-width: 220px;
  }
}

/* Tablets pequeñas y móviles grandes */
@media (max-width: 768px) {
  .tiktok-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    padding: 0 0.5rem;
  }

  .tiktok-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .tiktok-card {
    margin: 0 auto;
    width: 100%;
    max-width: 320px;
  }
  .tiktok-video-container {
    max-width: 180px;
    min-width: 0;
    aspect-ratio: 9/16;
    min-height: 220px;
  }
}

/* Móviles */
@media (max-width: 480px) {
  .tiktok-container {
    padding: 2rem 0.2rem;
  }

  .tiktok-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .tiktok-card {
    max-width: 98vw;
    margin: 0 auto;
    border-radius: 12px;
  }

  .tiktok-video-container {
    max-width: 98vw;
    min-width: 0;
    aspect-ratio: 9/16;
    min-height: 140px;
  }

  .video-info {
    padding: 0.7rem;
  }

  .video-info h3 {
    font-size: 0.9rem;
  }
}

/* Optimizaciones de rendimiento */
@media (prefers-reduced-motion: reduce) {
  .tiktok-card {
    transition: none;
  }
}

/* Mejoras para dispositivos táctiles */
@media (hover: none) {
  .tiktok-card:hover {
    transform: none;
  }
}

/* Mejoras responsive para TikTok */
@media (max-width: 1200px) {
  .tiktok-grid {
    grid-template-columns: repeat(3, minmax(180px, 1fr));
  }
}
</style>