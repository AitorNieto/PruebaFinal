<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const handleScroll = () => {
  const novedades = document.getElementById('novedades')
  const scrollY = window.scrollY || window.pageYOffset
  const windowHeight = window.innerHeight
  const bodyHeight = document.body.offsetHeight

  // Si el usuario está a menos de 10px del fondo, oculta la barra
  if (windowHeight + scrollY >= bodyHeight - 10) {
    visible.value = false
    return
  }

  // Si existe el div de novedades y el usuario ha llegado a él, muestra la barra
  if (novedades) {
    const rect = novedades.getBoundingClientRect()
    // Si la parte superior de novedades está por encima del top de la ventana (ya se ve en pantalla)
    if (rect.top <= 0) {
      visible.value = true
    } else {
      visible.value = false
    }
  } else {
    visible.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Llama una vez al montar por si ya está abajo
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="scrolling-bar">
      <div class="scrolling-text">
        D&B • Soul • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah •
        D&B • Soul • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah •
        D&B • Soul • D&B • Goorgo • D&B • Darios Eme Hache • D&B • WhereIsLeto • D&B • TheMelerus • D&B • Claudia Garcia • D&B • Kappah •
      </div>
    </div>
  </transition>
</template>

<style scoped>
.scrolling-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 10001;
  background: linear-gradient(90deg, #8b0000 80%, #ffd700 100%);
  color: #fff;
  font-family: 'Fredoka', 'Cinzel', cursive, sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 -2px 16px #8b000055;
  border-top: 2px solid #ffd700;
  overflow: hidden;
  white-space: nowrap;
  height: 2.5rem;
  display: flex;
  align-items: center;
  user-select: none;
  transition: bottom 0.3s;
}

.scrolling-text {
  display: inline-block;
  padding-left: 100vw;
  animation: scroll-invitados 30s linear infinite;
  white-space: nowrap;
}

@keyframes scroll-invitados {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>