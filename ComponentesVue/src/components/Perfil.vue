<template>
  <div class="perfil-container" :class="{ 'blurred': editingImage }">
    <button @click="navigateHome" class="back-button">
      <i class="fas fa-arrow-left"></i>
    </button>
    
    <div class="perfil-card">
      <div class="perfil-banner">
        <div class="banner-overlay"></div>
      </div>
      <div class="perfil-content">
        <div class="perfil-header">
          <div class="perfil-image-container" @click="openImageEditor">
            <img 
              :src="perfil.profileImageUrl || defaultImage" 
              alt="Imagen de perfil" 
              class="perfil-image"
              @error="handleImageError" 
            />
            <div class="image-overlay">
              <i class="fas fa-camera"></i>
            </div>
          </div>
          <h2>{{ perfil.username || 'Tu nombre aquí' }}</h2>
          <div class="user-stats">
            <div class="stat">
              <i class="fas fa-birthday-cake"></i>
              <span>{{ perfil.edad || '0' }} años</span>
            </div>
            <div class="stat">
              <i class="fas fa-venus-mars"></i>
              <span>{{ perfil.genero || 'No especificado' }}</span>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="perfil-form">
          <div class="form-group">
            <label for="nombre">
              <i class="fas fa-user"></i>
              <span>Nombre</span>
            </label>
            <input v-model="perfil.username" type="text" id="nombre" required />
          </div>

          <div class="form-group">
            <label for="edad">
              <i class="fas fa-birthday-cake"></i>
              <span>Edad</span>
            </label>
            <input v-model.number="perfil.edad" type="number" id="edad" required min="0" />
          </div>

          <div class="form-group">
            <label for="genero">
              <i class="fas fa-venus-mars"></i>
              <span>Género</span>
            </label>
            <select v-model="perfil.genero" id="genero" required>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="prefiero no decirlo">Prefiero no decirlo</option>
            </select>
          </div>

          <button type="submit" class="save-button">
            <i class="fas fa-save"></i>
            Guardar Perfil
          </button>
          
          <button type="button" @click="cerrarSesion" class="logout-button">
            <i class="fas fa-sign-out-alt"></i>
            Cerrar Sesión
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal para actualizar la URL de la imagen -->
  <div v-if="editingImage" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>
          <i class="fas fa-camera"></i>
          Actualizar Foto de Perfil
        </h3>
        <button @click="closeImageEditor" class="close-button">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-content">
        <div class="url-input-container">
          <i class="fas fa-link input-icon"></i>
          <input 
            v-model="tempImageUrl" 
            type="url" 
            placeholder="Introduce la URL de tu imagen..."
            class="styled-input"
          />
        </div>
        <button @click="updateProfileImage" class="accept-button">
          <i class="fas fa-check"></i>
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase';
import '@fortawesome/fontawesome-free/css/all.css';

const emit = defineEmits(['navigate', 'profileSaved']);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const defaultImage = new URL('@/assets/avatar-default.png', import.meta.url).href;

const perfil = ref({ username: '', edad: '', genero: '', profileImageUrl: '' });
const editingImage = ref(false);
const tempImageUrl = ref('');

// Computed para el src del avatar, reactivo a los cambios
const avatarSrc = computed(() => {
  return perfil.value.profileImageUrl || defaultImage;
});

const fetchPerfil = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const userId = user.uid;
    const docRef = doc(db, 'Profiles', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      perfil.value = docSnap.data();
      localStorage.setItem('userProfileImage', perfil.value.profileImageUrl);
    } else {
      perfil.value.username = user.displayName || '';
      perfil.value.profileImageUrl = user.photoURL || defaultImage;
    }
  } catch (error) {
    console.error('Error al recuperar el perfil:', error);
  }
};

const updateProfileImage = async () => {
  try {
    if (!tempImageUrl.value) {
      alert('Por favor, introduce una URL válida');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('Debes estar autenticado para realizar esta acción');
      return;
    }
    
    // Validar la URL (acepta png, jpg, jpeg, gif, webp)
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!urlPattern.test(tempImageUrl.value)) {
      alert('Introduce una URL de imagen válida (png, jpg, jpeg, gif, webp)');
      return;
    }
    
    // Actualizamos el objeto reactivo
    perfil.value.profileImageUrl = tempImageUrl.value;
    // Forzamos la actualización (aunque en Vue 3 debería ser reactivo)
    perfil.value = { ...perfil.value };

    await setDoc(doc(db, 'Profiles', user.uid), { ...perfil.value }, { merge: true });
    localStorage.setItem('userProfileImage', perfil.value.profileImageUrl);
    closeImageEditor();
    tempImageUrl.value = '';
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    alert('Error al actualizar la imagen. Por favor, intenta de nuevo.');
  }
};

const handleSubmit = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert('Debes estar autenticado para guardar el perfil');
      return;
    }
    
    if (!perfil.value.username.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }

    const profileData = {
      ...perfil.value,
      lastUpdated: new Date().toISOString()
    };

    await setDoc(doc(db, 'Profiles', user.uid), profileData);
    localStorage.setItem('userProfileImage', perfil.value.profileImageUrl);
    alert('Perfil actualizado correctamente');
    emit('profileSaved', true);
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    alert('Error al guardar el perfil. Por favor, intenta de nuevo.');
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

onMounted(fetchPerfil);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;1,300&display=swap');

/* Fondo y contenedor principal */
.perfil-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #2a0808 0%, #4a0d0d 100%);
  font-family: 'Poppins', sans-serif;
  position: relative;
  transition: filter 0.3s ease;
}

/* Blur cuando aparece el modal */
.blurred {
  filter: blur(5px);
}

/* Tarjeta del perfil */
.perfil-card {
  background: rgba(94, 32, 32, 0.95);
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Banner animado */
.perfil-banner {
  height: 200px;
  background: linear-gradient(-45deg, #881919, #a32b2b, #4a0d0d, #2a0808);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  position: relative;
}
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
}

/* Contenido del perfil */
.perfil-content {
  padding: 40px;
  margin-top: -100px;
  position: relative;
}

/* Estilos del avatar */
.perfil-image-container {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #881919;
  box-shadow: 0 0 20px rgba(136, 25, 25, 0.5);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  background: #2a0808; /* Fondo oscuro para cuando la imagen está cargando */
}

.perfil-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Esto asegura que la imagen cubra todo el espacio */
  object-position: center; /* Centra la imagen */
  transition: transform 0.3s ease;
}

.perfil-image-container:hover .perfil-image {
  transform: scale(1.1); /* Efecto zoom suave al hover */
}
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.perfil-image-container:hover .image-overlay {
  opacity: 1;
}
.image-overlay i {
  color: white;
  font-size: 2rem;
}

/* Estilos de User Stats y formulario */
.user-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
}
.stat {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #dfb8b8;
}
.stat i {
  font-size: 1.2rem;
}
h2 {
  color: #ffffff;
  font-size: 2rem;
  margin: 20px 0;
  text-align: center;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #dfb8b8;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(94, 32, 32, 0.95);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 12px) center;
  padding-right: 35px;
}

select:focus {
  background-color: rgba(124, 7, 7, 0.95);
  border-color: #881919;
  outline: none;
}

select option {
  background: rgba(94, 32, 32, 0.95);
  color: #ffffff;
  padding: 12px;
}

select:hover {
  background-color: rgba(124, 7, 7, 0.95);
}
.save-button, .logout-button {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}
.save-button {
  background: linear-gradient(45deg, #881919, #a32b2b);
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;
  color: white;
}
.logout-button {
  background: rgba(136, 25, 25, 0.2);
  color: #dfb8b8;
}
.save-button:hover, .logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(136, 25, 25, 0.2);
  color: white;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: rgba(94, 32, 32, 0.95);
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: modalAppear 0.3s ease;
}
@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.close-button {
  background: none;
  border: none;
  color: #dfb8b8;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
}
.close-button:hover {
  color: white;
  transform: rotate(90deg);
}
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}
/* Contenedor del input URL */
.url-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 15px;
  border-radius: 5px;
  width: 100%;
}
.input-icon {
  color: #ffffff;
  font-size: 1.2rem;
}
.styled-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  padding: 5px;
}
.accept-button {
  background: linear-gradient(45deg, #881919, #a32b2b);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}
.accept-button:hover {
  background: #a32b2b;
}

/* Responsividad */
@media (max-width: 768px) {
  .perfil-content {
    padding: 20px;
  }
  .user-stats {
    flex-direction: column;
    gap: 15px;
  }
  h2 {
    font-size: 1.5rem;
  }
  .perfil-banner {
    height: 150px;
  }
}
</style>
