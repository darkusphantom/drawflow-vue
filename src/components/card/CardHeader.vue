<template>
  <div class="header" ref="element">
    <p class="header-text">{{ title }}</p>
    <div class="btn-delete">
      <el-button type="danger" :icon="Delete" @click="deleteCard" />
    </div>
  </div>
</template>
<script setup>
import { defineProps, toRefs, getCurrentInstance } from "vue";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps({
  title: {
    type: String,
    default: "Card",
  },
  nodeId: {
    type: String,
    default: "0",
  },
});
const { title, nodeId } = toRefs(props);
let drawflow = null;
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

const deleteCard = () => {
  console.log(drawflow);
  drawflow.removeNodeId(`node-${nodeId.value}`);
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #494949;
  padding: 10px 15px;
  border-radius: 10px 10px 0 0;
}

.header-text {
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
}

.btn-delete {
  width: 20px;
  margin-right: 10px;
}
</style>
