<script setup>
import { ref } from 'vue';

const filterCriteria = ref({
  likes: false,
  date: '',
  recent: false,
  author: ''
});

const emit = defineEmits(['filter-reviews']);

const applyFilters = () => {
  emit('filter-reviews', filterCriteria.value);
};
</script>

<template>
  <div>
    <h3>Filtrar Reseñas</h3>
    <div>
      <label>
        <input type="checkbox" v-model="filterCriteria.likes" />
        Mayor número de likes
      </label>
    </div>
    <div>
      <label>
        Fecha:
        <input type="date" v-model="filterCriteria.date" />
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="filterCriteria.recent" />
        Más recientes
      </label>
    </div>
    <div>
      <label>
        Autor:
        <input type="text" v-model="filterCriteria.author" placeholder="Escribe el nombre del autor" />
      </label>
    </div>
    <button @click="applyFilters" class="button">Aplicar Filtros</button>
  </div>
</template>

<style scoped>
.button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>