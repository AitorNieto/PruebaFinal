
<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useFirebaseAuth, useFirestore } from 'vuefire';
import { collection, doc, setDoc } from 'firebase/firestore';

const UsuarioRe = ref('');
const PasswordRe = ref('');
const RepetirPasswordRe = ref('');
const errorMensaje = ref('');
const buenMensaje = ref('');
const NombreUser = ref('');
const ApellidosUser = ref('');
const EdadUser = ref('');
const SexoUser = ref('');
const UrlAvatar = ref('');

const emit = defineEmits(['cambiarALogin', 'cambiarAHome']); 
const auth = useFirebaseAuth();
const db = useFirestore();

function presioneAceptar() {
  errorMensaje.value = '';
  buenMensaje.value = '';

  if (!UsuarioRe.value || !PasswordRe.value || !RepetirPasswordRe.value || !NombreUser.value || !ApellidosUser.value || !EdadUser.value || !SexoUser.value || !UrlAvatar.value) {
    errorMensaje.value = 'Por favor complete todos los campos.';
    return;
  }

  if (PasswordRe.value !== RepetirPasswordRe.value) {
    errorMensaje.value = 'Las contraseñas no coinciden.';
    return;
  }

  createUserWithEmailAndPassword(auth, UsuarioRe.value, PasswordRe.value)
    .then(registerOK)
    .catch(registerNOK);
}

function registerOK(usuarioRegistrado) {
  buenMensaje.value = 'Registro completado. Verifique su correo electrónico.';
  sendEmailVerification(auth.currentUser);
  crearPerfil();
}

function registerNOK(error) {
  if (error.message.includes('auth/email-already-in-use')) {
    alert('USUARIO YA EXISTE, INTENTA LOGEARTE');
  } else {
    errorMensaje.value = 'FALLA POR: ' + error.message;
  }
}

function crearPerfil() {
  const profileRef = collection(db, '/Profiles');
  const postRef = doc(profileRef, auth.currentUser.uid);
  const perfilData = {
    nombre: NombreUser.value,
    apellidos: ApellidosUser.value,
    edad: EdadUser.value,
    sexo: SexoUser.value,
    avatar: UrlAvatar.value,
  };

  setDoc(postRef, perfilData)
    .then(perfilInsertadoOK)
    .catch(perfilInsertadoNOK);
}

function perfilInsertadoOK() {
  alert('Perfil creado exitosamente.');
  emit('cambiarALogin');
}

function perfilInsertadoNOK(error) {
  errorMensaje.value = 'Error al crear el perfil: ' + error.message;
}

function registrarConGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const userId = user.uid;

      const profileRef = collection(db, '/Profiles');
      const postRef = doc(profileRef, userId);
      const perfilData = {
        nombre: user.displayName || '',
        apellidos: '',
        edad: '',
        sexo: '',
        avatar: user.photoURL || '',
      };

      setDoc(postRef, perfilData, { merge: true })
        .then(() => {
          buenMensaje.value = 'Registro completado con Google.';
          emit('cambiarAHome');
        })
        .catch((error) => {
          errorMensaje.value = 'Error al guardar el perfil en Firestore: ' + error.message;
        });
    })
    .catch((error) => {
      errorMensaje.value = 'Error al iniciar sesión con Google: ' + error.message;
    });
}

function presioneCancelar() {
  emit('cambiarALogin'); 
}
</script>

<template>
  <div class="register-background">
    <div class="register-container">
      <h1 class="register-title">REGISTRO</h1>

      <div class="register-grid">
        <div class="form-left">
          <div class="input-group">
            <i class="icon correo-icon"></i>
            <input v-model="UsuarioRe" type="text" placeholder="Email" />
          </div>

          <div class="input-group">
            <i class="icon lock-icon"></i>
            <input v-model="PasswordRe" type="password" placeholder="Contraseña" />
          </div>

          <div class="input-group">
            <i class="icon lock-icon"></i>
            <input v-model="RepetirPasswordRe" type="password" placeholder="Confirmar Contraseña" />
          </div>

          <div class="register-actions">
            <button class="register-btn" @click="presioneAceptar">Aceptar</button>
            <button class="cancel-btn" @click="presioneCancelar">Cancelar</button>
          </div>
        </div>

        <div class="form-right">
          <div class="input-group">
            <i class="icon user-icon"></i>
            <input v-model="NombreUser" type="text" placeholder="Nombre" />
          </div>

          <div class="input-group">
            <i class="icon user-icon"></i>
            <input v-model="ApellidosUser" type="text" placeholder="Apellidos" />
          </div>

          <div class="input-group">
            <i class="icon user-icon"></i>
            <input v-model="EdadUser" type="number" placeholder="Edad" />
          </div>

          <div class="input-group">
            <i class="icon user-icon"></i>
            <select v-model="SexoUser" class="custom-select">
              <option value="">Sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div class="input-group">
            <i class="icon user-icon"></i>
            <input v-model="UrlAvatar" type="text" placeholder="URL del Avatar" />
          </div>
        </div>
      </div>

      <div class="register-actions">
        <button class="google-btn" @click="registrarConGoogle">Registrarse con Google</button>
      </div>
      <br/>
      <label class="error">{{ errorMensaje }}</label>
      <label class="success">{{ buenMensaje }}</label>
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

.register-background {
  width: 100%;
  height: 100vh;
  background: linear-gradient(10deg, rgba(150, 15, 15, 0.8), rgba(165, 47, 47, 0.8)),
    url('@/assets/Fondo.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-container {
  background: rgba(180, 50, 50, 0.8);
  width: 720px;
  padding: 24px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.register-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

.register-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-left, .form-right {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 16px;
  position: relative;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 30px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
}

.user-icon::before {
  content: '👤';
}

.lock-icon::before {
  content: '🔒';
}
.correo-icon::before {
  content: '✉️';
}


.register-btn,
.cancel-btn,
.google-btn {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-btn {
  background: linear-gradient(90deg, #56ccf2, #2f80ed);
}

.register-btn:hover {
  background: linear-gradient(90deg, #2f80ed, #56ccf2);
}

.cancel-btn {
  background: linear-gradient(90deg, #424181, #3053f0);
}

.cancel-btn:hover {
  background: linear-gradient(90deg, #3053f0,#424181);
}

.google-btn {
  background: linear-gradient(90deg, #28c3ce,#18959e);
}

.google-btn:hover {
  background: linear-gradient(90deg, #18959e,#28c3ce);
}

.register-actions {
  margin-top: 16px;
}

.error {
  color: rgb(255, 0, 0);
}

.success {
  color: rgb(102, 255, 0);
}
</style>
