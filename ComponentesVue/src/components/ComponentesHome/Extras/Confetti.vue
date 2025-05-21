<template>
  <div class="fireworks-container">
    <div v-for="(particle, index) in particles" 
         :key="index"
         class="particle"
         :style="getParticleStyle(particle)">
      <img v-if="useCustomImage" src="@/assets/WRG.png" class="particle-image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FireworksConfetti',
  props: {
    useCustomImage: {
      type: Boolean,
      default: true
    },
    particleCount: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      particles: [],
      colors: [
        '#ff0000', '#ff6600', '#ffcc00', 
        '#00ff00', '#00ccff', '#cc00ff',
        '#ffffff', '#ff99cc', '#99ff99'
      ],
      timer: null,
      lastLaunch: 0
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        const now = new Date();
        if (now.getSeconds() === 42 && now.getTime() - this.lastLaunch > 1000) {
          this.launchFireworks();
          this.lastLaunch = now.getTime();
        }
      }, 200);
    },
    launchFireworks() {
      const positions = [
        { x: 10, y: 95 }, // Izquierda
        { x: 90, y: 95 }  // Derecha
      ];

      positions.forEach(pos => {
        for (let i = 0; i < this.particleCount / 2; i++) {
          const velocity = {
            x: (Math.random() - 0.5) * 10,
            y: -Math.random() * 15 - 5
          };

          this.particles.push({
            x: pos.x,
            y: pos.y,
            size: Math.random() * 15 + 10, // Tamaño entre 10-25px
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            rotation: Math.random() * 360,
            velocity,
            gravity: 0.2,
            friction: 0.98,
            life: 150 + Math.random() * 100,
            opacity: 1
          });
        }
      });

      this.animateParticles();
    },
    animateParticles() {
      const animate = () => {
        this.particles.forEach(p => {
          p.velocity.x *= p.friction;
          p.velocity.y *= p.friction;
          p.velocity.y += p.gravity;

          p.x += p.velocity.x;
          p.y += p.velocity.y;
          p.rotation += p.velocity.x * 0.5;
          p.life--;
          p.opacity = Math.max(0, p.life / 200);

          if (p.y > 95 && p.velocity.y > 0) {
            p.velocity.y *= -0.6;
            p.y = 95;
          }
        });

        this.particles = this.particles.filter(p => p.life > 0 && p.opacity > 0);

        if (this.particles.length > 0) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    },
    getParticleStyle(particle) {
      return {
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: this.useCustomImage ? 'transparent' : particle.color,
        transform: `rotate(${particle.rotation}deg)`,
        opacity: particle.opacity,
        transition: 'transform 0.1s linear'
      };
    }
  }
}
</script>

<style scoped>
.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform, opacity;
}

.particle-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>