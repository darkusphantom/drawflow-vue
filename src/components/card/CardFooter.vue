<template>
  <footer class="footer-card">
    <p class="card-total">
      Total:
      <span>
        {{ valueTotal }}
      </span>
    </p>
  </footer>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  valueTotal: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.footer-card {
  display: flex;
  flex-direction: column;
}
.card-total {
  background: #fff;
  color: #494949;
  width: 100%;
  padding: 10px 15px;
  border-radius: 0 0 10px 10px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
}
.card-total span {
  font-size: 1rem;
  font-weight: 400;
}
</style>
