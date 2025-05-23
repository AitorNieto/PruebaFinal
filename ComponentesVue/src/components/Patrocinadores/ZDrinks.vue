<template>
  <div class="zdrinks-collab">
    <div class="collab-container">
      <!-- Imagen grande a la izquierda -->
      <div class="collab-image">
        <img src="@/assets/ZDrink&Dani.png" alt="ZDrink & Dani colaboración" class="featured-image">
      </div>

      <!-- Contenido a la derecha -->
      <div class="promo-content">
        <div class="brand-presentation">
          <img src="/favicon.ico" alt="Delirios & Barbaries" class="partner-logo">
          <div class="collab-symbol">×</div>
          <img src="@/assets/LogoZdrinks.avif" alt="ZDrinks" class="zdrinks-logo">
        </div>

        <h3 class="collab-title">COLABORACIÓN <span class="highlight">EXCLUSIVA</span></h3>
        <p class="slogan">¡Energía que inspira tus delirios!</p>
        
        <div class="offer-card">
          <p class="offer-description">Usa el código</p>
          <div class="promo-code">DELIRIOSYBARBARIES</div>
          <p class="offer-description">y obtén un <span class="discount-main">10% DE DESCUENTO</span></p>
        </div>

        <a href="https://www.zetadrinks.com/discount/DeliriosyBarbaries?ref=gtqnutxd/" target="_blank" class="action-btn">
          <span class="btn-text">DESCUBRE ZDRINKS</span>
          <span class="icon">⚡</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZDrinks'
}
</script>

<style scoped>
/* PALETA AZUL ALEGRE */
:root {
  --zd-blue: #00A8FF;
  --zd-blue-light: #6ECBF5;
  --zd-blue-dark: #0077B6;
  --zd-accent: #FF9F1C;
  --zd-text: #2D9CDB;
  --zd-bg: #ffe6fc;
}

@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Comic+Neue:wght@700&display=swap');

.zdrinks-collab {
  background: linear-gradient(135deg, #fff8f0 0%, #ffe6e6 100%);
  border-radius: 25px;
  padding: 0;
  margin: 3rem auto;
  max-width: 1000px;
  box-shadow: 0 10px 30px rgba(0, 168, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-family: 'Fredoka One', 'Comic Neue', cursive, sans-serif;
  color: #800000; 
}

.collab-container {
  display: flex;
  min-height: 500px;
}

.collab-image {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 25px 0 0 25px;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(2px 4px 8px rgba(0,0,0,0.1));
  transition: transform 0.5s ease;
}

.featured-image:hover {
  transform: scale(1.03);
}

.promo-content {
  flex: 1;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-presentation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: #800000;
}

.dyb-text {
  font-size: 2.5rem;
  font-weight: bold;
  color: #800000;
  text-shadow: 1px 1px 2px #fff6;
}

.collab-symbol {
  font-size: 2.5rem;
  color: var(--zd-accent);
  animation: pulse 1.5s infinite;
}

.zdrinks-logo {
  height: 60px;
  filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
  transition: transform 0.3s ease;
}

.zdrinks-logo:hover {
  transform: rotate(-5deg) scale(1.1);
}

.partner-logo {
  height: 60px;
  filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
  transition: transform 0.3s ease;
}

.partner-logo:hover {
  transform: rotate(-5deg) scale(1.1);
}

.collab-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #800000; 
  text-shadow: 1px 1px 3px #fff3;
}

.highlight {
  color: var(--zd-accent);
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--zd-blue);
  border-radius: 2px;
  animation: underline 2s infinite;
}

@keyframes underline {
  0%, 100% { width: 100%; }
  50% { width: 80%; }
}

.slogan {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #c40000; 
  font-style: italic;
}

.offer-card {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1.5rem 0;
  border: 2px dashed var(--zd-blue-light);
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.offer-description {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #800000;
}

.promo-code {
  display: inline-block;
  color: #c40000;
  background: linear-gradient(135deg, #fff0f0, #ffe6e6);
  color: #c40000;
  padding: 0.7rem 2.5rem;
  border-radius: 50px;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.8rem 0;
  box-shadow: 0 5px 15px rgba(128,0,0,0.08);
  transition: transform 0.3s ease;
}

.promo-code:hover {
  transform: scale(1.05);
}

.discount {
  color: #c40000;
}

.discount-main {
  color: #fff;
  background: linear-gradient(90deg, #c40000 60%, #800000 100%);
  font-size: 2.1rem;
  font-weight: 900;
  padding: 0.3rem 1.5rem;
  border-radius: 40px;
  box-shadow: 0 4px 16px rgba(196,0,0,0.10);
  letter-spacing: 1.5px;
  display: inline-block;
  margin: 0 0.2rem;
  text-shadow: 1px 1px 6px #fff8, 0 1px 6px #80000033;
  vertical-align: middle;
  transition: transform 0.2s;
}

.discount-main:hover {
  transform: scale(1.06) rotate(-2deg);
}

.action-btn {
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #c40000, #800000);
  color: #fff;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1.5rem auto 0 auto;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 5px 15px rgba(128,0,0,0.18);
  width: fit-content; 
}

.action-btn .btn-text {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.action-btn .icon {
  position: relative;
  z-index: 2;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  color: #ffd700; 
}

.action-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: 0.5s;
}

.action-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 120, 215, 0.6);
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover .btn-text {
  transform: translateX(5px);
}

.action-btn:hover .icon {
  transform: translateX(10px) rotate(15deg);
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
}

/* ANIMACIONES */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .collab-container {
    flex-direction: column;
    min-height: auto;
  }
  
  .collab-image {
    border-radius: 25px 25px 0 0;
    padding: 1.5rem;
  }
  
  .promo-content {
    padding: 2rem 1.5rem;
  }
  
  .brand-presentation {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .collab-title {
    font-size: 2rem;
  }
  
  .discount-main {
    font-size: 1.3rem;
    padding: 0.2rem 0.7rem;
  }
}

.zdrinks-collab,
.collab-title,
.slogan,
.offer-description,
.promo-code,
.discount,
.action-btn,
.brand-presentation,
.dyb-text {
  font-family: 'Impact', 'Arial Narrow Bold', Arial, sans-serif !important;
  font-stretch: condensed;
  font-weight: 700;
  letter-spacing: 1px;
}
</style>