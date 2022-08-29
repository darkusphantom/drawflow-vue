<template>
  <div class="card-condition">
    <p class="condition-value">{{ valueA }}</p>
    <el-select v-model="selectedOption" @change="$emit('condition', $event)">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <p class="condition-value">{{ valueB }}</p>
  </div>
  <p class="condition-final">{{ result }}</p>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

defineProps({
  valueA: {
    type: Number,
    default: 0,
  },
  valueB: {
    type: Number,
    default: 0,
  },
  result: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["condition"]);

const selectedOption = ref("");
const options = [
  { label: "==", value: "equal" },
  { label: "!=", value: "nequal" },
  { label: ">", value: "greatthan" },
  { label: "<", value: "lessthan" },
  { label: ">=", value: "greateq" },
  { label: "<=", value: "lesseq" },
];
</script>

<style scoped>
.card-condition {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 95px;
  margin-bottom: 24px;
}

.card-condition .el-select {
  width: 100px;
}

.condition-value {
  color: #fff;
  font-size: 1.1rem;
}

.condition-final {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
}
</style>
