<template>
    <div>
      <!-- Imagen del título fija en la parte superior -->
      <div class="title-container">
        <img :src="fotoTitulo" alt="Título" class="title-image" />
      </div>
  
      <!-- Contenido debajo del título -->
      <div class="content">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-img src="@/assets/fotoGrupo.jpeg" class="group-image" contain></v-img>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- Nuevo contenido del componente Foro -->
      <div class="background">
        <h1 class="title">Foro</h1>
        <p>Contenido del componente Foro.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import fotoTitulo from '@/assets/fotoTitulo.jpeg';
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
    max-height: 200px; /* Ajusta la altura según sea necesario */
    object-fit: cover; /* Mantiene proporción */
    object-position: center center; /* Centra la imagen completamente */
  }
  
  /* Contenedor principal (deja espacio para la imagen fija) */
  .content {
    padding-top: 200px; /* Ajusta este valor para que el contenido no quede tapado */
    background-color: #7c0707;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Imagen dentro del contenido */
  .group-image {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Fondo del componente Foro */
  .background {
    background-color: #7c0707; /* Fondo rojo simple */
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
  }
  </style>
