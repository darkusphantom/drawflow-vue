<template>
  <div class="card-condition">
    <p class="condition-value">Value 1</p>
    <el-select>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <p class="condition-value">Value 2</p>
  </div>
  <p class="condition-value">Final Value</p>
</template>

<script setup>
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-condition .el-select {
  width: 100px;
}

.condition-value {
  color: #000;
  font-size: 1.1rem;
}

.condition-value:last-child {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
