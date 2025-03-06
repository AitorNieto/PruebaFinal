<script setup>
import { ref } from 'vue';
import fotoTitulo from '@/assets/fotoTitulo.jpeg';

const title = ref('');
const comment = ref('');
const reviews = ref([]);

const addReview = () => {
 if (title.value && comment.value) {
 reviews.value.push({
 title: title.value,
 comment: comment.value,
 likes: 0,
 comments: [],
 newComment: ''
 });
 title.value = '';
 comment.value = '';
 }
};
</script>

<template>
 <div>
 <!-- Imagen del título fija en la parte superior -->
 <div class="title-container">
 <img :src="fotoTitulo" alt="Título" class="title-image" />
 </div>

 <!-- Contenido debajo del título -->
 <div class="content">
 <v-container>
 <v-row justify="center">
 <v-col cols="12" md="6">
 <v-img src="@/assets/fotoGrupo.jpeg" class="group-image" contain></v-img>
 </v-col>
 </v-row>
 </v-container>
 </div>

 <!-- Nuevo contenido del componente Foro -->
 <div class="background">
 <h1 class="title">Foro</h1>
 <div class="review-form">
 <input v-model="title" placeholder="Título de la reseña" class="input" />
 <textarea v-model="comment" placeholder="Comentario" class="textarea"></textarea>
 <button @click="addReview" class="button">Agregar Reseña</button>
 </div>
 <div v-for="(review, index) in reviews" :key="index" class="review">
 <h3>{{ review.title }}</h3>
 <p>{{ review.comment }}</p>
 <p>Likes: {{ review.likes }}</p>
 <button @click="review.likes++" class="button">Like</button>
 <div class="comment-section">
 <input v-model="review.newComment" placeholder="Comentar" class="input" />
 <button @click="review.comments.push(review.newComment); review.newComment = '';" class="button">Agregar Comentario</button>
 <div v-for="(comment, idx) in review.comments" :key="idx" class="comment">
 <p>{{ comment }}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<style scoped>
/* Contenedor del título fijo */
.title-container {
 position: fixed;
 top: 0;
 left: 0;
 width: 100vw;
 height: auto;
 background-color: #1a1a1a;
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
}

/* Imagen del título centrada */
.title-image {
 width: 100vw;
 max-height: 200px;
 object-fit: cover;
 object-position: center center;
}

/* Contenedor principal */
.content {
 padding-top: 200px;
 background-color: #121212;
 min-height: 100vh;
 display: flex;
 flex-direction: column;
 align-items: center;
}

/* Imagen dentro del contenido */
.group-image {
 border-radius: 10px;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Fondo del componente Foro */
.background {
 background-color: #121212;
 min-height: 100vh;
 padding: 20px;
 display: flex;
 flex-direction: column;
 align-items: center;
}

.title {
 font-size: 36px;
 font-weight: bold;
 color: #ff5722;
 margin-bottom: 20px;
 text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.review-form {
 display: flex;
 flex-direction: column;
 align-items: center;
 margin-bottom: 20px;
}

.input, .textarea {
 width: 300px;
 padding: 10px;
 margin-bottom: 10px;
 border: 1px solid #ccc;
 border-radius: 5px;
 background-color: #1a1a1a;
 color: #fff;
}

.textarea {
 height: 100px;
}

.button {
 padding: 10px 20px;
 background-color: #ff5722;
 color: white;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 transition: background-color 0.3s ease;
}

.button:hover {
 background-color: #e64a19;
}

.review {
 background-color: #1a1a1a;
 padding: 20px;
 margin-bottom: 20px;
 border-radius: 10px;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 width: 80%;
 color: #fff;
}

.comment-section {
 margin-top: 10px;
}

.comment {
 background-color: #2a2a2a;
 padding: 10px;
 border-radius: 5px;
 margin-top: 5px;
 color: #fff;
}
</style>