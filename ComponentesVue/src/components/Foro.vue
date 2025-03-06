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
 comments: []
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
 width: 100vw; /* Ocupar todo el ancho de la pantalla */
 height: auto;
 background-color: white;
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
}

/* Imagen del título centrada */
.title-image {
 width: 100vw; /* Expande la imagen a todo el ancho de la pantalla */
 max-height: 200px; /* Ajusta la altura según sea necesario */
 object-fit: cover; /* Mantiene proporción */
 object-position: center center; /* Centra la imagen completamente */
}

/* Contenedor principal (deja espacio para la imagen fija) */
.content {
 padding-top: 200px; /* Ajusta este valor para que el contenido no quede tapado */
 background-color: #7c0707;
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
 background-color: #7c0707; /* Fondo rojo simple */
 min-height: 100vh;
 padding: 20px;
 display: flex;
 flex-direction: column;
 align-items: center;
}

.title {
 font-size: 24px;
 font-weight: bold;
 color: white;
 margin-bottom: 20px;
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
}

.button:hover {
 background-color: #e64a19;
}

.review {
 background-color: white;
 padding: 20px;
 margin-bottom: 20px;
 border-radius: 10px;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 width: 80%;
}

.comment-section {
 margin-top: 10px;
}

.comment {
 background-color: #f1f1f1;
 padding: 10px;
 border-radius: 5px;
 margin-top: 5px;
}
</style>
