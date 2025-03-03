<template>
  <div class="cookie-alert" v-if="visible">
    <p>Este sitio web utiliza cookies para mejorar su experiencia. ¿Acepta el uso de cookies?</p>
    <button @click="acceptCookies">Aceptar</button>
    <button @click="declineCookies">Cancelar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);

function acceptCookies() {
  console.log("Cookies aceptadas");
  visible.value = false;
}

function declineCookies() {
  console.log("Cookies rechazadas");
  visible.value = false;
}
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