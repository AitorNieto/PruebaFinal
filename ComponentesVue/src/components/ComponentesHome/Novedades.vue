<template>
  <div id="novedades" class="red-background">
    <div class="novedades-container">
      <div class="title-wrapper">
        <div class="title-decoration left"></div>
        <div class="title-decoration right"></div>
      </div>
      <div class="home-content">
        <div class="content-row">
          <div class="ultimo-video">
            <div class="episode-header">
              <h2 class="episode-title">Último Video</h2>
              <div class="episode-underline"></div>
            </div>
            <div class="video-wrapper">
              <div class="video-container">
                <iframe
                  class="video-iframe"
                  src="https://www.youtube.com/embed/g7jLY3Z17uk"
                  title="Último episodio de Delirios y Barbaries"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.red-background {
  width: 100%;
  background: 
    linear-gradient(135deg, rgba(20, 0, 0, 0.9), rgba(80, 0, 0, 0.95)),
    url('https://imgur.com/gallery/wallpaper-years-rO3XClp#/t/wallpaper') center/cover;
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 100px rgba(0, 0, 0, 0.8),
    inset 0 0 300px rgba(136, 0, 0, 0.4);
}

/* Contenedor principal */
.novedades-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Título y decoración */
.title-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
}

.title-decoration {
  height: 2px;
  flex: 1;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
}

.title-decoration.left {
  margin-right: 2rem;
}

.title-decoration.right {
  margin-left: 2rem;
}

/* Contenido y layout */
.home-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.content-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

/* Video y efectos */
.ultimo-video {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem;
  background: rgba(20, 0, 0, 0.8);
  border-radius: 40px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 215, 0, 0.2);
  box-shadow: 
    0 0 70px rgba(0,0,0,0.5),
    inset 0 0 50px rgba(255,215,0,0.05);
  transform: perspective(1000px) rotateX(5deg);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.ultimo-video:hover {
  transform: perspective(1000px) rotateX(0deg) translateY(-10px);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 
    0 0 100px rgba(0,0,0,0.7),
    inset 0 0 70px rgba(255,215,0,0.1);
}

.episode-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.episode-title {
  font-size: 4rem;
  color: #ffd700;
  margin: 0;
  font-family: 'Cinzel', serif;
  text-shadow: 
    0 0 20px rgba(255,215,0,0.5),
    0 0 40px rgba(255,0,0,0.3);
  animation: episodePulse 3s infinite;
}

.episode-underline {
  height: 3px;
  width: 200px;
  margin: 1rem auto;
  background: linear-gradient(90deg, 
    transparent,
    rgba(255,215,0,0.8),
    #ffd700,
    rgba(255,215,0,0.8),
    transparent
  );
  animation: underlinePulse 3s infinite;
}

.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border: 4px solid rgba(255,215,0,0.3);
  border-radius: 30px;
  padding: 12px;
  background: linear-gradient(45deg, #ffd700, #ff4500);
  box-shadow: 
    0 0 50px rgba(136,25,25,0.7),
    inset 0 0 40px rgba(255,215,0,0.4);
  animation: borderGlow 4s infinite;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.video-wrapper:hover {
  transform: scale(1.02);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  height: 0;
  overflow: hidden;
  border-radius: 25px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  border: none;
  object-fit: cover;
}

/* Animaciones */
@keyframes episodePulse {
  0%, 100% { 
    transform: scale(1);
    text-shadow: 
      0 0 20px rgba(255,215,0,0.5),
      0 0 40px rgba(255,0,0,0.3);
  }
  50% { 
    transform: scale(1.05);
    text-shadow: 
      0 0 30px rgba(255,215,0,0.7),
      0 0 50px rgba(255,0,0,0.5);
  }
}

@keyframes underlinePulse {
  0%, 100% { opacity: 0.5; width: 200px; }
  50% { opacity: 1; width: 250px; }
}

@keyframes borderGlow {
  0%, 100% {
    box-shadow: 
      0 0 50px rgba(136,25,25,0.7),
      inset 0 0 40px rgba(255,215,0,0.4);
    border-color: rgba(255,215,0,0.3);
  }
  50% {
    box-shadow: 
      0 0 70px rgba(136,25,25,0.9),
      inset 0 0 60px rgba(255,215,0,0.6);
    border-color: rgba(255,215,0,0.5);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .ultimo-video {
    padding: 3rem;
    max-width: 95%;
  }
  
  .video-wrapper {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .ultimo-video {
    padding: 2rem;
    transform: none;
  }
  
  .video-wrapper {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .ultimo-video {
    padding: 1.5rem;
    border-radius: 25px;
  }
  
  .video-wrapper {
    padding: 6px;
    border-width: 3px;
  }
}
</style>