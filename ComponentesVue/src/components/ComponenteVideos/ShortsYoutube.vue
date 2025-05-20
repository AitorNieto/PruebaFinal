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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Reducido de 300px a 200px */
  gap: 1.5rem;
  max-width: 1200px; /* Reducido de 1400px */
  margin: 0 auto;
  padding: 0 1rem;
}

.short-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: transform 0.4s ease;
}

.short-card:hover {
  transform: translateY(-10px);
  border-color: #ffd700;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.short-container {
  position: relative;
  width: 100%;
  padding-top: 177.77%; /* Mantener ratio 9:16 para shorts */
  background: #000;
  overflow: hidden;
}

.short-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
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
@media (max-width: 768px) {
  .shorts-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .shorts-container {
    padding: 2rem 1rem;
  }

  .shorts-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets */
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .shorts-grid {
    grid-template-columns: 1fr; /* 1 columna en móviles */
  }

  .short-card {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>