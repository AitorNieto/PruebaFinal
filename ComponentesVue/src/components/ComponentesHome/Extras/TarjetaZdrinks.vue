<template>
  <transition name="slide-card">
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
      <div class="strip-content" v-show="hovered">
        <h4 class="card-message">{{ currentMessage }}</h4>
        <div class="mini-promo">
          Usa código: <span class="mini-code">DELIRIOSYBARBARIES10</span>
        </div>
      </div>
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
      // Ajusta el top/bottom para evitar el menú si es necesario
      if (this.currentPosition === 'left' || this.currentPosition === 'right') {
        return { top: '120px' }; // Ajusta según tu menú
      }
      if (this.currentPosition === 'bottom-left' || this.currentPosition === 'bottom-right') {
        return { bottom: '40px' };
      }
      return {};
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
      // Solo bordes, nunca centro
      const pos = this.positions[Math.floor(Math.random() * this.positions.length)];
      this.currentPosition = pos;
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

.zdrinks-strip {
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  min-height: 60px;
  min-width: 48px;
  background: transparent;
}

.zdrinks-strip.left {
  left: 0;
  border-radius: 0 20px 20px 0;
}
.zdrinks-strip.right {
  right: 0;
  border-radius: 20px 0 0 20px;
}
.zdrinks-strip.bottom-left {
  left: 0;
  bottom: 40px;
  border-radius: 0 20px 20px 0;
  flex-direction: row;
}
.zdrinks-strip.bottom-right {
  right: 0;
  bottom: 40px;
  border-radius: 20px 0 0 20px;
  flex-direction: row;
}

.strip-tab {
  background: linear-gradient(135deg, #F7FFB0 0%, #D4FFB2 100%);
  box-shadow: 0 4px 16px rgba(0, 168, 255, 0.15);
  padding: 8px 8px 8px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: inherit;
  min-width: 48px;
  min-height: 48px;
  transition: background 0.3s;
}

.strip-tab .mini-logo {
  height: 28px;
  filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
}

.collab-symbol {
  font-size: 1.2rem;
  color: var(--zd-accent);
  animation: pulse 1.5s infinite;
}

.strip-content {
  background: linear-gradient(135deg, #F7FFB0 0%, #D4FFB2 100%);
  box-shadow: 0 4px 16px rgba(0, 168, 255, 0.15);
  border-radius: 0 20px 20px 0;
  margin-left: 0;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 200px;
  opacity: 1;
  transition: opacity 0.3s, margin 0.3s;
}

.zdrinks-strip.left .strip-content,
.zdrinks-strip.bottom-left .strip-content {
  border-radius: 0 20px 20px 0;
  margin-left: 0;
}
.zdrinks-strip.right .strip-content,
.zdrinks-strip.bottom-right .strip-content {
  border-radius: 20px 0 0 20px;
  margin-right: 0;
  align-items: flex-end;
}

.strip-content {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 100%;
  top: 0;
  white-space: normal;
}

.zdrinks-strip.left:hover .strip-content,
.zdrinks-strip.right:hover .strip-content,
.zdrinks-strip.bottom-left:hover .strip-content,
.zdrinks-strip.bottom-right:hover .strip-content {
  opacity: 1;
  pointer-events: auto;
  position: static;
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
  margin-top: 5px;
}

.mini-code {
  display: inline-block;
  background: linear-gradient(135deg, #E6F7FF, #B3E0FF);
  color: var(--zd-blue-dark);
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 5px;
  box-shadow: 0 2px 5px rgba(0, 168, 255, 0.2);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

.slide-card-enter-active,
.slide-card-leave-active {
  transition: opacity 0.4s;
}
.slide-card-enter-from,
.slide-card-leave-to {
  opacity: 0;
}
</style>