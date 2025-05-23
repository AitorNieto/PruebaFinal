<template>
  <div class="subscription-container">
    <h1>Selecciona tu Suscripción</h1>
    <div class="subscription-options">
      <div class="subscription-option basic" :class="{ active: currentSubscription === 'basic' }">
        <h2>Básico</h2>
        <ul>
          <li>Acceso a contenido estándar</li>
          <li>Soporte básico</li>
        </ul>
        <div id="paypal-button-basic"></div>
        <div v-if="currentSubscription === 'basic'" class="tick">&#10003;</div>
      </div>
      <div class="subscription-option prime" :class="{ active: currentSubscription === 'prime' }">
        <h2>Prime</h2>
        <ul>
          <li>Acceso a contenido prime</li>
          <li>Soporte prioritario</li>
          <li>Descuentos exclusivos</li>
        </ul>
        <div id="paypal-button-prime"></div>
        <div v-if="currentSubscription === 'prime'" class="tick">&#10003;</div>
      </div>
      <div class="subscription-option vip" :class="{ active: currentSubscription === 'vip' }">
        <h2>VIP</h2>
        <ul>
          <li>Acceso a todo el contenido</li>
          <li>Soporte VIP 24/7</li>
          <li>Eventos exclusivos</li>
        </ul>
        <div id="paypal-button-vip"></div>
        <div v-if="currentSubscription === 'vip'" class="tick">&#10003;</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase';

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const currentSubscription = ref('basic'); // Cambia esto según la suscripción actual del usuario

const saveSubscription = async (plan) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert('Debes estar autenticado para realizar esta acción');
      return;
    }
    const userId = user.uid;
    const docRef = doc(db, 'Profiles', userId);
    await setDoc(docRef, { subscription: plan }, { merge: true });
    currentSubscription.value = plan;
    alert('Suscripción actualizada correctamente');
  } catch (error) {
    console.error('Error al guardar la suscripción:', error);
    alert('Error al guardar la suscripción. Por favor, intenta de nuevo.');
  }
};

const loadPayPalButtons = (plan, price) => {
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: price
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
        saveSubscription(plan); // Guardar la suscripción en Firebase
      });
    }
  }).render(`#paypal-button-${plan}`);
};

onMounted(() => {
  loadPayPalButtons('basic', '0.00'); // Precio para el plan básico
  loadPayPalButtons('prime', '20.00'); // Precio para el plan premium
  loadPayPalButtons('vip', '30.00'); // Precio para el plan VIP
});
</script>

<style scoped>
.subscription-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centra verticalmente el contenido */
  padding: 20px;
  background: #7c0707; /* Fondo rojo-granate */
  min-height: 100vh; /* Asegura que el fondo ocupe toda la altura del componente */
  color: #fff; /* Color del texto */
}

.subscription-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 50px; /* Ajusta este valor para mover los divs más abajo */
}

.subscription-option {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.subscription-option.basic {
  background-color: #0070ba;
  color: #fff;
}

.subscription-option.prime {
  background-color: #b80bb8; 
  color: #fff;
}

.subscription-option.vip {
  background-color: #b8860b;
  color: #fff;
}

.subscription-option.active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}

.subscription-option h2 {
  margin-bottom: 10px;
}

.subscription-option ul {
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
}

.subscription-option li {
  margin-bottom: 5px;
}

.subscription-option .tick {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #fff;
}

.subscription-option button {
  background: #0070ba;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.subscription-option button:hover {
  background: #005ea6;
}
</style>