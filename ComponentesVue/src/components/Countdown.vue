<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useFirestore } from 'vuefire';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const db = useFirestore();
const targetDate = ref(new Date());

function getNextTargetDate() {
  const now = new Date();
  const nextTarget = new Date(now);
  const dayOfWeek = nextTarget.getDay();
  const daysUntilSunday = (7 - dayOfWeek) % 7;
  nextTarget.setDate(nextTarget.getDate() + daysUntilSunday);
  nextTarget.setHours(18, 30, 0, 0); // Set to 6:30 PM
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
    const targetDateDoc = doc(db, 'countdown', 'targetDate');
    setDoc(targetDateDoc, { date: targetDate.value.toISOString() });
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
  <div class="countdown" @click="redirectToTwitch">
    <h2>Próximo Capítulo en:</h2>
    <div class="time">{{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s</div>
  </div>
</template>

<style scoped>
.countdown {
  background: rgba(124, 7, 7, 0.8);
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background 0.3s ease;
}

.countdown:hover {
  animation: pulse 1s infinite;
  background: rgba(124, 7, 7, 1);
}

.countdown h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .countdown {
    font-size: 1rem;
    padding: 5px 10px;
  }

  .countdown h2 {
    font-size: 1rem;
  }
}
</style>