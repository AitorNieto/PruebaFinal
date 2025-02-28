<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore, useFirebaseAuth } from 'vuefire';
import { doc, getDoc } from 'firebase/firestore';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';

const userProfile = ref({});
const userEmail = ref('');
const savedAccounts = ref([]); 
const mostrarCuentas = ref(false); 
const db = useFirestore();
const auth = useFirebaseAuth();

function obtenerPerfil() {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const perfilRef = doc(db, `Profiles/${userId}`);
    getDoc(perfilRef)
      .then((perfilSnap) => {
        if (perfilSnap.exists()) {
          userProfile.value = perfilSnap.data();
          userEmail.value = auth.currentUser.email;
        } else {
          console.error('Perfil no encontrado.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener el perfil:', error.message);
      });
  }
}

function desloguearUsuario() {
  signOut(auth)
    .then(() => {
      alert('Se ha cerrado sesión correctamente.');
      window.location.href = '/'; 
    })
    .catch((error) => {
      console.error('Error al cerrar sesión:', error.message);
    });
}

function guardarCuenta(email) {
  let cuentas = JSON.parse(localStorage.getItem('savedAccounts')) || [];
  if (!cuentas.includes(email)) {
    cuentas.push(email);
    localStorage.setItem('savedAccounts', JSON.stringify(cuentas));
  }
}

function cargarCuentasGuardadas() {
  const cuentas = JSON.parse(localStorage.getItem('savedAccounts')) || [];
  savedAccounts.value = cuentas;
}

function cambiarCuenta(email) {
  const password = prompt(`Introduce la contraseña para ${email}:`);
  if (password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert(`Has cambiado a la cuenta: ${email}`);
        obtenerPerfil();
      })
      .catch((error) => {
        console.error('Error al cambiar de cuenta:', error.message);
        alert('Error al cambiar de cuenta: Verifica la contraseña.');
      });
  }
}

onMounted(() => {
  obtenerPerfil();
  cargarCuentasGuardadas();

  if (auth.currentUser?.email) {
    guardarCuenta(auth.currentUser.email);
  }
});
</script>

<template>
  <div class="perfil-background">
    <div class="perfil-container">
      <div class="perfil-avatar-container">
        <img :src="userProfile.avatar" alt="Avatar del usuario" class="perfil-avatar" v-if="userProfile.avatar" />
      </div>
      <div class="perfil-info">
        <h1 class="perfil-title">Perfil del Usuario</h1>
        <div v-if="userProfile" class="Formulario">
          <p><strong>Nombre:</strong> {{ userProfile.nombre }}</p>
          <p><strong>Apellidos:</strong> {{ userProfile.apellidos }}</p>
          <p><strong>Edad:</strong> {{ userProfile.edad }}</p>
          <p><strong>Sexo:</strong> {{ userProfile.sexo }}</p>
          <p><strong>Correo Electrónico:</strong> {{ userEmail }}</p>
        </div>
        <button class="perfil-logout-btn" @click="desloguearUsuario">Cerrar Sesión</button>

        <h2 class="perfil-switch-title">Cambiar de Cuenta</h2>
        <div class="perfil-toggle-accounts-container">
          <button class="perfil-toggle-accounts-btn" @click="mostrarCuentas = !mostrarCuentas">
            {{ mostrarCuentas ? 'Ocultar Cuentas' : 'Mostrar Cuentas' }}
          </button>

          <div v-if="mostrarCuentas" class="cuentas">
            <div v-if="savedAccounts.length > 0">
              <p>Selecciona una cuenta para cambiar:</p>
              <ul class="perfil-accounts-list">
                <li v-for="email in savedAccounts" :key="email">
                  <button class="perfil-account-btn" @click="cambiarCuenta(email)">
                    {{ email }}
                  </button>
                </li>
              </ul>
            </div>
            <div v-else>
              <p>No hay cuentas guardadas. Por favor, inicia sesión con una nueva cuenta.</p>
            </div>
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

.perfil-background {
  width: 100%;
  height: 100vh;
  background: linear-gradient(10deg, rgba(16, 77, 107, 0.8), rgba(10, 75, 99, 0.8)),
    url('@https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvSd6-0-X6oKvvOX6OoxNgatOXWbbLBvdVjA&s') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.perfil-container {
  background: rgba(65, 141, 168, 0.8);
  width: 80%;
  max-width: 900px;
  display: flex;
  padding: 24px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: left;
}

.perfil-avatar-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.perfil-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.perfil-info {
  flex: 2;
  padding: 10px;
}

.perfil-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

.perfil-logout-btn,
.perfil-account-btn,
.perfil-toggle-accounts-btn {
  margin-top: 20px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.perfil-logout-btn {
  background-color: #ff4d4d;
}

.perfil-logout-btn:hover {
  background-color: #ff1a1a;
}

.perfil-account-btn {
  background-color: #348ff7;
  margin: 5px;
}

.perfil-account-btn:hover {
  background-color: #07305e;
}

.perfil-toggle-accounts-btn {
  background-color: #007bff;
}

.perfil-toggle-accounts-btn:hover {
  background-color: #0056b3;
}

.perfil-accounts-list {
  list-style: none;
  padding: 0;
}

.perfil-switch-title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 30px;
}

.perfil-switch-title,
.perfil-title {
  margin-top: 30px;
}

.Formulario {
  color: white;
}

.cuentas {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  background-color: rgba(65, 141, 168, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 10;
  margin-left: 10px;
  color:white
}

.cuentas p {
  margin: 10px 0;
}

.perfil-accounts-list {
  margin-top: 10px;
}

.perfil-accounts-list li {
  margin-bottom: 10px;
}

.perfil-toggle-accounts-container {
  display: inline-block;
  position: relative;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .perfil-container {
    flex-direction: column;
    width: 90%;
    padding: 16px;
  }

  .perfil-avatar-container {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .perfil-avatar {
    width: 100px;
    height: 100px;
  }

  .perfil-info {
    padding: 0;
  }

  .perfil-title {
    font-size: 20px;
  }

  .perfil-logout-btn,
  .perfil-account-btn,
  .perfil-toggle-accounts-btn {
    padding: 8px 16px;
    font-size: 14px;
  }

  .cuentas {
    position: static;
    transform: none;
    margin-left: 0;
    margin-top: 20px;
  }
}
</style>