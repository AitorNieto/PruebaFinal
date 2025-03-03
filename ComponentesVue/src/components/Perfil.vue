<template>
  <div class="perfil-container">
    <div class="perfil-card">
      <div class="perfil-header">
        <div class="perfil-image-container">
          <img :src="perfil.profileImageUrl" alt="Imagen de perfil" class="perfil-image" />
        </div>
        <h2>{{ perfil.username }}</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="perfil-form">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input v-model="perfil.username" type="text" id="nombre" placeholder="Escribe tu nombre" required />
        </div>

        <div class="form-group">
          <label for="edad">Edad</label>
          <input v-model.number="perfil.edad" type="number" id="edad" placeholder="Introduce tu edad" required min="0" />
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
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { firebaseApp } from '../firebase';

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const realtimeDb = getDatabase(firebaseApp);

const perfil = ref({
  username: '',
  email: '',
  edad: '',
  genero: '',
  profileImageUrl: '',
});

const fetchPerfil = async () => {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;

    const docRef = doc(db, 'perfiles', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      Object.assign(perfil.value, docSnap.data());
    } else {
      console.log("No such document!");
    }

    const imageRef = dbRef(realtimeDb, 'profileImages/' + userId);
    const imageSnap = await get(imageRef);

    if (imageSnap.exists()) {
      perfil.value.profileImageUrl = imageSnap.val().profileImageUrl;
    } else {
      console.log("No such image!");
    }
  }
};

const handleSubmit = async () => {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;

    await updateDoc(doc(db, 'perfiles', userId), {
      username: perfil.value.username,
      edad: perfil.value.edad,
      genero: perfil.value.genero,
    });

    await set(dbRef(realtimeDb, 'profileImages/' + userId), {
      profileImageUrl: perfil.value.profileImageUrl
    });

    console.log('Perfil actualizado');
  }
};

onMounted(fetchPerfil);
</script>

<style scoped>
/* Fondo animado de dragones */
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: url('https://example.com/dragon-background.gif') no-repeat center center fixed;
  background-size: cover;
  animation: dragon-fly 10s infinite linear;
}

@keyframes dragon-fly {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -3000px 0;
  }
}

.perfil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Cinzel', serif;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.perfil-card {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
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
  border: 5px solid #ffcc00;
  box-shadow: 0 0 15px #ffcc00, 0 0 30px #ffcc00;
}

.perfil-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

h2 {
  font-size: 2.5rem;
  margin-top: 15px;
  color: #ffcc00;
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
  color: #ffcc00;
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
  background-color: #333;
  color: #fff;
  margin-bottom: 12px;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 15px #ffcc00;
}

input:focus,
select:focus {
  background-color: #444;
  outline: none;
}

button {
  background-color: #ffcc00;
  color: white;
  padding: 14px;
  font-size: 1.3rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 15px #ffcc00;
}

button:hover {
  background-color: #ffb900;
  transform: scale(1.05);
}

button:focus {
  outline: none;
}
</style>
