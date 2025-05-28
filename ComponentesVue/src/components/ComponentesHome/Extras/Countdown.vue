<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useFirestore } from 'vuefire';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import twitchLogo from '@/assets/Twitch.png';

const db = useFirestore();
const targetDate = ref(new Date());

function getNextTargetDate() {
  const now = new Date();
  const nextTarget = new Date(now);
  const dayOfWeek = nextTarget.getDay();
  const daysUntilSunday = (7 - dayOfWeek) % 7;
  nextTarget.setDate(nextTarget.getDate() + daysUntilSunday);
  nextTarget.setHours(20, 0, 0, 0); // 8:00 PM
  return nextTarget;
}

async function initializeTargetDate() {
  const targetDateDoc = doc(db, 'countdown', 'targetDate');
  const docSnapshot = await getDoc(targetDateDoc);

  if (docSnapshot.exists()) {
    targetDate.value = new Date(docSnapshot.data().date);
  } else {
    targetDate.value = getNextTargetDate();
    await setDoc(targetDateDoc, { date: targetDate.value.toISOString() });
  }
}

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

function updateCountdown() {
  const now = new Date();
  const timeDifference = targetDate.value - now;

  if (timeDifference <= 0) {
    targetDate.value = getNextTargetDate();
    setDoc(doc(db, 'countdown', 'targetDate'), { date: targetDate.value.toISOString() });
    updateCountdown();
    return;
  }

  days.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((timeDifference % (1000 * 60)) / 1000);
}

let interval;
onMounted(async () => {
  await initializeTargetDate();
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

function redirectToTwitch() {
  window.open('https://www.twitch.tv/deliriosybarbaries', '_blank');
}
</script>

<template>
  <div class="countdown-container" @click="redirectToTwitch">
    <div class="logo-container">
      <img :src="twitchLogo" alt="Twitch Logo" class="twitch-logo" />
    </div>
    <div class="countdown-box">
      <h2>Próximo capítulo en:</h2>
      <div class="time">{{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s</div>
    </div>
  </div>
</template>

<style scoped>
.countdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.logo-container {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: -30px;
  position: relative;
  z-index: 2;
}

.twitch-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.countdown-box {
  background: #8f10d8;
  padding: 25px 30px;
  border-radius: 15px;
  margin-top: 11px;
  color: rgb(251, 251, 251);
  font-size: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease-in-out;
  font-weight: 400; /* Quitar negrita */
}

.countdown-container:hover .countdown-box {
  transform: scale(1.02);
}

.countdown-box h2 {
  font-size: 1.2rem;
  font-weight: 400; /* Quitar negrita */
  margin-bottom: 10px;
}

.time {
  font-size: 1.5rem;
  font-weight: 400; /* Quitar negrita */
}

@media (max-width: 768px) {
  .countdown-box {
    font-size: 1rem;
    padding: 10px 20px;
  }
  .countdown-box h2 {
    font-size: 1rem;
  }
}
</style>
