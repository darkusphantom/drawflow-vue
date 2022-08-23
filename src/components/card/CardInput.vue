<template>
  <div class="card-input">
    <label :for="id">{{ title }}</label>
    <el-input
      v-model.number="input"
      df-input
      :placeholder="placeholder"
      size="large"
      @input="$emit('value', $event)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
defineProps({
  id: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "Ingrese...",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "Ingrese...",
  },
});
defineEmits(["value"]);

const input = ref("");
</script>

<style scoped>
.card-input {
  display: flex;
  flex-direction: column;
}

.card-input:not(.card-input:last-child) {
  margin-bottom: 32px;
}

.card-input label {
  color: #fff;
  margin-bottom: 8px;
  font-size: 1.1rem;
}
</style>
