
/* import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
*/
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css'
// Importar Font Awesome desde CDN
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

// Importar Firebase y VueFire
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase';

// Importar Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);

// Configurar VueFire con Firebase
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()], // Habilitar autenticación
});

app.use(vuetify);
app.mount('#app');
