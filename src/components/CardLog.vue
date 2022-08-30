<template>
  <div ref="element">
    <Card>
      <CardHeader title="Card" />
      <CardContainer>
        <p class="card-log">
          Press "calculate", then F12 and check the console
        </p>
        <el-button type="primary" @click="showConsole">Calculate</el-button>
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
//const nodeA = ref({});
let drawflow = null;

// Methods
const getValueInputNode = (node) => {
  if (!node) return;

  const getResult = (data) => {
    const isDataEmpty = !Object.entries(data).length;
    const isResult = data.result !== undefined;

    if (isDataEmpty) return;
    if (isResult) return data.result;
    if (!isResult) return getResult(data.data);
  };

  const isCardValue = node.name === "Value";
  const isCardConditional = node.name === "Conditional";

  if (isCardValue) {
    return node.data.input ? Number(node.data.input) : 0;
  }

  if (!isCardConditional && !isCardValue) {
    return Number(getResult(node.data));
  }

  if (isCardConditional) {
    console.log(node.data);
    return getResult(node.data);
  }
};

const getInput = (input) => {
  if (input.connections.length) {
    const node = input.connections[0].node;
    return drawflow.getNodeFromId(node);
  }
};

const showConsole = () => {
  const { inputs } = drawflow.getNodeFromId(nodeId.value);

  const data = getInput(inputs.input_1);
  const value = getValueInputNode(data);

  console.log(value);
};

// Flow code
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);
});
</script>

<style>
.card-log {
  color: #fff;
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
}
</style>
