<template>
  <div class="form-container">
    <h2 @click="toggleOpen" class="form-title" :class="{ clickable: !open }">
      Contáctanos
    </h2>
    <transition name="form-expand">
      <form
        v-show="open"
        ref="form"
        @submit.prevent="sendEmail"
        class="expand-form"
      >
        <div class="form-group">
          <label for="tipo_consulta">Tipo de consulta</label>
          <select name="tipo_consulta" id="tipo_consulta" v-model="formData.tipo_consulta" required>
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="General">General</option>
            <option value="Soporte">Soporte</option>
            <option value="Presupuesto">Presupuesto</option>
          </select>
        </div>

        <div class="form-group">
          <label for="from_name">Nombre</label>
          <input type="text" name="from_name" id="from_name" v-model="formData.from_name" required placeholder="Tu nombre" />
        </div>

        <div class="form-group">
          <label for="from_email">Email</label>
          <input type="email" name="from_email" id="from_email" v-model="formData.from_email" required placeholder="tucorreo@email.com" />
        </div>

        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea name="message" id="message" rows="5" v-model="formData.message" required placeholder="Escribe tu mensaje..."></textarea>
        </div>

        <input type="hidden" name="date" :value="currentDate" />

        <button type="submit" :disabled="loading">
          <span v-if="!loading">Enviar mensaje</span>
          <span v-else class="loading">Enviando...</span>
        </button>

        <div v-if="sent" class="notification success">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <p>¡Mensaje enviado con éxito!</p>
        </div>
        <div v-if="error" class="notification error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          <p>Ocurrió un error al enviar. Inténtalo de nuevo.</p>
        </div>
      </form>
    </transition>
    <button v-if="!open" class="open-form-btn" @click="toggleOpen">Escribir mensaje</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref(null)
const sent = ref(false)
const error = ref(false)
const loading = ref(false)
const open = ref(false)

const currentDate = new Date().toLocaleString()

const formData = reactive({
  tipo_consulta: '',
  from_name: '',
  from_email: '',
  message: ''
})

const toggleOpen = () => {
  open.value = !open.value
}

const sendEmail = () => {
  loading.value = true
  sent.value = false
  error.value = false

  emailjs
    .sendForm(
      'service_4nwf7rl',   // Sustituye con tu Service ID
      'template_dfp94b5',  // Sustituye con tu Template ID
      form.value,
      'e183AsU3CUzEW5Mce'  // Sustituye con tu Public Key
    )
    .then(() => {
      sent.value = true
      form.value.reset()
      Object.keys(formData).forEach(key => { formData[key] = '' })
    })
    .catch(() => {
      error.value = true
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: box-shadow 0.3s;
}

.form-title {
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-size: 1.7rem;
  color: #2c3e50;
  font-weight: 700;
  transition: color 0.2s;
}
.form-title.clickable:hover {
  color: #3498db;
}

.open-form-btn {
  margin: 1.2rem auto 0 auto;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  padding: 0.8rem 2.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s, transform 0.2s;
  display: block;
}
.open-form-btn:hover {
  background: linear-gradient(135deg, #2980b9, #3498db);
  transform: translateY(-2px) scale(1.04);
}

.expand-form {
  margin-top: 1.2rem;
}

.form-expand-enter-active,
.form-expand-leave-active {
  transition: max-height 0.5s cubic-bezier(.4,2,.6,1), opacity 0.5s;
  overflow: hidden;
}
.form-expand-enter-from,
.form-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.form-expand-enter-to,
.form-expand-leave-from {
  max-height: 2000px;
  opacity: 1;
}

/* Resto de tus estilos existentes... */
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: #34495e;
  font-size: 0.95rem;
}
input,
select,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background-color: white;
}
textarea {
  min-height: 150px;
  resize: vertical;
}
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}
button[type="submit"] {
  width: 100%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
button[type="submit"]:hover {
  background: linear-gradient(135deg, #2980b9, #3498db);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(41, 128, 185, 0.3);
}
button[type="submit"]:active {
  transform: translateY(0);
}
button[type="submit"]:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none !important;
}
.loading {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.loading::after {
  content: "";
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.notification {
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}
.notification svg {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}
.success {
  background-color: rgba(46, 204, 113, 0.1);
  color: #27ae60;
}
.success svg {
  fill: #27ae60;
}
.error {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}
.error svg {
  fill: #e74c3c;
}
@media (max-width: 640px) {
  .form-container {
    padding: 1.5rem;
    margin: 1rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>