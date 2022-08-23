<template>
  <div class="header">{{ title }}</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ["title"],
});
</script>

<style scoped>
div {
  background: #494949;
  padding: 10px 15px;
  border-radius: 10px 10px 0 0;
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
