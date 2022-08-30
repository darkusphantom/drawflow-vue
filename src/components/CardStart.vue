<template>
  <div ref="element">
    <Card>
      <CardHeader title="Start" />
      <CardContainer>
        <p class="card-start">Here's start your adventure</p>
      </CardContainer>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, nextTick } from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({});
let drawflow = null;

// Methods

// Flow code
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);
});
</script>

<style>
.card-start {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}
</style>
