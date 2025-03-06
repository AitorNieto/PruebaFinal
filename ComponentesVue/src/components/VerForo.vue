<script setup>
import { ref } from 'vue';

const reviews = ref([
 {
 title: 'Reseña 1',
 comment: 'Este es un comentario de ejemplo.',
 likes: 0,
 liked: false,
 comments: [],
 newComment: ''
 },
 {
 title: 'Reseña 2',
 comment: 'Otro comentario de ejemplo.',
 likes: 0,
 liked: false,
 comments: [],
 newComment: ''
 }
]);

const toggleLike = (review) => {
 if (review.liked) {
 review.likes--;
 review.liked = false;
 } else {
 review.likes++;
 review.liked = true;
 }
};
</script>

<template>
 <div class="ver-foro">
 <h1>Ver Foro</h1>
 <div v-for="(review, index) in reviews" :key="index" class="review">
 <h3>{{ review.title }}</h3>
 <p>{{ review.comment }}</p>
 <p>Likes: {{ review.likes }}</p>
 <button @click="toggleLike(review)" class="button">
 <span :class="{'liked': review.liked}">👍</span>
 </button>
 <div class="comment-section">
 <input v-model="review.newComment" placeholder="Comentar" class="input" />
 <button @click="review.comments.push(review.newComment); review.newComment = '';" class="button">Agregar Comentario</button>
 <div v-for="(comment, idx) in review.comments" :key="idx" class="comment">
 <p>{{ comment }}</p>
 </div>
 </div>
 </div>
 </div>
</template>

<style scoped>
.ver-foro {
 padding: 20px;
 background-color: #f5f5f5;
 min-height: 100vh;
}

h1 {
 font-size: 24px;
 font-weight: bold;
 margin-bottom: 20px;
 text-align: center;
}

.review {
 background-color: white;
 padding: 20px;
 margin-bottom: 20px;
 border-radius: 10px;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button {
 padding: 10px 20px;
 background-color: #ff5722;
 color: white;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: background-color 0.3s ease;
}

.button:hover {
 background-color: #e64a19;
}

.input {
 width: 100%;
 padding: 10px;
 margin-bottom: 10px;
 border: 1px solid #ccc;
 border-radius: 5px;
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

.liked {
 color: red;
 animation: heartBeat 0.5s ease-in-out;
}

@keyframes heartBeat {
 0% {
 transform: scale(1);
 }
 25% {
 transform: scale(1.3);
 }
 50% {
 transform: scale(1);
 }
 75% {
 transform: scale(1.3);
 }
 100% {
 transform: scale(1);
 }
}
</style>