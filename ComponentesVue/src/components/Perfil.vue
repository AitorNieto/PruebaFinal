<template>
  <div class="perfil-container" :class="{ 'blurred': editingImage }">
    <button @click="navigateHome" class="back-button">⬅️</button>
    <div class="perfil-card">
      <div class="perfil-header">
        <div class="perfil-image-container" @click="openImageEditor">
          <img :src="perfil.profileImageUrl || defaultImage" alt="Imagen de perfil" class="perfil-image" />
        </div>
        <h2>{{ perfil.username || 'Tu nombre aquí' }}</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="perfil-form">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input v-model="perfil.username" type="text" id="nombre" required />
        </div>

        <div class="form-group">
          <label for="edad">Edad</label>
          <input v-model.number="perfil.edad" type="number" id="edad" required min="0" />
        </div>

        <div class="form-group">
          <label for="genero">Género</label>
          <select v-model="perfil.genero" id="genero" required>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="prefiero no decirlo">Prefiero no decirlo</option>
          </select>
        </div>

        <button type="submit">Guardar Perfil</button>
        <br /><br />
        <button type="button" @click="cerrarSesion">Cerrar Sesión</button>
      </form>
    </div>
  </div>

  <div v-if="editingImage" class="modal-overlay">
    <div class="modal">
      <button @click="closeImageEditor" class="close-button">✖</button>
      <h3>Cambiar Imagen de Perfil</h3>
      <input v-model="tempImageUrl" type="url" placeholder="Introduce la URL de tu imagen" />
      <button @click="updateProfileImage">Aceptar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase';

const emit = defineEmits(['navigate', 'profileSaved']);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const defaultImage = '/assets/avatar-default.png';
const perfil = ref({ username: '', edad: '', genero: '', profileImageUrl: '' });
const editingImage = ref(false);
const tempImageUrl = ref('');

const fetchPerfil = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const userId = user.uid;
    const docRef = doc(db, 'Profiles', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      perfil.value = docSnap.data();
    } else {
      perfil.value.username = user.displayName || '';
      perfil.value.profileImageUrl = user.photoURL || defaultImage;
    }
  } catch (error) {
    console.error('Error al recuperar el perfil:', error);
  }
};

const handleSubmit = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const userId = user.uid;
    await setDoc(doc(db, 'Profiles', userId), perfil.value);
    alert('Perfil actualizado correctamente.');
    emit('profileSaved', true);
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
  }
};

const cerrarSesion = async () => {
  try {
    await signOut(auth);
    emit('navigate', 'home');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const navigateHome = () => {
  emit('navigate', 'home');
};

const openImageEditor = () => {
  tempImageUrl.value = perfil.value.profileImageUrl;
  editingImage.value = true;
};

const closeImageEditor = () => {
  editingImage.value = false;
};

const updateProfileImage = () => {
  perfil.value.profileImageUrl = tempImageUrl.value;
  closeImageEditor();
};

onMounted(fetchPerfil);
</script>

<style scoped>
/* Fondo animado de dragones */
.perfil-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  min-height: 100vh;
  font-family: 'Cinzel', serif;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  position: relative;
  background: url('https://www.wallpapertip.com/wmimgs/4-47465_dragon-gif-background-animated.gif') no-repeat center center fixed;
  background-size: cover;
  animation: dragon-fly 10s infinite linear;
}

@keyframes dragon-fly {
  0% { background-position: 0 0; }
  100% { background-position: -3000px 0; }
}

.perfil-card {
  background: rgb(94, 32, 32);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  margin-top: 50px;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 10;
}

.perfil-header {
  text-align: center;
  margin-bottom: 20px;
}

.perfil-image-container {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #881919;
  box-shadow: 0 0 15px #881919, 0 0 30px #881919;
  cursor: pointer;
}

.perfil-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2 {
  font-size: 2.5rem;
  margin-top: 15px;
  color: #dfb8b8;
  font-family: 'Cinzel', serif;
  text-transform: uppercase;
  letter-spacing: 5px;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.6);
}

.perfil-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 1.4rem;
  font-weight: bold;
  color: #dfb8b8;
  display: block;
  margin-bottom: 10px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}

input,
select {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  background-color: #e7d8d8;
  color: #881919;
  margin-bottom: 12px;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 15px #881919;
}

input:focus,
select:focus {
  background-color: #7a6a6a;
  outline: none;
}

button {
  background-color: #881919;
  color: white;
  padding: 14px;
  font-size: 1.3rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 15px #881919;
}

button:hover {
  background-color: #881919;
  transform: scale(1.05);
}

button:focus {
  outline: none;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
}

.blurred {
  filter: blur(5px);
  transition: filter 0.3s ease;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal {
  background: #5e2020;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 15px #881919;
}

.modal h3 {
  color: #dfb8b8;
  margin-bottom: 15px;
}

.modal input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: none;
  background: #e7d8d8;
  color: black;
}

.modal button {
  background-color: #881919;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s ease;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
}

.close-button:hover {
  color: #dfb8b8;
}

.modal button:hover {
  background-color: #a32b2b;
}
</style>
