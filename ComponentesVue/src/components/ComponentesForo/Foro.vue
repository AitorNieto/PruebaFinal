<template>
  <div class="foro-container">
    <div class="forum-content">
      <!-- Tema semanal y botón de volver -->
      <div class="weekly-topic-container">
        <button class="fancy-button back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          <span>Volver</span>
        </button>
        <div class="weekly-topic">
          <h2>📌 Tema de la semana {{ currentWeek }}:</h2>
          <p class="topic-text">{{ currentTopic }}</p>
          <small>💡 ¿Qué opinas?</small>
        </div>
      </div>

      <div class="forum-interaction-section">
        <!-- Filtros para comentarios -->
        <div class="filter-buttons">
          <button 
            :class="['filter-btn', { active: currentFilter === 'all' }]" 
            @click="setFilter('all')"
          >
            <i class="fas fa-list"></i>
            Todos
          </button>
          <button 
            :class="['filter-btn', { active: currentFilter === 'popular' }]" 
            @click="setFilter('popular')"
          >
            <i class="fas fa-fire"></i>
            Más populares
          </button>
          <button 
            :class="['filter-btn', { active: currentFilter === 'recent' }]" 
            @click="setFilter('recent')"
          >
            <i class="fas fa-clock"></i>
            Recientes
          </button>
        </div>

        <!-- Mover el nuevo comentario aquí -->
        <div v-if="isAuthenticated" class="new-comment">
          <textarea 
            v-model="newComment" 
            placeholder="¡Participa en el debate!"
            class="comment-textarea"
          ></textarea>
          <button class="submit-button" @click="postComment">
            <i class="fas fa-paper-plane"></i>
            Enviar comentario
          </button>
        </div>
        <div v-else class="auth-warning">
          🔒 Debes 
          <a 
            @click="$emit('navigate', 'auth')" 
            class="auth-link"
          >iniciar sesión</a> 
          o 
          <a 
            @click="$emit('navigate', 'register')" 
            class="auth-link"
          >registrarte</a> 
          para participar.
        </div>
      </div>

      <!-- Comentarios -->
      <div class="comments">
        <div 
          v-for="comment in sortedComments" 
          :key="comment.id" 
          :class="['comment', { 'reply': comment.isReply }]"
        >
          <div class="comment-header">
            <div class="user-info">
              <img 
                :src="comment.userPhoto" 
                :alt="comment.userName"
                @error="handleImageError"
                class="user-avatar"
              />
              <div class="user-details">
                <span class="user-name">{{ comment.userName || comment.userEmail }}</span>
                <span class="comment-date">{{ formatDate(comment.date) }}</span>
              </div>
            </div>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
          
          <!-- Añadir la sección de likes -->
          <div class="comment-actions">
            <button 
              class="like-button" 
              @click="toggleLike(comment)"
              :class="{ 'liked': comment.hasLiked }"
            >
              <i class="fas fa-heart"></i>
              <span class="like-count">{{ comment.likes || 0 }}</span>
            </button>
            
            <button 
              v-if="!comment.isReply && isAuthenticated" 
              @click="toggleReply(comment.id)"
              class="reply-button"
            >
              Responder
            </button>
          </div>

          <!-- Formulario de respuesta -->
          <div v-if="activeReply === comment.id" class="reply-form">
            <textarea v-model="replyText" placeholder="Escribe tu respuesta..."></textarea>
            <button @click="postReply(comment.id)">Enviar respuesta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db, auth } from "@/firebase";
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy, doc, updateDoc, arrayUnion, arrayRemove, increment, getDoc, where } from "firebase/firestore";
// Importar la imagen por defecto
import defaultAvatar from '@/assets/avatar-default.png';

export default {
  name: 'ForumWeeklyTopic',
  emits: ['navigate'],
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
      currentFilter: 'all',
      defaultAvatar: defaultAvatar, // Añadir la imagen por defecto
    };
  },
  computed: {
    sortedComments() {
      if (!this.comments || !this.comments.length) return [];
    
      let filtered = [...this.comments];
    
      switch (this.currentFilter) {
        case 'popular':
          // Filtrar comentarios que tengan al menos 1 like y ordenar por cantidad de likes
          return filtered
            .filter(comment => (comment.likes || 0) > 0)
            .sort((a, b) => (b.likes || 0) - (a.likes || 0))
            .slice(0, 5); // Tomar máximo 5 comentarios más populares
      
        case 'recent':
          // Obtener la fecha actual y establecerla a las 00:00:00
          const today = new Date();
          today.setHours(0, 0, 0, 0);
        
          // Filtrar comentarios del día actual
          return filtered
            .filter(comment => {
              const commentDate = comment.date instanceof Date 
                ? comment.date 
                : comment.date?.toDate();
            
              if (!commentDate) return false;
              return commentDate >= today;
            })
            .sort((a, b) => b.date - a.date);
      
        default: // 'all'
          // Mostrar todos los comentarios ordenados por fecha más reciente
          return filtered.sort((a, b) => {
            const dateA = a.date instanceof Date ? a.date : a.date?.toDate();
            const dateB = b.date instanceof Date ? b.date : b.date?.toDate();
            return dateB - dateA;
          });
      }
    }
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
      try {
        const q = query(
          collection(db, "forumComments"),
          orderBy("date", "desc")
        );
        
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          console.log('No hay comentarios');
          this.comments = [];
          return;
        }

        const commentsData = [];
        
        for (const docSnapshot of snapshot.docs) {
          const data = docSnapshot.data();
          let userPhoto = data.userPhoto || defaultAvatar;
          let userName = data.userName || data.userEmail;

          // Intenta obtener la foto del perfil si existe userId
          if (data.userId) {
            try {
              const userProfileRef = doc(db, 'Profiles', data.userId);
              const userProfileSnap = await getDoc(userProfileRef);
              
              if (userProfileSnap.exists()) {
                const profileData = userProfileSnap.data();
                userPhoto = profileData.profileImageUrl || userPhoto;
                userName = profileData.username || userName;
              }
            } catch (error) {
              console.error('Error al obtener perfil:', error);
            }
          }

          commentsData.push({
            id: docSnapshot.id,
            ...data,
            date: data.date?.toDate() || new Date(),
            userPhoto: userPhoto,
            userName: userName,
            hasLiked: data.likedBy?.includes(this.user?.uid) || false,
            likes: data.likes || 0,
            likedBy: data.likedBy || []
          });
        }

        this.comments = commentsData;
        console.log('Comentarios cargados:', this.comments.length);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
        this.comments = [];
      }
    },
    async postComment() {
      if (!this.newComment.trim() || !this.isAuthenticated) return;

      try {
        let userPhoto = defaultAvatar;
        let userName = this.user.displayName || this.user.email;

        // Obtener datos del perfil
        try {
          const userProfileRef = doc(db, 'Profiles', this.user.uid);
          const userProfileSnap = await getDoc(userProfileRef);
          
          if (userProfileSnap.exists()) {
            const profileData = userProfileSnap.data();
            userPhoto = profileData.profileImageUrl || userPhoto;
            userName = profileData.username || userName;
          }
        } catch (error) {
          console.error('Error al obtener perfil:', error);
        }

        const commentData = {
          text: this.newComment,
          userName: userName,
          userEmail: this.user.email,
          userId: this.user.uid,
          userPhoto: userPhoto,
          date: serverTimestamp(),
          isReply: false,
          topicWeek: this.currentWeek,
          likes: 0,
          likedBy: []
        };

        await addDoc(collection(db, "forumComments"), commentData);
        this.newComment = "";
        await this.fetchComments();
      } catch (error) {
        console.error('Error al publicar comentario:', error);
      }
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
    async toggleLike(comment) {
  if (!this.isAuthenticated) {
    alert('Debes iniciar sesión para dar like');
    return;
  }

  try {
    const commentRef = doc(db, "forumComments", comment.id);
    const userId = this.user.uid;

    if (!comment.likedBy) comment.likedBy = [];
    const hasLiked = comment.likedBy.includes(userId);

    await updateDoc(commentRef, {
      likes: increment(hasLiked ? -1 : 1),
      likedBy: hasLiked ? arrayRemove(userId) : arrayUnion(userId)
    });

    // Actualizar el estado local
    comment.hasLiked = !hasLiked;
    comment.likes = (comment.likes || 0) + (hasLiked ? -1 : 1);
    
    if (hasLiked) {
      comment.likedBy = comment.likedBy.filter(id => id !== userId);
    } else {
      comment.likedBy.push(userId);
    }
  } catch (error) {
    console.error('Error al actualizar like:', error);
  }
},
setFilter(filter) {
  this.currentFilter = filter;
  
  // Opcional: Mostrar mensaje según el filtro seleccionado
  const messages = {
    all: 'Mostrando todos los comentarios',
    popular: 'Mostrando los comentarios más populares',
    recent: 'Mostrando los comentarios de hoy'
  };
  
  console.log(messages[filter]);
},
    // Añadir método para manejar errores de imagen
    handleImageError(event) {
      event.target.src = defaultAvatar;
    }
  },
};
</script>

<style scoped>
/* Contenedor principal con efecto de profundidad */
.foro-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2e, #2d2d44);
  padding: 3rem 1rem;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Efecto de partículas en el fondo */
.foro-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%);
  animation: pulse 8s ease-in-out infinite;
  pointer-events: none;
}

/* Contenido principal con efecto glassmorphism mejorado */
.forum-content {
  width: 92%;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

/* Tema semanal con diseño premium */
.weekly-topic-container {
  background: linear-gradient(135deg, rgba(128, 0, 0, 0.8), rgba(0, 0, 0, 0.7));
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 25px rgba(128, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
}

/* Efecto de brillo en el tema semanal */
.weekly-topic-container::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 50%);
  animation: rotate 15s linear infinite;
  pointer-events: none;
}

.weekly-topic {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 14px;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mejoras en tipografía y espaciado */
.weekly-topic h2 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #ff9999;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.topic-text {
  font-size: 1.3rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-weight: 400;
  letter-spacing: 0.2px;
}

/* Botones de filtro con diseño moderno */
.filter-buttons {
  display: flex;
  gap: 1.2rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.filter-btn {
  flex: 1;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.filter-btn.active {
  background: linear-gradient(135deg, #800000, #ff2b2b);
  border: none;
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
}

/* Comentarios con diseño elevado */
.comments {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
}

.comment {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.comment:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.07);
}

/* Estilos para respuestas */
.comment.reply {
  margin-left: 4rem;
  background: rgba(128, 0, 0, 0.08);
  border-left: 4px solid rgba(128, 0, 0, 0.6);
  position: relative;
}

.comment.reply::before {
  content: '';
  position: absolute;
  left: -3rem;
  top: 2rem;
  width: 2rem;
  height: 2px;
  background: linear-gradient(90deg, #800000, transparent);
}

/* Perfil de usuario mejorado */
.user-info {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.user-avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.1);
  border-color: #ff9999;
}

/* Botón de like mejorado */
.like-button {
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.like-button:hover {
  background: rgba(255, 0, 0, 0.1);
  border-color: #ff0000;
  transform: scale(1.05);
}

.like-button.liked {
  background: linear-gradient(135deg, #800000, #ff0000);
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
}

.like-button i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.like-button:hover i {
  transform: scale(1.2);
}

/* Estilos para el mensaje de autenticación */
.auth-warning {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  font-size: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  margin: 2rem 0;
}

.auth-link {
  color: #ff4444;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.auth-link:hover {
  color: #ff6666;
  background: rgba(255, 0, 0, 0.1);
  text-decoration: none;
}

.auth-link:active {
  transform: translateY(1px);
}

/* Animaciones */
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Formulario de nuevo comentario mejorado */
.new-comment {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

textarea {
  width: 100%;
  min-height: 120px;
  padding: 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.3s ease;
}

textarea:focus {
  outline: none;
  border-color: #ff9999;
  box-shadow: 0 0 0 3px rgba(255, 153, 153, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

/* Responsive mejorado */
@media (max-width: 768px) {
  .forum-content {
    width: 95%;
    padding: 1.5rem;
  }

  .filter-buttons {
    flex-direction: column;
    padding: 1rem;
  }

  .comment.reply {
    margin-left: 2rem;
  }

  .weekly-topic-container {
    padding: 1.5rem;
  }

  .topic-text {
    font-size: 1.1rem;
  }

  .user-avatar {
    width: 45px;
    height: 45px;
  }
}

/* Transiciones suaves globales */
* {
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
</style>