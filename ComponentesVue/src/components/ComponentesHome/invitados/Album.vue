<template>
  <div class="album-container">
    <div ref="album" class="flipbook">
      <!-- Portada -->
      <div class="page portada">
        <img src="@/assets/portada.png" alt="Portada álbum" class="img-portada" />
      </div>
      <!-- Índice/Explicación -->
      <div class="page indice">
        <div class="indice-content">
          <h2>ÍNDICE</h2>
          <p class="indice-descripcion">
            Hall of Fame del selecto club de invitados que han venido<br>
            Los cromos <span style="color:#FFD700; font-weight:bold;">dorados</span> son quienes han asistido por su propio pie.<br>
            ¡Explora y descubre a todos los que han pasado y pasaran por aquí!
          </p>
        </div>
      </div>
      <!-- Primera página de cromos (ahora segunda hoja) -->
      <div class="page cromos-page">
        <div class="cromos-grid">
          <div
            class="cromo-bolsillo"
            :class="{
              'cromo-dorado': invitado.nombre === 'DarioMH' ||
                             invitado.nombre === 'Goorgo' ||
                             invitado.nombre === 'Melerus' ||
                             invitado.nombre === 'Soul'
            }"
            v-for="(invitado, n) in invitadosPrimeraPagina"
            :key="'primera-cromo-' + n"
          >
            <img
              :src="invitado.img ? invitado.img : funda"
              :alt="invitado.nombre ? invitado.nombre : 'Cromo'"
              class="cromo-img"
              :class="{
                'cromo-img-dario': invitado.nombre === 'DarioMH' ||
                                  invitado.nombre === 'Melerus' ||
                                  invitado.nombre === 'Soul' ||
                                  invitado.nombre === 'Kappah' ||
                                  invitado.nombre === 'WhereIsLeto' ||
                                  invitado.cifrado // <-- añade esto para nil
                ,
                'cromo-img-blur': invitado.cifrado
              }"
            />
            <div v-if="invitado.nombre" class="cromo-info">
              <span class="cromo-numero">#{{ invitado.numero.toString().padStart(2, '0') }}</span>
              <span
                class="cromo-nombre"
                :class="{ 'nombre-dorado': invitado.nombre === 'DarioMH' || invitado.nombre === 'Goorgo' || invitado.nombre === 'Melerus' || invitado.nombre === 'Soul' }"
              >{{ invitado.cifrado ? '???' : invitado.nombre }}</span>
            </div>
          </div>
        </div>
        <div class="numero-pagina-cromos">Página 1</div>
      </div>
      <!-- Más páginas de cromos (todas fundas) -->
      <div
        class="page cromos-page"
        v-for="idx in 2"
        :key="'pagina-' + idx"
      >
        <div class="cromos-grid">
          <div
            class="cromo-bolsillo"
            v-for="n in 9"
            :key="'pagina-' + idx + '-cromo-' + n"
          >
            <img :src="funda" alt="Cromo" class="cromo-img" />
          </div>
        </div>
        <div class="numero-pagina-cromos">Página {{ idx + 1 }}</div>
      </div>
      <!-- Fin del álbum -->
      <div class="page fin">
        <div class="contraportada-content">
          <h2>Delirios y Barbaries</h2>
          <p>
            “Cada página de este álbum es testigo de momentos únicos, locuras compartidas y recuerdos imborrables.<br>
            Gracias por formar parte de esta colección de delirios y barbaries.”
          </p>
          <div class="contraportada-disenio">
            <span>★</span>
            <span>Álbum Exclusivo</span>
            <span>★</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { PageFlip } from 'page-flip'

const album = ref(null)
let flipInstance = null

import portada from '@/assets/portada.png'
import elCejas from '@/assets/ElCejas.jpg'
import claudia from '@/assets/ClaudiaGarcia.webp'
import dario from '@/assets/DarioMH.jpg'
import melerus from '@/assets/Melerus.jpg'
import goorgo from '@/assets/Goorgo.jpg'
import soul from '@/assets/Soul.png'
import kappah from '@/assets/Kappah.jpg'
import leto from '@/assets/WhereIsLeto.jpg'
import funda from '@/assets/Funda.png'
import nil from '@/assets/nil.jpg'

// Array de invitados SOLO para la primera página de cromos (ahora segunda hoja)
const invitadosPrimeraPagina = [
  { nombre: 'ElCejas', numero: 1, img: elCejas },
  { nombre: 'Claudia Garcia', numero: 2, img: claudia },
  { nombre: 'DarioMH', numero: 3, img: dario },
  { nombre: 'Melerus', numero: 4, img: melerus },
  { nombre: 'Goorgo', numero: 5, img: goorgo },
  { nombre: 'Soul', numero: 6, img: soul },
  { nombre: 'Kappah', numero: 7, img: kappah },
  { nombre: 'WhereIsLeto', numero: 8, img: leto },
  { nombre: '??? ', numero: 9, img: nil, cifrado: true }
]

onMounted(() => {
  flipInstance = new PageFlip(album.value, {
    width: 400,
    height: 600,
    size: 'fixed',
    minWidth: 315,
    maxWidth: 1000,
    minHeight: 400,
    maxHeight: 1536,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
    useMouseEvents: true,
    disableFlipByDrag: true
  })
  flipInstance.loadFromHTML(document.querySelectorAll('.page'))
})
</script>

<style scoped>
.album-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: url('https://www.transparenttextures.com/patterns/wood-pattern.png'), black;
  background-size: cover;
  background-repeat: repeat;
  /* Para que la mesa de madera se vea más realista, puedes ajustar el color base (#a97c50) */
  padding-top: 30px;
  padding-bottom: 30px; /* Más espacio abajo para que no se corte el álbum */
}

.flipbook {
  width: 800px;
  height: 600px;
  position: relative;
}

.page {
  background: linear-gradient(135deg, #800000 0%, #4a0000 100%);
  border: 2px solid black;
  color: #222;
  font-family: 'Arial', sans-serif;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.portada {
  background: #642524;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0;
}
.indice,
.fin {
  background: linear-gradient(135deg, #800000 0%, #4a0000 100%);
  color: #fff;
}

.hall-title {
  color: #f5f5f5;
  text-shadow: 0 2px 8px black;
}

.indice-content {
  background: rgba(255, 0, 0, 0.12);
  color: white;
  box-shadow: 0 2px 12px white;
}

.cromos-page {
  flex-direction: column;
}

.cromos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  width: 95%;
  height: 90%;
  padding: 10px;
  justify-items: center;
  align-items: center;
}

.cromo-bolsillo {
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 8px white, 0 0 0 2px white inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px;
  min-width: 0;
  min-height: 0;
  width: 110px;
  height: 140px;
  overflow: visible;
}

.cromo-img {
  width: 98px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid white;
  background: #f5f5f5;
  box-shadow: 0 1px 4px black;
  transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s;
  will-change: transform;
  z-index: 2;
  position: relative;
}

.cromo-img-dario {
  width: 95px !important;
  height: 102px !important;
}

.cromo-dorado {
  border: 2.5px solid #FFD700 !important; /* dorado */
  box-shadow: 0 0 12px #FFD70088, 0 0 0 4px #fff8 inset;
}

.nombre-dorado {
  color: #FFD700 !important; /* dorado */
  text-shadow: 0 0 6px #fff, 0 0 8px #FFD70088;
  font-weight: bold;
  letter-spacing: 1px;
}

.cromo-bolsillo:hover .cromo-img {
  transform: translateY(-18px) scale(1.08);
  box-shadow: 0 8px 24px white, 0 0 0 4px white inset;
}

.cromo-info {
  margin-top: 2px;
  text-align: center;
}

.cromo-numero {
  display: block;
  font-size: 0.9rem;
  color: black;
  font-weight: bold;
  line-height: 1;
}

.cromo-nombre {
  display: block;
  font-size: 0.85rem;
  color: black;
  line-height: 1;
}

.fin {
  background: #642524; /* igual que portada */
  color: #fff;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  min-height: 100%;
  min-width: 0%;
  position: relative;
  overflow: hidden;
}

.hall-title-multiline {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Mueve el contenido a la derecha */
  justify-content: center;
  max-width: 90%;
  max-height: 90%;
  width: 100%;
  height: 100%;
  user-select: none;
  text-align: right;
  padding-right: 2.5rem; /* Ajusta el margen derecho si quieres más separación */
}

.hall-line {
  font-family: 'Bebas Neue', 'Oswald', 'Anton', Arial, sans-serif;
  font-size: 4.2rem;
  letter-spacing: 0.18em;
  color: #fff;
  text-shadow:
    0 4px 24px #000a,
    0 1px 0 #FFD700,
    0 0 40px #FFD70088;
  background: linear-gradient(90deg, #FFD700 10%, #fff 40%, #FFD700 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 12px #FFD70088);
  margin: 0;
  line-height: 1.05;
  text-align: center;
}

.hall-of {
  font-size: 2.6rem;
  letter-spacing: 0.25em;
  margin: 0.2em 0 0.2em 0;
  background: linear-gradient(90deg, #fff 10%, #FFD700 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 2px 12px #FFD70088,
    0 1px 0 #fff;
}

.hall-icon {
  font-size: 3.2rem;
  margin-bottom: 0.2em;
  color: #FFD700;
  text-shadow: 0 2px 12px #FFD70088, 0 1px 0 #fff;
  filter: drop-shadow(0 0 8px #FFD70088);
  display: block;
}

.img-portada {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Cambiado de 'cover' a 'contain' */
  display: block;
  margin: 0;
  padding: 20px; /* Añadido padding para dar un poco de espacio */
  border-radius: 0;
  box-shadow: none;
}

.cromo-img-blur {
  filter: blur(10px) brightness(1.1) grayscale(0.2);
}

.indice-descripcion {
  margin-top: 90px;
}

.numero-pagina-cromos {
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  margin-top: 10px;
}

.contraportada-content {
  text-align: center;
  width: 100%;
  padding: 40px 20px;
}

.contraportada-content h2 {
  font-family: 'Bebas Neue', 'Oswald', 'Anton', Arial, sans-serif;
  font-size: 2.8rem;
  letter-spacing: 0.12em;
  margin-bottom: 18px;
  color: #FFD700;
  text-shadow: 0 2px 12px #fff8, 0 1px 0 #FFD700;
}

.contraportada-content p {
  font-size: 1.2rem;
  margin-bottom: 32px;
  color: #fff;
  opacity: 0.92;
}

.contraportada-disenio {
  font-size: 1.1rem;
  color: #FFD700;
  letter-spacing: 0.15em;
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
}
</style>