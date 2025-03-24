<script>
import { db } from "../firebase"; // Importamos Firestore
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";

export default {
  data() {
    return {
      videos: [],
      searchQuery: "",
      lastVisible: null, // Para paginación
      allLoaded: false, // Control de carga
    };
  },
  async mounted() {
    await this.getVideos();
  },
  computed: {
    filteredVideos() {
      return this.videos.filter((video) =>
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async getVideos() {
      try {
        const videosRef = collection(db, "videos");
        let q = query(videosRef, orderBy("title"), limit(6)); // Primeros 6 videos

        if (this.lastVisible) {
          q = query(videosRef, orderBy("title"), startAfter(this.lastVisible), limit(6));
        }

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          this.lastVisible = snapshot.docs[snapshot.docs.length - 1];

          const newVideos = snapshot.docs.map((doc) => doc.data());
          this.videos = [...this.videos, ...newVideos];
        } else {
          this.allLoaded = true;
        }
      } catch (error) {
        console.error("Error cargando videos:", error);
      }
    },
    async loadMoreVideos() {
      await this.getVideos();
    },
  },
};
</script>

<template>
    <div class="container">
      <h2>🎙 Últimos Episodios de Delirios y Barbaries</h2>
  
      <!-- Barra de búsqueda -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔎 Buscar episodio..."
        class="search-bar"
      />
  
      <!-- Grid de videos -->
      <div v-if="videos.length" class="video-grid">
        <div v-for="video in filteredVideos" :key="video.id" class="video-item">
          <a :href="'https://www.youtube.com/watch?v=' + video.id" target="_blank">
            <img :src="video.thumbnail" :alt="video.title" />
          </a>
          <h3>{{ video.title }}</h3>
        </div>
      </div>
  
      <p v-else>Cargando videos...</p>
  
      <!-- Botón "Cargar más" -->
      <button v-if="!allLoaded" @click="loadMoreVideos" class="load-more">Cargar más</button>
    </div>
  </template>
  
  <style scoped>
  .container {
    text-align: center;
    padding: 20px;
  }
  h2 {
    margin-bottom: 15px;
  }
  .search-bar {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  .video-item {
    text-align: center;
    transition: transform 0.3s ease-in-out;
  }
  .video-item img {
    width: 100%;
    border-radius: 8px;
  }
  .video-item:hover {
    transform: scale(1.05);
  }
  .load-more {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  .load-more:hover {
    background-color: #cc3700;
  }
  </style>
  