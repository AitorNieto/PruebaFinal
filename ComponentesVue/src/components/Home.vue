<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore, useFirebaseAuth } from 'vuefire';
import { doc, getDocs, collection, addDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const Posts = ref([]);
const NuevoTitulo = ref('');
const NuevoCuerpo = ref('');
const NuevoEstado = ref('pending');
const NombreBotonAgregar = ref('Agregar');
const EditandoPostId = ref(null); 

const db = useFirestore();
const auth = useFirebaseAuth();

function agregarPost() {
  if (EditandoPostId.value) {
    editarPost();
  } else {
    const datosNuevoPost = {
      title: NuevoTitulo.value,
      body: NuevoCuerpo.value,
      status: NuevoEstado.value
    };
    const collectionRefPosts = collection(db, `Profiles/${auth.currentUser.uid}/Posts`);
    addDoc(collectionRefPosts, datosNuevoPost)
      .then(postInsertadoOK)
      .catch(postInsertadoNOK);
  }
}

function editarPost() {
  const postRef = doc(db, `Profiles/${auth.currentUser.uid}/Posts`, EditandoPostId.value);
  updateDoc(postRef, {
    title: NuevoTitulo.value,
    body: NuevoCuerpo.value,
    status: NuevoEstado.value,
  })
    .then(() => {
      alert("Post actualizado correctamente");
      limpiarFormulario();
      EditandoPostId.value = null;
    })
    .catch((error) => {
      console.error("Error al actualizar el post:", error);
    });
}

function postInsertadoOK(nuevoPostRef) {
  alert(`SE HA INSERTADO CORRECTAMENTE ${nuevoPostRef.id}`);
  limpiarFormulario();
}

function postInsertadoNOK(error) {
  console.error('Error al insertar el post:', error);
}

function limpiarFormulario() {
  NuevoTitulo.value = '';
  NuevoCuerpo.value = '';
  NuevoEstado.value = 'pending';
  NombreBotonAgregar.value = 'Agregar';
  EditandoPostId.value = null;
}

function descargarPosts() {
  const collectionRef = collection(db, `Profiles/${auth.currentUser.uid}/Posts`);
  onSnapshot(collectionRef, (snapshot) => {
    Posts.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
}

function prepararEdicion(post) {
  NuevoTitulo.value = post.title;
  NuevoCuerpo.value = post.body;
  NuevoEstado.value = post.status;
  NombreBotonAgregar.value = 'Actualizar';
  EditandoPostId.value = post.id;
}

function cambiarEstado(post) {
  const nuevoEstado = post.status === 'pending' ? 'completed' : 'pending';
  const postRef = doc(db, `Profiles/${auth.currentUser.uid}/Posts`, post.id);
  updateDoc(postRef, { status: nuevoEstado })
    .then(() => {
      alert("Estado cambiado correctamente");
    })
    .catch((error) => {
      console.error("Error al cambiar el estado:", error);
    });
}

function eliminarTarea(post) {
  const postRef = doc(db, `Profiles/${auth.currentUser.uid}/Posts`, post.id);
  deleteDoc(postRef)
    .then(() => {
      alert('Tarea eliminada correctamente');
    })
    .catch((error) => {
      console.error('Error al eliminar la tarea:', error);
    });
}

onMounted(() => {
  descargarPosts();
});
</script>

<template>
  <div class="background">
    <div class="container">
      <h1 class="title">Gestión de Viajes</h1>

      <div class="form-container">
        <input v-model="NuevoTitulo" placeholder="Destino" class="input" />
        <textarea v-model="NuevoCuerpo" placeholder="Descripción del viaje" class="textarea"></textarea>
        <select v-model="NuevoEstado" class="select">
          <option value="pending">Pendiente</option>
          <option value="completed">Completada</option>
        </select>
        <button @click="agregarPost" class="button primary">{{ NombreBotonAgregar }}</button>
      </div>

      <div class="posts-container">
        <div 
          v-for="(post, index) in Posts" 
          :key="post.id" 
          class="post-card" 
          :class="{ completed: post.status === 'completed', pending: post.status === 'pending' }"
        >
          <div class="post-header">
            <h2>{{ post.title }}</h2>
            <span class="status-icon">
              <span v-if="post.status === 'pending'">⏳</span>
              <span v-else>✔️</span>
            </span>
          </div>
          <p>{{ post.body }}</p>
          <div class="buttons">
            <button @click="cambiarEstado(post)" class="button secondary">
              Cambiar a {{ post.status === 'pending' ? 'Completada' : 'Pendiente' }}
            </button>
            <button @click="prepararEdicion(post)" class="button">Editar</button>
            <button @click="eliminarTarea(post)" class="button danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(10deg, rgba(16, 77, 107, 0.8), rgba(10, 75, 99, 0.8)),
    url('@/assets/Imagen.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: rgba(65, 141, 168, 0.8);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.title {
  font-size: 2rem;
  color: white;
  margin-bottom: 16px;
  margin-top: 80px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.input,
.textarea,
.select {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 30px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
}

.textarea {
  resize: none;
}

.button {
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  background-color: #1d72c2;
  color: white;
}

.button.primary {
  background-color: #007bff;
  color: white;
}

.button.primary:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.button.secondary {
  background-color: #5bc0de; 
  color: white;
}

.button.secondary:hover {
  background-color: #00a3cc; 
  transform: scale(1.05); 
}

.button.danger {
  background-color: #dc3545;
  color: white;
}

.button.danger:hover {
  background-color: #a5101f; 
  transform: scale(1.05); 
}

.button.edit {
  background-color: #17a2b8;
  color: white;
}

.button.edit:hover {
  background-color: #138496; 
  transform: scale(1.05); 
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post-card {
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;
  background: rgba(173, 216, 230, 0.8);
  color: #333;
}

.post-card:hover {
  transform: scale(1.03);
}

.post-card.completed {
  background: rgba(144, 238, 144, 0.9);
}

.post-card.pending {
  background: rgba(173, 216, 230, 0.8);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-icon {
  font-size: 1.5rem;
  color: #555;
}

.buttons {
  display: flex;
  gap: 10px;
}

.buttons button:hover {
  background-color: #271396;
  transform: scale(1.05);
}

</style>