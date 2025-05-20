<template>
  <!-- Botón fijo arriba a la izquierda -->
  <button class="fancy-button back-button-fixed" @click="goBack">
    <i class="fas fa-arrow-left"></i>
    <span>Volver al Inicio</span>
    <div class="button-glow"></div>
  </button>

  <div class="foro-container">
    <!-- Contenido nuevo del foro -->
    <div class="forum-content">
      <!-- Tema semanal -->
      <div class="weekly-topic">
        <h2>📌 Tema de la semana {{ currentWeek }}:</h2>
        <p class="topic-text">{{ currentTopic }}</p>
        <small>💡 ¿Qué opinas?</small>
      </div>

      <!-- Comentarios -->
      <div class="comments">
        <div 
          v-for="comment in sortedComments" 
          :key="comment.id" 
          :class="['comment', { 'reply': comment.isReply }]"
        >
          <div class="comment-header">
            <span class="user-name">{{ comment.userName || comment.userEmail }}</span>
            <span class="comment-date">{{ formatDate(comment.date) }}</span>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
          <button 
            v-if="!comment.isReply && isAuthenticated" 
            @click="toggleReply(comment.id)"
            class="reply-button"
          >
            Responder
          </button>

          <!-- Formulario de respuesta -->
          <div v-if="activeReply === comment.id" class="reply-form">
            <textarea v-model="replyText" placeholder="Escribe tu respuesta..."></textarea>
            <button @click="postReply(comment.id)">Enviar respuesta</button>
          </div>
        </div>
      </div>

      <!-- Nuevo comentario -->
      <div v-if="isAuthenticated" class="new-comment">
        <textarea v-model="newComment" placeholder="¡Participa en el debate!"></textarea>
        <button @click="postComment">Enviar comentario</button>
      </div>
      <div v-else class="auth-warning">
        🔒 Debes <a @click="$emit('navigate', 'auth')">iniciar sesión</a> o 
        <a @click="$emit('navigate', 'register')">registrarte</a> para participar.
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase";
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy } from "firebase/firestore";

export default {
  name: 'ForumWeeklyTopic',
  emits: ['navigate'], // Mantenemos tu evento de navegación
  data() {
    return {
      topics: [
  "¿Qué harías si tuvieras un superpoder por un día?",
  "¿Redes sociales: benefician o perjudican más?",
  "Si pudieras viajar a cualquier época, ¿a cuál irías y por qué?",
  "¿Es mejor estudiar en línea o presencial?",
  "¿Qué videojuego merece una película y cómo sería?",
  "¿Qué app móvil no podrías vivir sin ella?",
  "¿Debería haber límite de horas en redes sociales para jóvenes?",
  "Si crearas un startup, ¿qué problema resolverías?",
  "¿Qué libro recomendarías a alguien que no le gusta leer?",
  "¿Qué canción te representa en este momento?",
  "¿Qué invento te gustaría que existiera ya?",
  "¿Qué tradición familiar te gustaría conservar siempre?",
  "¿Qué película te hizo cambiar tu perspectiva?",
  "¿Qué hábito te gustaría eliminar o adoptar?",
  "Si te dieran $1000 para ayudar a una causa, ¿cuál sería?",
  "¿Qué skill crees que todos deberían aprender?",
  "¿Qué deporte o hobby te gustaría probar?",
  "¿Qué consejo darías a tu yo de 13 años?",
  "¿Qué meme te representa mejor?",
  "¿Qué tema crees que no se discute lo suficiente?",
  "¿Qué harías si el internet desapareciera por una semana?",
  "¿Qué personaje de ficción te cae mejor/mal?",
  "¿Qué cambiarías del sistema educativo?",
  "¿Qué app o juego está sobrevalorado?",
  "¿Qué serie te enganchó desde el primer capítulo?",
  "¿Qué comida podrías comer todos los días?",
  "¿Qué inventaste de niño que creías era único?",
  "¿Qué trabajo te gustaría probar por un día?",
  "¿Qué lugar del mundo te gustaría explorar?",
  "¿Qué frase o cita te motiva?",
  "¿Qué película o serie tiene el mejor soundtrack?",
  "¿Qué mito te gustaría que fuera cierto?",
  "¿Qué habilidad te gustaría tener instantáneamente?",
  "¿Qué harías diferente si nadie te juzgara?",
  "¿Qué tema te apasiona tanto que podrías hablar horas de él?",
  "¿Qué cambio pequeño mejoraría tu ciudad?",
  "¿Qué superhéroe/villano tiene la mejor historia?",
  "¿Qué moda pasada debería volver?",
  "¿Qué película te hizo reír más?",
  "¿Qué rumor o teoría te gustaría que fuera verdad?",
  "¿Qué objeto cotidiano te parece infravalorado?",
  "¿Qué evento histórico te gustaría haber presenciado?",
  "¿Qué talento oculto tienes?",
  "¿Qué canal de YouTube recomendarías?",
  "¿Qué decisión cambiaría tu vida actual?",
  "¿Qué cosa 'de adultos' no entiendes?",
  "¿Qué profesión crees que será obsoleta en 10 años?",
  "¿Qué película te gustó aunque todos la critiquen?",
  "¿Qué le dirías a tu yo del futuro?",
  "¿Qué emoji usas más y por qué?"
],
      currentWeek: 1,
      currentTopic: "",
      comments: [],
      newComment: "",
      replyText: "",
      activeReply: null,
      isAuthenticated: false,
      user: null,
    };
  },
  computed: {
    sortedComments() {
      return [...this.comments].sort((a, b) => b.date - a.date);
    },
  },
  async created() {
    this.calculateCurrentWeek();
    await this.fetchComments();
    this.checkAuth();
  },
  methods: {
    // Método de navegación (igual al tuyo)
    goBack() {
      this.$emit('navigate', 'home');
    },

    calculateCurrentWeek() {
  const today = new Date();
  const forumCreationDate = new Date(); // Fecha de hoy (cuando se crea el foro)
  forumCreationDate.setHours(0, 0, 0, 0); // Normalizamos a medianoche

  // Calcula la diferencia en milisegundos
  const diffInMs = today - forumCreationDate;
  
  // Convierte milisegundos a semanas (1 semana = 604800000 ms)
  const diffInWeeks = Math.floor(diffInMs / 604800000);
  
  // Asigna la semana actual (0 para la primera semana)
  this.currentWeek = diffInWeeks;
  this.currentTopic = this.topics[this.currentWeek % this.topics.length];
},
    async fetchComments() {
      const q = query(
        collection(db, "forumComments"),
        orderBy("date", "desc")
      );
      const snapshot = await getDocs(q);
      this.comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));
    },
    async postComment() {
      if (!this.newComment.trim()) return;

      await addDoc(collection(db, "forumComments"), {
        text: this.newComment,
        userName: this.user.displayName || "",
        userEmail: this.user.email,
        date: serverTimestamp(),
        isReply: false,
        topicWeek: this.currentWeek,
      });

      this.newComment = "";
      await this.fetchComments();
    },
    toggleReply(commentId) {
      this.activeReply = this.activeReply === commentId ? null : commentId;
    },
    async postReply(parentCommentId) {
      if (!this.replyText.trim()) return;

      await addDoc(collection(db, "forumComments"), {
        text: this.replyText,
        userName: this.user.displayName || "",
        userEmail: this.user.email,
        date: serverTimestamp(),
        isReply: true,
        parentId: parentCommentId,
        topicWeek: this.currentWeek,
      });

      this.replyText = "";
      this.activeReply = null;
      await this.fetchComments();
    },
    formatDate(date) {
      return date.toLocaleDateString("es-ES", { 
        day: "numeric", 
        month: "long", 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    },
    checkAuth() {
      auth.onAuthStateChanged((user) => {
        this.isAuthenticated = !!user;
        this.user = user;
      });
    },
  },
};
</script>

<style scoped>
/* Tus estilos originales del botón (iguales) */
.foro-container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column; /* Cambiado para alinear el botón arriba */
  align-items: flex-start; /* Alinea el botón a la izquierda */
  padding: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: Arial, sans-serif;
  position: relative;
}

.fancy-button {
  position: relative;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #800000, #ff0000);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10; /* Para que esté sobre el contenido */
}

.fancy-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.button-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fancy-button:hover .button-glow {
  opacity: 1;
}

/* Estilos nuevos del foro (adaptados a tu fondo) */
.forum-content {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7); /* Fondo semitransparente para legibilidad */
  padding: 2rem;
  border-radius: 10px;
  margin-top: 20px;
  overflow-y: auto;
  max-height: 80vh;
}

.weekly-topic {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.comment {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.reply {
  margin-left: 2rem;
  background: rgba(255, 255, 255, 0.05);
}

.user-name {
  color: #ff9999; /* Color que combine con tu tema */
}

textarea, button:not(.fancy-button) {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #ff9999;
  color: white;
}

button:not(.fancy-button) {
  background: #800000;
}

.auth-warning a {
  color: #ffd900;
  text-decoration: underline;
  cursor: pointer;
}
.auth-warning a:hover {
  color: #fff;
}

.fancy-button.back-button {
  align-self: flex-start;
  margin-top: 10px;
  margin-left: 10px;
}

.back-button-fixed {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10010;
  margin: 0;
}
</style>