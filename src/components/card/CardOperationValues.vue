<template>
  <div class="card-values">
    <p class="card-value">
      Value A:
      <span> {{ valueA }} </span>
    </p>
    <p class="card-value">
      Value B:
      <span> {{ valueB }}</span>
    </p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  valueA: {
    type: Number,
    default: 0,
  },
  valueB: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.card-values {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
}
.card-value {
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 12px;
}
.card-value span {
  font-weight: 400;
}
</style>
