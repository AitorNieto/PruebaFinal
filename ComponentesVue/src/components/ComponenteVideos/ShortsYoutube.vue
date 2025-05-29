<template>
  <div class="shorts-container">
    <h2 class="shorts-title">Últimos Reels</h2>
    <div class="shorts-grid">
      <div v-for="short in shorts" :key="short.id" class="short-card">
        <div class="short-container">
          <iframe
            :src="`https://www.youtube.com/embed/${short.id}`"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <h3>{{ short.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Simplified iframe URLs
const shorts = ref([
  {
    id: 'b9O0My-GqM0',
    
  },
  {
    id: 'Q1XEq2urGJY',
    
  },
  {
    id: 'hG_dv3FXAPI',
    
  },
  {
    id: 'PYbCOyRAk3I',
  }
]);
</script>

<style scoped>
.shorts-container {
  padding: 4rem 2rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(80, 0, 0, 0.95));
  border-top: 1px solid rgba(255, 215, 0, 0.3);
}

.shorts-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #ffffff, #ffd700);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.shorts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

.short-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: transform 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.short-card:hover {
  transform: translateY(-10px);
  border-color: #ffd700;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.short-container {
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.short-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  aspect-ratio: 9/16;
  display: block;
}

/* Mejorar la visualización del título */
h3 {
  padding: 1rem;
  font-size: 1rem;
  color: #ffffff;
  text-align: center;
  margin: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(80, 0, 0, 0.8));
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ajustes responsive para títulos y contenedores */
@media (max-width: 1024px) {
  .shorts-title {
    font-size: 2.5rem;
  }
  .shorts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
}

@media (max-width: 768px) {
  .shorts-container {
    padding: 2rem 1rem;
  }
  .shorts-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    padding: 0 0.5rem;
  }
  .shorts-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  .short-card {
    max-width: 400px;
    margin: 0 auto;
  }
  .short-container {
    aspect-ratio: 9/16;
    min-height: 320px;
  }
}

@media (max-width: 480px) {
  .shorts-container {
    padding: 1.5rem 0.5rem;
  }
  .shorts-title {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
  .short-card {
    max-width: 98vw;
    margin: 0 auto;
  }
  .short-container {
    aspect-ratio: 9/16;
    min-height: 220px;
  }
  h3 {
    font-size: 1rem;
    min-height: 2.5rem;
  }
}

/* Optimizaciones para dispositivos táctiles */
@media (hover: none) {
  .short-card:hover {
    transform: none;
    box-shadow: none;
  }
}
</style>