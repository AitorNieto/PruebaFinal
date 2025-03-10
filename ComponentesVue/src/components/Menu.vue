<script setup>
import { ref, defineEmits, onMounted, onUnmounted } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { firebaseApp } from '../firebase';
import defaultAvatar from '../assets/avatar-default.png';

const props = defineProps({
  currentView: {
    type: String,
    default: 'home'
  }
});
const emit = defineEmits(['navigate']);
const auth = useFirebaseAuth();
const db = getFirestore(firebaseApp);
const userPhoto = ref(defaultAvatar);
const userName = ref("Usuario");

// Función para escuchar cambios en el perfil
const watchUserProfile = (userId) => {
  if (!userId) return null;
  
  return onSnapshot(doc(db, 'Profiles', userId), (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      userPhoto.value = data.profileImageUrl || defaultAvatar;
      userName.value = data.username || "Usuario";
    }
  });
};

let profileUnsubscribe = null;

const handleScroll = () => {
  const menu = document.querySelector('.menu');
  const scrollToTopButton = document.querySelector('.scroll-to-top');
  const mainSection = document.querySelector('.background');
  if (!mainSection) return;
  const mainSectionBottom = mainSection.getBoundingClientRect().bottom;

  if (mainSectionBottom <= 0) {
    menu.classList.add('scrolled');
    scrollToTopButton.classList.add('visible');
  } else {
    menu.classList.remove('scrolled');
    scrollToTopButton.classList.remove('visible');
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  if (auth.currentUser) {
    profileUnsubscribe = watchUserProfile(auth.currentUser.uid);
    // También asignamos una imagen por defecto si no hay otra disponible
    userPhoto.value = auth.currentUser.photoURL || defaultAvatar;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (profileUnsubscribe) {
    profileUnsubscribe();
  }
});

function navigate(section) {
  if (section === 'profile' && !auth.currentUser) {
    alert('Debes estar autenticado para acceder al perfil. Redirigiendo al registro.');
    emit('navigate', 'register');
  } else if (section === 'profile') {
    emit('navigate', section);
  } else {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function handleLogout() {
  if (!auth || !auth.currentUser) {
    console.error("No estás conectado para cerrar sesión.");
    alert("No estás conectado para cerrar sesión.");
    return;
  }

  auth.signOut()
    .then(() => {
      alert("Sesión cerrada correctamente.");
      emit('navigate', 'login');
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error.message);
      alert("Hubo un problema al intentar cerrar sesión: " + error.message);
    });
}
</script>

<template>
  <!-- El menú solo se muestra si currentView NO es 'profile' -->
  <div v-if="currentView !== 'profile'">
    <aside class="menu">
      <nav>
        <ul>
          <li><a href="#" @click.prevent="navigate('novedades')">Novedades</a></li>
          <li><a href="#" @click.prevent="navigate('podcast')">Podcast</a></li>
          <li><a href="#" @click.prevent="navigate('foro')">Foro</a></li>
          <li><a href="#" @click.prevent="navigate('nosotros')">Nuestro Equipo</a></li>
          <li class="user-section">
            <!-- Al hacer clic, se navega al perfil -->
            <a href="#" @click.prevent="navigate('profile')">
              <img :src="userPhoto" alt="Avatar" class="user-avatar" />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <button class="scroll-to-top" @click="scrollToTop">
      ↑
    </button>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Georgia&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  font-family: 'Bebas Neue', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.user-section {
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre la imagen y la info */
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white; /* Opcional, para destacar el avatar */
}

/* Nuevo: Estilos para el enlace del avatar para que no herede estilos de los demás enlaces */
.user-section a {
  display: inline-block;
  font-size: unset;
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
  -webkit-text-fill-color: unset;
  -webkit-text-stroke: 0;
  color: inherit;
  transition: transform 0.3s ease;
}

.user-section a:hover {
  transform: scale(1.1);
}

.user-info {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
} 
.menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, rgba(74, 13, 13, 0.95), rgba(139, 0, 0, 0.95));
  backdrop-filter: blur(10px);
  color: white;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 -4px 8px rgb(255, 255, 255);
  transition: all 0.3s ease;
  z-index: 9999;
}

.menu.scrolled {
  position: fixed;
  top: 0;
  bottom: auto;
  width: 100%;
  background: linear-gradient(135deg, rgba(20, 0, 0, 0.95), rgba(80, 0, 0, 0.95));
  padding: 10px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 50px;
  padding: 0;
  margin: 0;
  align-items: center;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 2px;
  position: relative;
  padding: 5px 10px;
  transition: all 0.3s ease;
  background: linear-gradient(to right, #ffffff, white);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.menu ul li a::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, #fffffd, transparent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.menu ul li a:hover {
  transform: translateY(-2px);
}

.menu ul li a:hover::before {
  transform: scaleX(1);
}

.menu.scrolled ul li a {
  font-size: 2rem;
  background: linear-gradient(to right, #ffffff, white);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 0 10px rgb(0, 0, 0);
  transition: all 0.3s ease;
}

.user-section a:hover .user-avatar {
  transform: scale(1.1);
  border-color: #ffffff;
  box-shadow: 0 0 20px white;
}

.scroll-to-top {
  position: fixed;
  bottom: 90px;
  right: 20px;
  background: linear-gradient(135deg, #8b0000, #4a0d0d);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
  font-size: 1.8rem;
  display: none;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.scroll-to-top.visible {
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-to-top:hover {
  background: linear-gradient(135deg, #4a0d0d, #8b0000);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .menu ul {
    gap: 30px;
  }

  .menu ul li a {
    font-size: 2rem;
  }

  .menu.scrolled ul li a {
    font-size: 1.5rem;
  }

  .user-avatar {
    width: 35px;
    height: 35px;
  }

  .scroll-to-top {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    bottom: 80px;
  }
}

@media (max-width: 480px) {
  .menu ul {
    gap: 20px;
  }

  .menu ul li a {
    font-size: 1.8rem;
  }

  .menu.scrolled ul li a {
    font-size: 1.3rem;
  }
}
</style>
