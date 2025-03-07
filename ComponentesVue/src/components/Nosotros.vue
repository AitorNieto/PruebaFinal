<template>
  <div>
    <!-- Imagen del título fija en la parte superior -->
    <div class="title-container">
      <img :src="fotoTitulo" alt="Título" class="title-image" />
    </div>

    <!-- Contenido debajo del título -->
    <div class="content" ref="content">
      <h1 class="section-title">Quiénes Somos</h1>
      <p class="welcome-text">
        Bienvenido a Delirios & Barbaries, el rincón donde la realidad se descompone en debates crudos, ideas disruptivas y conversaciones sin censura. Cada episodio es un viaje sin retorno a lo más profundo del pensamiento crítico. ¿Listo para el caos?
      </p>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-img src="@/assets/fotoGrupo.jpeg" class="group-image" contain></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="dark-red-background">
      <div class="image-container">
        <div class="image-box">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="@/assets/Jimmy.png" alt="Imagen 1" class="additional-image" />
              </div>
              <div class="flip-card-back">
                <img src="@/assets/carta.png" alt="Carta" class="card-image" />
                <div class="card-info">
                  <h2>Jimmy</h2>
                  <p>Edad: 21</p>
                  <p>Nacimiento: 01/01/2003</p>
                  <p>Insta: @dfghjk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="image-box">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="@/assets/Lomas.png" alt="Imagen 2" class="additional-image" />
              </div>
              <div class="flip-card-back">
                <img src="@/assets/carta.png" alt="Carta" class="card-image" />
                <div class="card-info">
                  <h2>Daniel Lomas</h2>
                  <p>Edad: 21</p>
                  <p>Nacimiento: 01/01/2003</p>
                  <p>Insta: @dfghjk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="image-box">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="@/assets/Monzon.png" alt="Imagen 3" class="additional-image" />
              </div>
              <div class="flip-card-back">
                <img src="@/assets/carta.png" alt="Carta" class="card-image" />
                <div class="card-info">
                  <h2>Monzón</h2>
                  <p>Edad: 22</p>
                  <p>Nacimiento: 01/01/2002</p>
                  <p>Insta: @dfghjk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import fotoTitulo from '@/assets/fotoTitulo.jpeg';

const content = ref(null);

onMounted(() => {
  content.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
</script>

<style scoped>
/* Contenedor del título fijo */
.title-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Ocupar todo el ancho de la pantalla */
  height: auto;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Imagen del título centrada */
.title-image {
  width: 100vw; /* Expande la imagen a todo el ancho de la pantalla */
  max-height: 20vh; /* No más alta que el 20% de la página */
  object-fit: cover; /* Mantiene proporción */
  object-position: center center; /* Centra la imagen completamente */
}

/* Contenedor principal (deja espacio para la imagen fija) */
.content {
  padding-top: 5vh; /* Ajusta este valor para mover el contenido más arriba */
  background-color: #7c0707;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; /* Centra el texto */
}

/* Título de la sección */
.section-title {
  font-size: 2.5rem;
  color: white;
  margin-top: 30vh; /* Ajusta este valor para mover el h1 más abajo */
  margin-bottom: 1rem;
}

/* Texto de bienvenida */
.welcome-text {
  font-size: 1.2rem;
  color: white;
  margin-top: 10vh; /* Ajusta este valor para mover el texto más abajo */
  margin-bottom: 2rem;
  max-width: 800px; /* Limita el ancho del texto */
  border: 2px solid white; /* Añade un borde al texto */
  padding: 1rem; /* Añade un relleno al texto */
  border-radius: 10px; /* Bordes redondeados */
}

/* Imagen dentro del contenido */
.group-image {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dark-red-background {
  background-color: #4b0000; /* Tono de rojo más oscuro */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  margin-top: 0; /* Elimina el espacio superior */
  width: 100%; /* Ajusta el ancho para ocupar todo el ancho de la pantalla */
  min-height: 100vh; /* Ocupa todo el largo de la pantalla */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centra el contenido verticalmente */
}

.image-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.image-box {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.additional-image {
  width: 100%;
  max-width: 300px; /* Ajusta el tamaño máximo de las imágenes */
  height: auto;
  display: block;
  border-radius: 10px; /* Bordes redondeados */
}

/* Estilos para la tarjeta de volteo */
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 400px;
  perspective: 1000px; /* Elimina el efecto 3D */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px; /* Bordes redondeados */
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #d3d3d3; /* Fondo grisáceo */
  color: black;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.card-info {
  z-index: 2;
  color: black; /* Cambia el color del texto a negro */
  text-align: center;
}
</style>