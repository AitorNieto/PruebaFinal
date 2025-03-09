<script setup>
import { ref, defineEmits } from 'vue';
import { db, auth } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

const emit = defineEmits(['add-review']);

const title = ref('');
const comment = ref('');
const showReviewForm = ref(false);

const toggleReviewForm = () => {
  showReviewForm.value = !showReviewForm.value;
};

const addReview = async () => {
  if (!title.value || !comment.value) {
    alert('El título y el comentario no pueden estar vacíos.');
    return;
  }

  const user = auth.currentUser;
  const newReview = {
    title: title.value,
    comment: comment.value,
    likes: 0,
    likedBy: [], // Lista de usuarios que han dado like
    comments: [],
    newComment: '',
    author: user ? user.displayName : 'Anónimo',
    date: new Date().toLocaleString()
  };

  try {
    const docRef = await addDoc(collection(db, 'reviews'), newReview);
    console.log('Document written with ID: ', docRef.id);
    emit('add-review', { id: docRef.id, ...newReview });
    title.value = '';
    comment.value = '';
    showReviewForm.value = false; // Ocultar el formulario después de agregar la reseña
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
</script>

<template>
  <div>
    <button @click="toggleReviewForm" class="add-review">Añadir opinión</button>
    <div v-if="showReviewForm" class="modal-overlay" @click="toggleReviewForm">
      <div class="modal-content" @click.stop>
        <button @click="toggleReviewForm" class="close-button">X</button>
        <input v-model="title" placeholder="Título de la reseña" class="input" />
        <textarea v-model="comment" placeholder="Comentario" class="textarea"></textarea>
        <button @click="addReview" class="button">Agregar Reseña</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-review {
  background-color: #830f0f;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px; /* Ajusta según sea necesario */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px); /* Aplica el desenfoque al fondo */
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.input, .textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  background-color: green;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>