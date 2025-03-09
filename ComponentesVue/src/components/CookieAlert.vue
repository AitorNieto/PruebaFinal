<template>
  <div class="cookie-alert" v-if="visible">
    <p>Este sitio web utiliza cookies para mejorar su experiencia. ¿Acepta el uso de cookies?</p>
    <button @click="acceptCookies">Aceptar</button>
    <button @click="declineCookies">Cancelar</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore, useFirebaseAuth } from 'vuefire';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const visible = ref(true);
const db = useFirestore();
const auth = useFirebaseAuth();

async function checkCookieConsent() {
  if (!auth.currentUser) {
    const localConsent = localStorage.getItem('cookieConsent');
    if (localConsent) {
      visible.value = false;
    }
    return;
  }

  const docRef = doc(db, `Profiles/${auth.currentUser.uid}/Settings/CookieConsent`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.cookiesAccepted) {
      visible.value = false;
    }
  }
}

async function acceptCookies() {
  if (!auth.currentUser) {
    localStorage.setItem('cookieConsent', 'accepted');
    console.log("Cookies aceptadas (sin autenticación)");
    visible.value = false;
    return;
  }

  const docRef = doc(db, `Profiles/${auth.currentUser.uid}/Settings/CookieConsent`);
  await setDoc(docRef, { cookiesAccepted: true }, { merge: true });
  console.log("Cookies aceptadas");
  visible.value = false;
}

async function declineCookies() {
  if (!auth.currentUser) {
    localStorage.setItem('cookieConsent', 'declined');
    console.log("Cookies rechazadas (sin autenticación)");
    visible.value = false;
    return;
  }

  const docRef = doc(db, `Profiles/${auth.currentUser.uid}/Settings/CookieConsent`);
  await setDoc(docRef, { cookiesAccepted: false }, { merge: true });
  console.log("Cookies rechazadas");
  visible.value = false;
}

onMounted(() => {
  checkCookieConsent();
});
</script>

<style scoped>
.cookie-alert {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  text-align: center;
  z-index: 1000;
}

.cookie-alert button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ffd700;
  border: none;
  cursor: pointer;
  color: black;
  font-weight: bold;
}

.cookie-alert button:hover {
  background-color: #ff4500;
}
</style>