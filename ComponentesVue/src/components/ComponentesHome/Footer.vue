<template>
  <footer class="site-footer">
    <span class="puzzle-emoji" @click="$emit('go-juegos')">🧩</span>
    <div class="footer-content">
      <div class="footer-social">
        <h3 class="footer-title">Síguenos en nuestras Redes!</h3>
        <div class="social-links">
          <a href="https://youtube.com/@DeliriosyBarbaries" target="_blank" class="social-link youtube">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://twitch.tv/deliriosybarbaries" target="_blank" class="social-link twitch">
            <i class="fab fa-twitch"></i>
          </a>
          <a href="https://instagram.com/deliriosybarbaries" target="_blank" class="social-link instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://x.com/deliriosyBarb" target="_blank" class="social-link twitter">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://www.tiktok.com/@deliriosybarbaries?lang=es" target="_blank" class="social-link tiktok">
            <i class="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Delirios y Barbaries. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  background: linear-gradient(135deg, #1a1a1a, #000000);
  color: #ffffff;
  padding: 1.5rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.5);
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.puzzle-emoji {
  font-size: 24px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  filter: brightness(0) invert(0);
  transition: filter 0.3s ease-in-out;
}
.puzzle-emoji:hover {
  filter: brightness(1) invert(1);
}

.footer-social {
  text-align: center;
}

.footer-info {
  flex: 1 1 300px;
  text-align: center;
}

.footer-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #ffd700;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif !important;
  font-stretch: condensed;
  font-weight: 400;
  letter-spacing: 1px;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  padding: 0.3rem;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgb(0, 0, 0);
  transition: all 0.4s ease;
}
.footer-bottom {
  text-align: center;
  padding-top: 0.5rem;
  font-size: 0.9rem;
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif !important;
  font-stretch: condensed;
  font-weight: 400;
  letter-spacing: 1px;
}

.youtube {
  position: relative;
  overflow: hidden;
}
.youtube:hover {
  color: #fff;
  border-color: #ff0000;
  background: linear-gradient(45deg, #ff0000, #cc0000);
  box-shadow: 
    0 0 20px rgba(255, 0, 0, 0.3),
    0 0 40px rgba(204, 0, 0, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}
.youtube::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff0000, #cc0000, #ff0000);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.twitch {
  position: relative;
  overflow: hidden;
}
.twitch:hover {
  color: #fff;
  border-color: #6441a5;
  background: linear-gradient(45deg, #6441a5, #9146ff);
  box-shadow: 
    0 0 20px rgba(100, 65, 165, 0.3),
    0 0 40px rgba(145, 70, 255, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}
.twitch::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #6441a5, #9146ff, #6441a5);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.instagram {
  position: relative;
  overflow: hidden;
}
.instagram:hover {
  color: #fff;
  border-color: #e1306c;
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
  box-shadow: 
    0 0 20px rgba(225, 48, 108, 0.3),
    0 0 40px rgba(131, 58, 180, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}
.instagram::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d, #405de6);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.twitter {
  position: relative;
  overflow: hidden;
}
.twitter:hover {
  color: #fff;
  border-color: #000000;
  background: linear-gradient(45deg, #000000, #14171A);
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(20, 23, 26, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}
.twitter::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #060470, #14171A, #000000);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.tiktok {
  position: relative;
  overflow: hidden;
}
.tiktok:hover {
  color: #fff;
  border-color: #000000;
  background: linear-gradient(45deg, #000000, #25F4EE, #FE2C55);
  box-shadow: 
    0 0 20px rgba(37, 244, 238, 0.3),
    0 0 40px rgba(254, 44, 85, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);
  transform: translateY(-8px) scale(1.1);
}
.tiktok::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #000000, #25F4EE, #FE2C55, #000000);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.social-link:hover::before {
  opacity: 1;
  animation: socialGlow 2s linear infinite;
}

@keyframes socialGlow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}
</style>