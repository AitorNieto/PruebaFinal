<template>
  <div class="album-container">
    <div ref="album" class="flipbook">
      <!-- Portada -->
      <div class="page portada">
        <img src="@/assets/portada.avif" alt="Portada álbum" class="img-portada" />
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
              'cromo-dorado': isDorado(invitado.nombre)
            }"
            v-for="(invitado, n) in invitadosPrimeraPagina"
            :key="'primera-cromo-' + n"
          >
            <img
              :src="invitado.img || funda"
              :alt="invitado.nombre || 'Cromo'"
              class="cromo-img"
              @error="handleImageError"
              :class="{
                'cromo-img-dario': isDarioImg(invitado.nombre),
                'cromo-img-blur': invitado.cifrado
              }"
            />
            <div v-if="invitado.nombre" class="cromo-info">
              <span class="cromo-numero">#{{ invitado.numero.toString().padStart(2, '0') }}</span>
              <span
                class="cromo-nombre"
                :class="{ 'nombre-dorado': isDorado(invitado.nombre) }"
              >{{ invitado.cifrado ? '???' : invitado.nombre }}</span>
            </div>
          </div>
        </div>
        <div class="numero-pagina-cromos">Página 1</div>
      </div>
      <!-- Segunda página de cromos -->
      <div class="page cromos-page">
        <div class="cromos-grid">
          <div
            class="cromo-bolsillo"
            :class="{
              'cromo-dorado': isDorado(invitado.nombre)
            }"
            v-for="(invitado, n) in invitadosSegundaPagina"
            :key="'segunda-cromo-' + n"
          >
            <img
              :src="invitado.img || funda"
              :alt="invitado.nombre || 'Cromo'"
              class="cromo-img"
              @error="handleImageError"
              :class="{
                'cromo-img-dario': isDarioImg(invitado.nombre),
                'cromo-img-blur': invitado.cifrado
              }"
            />
            <div class="cromo-info">
              <span class="cromo-numero">#{{ invitado.numero.toString().padStart(2, '0') }}</span>
              <span class="cromo-nombre">{{ invitado.cifrado ? '???' : invitado.nombre }}</span>
            </div>
          </div>
        </div>
        <div class="numero-pagina-cromos">Página 2</div>
      </div>
      <!-- Tercera página de cromos -->
      <div class="page cromos-page">
        <div class="cromos-grid">
          <div
            class="cromo-bolsillo"
            :class="{
              'cromo-dorado': isDorado(invitado.nombre)
            }"
            v-for="(invitado, n) in invitadosTerceraPagina"
            :key="'tercera-cromo-' + n"
          >
            <img
              :src="invitado.img || funda"
              :alt="invitado.nombre || 'Cromo'"
              class="cromo-img"
              @error="handleImageError"
              :class="{
                'cromo-img-dario': isDarioImg(invitado.nombre),
                'cromo-img-blur': invitado.cifrado
              }"
            />
            <div class="cromo-info">
              <span class="cromo-numero">#{{ invitado.numero.toString().padStart(2, '0') }}</span>
              <span
                class="cromo-nombre"
                :class="{ 'nombre-dorado': isDorado(invitado.nombre) }"
              >{{ invitado.cifrado ? '???' : invitado.nombre }}</span>
            </div>
          </div>
        </div>
        <div class="numero-pagina-cromos">Página 3</div>
      </div>
      <!-- Cuarta página de cromos  -->
      <div class="page cromos-page">
        <div class="cromos-grid">
          <div
            class="cromo-bolsillo"
            :class="{
              'cromo-dorado': isDorado(invitado.nombre)
            }"
            v-for="(invitado, n) in invitadosCuartaPagina"
            :key="'cuarta-cromo-' + n"
          >
            <img
              :src="invitado.img || funda"
              :alt="invitado.nombre || 'Cromo'"
              class="cromo-img"
              @error="handleImageError"
              :class="{
                'cromo-img-dario': isDarioImg(invitado.nombre),
                'cromo-img-blur': invitado.cifrado
              }"
            />
            <div v-if="invitado.nombre" class="cromo-info">
              <span class="cromo-numero">#{{ invitado.numero.toString().padStart(2, '0') }}</span>
              <span
                class="cromo-nombre"
                :class="{ 'nombre-dorado': isDorado(invitado.nombre) }"
              >{{ invitado.cifrado ? '???' : invitado.nombre }}</span>
            </div>
          </div>
        </div>
        <div class="numero-pagina-cromos">Página 4</div>
      </div>
      <!-- Quinta página de cromos  -->
      <div class="page cromos-page">
        <div class="cromos-grid">
          <div
            class="cromo-bolsillo"
            :class="{
              'cromo-dorado': isDorado(invitado.nombre)
            }"
            v-for="(invitado, n) in invitadosQuintaPagina"
            :key="'quinta-cromo-' + n"
          >
            <img
              :src="invitado.img || funda"
              :alt="invitado.nombre || 'Cromo'"
              class="cromo-img"
              @error="handleImageError"
              :class="{
                'cromo-img-dario': isDarioImg(invitado.nombre),
                'cromo-img-blur': invitado.cifrado
              }"
            />
            <div v-if="invitado.nombre" class="cromo-info">
              <span class="cromo-numero">#{{ invitado.numero.toString().padStart(2, '0') }}</span>
              <span
                class="cromo-nombre"
                :class="{ 'nombre-dorado': isDorado(invitado.nombre) }"
              >{{ invitado.cifrado ? '???' : invitado.nombre }}</span>
            </div>
          </div>
        </div>
        <div class="numero-pagina-cromos">Página 5</div>
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

import ElCejas from '@/assets/elCejas.avif'
import ClaudiaGarcia from '@/assets/Claudia Garcia.avif'
import Dario from '@/assets/DarioMH.avif'
import Melerus from '@/assets/melerus.avif'
import Goorgo from '@/assets/Goorgo.avif'
import Soul from '@/assets/Soul.avif'
import kappah from '@/assets/Kappah.avif'
import WhereIsLeto from '@/assets/WhereIsLeto.avif'
import funda from '@/assets/Funda.avif'
import AlbertoSSJ from '@/assets/Alberto SSJ.avif'
import ChestoyTerk from '@/assets/Chesto y Terk.avif'
import Dusan from '@/assets/Dusan.avif'
import Eskini from '@/assets/Eskini.avif'
import JorgeBarroso from '@/assets/Jorge Barroso.avif'
import JuanColás from '@/assets/Juan Colás.avif'
import MissiegoBeats from '@/assets/Missiego Beats.avif'
import Mota from '@/assets/Mota.avif'
import Nikin from '@/assets/Nikin.avif'
import Pit from '@/assets/Pit.avif'
import Sanabria from '@/assets/Sanabria.avif'
import SergioCopado from '@/assets/Sergio Copado.avif'
import SrMiner from '@/assets/Sr Miner.avif'
import Alvarito from '@/assets/Alvarito.avif'
import Yagouu from '@/assets/Yagouu.avif'
import Rubencher from '@/assets/Rubencher.avif'
import NachoPavia from '@/assets/Nacho Pavía.avif'
import Becarios from '@/assets/Becarios.avif'
import Dani from '@/assets/Dani.avif'
import Shiro from '@/assets/Shiro.avif'

// Array de invitados SOLO para la primera página de cromos (ahora segunda hoja)
const invitadosPrimeraPagina = [
  
  { nombre: 'Becarios', numero: 1, img: Becarios },
  { nombre: 'Dani', numero: 2, img: Dani },
  { nombre: 'Soul', numero: 3, img: Soul },
  { nombre: 'Shiro', numero: 4, img: Shiro },
  { nombre: 'Goorgo', numero: 5, img: Goorgo },
  { nombre: 'elCejas', numero: 6, img: ElCejas },
  { nombre: 'DarioMH', numero: 7, img: Dario },
  { nombre: 'Leto', numero: 8, img: WhereIsLeto },
  { nombre: 'Juan Colás', numero: 9, img: JuanColás },
]
const invitadosSegundaPagina = [
  { nombre: 'Eskini', numero: 10, img: Eskini },
  { nombre: 'Claudia Garcia', numero: 11, img: ClaudiaGarcia },
  { nombre: 'Melerus', numero: 12, img: Melerus },
  { nombre: 'Nacho Pavia', numero: 13, img: NachoPavia },
  { nombre: 'Missiego Beats', numero: 14, img: MissiegoBeats },
  { nombre: 'Sergio Copado', numero: 15, img: SergioCopado },
  { nombre: 'Pit', numero: 16, img: Pit },
  { nombre: 'Nikin ', numero: 17, img: Nikin },
  { nombre: 'Kappah', numero: 18, img: kappah },
  
]
const invitadosTerceraPagina = [
  { nombre: 'Chesto y Terk', numero: 19, img: ChestoyTerk },
  { nombre: 'Jorge Barroso', numero: 20, img: JorgeBarroso },
  { nombre: 'Yagouu', numero: 21, img: Yagouu },
  { nombre: 'Mota', numero: 22, img: Mota },
  { nombre: 'Dusan', numero: 23, img: Dusan },
  { nombre: 'Alvarito', numero: 24, img: Alvarito },
  { nombre: 'Sanabria', numero: 25, img: Sanabria },
  { nombre: 'Sr Miner', numero: 26, img: SrMiner },
  { nombre: 'Rubencher', numero: 27, img: Rubencher },
]
const invitadosCuartaPagina = [
  { nombre: 'Alberto SSJ', numero: 28, img: AlbertoSSJ },
  { nombre: '???', numero: 29, img: funda, cifrado: true },
  { nombre: '???', numero: 30, img: funda, cifrado: true },
  { nombre: '???', numero: 31, img: funda, cifrado: true },
  { nombre: '???', numero: 32, img: funda, cifrado: true },
  { nombre: '???', numero: 33, img: funda, cifrado: true },
  { nombre: '???', numero: 34, img: funda, cifrado: true },
  { nombre: '???', numero: 35, img: funda, cifrado: true },
  { nombre: '???', numero: 36, img: funda, cifrado: true }
]

const invitadosQuintaPagina = [
  { nombre: '???', numero: 37, img: funda, cifrado: true },
  { nombre: '???', numero: 38, img: funda, cifrado: true },
  { nombre: '???', numero: 39, img: funda, cifrado: true },
  { nombre: '???', numero: 40, img: funda, cifrado: true },
  { nombre: '???', numero: 41, img: funda, cifrado: true },
  { nombre: '???', numero: 42, img: funda, cifrado: true },
  { nombre: '???', numero: 43, img: funda, cifrado: true },
  { nombre: '???', numero: 44, img: funda, cifrado: true },
  { nombre: '???', numero: 45, img: funda, cifrado: true }
]

// Añadir una función para manejar errores de carga de imágenes
const handleImageError = (event) => {
  event.target.src = funda;
}

// Añadir una computed property para las clases comunes
const commonClasses = {
  doradoNames: ['DarioMH', 'Goorgo', 'Melerus', 'Soul', 'Becarios', 'Leto', 'Claudia Garcia'],
  darioImgNames: ['DarioMH', 'Melerus', 'Soul', 'Kappah', 'Leto']
}

// Función helper para verificar nombres
const isDorado = (nombre) => commonClasses.doradoNames.includes(nombre)
const isDarioImg = (nombre) => commonClasses.darioImgNames.includes(nombre)

onMounted(() => {
  flipInstance = new PageFlip(album.value, {
    width: 450,
    height: 700,
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
  align-items: flex-start;
  min-height: 100vh;
  width: 100vw;
  background: url('@/assets/FondoAlbum.webp'), black;
  background-size: cover;
  background-repeat: repeat;
  padding-top: 0;
  padding-bottom: 30px;
  font-family: Impact, 'Arial Narrow Bold', Arial, sans-serif;
  font-weight: 400;

}

/* Tamaño para PC (más grande) */
.flipbook {
  width: 450px;
  height: 700px;
  position: relative;
  font-family: inherit;
  font-weight: 400;
}

/* Tamaño para móviles (más pequeño) */
@media (max-width: 768px) {
  .flipbook {
    width: 95vw;
    height: 55vh;
    min-height: 350px;
  }
}

.page {
  background: linear-gradient(135deg, #800000 0%, #4a0000 100%);
  border: 2px solid black;
  color: #222;
  font-family: inherit;
  font-weight: 400;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 15%;
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
  margin-top: 15%;
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
  font-family: inherit;
  font-weight: 400;
}

.cromo-img {
  width: 98px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid white;
  background: #1a1a1a;
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
  border: 2.5px solid gold !important;
  box-shadow: 0 0 12px gold, 0 0 0 4px gold inset;
}

.nombre-dorado {
  color: rgb(0, 0, 0) !important;
  text-shadow: 0 0 6px gold, 0 0 8px black;
  font-weight: 400;
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
  background: #642524;
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
  align-items: flex-end;
  justify-content: center;
  max-width: 90%;
  max-height: 90%;
  width: 100%;
  height: 100%;
  user-select: none;
  text-align: right;
  padding-right: 2.5rem;
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
  background: none !important;
  -webkit-text-fill-color: initial !important;
  margin: 0;
  line-height: 1.05;
  text-align: center;
}

.hall-of {
  font-size: 2.6rem;
  letter-spacing: 0.25em;
  margin: 0.2em 0 0.2em 0;
  background: none !important;
  -webkit-text-fill-color: initial !important;
  color: #fff !important;
  text-shadow: none !important;
}

.hall-icon {
  font-size: 3.2rem;
  margin-bottom: 0.2em;
  color: #800000;
  text-shadow: none;
  filter: none;
  display: block;
  font-family: inherit;
  font-weight: 400;
}

.img-portada {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;
  padding: 20px;
  border-radius: 0;
  box-shadow: none;
}

.cromo-img-blur {
  filter: blur(10px) brightness(0.7) grayscale(1);
  background: #000;
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
  color: #800000;
  text-shadow: none !important;
}

.contraportada-content p {
  font-size: 1.2rem;
  margin-bottom: 32px;
  color: #fff;
  opacity: 0.92;
}

.contraportada-disenio {
  font-size: 1.1rem;
  color: #800000;
  letter-spacing: 0.15em;
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
}

/* Ajuste específico para móviles muy pequeños */
@media (max-width: 480px) {
  .flipbook {
    height: 50vh;
    min-height: 320px;
  }
}
</style>