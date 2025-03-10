<script setup>
import { ref, defineEmits } from 'vue';
import { db, auth } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

const emit = defineEmits(['add-review']);

const showForm = ref(false);
const newReview = ref({
  title: '',
  comment: '',
  likes: 0,
  author: 'Anónimo',
  date: new Date().toLocaleString(),
  comments: [],
  likedBy: []
});

const toggleForm = () => {
  showForm.value = !showForm.value;
};

const addReview = async () => {
  if (!newReview.value.title.trim() || !newReview.value.comment.trim()) {
    alert('El título y el comentario no pueden estar vacíos.');
    return;
  }

  const user = auth.currentUser;
  newReview.value.author = user ? user.displayName : 'Anónimo';
  newReview.value.date = new Date().toLocaleString();

  try {
    const docRef = await addDoc(collection(db, 'reviews'), newReview.value);
    console.log('Document written with ID: ', docRef.id);
    emit('add-review', { id: docRef.id, ...newReview.value });
    newReview.value.title = '';
    newReview.value.comment = '';
    showForm.value = false; // Ocultar el formulario después de agregar la reseña
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
</script>

<template>
  <div class="add-review-container" @mouseenter="showForm = true" @mouseleave="showForm = false">
    <button class="add-review">Añadir Opinión</button>
    <div v-if="showForm" class="review-form">
      <input v-model="newReview.title" placeholder="Título" class="input" />
      <textarea v-model="newReview.comment" placeholder="Comentario" class="textarea"></textarea>
      <button @click="addReview" class="button">Agregar</button>
    </div>
  </div>
</template>

<style scoped>
.add-review-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.add-review {
  width: 100%;
  height: 100%;
  background-color: #830f0f;
  color: #fff;
  border: none;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
}

.review-form {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;
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