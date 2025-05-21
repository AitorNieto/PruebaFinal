<template>
  <transition name="fade-scale">
    <div
      v-if="showCard"
      class="zdrinks-strip"
      :class="currentPosition"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @click="navigateToZdrinks"
      :style="stripStyle"
    >
      <div class="strip-tab">
        <img src="@/assets/LogoZdrinks.avif" alt="ZDrinks" class="mini-logo" />
        <span class="collab-symbol">⚡</span>
      </div>
      <transition name="slide-content">
        <div class="strip-content" v-show="hovered">
          <transition-group name="fade-stagger">
            <h4 key="message" class="card-message">{{ currentMessage }}</h4>
            <div key="promo" class="mini-promo">
              Usa código: <span class="mini-code">DELIRIOSYBARBARIES10</span>
            </div>
          </transition-group>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TarjetaZdrinks',
  data() {
    return {
      showCard: false,
      hovered: false,
      messages: [
        "¿Necesitas energía? ⚡",
        "¡Combate el bajón con ZDrinks!",
        "Energía para tus delirios creativos",
        "10% descuento solo para ti",
        "¡Recarga tu energía con ZDrinks!",
        "ZDrinks: ¡La energía que necesitas!",
        "¡No dejes que el cansancio te detenga!",
        "ZDrinks sin Azúcar, sin Límites",
        "Recarga tus baterías"
      ],
      currentMessage: '',
      positions: ['left', 'right', 'bottom-left', 'bottom-right'],
      currentPosition: 'right',
      timer: null,
    }
  },
  computed: {
    stripStyle() {
      const style = {};
      if (this.currentPosition.includes('bottom')) {
        style.bottom = '40px';
      } else {
        style.top = '120px';
      }
      return style;
    }
  },
  mounted() {
    this.startTimer();
    this.setRandomMessage();
    this.setRandomPosition();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        const now = new Date();
        if (now.getSeconds() === 0) {
          this.showCard = true;
          this.setRandomMessage();
          this.setRandomPosition();
          setTimeout(() => {
            this.showCard = false;
            this.hovered = false;
          }, 5000);
        }
      }, 1000);
    },
    setRandomMessage() {
      const randomIndex = Math.floor(Math.random() * this.messages.length);
      this.currentMessage = this.messages[randomIndex];
    },
    setRandomPosition() {
      this.currentPosition = this.positions[Math.floor(Math.random() * this.positions.length)];
    },
    navigateToZdrinks() {
      this.$emit('go-zdrinks');
      this.showCard = false;
      this.hovered = false;
    }
  }
}
</script>

<style scoped>
:root {
  --zd-blue: #00A8FF;
  --zd-blue-light: #6ECBF5;
  --zd-blue-dark: #0077B6;
  --zd-accent: #FF9F1C;
  --zd-text: #2D9CDB;
  --zd-bg: #E6F7FF;
}

/* Animación principal de entrada/salida */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1);
}
.fade-scale-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

.zdrinks-strip {
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-height: 60px;
  min-width: 48px;
}

/* Posiciones */
.zdrinks-strip.left {
  left: 0;
  flex-direction: row;
}
.zdrinks-strip.right {
  right: 0;
  flex-direction: row-reverse;
}
.zdrinks-strip.bottom-left {
  left: 0;
  flex-direction: row;
}
.zdrinks-strip.bottom-right {
  right: 0;
  flex-direction: row-reverse;
}

/* Pestaña principal */
.strip-tab {
  background: linear-gradient(135deg, #F7FFB0 0%, #D4FFB2 100%);
  box-shadow: 0 4px 16px rgba(0, 168, 255, 0.15);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 0 12px 12px 0;
  min-width: 48px;
  min-height: 48px;
  transition: all 0.3s ease-out;
  will-change: transform;
  z-index: 2;
}

.zdrinks-strip.right .strip-tab,
.zdrinks-strip.bottom-right .strip-tab {
  border-radius: 12px 0 0 12px;
}

.zdrinks-strip:hover .strip-tab {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(0, 168, 255, 0.25);
}

.mini-logo {
  height: 28px;
  transition: transform 0.3s ease;
  will-change: transform;
}

.zdrinks-strip:hover .mini-logo {
  transform: rotate(-5deg);
}

.collab-symbol {
  font-size: 1.2rem;
  color: var(--zd-accent);
  animation: pulse 1.5s infinite;
}

/* Contenido desplegable */
.slide-content-enter-active,
.slide-content-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.slide-content-enter-from,
.slide-content-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.zdrinks-strip.right .slide-content-enter-from,
.zdrinks-strip.right .slide-content-leave-to,
.zdrinks-strip.bottom-right .slide-content-enter-from,
.zdrinks-strip.bottom-right .slide-content-leave-to {
  transform: translateX(20px);
}

.strip-content {
  background: linear-gradient(135deg, #F7FFB0 0%, #D4FFB2 100%);
  box-shadow: 0 4px 16px rgba(0, 168, 255, 0.15);
  border-radius: 0 12px 12px 0;
  padding: 12px 18px;
  min-width: 200px;
  z-index: 1;
}

.zdrinks-strip.right .strip-content,
.zdrinks-strip.bottom-right .strip-content {
  border-radius: 12px 0 0 12px;
  text-align: right;
}

/* Animación escalonada para el contenido */
.fade-stagger-enter-active {
  transition: all 0.3s ease 0.15s;
}
.fade-stagger-leave-active {
  transition: all 0.2s ease;
}
.fade-stagger-enter-from,
.fade-stagger-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-stagger-move {
  transition: all 0.3s ease;
}

.card-message {
  margin: 0;
  font-size: 1.1rem;
  color: #0077B6;
  text-shadow: 1px 1px 3px #B3E0FF;
}

.mini-promo {
  font-size: 0.9rem;
  color: var(--zd-blue-dark);
  margin-top: 8px;
}

.mini-code {
  display: inline-block;
  background: linear-gradient(135deg, #E6F7FF, #B3E0FF);
  color: var(--zd-blue-dark);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 5px;
  box-shadow: 0 2px 5px rgba(0, 168, 255, 0.2);
  transition: transform 0.2s ease;
}

.mini-code:hover {
  transform: scale(1.05);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}
</style>