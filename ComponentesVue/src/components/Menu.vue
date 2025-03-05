<script setup>
import { ref, defineEmits, onMounted, onUnmounted } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import defaultAvatar from '../assets/avatar-default.png';

const emit = defineEmits(['navigate']);
const auth = useFirebaseAuth();

const userName = ref("Usuario");
const userPhoto = ref(defaultAvatar);

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

const handleScroll = () => {
  const menu = document.querySelector('.menu');
  const scrollToTopButton = document.querySelector('.scroll-to-top');
  const mainSection = document.querySelector('.background');
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
    userName.value = auth.currentUser.displayName || "Usuario";
    userPhoto.value = auth.currentUser.photoURL || defaultAvatar;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <aside class="menu">
      <nav>
        <ul>
          <li><a href="#" @click.prevent="navigate('novedades')">Novedades</a></li>
          <li><a href="#" @click.prevent="navigate('podcast')">Podcast</a></li>
          <li><a href="#" @click.prevent="navigate('foro')">Foro</a></li>
          <li><a href="#" @click.prevent="navigate('sobre-nosotros')">Sobre Nosotros</a></li>
          <li class="user-section">
            <!-- Se envuelve el avatar en un enlace para hacerlo interactivo -->
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
  background: linear-gradient(to right, #4a0d0d, #8b0000);
  color: white;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.menu.scrolled {
  top: 0;
  bottom: auto;
  left: auto;
  right: 0;
  width: auto;
  padding: 10px;
  box-shadow: none;
  background: none;
  transform: scale(0.8); /* Reduce el tamaño del menú */
  font-family: 'Roboto', sans-serif;
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 50px;
  padding: 0;
  margin: 0;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  font-size: 3rem; /* Aumenta el tamaño de la fuente */
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease, text-shadow 0.3s ease;
  -webkit-text-stroke: 1px #8b0000; /* Delineado granate rojo */
  background: white; /* Relleno blanco */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu.scrolled ul li a {
  color: white;
  -webkit-text-stroke: none;
  background: none;
  -webkit-background-clip: none;
  -webkit-text-fill-color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem; /* Tamaño de fuente más pequeño */
}

.menu ul li a:hover {
  color: #FFD700;
  text-shadow: 2px 2px 6px rgba(255, 215, 0, 0.5);
}

.menu ul li a i {
  font-size: 3rem; /* Aumenta el tamaño del ícono */
}

.menu ul li a:hover i {
  color: #FFD700;
  text-shadow: 2px 2px 6px rgba(255, 215, 0, 0.5);
}

.scroll-to-top {
  position: fixed;
  bottom: 35px;
  right: 17px;
  background: #8b0000;
  color: white;
  border: none;
  border-radius: 100%;
  padding: 3px 17px;
  cursor: pointer;
  font-size: 2rem;
  display: none;
  z-index: 1000;
  transition: all 0.3s ease;
}

.scroll-to-top.visible {
  display: block;
}

.scroll-to-top:hover {
  background: #ffffff;
  color: #8b0000;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .menu ul {
    flex-direction: column;
    gap: 20px;
  }

  .menu ul li a {
    font-size: 2rem; /* Tamaño más pequeño */
  }

  .menu.scrolled {
    transform: scale(1); /* No reducir el tamaño del menú */
  }

  .scroll-to-top {
    font-size: 1.5rem; /* Tamaño más pequeño */
    padding: 3px 10px;
  }
}
</style>
