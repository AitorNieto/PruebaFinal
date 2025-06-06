<template>
  <div class="stars">
    <div v-for="n in 50" :key="n" class="star"></div>
  </div>
</template>

<script>
export default {
  name: 'StarBackground'
}
</script>

<style scoped lang="scss">
@use 'sass:math';

@mixin sp-layout {
  @media screen and (max-width: 750px) {
    @content;
  }
}

@function random_range($min, $max) {
  $rand: math.random();
  $random_range: $min + math.floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Asegura que ocupe todo el viewport */
  height: 100vh; /* Asegura que ocupe todo el viewport */
  pointer-events: none; /* Permite hacer clic a través de las estrellas */
  z-index: 0; /* Debe ser menor que el contenido principal pero mayor que el fondo */
  overflow: hidden;
  /* Elimina el transform: rotate(-45deg); para que las estrellas no se salgan de pantalla */
}

.star {
  $star-count: 3;
  --star-color: #ffd700;
  --star-tail-length: 6em;
  --star-tail-height: 2px;
  --star-width: calc(var(--star-tail-length) / 6);
  --fall-duration: 9s;
  --tail-fade-duration: var(--fall-duration);

  position: absolute;
  top: var(--top-offset);
  left: 0;
  width: var(--star-tail-length);
  height: var(--star-tail-height);
  color: var(--star-color);
  background: linear-gradient(45deg, currentColor, transparent);
  border-radius: 50%;
  filter: drop-shadow(0 0 6px currentColor);
  transform: translate3d(104em, 0, 0);
  animation: fall var(--fall-duration) var(--fall-delay) linear infinite, tail-fade var(--tail-fade-duration) var(--fall-delay) ease-out infinite;

  @include sp-layout {
    animation: fall var(--fall-duration) var(--fall-delay) linear infinite;
  }

  @for $i from 1 through $star-count {
    &:nth-child(#{$i}) {
      --star-tail-length: #{math.div(random_range(500em, 750em), 100)};
      --top-offset: #{math.div(random_range(0vh, 10000vh), 100)};
      --fall-duration: #{math.div(random_range(6000, 12000s), 1000)};
      --fall-delay: #{math.div(random_range(0, 0.00001s), 1000)};
    }
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: calc(var(--star-width) / -2);
    width: var(--star-width);
    height: 100%;
    background: linear-gradient(45deg, transparent, currentColor, transparent);
    border-radius: inherit;
    animation: blink 9s linear infinite;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

@keyframes fall {
  to {
    transform: translate3d(-30em, 0, 0);
  }
}

@keyframes tail-fade {
  0%,
  50% {
    width: var(--star-tail-length);
    opacity: 1;
  }

  70%,
  80% {
    width: 0;
    opacity: 0.4;
  }

  100% {
    width: 0;
    opacity: 0;
  }
}

@keyframes blink {
  50% {
    opacity: 0.6;
  }
}
</style>