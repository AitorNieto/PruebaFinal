<script setup>
import { ref } from "vue";

const planes = [
  { nombre: "Básico", precio: "5€/mes", beneficios: ["Acceso limitado", "1 usuario"] },
  { nombre: "Premium", precio: "10€/mes", beneficios: ["Acceso completo", "3 usuarios", "Soporte prioritario"] },
  { nombre: "VIP", precio: "20€/mes", beneficios: ["Acceso total", "Usuarios ilimitados", "Asesor personalizado"] },
];

const seleccion = ref("Básico");
</script>

<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Elige tu suscripción</v-card-title>
      <v-card-text>
        <v-radio-group v-model="seleccion" column>
          <v-radio
            v-for="plan in planes"
            :key="plan.nombre"
            :label="plan.nombre"
            :value="plan.nombre"
          />
        </v-radio-group>

        <v-divider class="my-4"></v-divider>

        <v-card class="pa-3" color="blue-lighten-5">
          <v-card-title>{{ seleccion }}</v-card-title>
          <v-card-subtitle>
            {{ planes.find(plan => plan.nombre === seleccion).precio }}
          </v-card-subtitle>
          <v-card-text>
            <ul>
              <li v-for="beneficio in planes.find(plan => plan.nombre === seleccion).beneficios" :key="beneficio">
                {{ beneficio }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>