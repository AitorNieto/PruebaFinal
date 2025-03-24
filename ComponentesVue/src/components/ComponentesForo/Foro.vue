<script setup>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove, addDoc } from 'firebase/firestore';
import fotoTitulo from '@/assets/fotoTitulo.jpeg';
import BotonForo from './BotonForo.vue';
import BusquedaForo from './BusquedaForo.vue';

const reviews = ref([]);
const filteredReviews = ref([]);
const isLoggedIn = ref(false);
const userId = ref(null);
const showCommentsModal = ref(false);
const activeReview = ref(null);
const showSearchForm = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
    userId.value = user ? user.uid : null;
  });

  getDocs(collection(db, 'reviews')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      reviews.value.push({ id: doc.id, ...doc.data() });
    });
    filteredReviews.value = reviews.value;
  }).catch((error) => {
    console.error('Error fetching reviews: ', error);
  });
});

const addComment = (review) => {
  if (!isLoggedIn.value) {
    alert('Debes estar registrado para agregar un comentario.');
    return;
  }
  if (review.newComment.trim()) {
    const user = auth.currentUser;
    const commentWithAuthor = {
      text: review.newComment,
      author: user ? user.displayName : 'Anónimo',
      date: new Date().toLocaleString()
    };
    const reviewRef = doc(db, 'reviews', review.id);
    updateDoc(reviewRef, {
      comments: arrayUnion(commentWithAuthor)
    }).then(() => {
      review.comments.push(commentWithAuthor);
      review.newComment = '';
    }).catch((error) => {
      console.error('Error adding comment: ', error);
    });
  } else {
    alert('El comentario no puede estar vacío.');
  }
};

const likeReview = (review) => {
  if (!isLoggedIn.value) {
    alert('Debes estar registrado para dar like.');
    return;
  }
  const reviewRef = doc(db, 'reviews', review.id);
  if (!review.likedBy.includes(userId.value)) {
    updateDoc(reviewRef, {
      likes: review.likes + 1,
      likedBy: arrayUnion(userId.value)
    }).then(() => {
      review.likes++;
      review.likedBy.push(userId.value);
    }).catch((error) => {
      console.error('Error liking review: ', error);
    });
  } else {
    updateDoc(reviewRef, {
      likes: review.likes - 1,
      likedBy: arrayRemove(userId.value)
    }).then(() => {
      review.likes--;
      review.likedBy = review.likedBy.filter(id => id !== userId.value);
    }).catch((error) => {
      console.error('Error unliking review: ', error);
    });
  }
};

const goToHome = () => {
  window.location.href = '/home'; // Redirige a la página de inicio
};

const handleAddReview = (newReview) => {
  addDoc(collection(db, 'reviews'), newReview).then((docRef) => {
    newReview.id = docRef.id;
    reviews.value.push(newReview);
    filteredReviews.value = reviews.value;
  }).catch((error) => {
    console.error('Error adding review: ', error);
  });
};

const toggleCommentsModal = (review) => {
  activeReview.value = review;
  showCommentsModal.value = !showCommentsModal.value;
};

const toggleSearchForm = () => {
  showSearchForm.value = !showSearchForm.value;
};

const filterReviews = (criteria) => {
  let filtered = [...reviews.value];

  if (criteria.likes) {
    filtered.sort((a, b) => b.likes - a.likes);
  }

  if (criteria.date) {
    filtered = filtered.filter(review => {
      const reviewDate = new Date(review.date).toISOString().split('T')[0];
      const criteriaDate = new Date(criteria.date).toISOString().split('T')[0];
      return reviewDate === criteriaDate;
    });
  }

  if (criteria.recent) {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (criteria.author) {
    filtered = filtered.filter(review => review.author.toLowerCase().includes(criteria.author.toLowerCase()));
  }

  filteredReviews.value = filtered;
};
</script>

<template>
<div class="foro-container">
  <!-- Imagen del título fija en la parte superior -->
  <div class="title-container">
    <img :src="fotoTitulo" alt="Título" class="title-image" />
  </div>

  <!-- Botones de flecha para volver a la página de inicio, búsqueda y añadir opinión -->
  <div class="button-container">
    <div class="button-group">
      <button @click="goToHome" class="go-home">⬅</button>
      <button @click="toggleSearchForm" class="search-button">🔍</button>
    </div>
    <BotonForo @add-review="handleAddReview" />
  </div>

  <!-- Formulario de búsqueda -->
  <div v-if="showSearchForm" class="search-form">
    <BusquedaForo @filter-reviews="filterReviews" />
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
    <div v-for="(review, index) in filteredReviews" :key="index" class="review">
      <h3>{{ review.title }}</h3>
      <p>{{ review.comment }}</p>
      <p>Likes: {{ review.likes }}</p>
      <p>Autor: {{ review.author }}</p>
      <p>Fecha: {{ review.date }}</p>
      <div class="like-section">
        <span class="like-count">{{ review.likes }}</span>
        <button @click="likeReview(review)" :class="['like-button', { liked: review.likedBy.includes(userId.value) }]" :disabled="!isLoggedIn">
          <span v-if="review.likedBy.includes(userId.value)">❤️</span>
          <span v-else>🤍</span>
        </button>
      </div>
      <button @click="toggleCommentsModal(review)" class="comments-button">Comentarios</button>
    </div>
  </div>

  <!-- Modal de comentarios -->
  <div v-if="showCommentsModal" class="modal-overlay" @click="toggleCommentsModal(null)">
    <div class="modal-content" @click.stop>
      <button @click="toggleCommentsModal(null)" class="close-button">X</button>
      <h3>Comentarios</h3>
      <div v-if="activeReview && activeReview.comments.length > 0">
        <div v-for="(comment, idx) in activeReview.comments" :key="idx" class="comment">
          <p>{{ comment.text }}</p>
          <p><strong>Autor:</strong> {{ comment.author }}</p>
          <p><small>{{ comment.date }}</small></p>
        </div>
      </div>
      <div v-else>
        <p>*Nada por aquí ... Cri Cri Cri*</p>
      </div>
      <input v-model="activeReview.newComment" placeholder="Comentar" class="input" :disabled="!isLoggedIn" />
      <button @click="addComment(activeReview)" class="button" :disabled="!isLoggedIn">Agregar Comentario</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.foro-container {
  background: linear-gradient(
      10deg,
      rgba(150, 15, 15, 0.8),
      rgba(165, 47, 47, 0.8)
    ),
    url('@/assets/FondoPrincipal.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
}

.title-container {
  width: 100%;
  overflow: hidden;
  margin: 0; /* Elimina el margen */
  padding: 0; /* Elimina el padding */
}

.title-image {
  width: 100%;
  height: 10vh; /* Ajusta la altura a la mitad de la pantalla */
  object-fit: cover; /* Asegura que la imagen cubra el contenedor sin distorsionarse */
  display: block;
  margin: 0; /* Elimina el margen */
  padding: 0; /* Elimina el padding */
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.go-home {
  background-color: #830f0f;
  color: #fff;
  border: none;
  padding: 20px; /* Aumenta el tamaño del botón */
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 10px; /* Añade un margen inferior para separar los botones */
}

.search-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 20px; /* Aumenta el tamaño del botón */
  border-radius: 50%;
  cursor: pointer;
}

.add-review {
  background-color: #830f0f;
  color: #fff;
  border: none;
  padding: 20px; /* Aumenta el tamaño del botón */
  border-radius: 50%;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

.review {
  background: url('@/assets/hojacuadernodefinitiva.jpg.png'); /* Ruta a la imagen de fondo de hoja de cuaderno */
  background-size: cover;
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 60%; /* Ajusta el ancho al 60% */
  margin-left: auto;
  margin-right: auto;
}

.review-form {
  margin-top: 20px;
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

.like-section {
  display: flex;
  align-items: center;
  justify-content: center; /* Centra el contenido horizontalmente */
}

.like-count {
  margin-right: 10px;
  font-size: 1.2rem;
  color: #333;
}

.like-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.like-button.liked {
  color: red;
}

.comments-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
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

.comment {
  margin-bottom: 10px;
}

.search-form {
  position: absolute;
  top: 260px; /* Ajusta la posición según sea necesario */
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%; /* Haz el formulario más largo */
  max-width: 1000px; /* Ajusta el ancho máximo */
  z-index: 1000;
}
</style>