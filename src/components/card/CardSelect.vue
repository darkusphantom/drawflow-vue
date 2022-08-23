<template>
  <div class="card-option">
    <label for="type">{{ title }}</label>
    <el-select
      v-model="selectedOption"
      class="m-2"
      placeholder="Select"
      size="large"
      @change="$emit('option', $event)"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive, toRefs } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Select",
  },
  type: {
    type: String,
    default: "",
  },
});
defineEmits(["option"]);

const { title, type } = toRefs(props);
let options = reactive([]);
const selectedOption = ref("");

// Methods
const checkType = () => {
  if (type.value === "value") {
    options = [
      { label: "Int", value: "int" },
      { label: "Float", value: "float" },
      { label: "Bool", value: "bool" },
    ];
  }

  if (type.value === "conditional") {
    options = [
      { label: "If", value: "if" },
      { label: "Else", value: "else" },
    ];
  }
};
checkType();
</script>

<style scoped>
.card-option {
  display: flex;
  flex-direction: column;
}

.card-option:not(.card-input:last-child) {
  margin-bottom: 32px;
}

.card-option label {
  color: #fff;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.card-option select {
  width: 50%;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  text-transform: capitalize;
}
</style>
