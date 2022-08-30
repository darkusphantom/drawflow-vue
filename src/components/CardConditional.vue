<template>
  <div ref="element">
    <Card>
      <CardHeader :title="cardTitle" />
      <CardContainer>
        <CardConditionValue
          :valueA="valueA"
          :valueB="valueB"
          :result="result"
          @condition="conditionSelected = $event"
        />
      </CardContainer>
      <el-button type="primary" @click="onCalculate" df-CardConditionValue
        >Calculate</el-button
      >
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, nextTick } from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";
import CardConditionValue from "./card/CardConditionValue";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({});
const result = ref(false);
let drawflow = null;
const conditionSelected = ref("");
let cardTitle = ref("Conditional");
const nodeA = ref(undefined);
const nodeB = ref(undefined);
const valueA = ref(0);
const valueB = ref(0);

// Methods
const updateSelect = (value) => {
  dataNode.value.data.result = value;
  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value);
};

const operations = (condition) => {
  const a = valueA.value;
  const b = valueB.value;

  if (condition === "equal") result.value = a === b;
  if (condition === "nequal") result.value = a !== b;
  if (condition === "greatthan") result.value = a > b;
  if (condition === "lessthan") result.value = a < b;
  if (condition === "greateq") result.value = a >= b;
  if (condition === "lesseq") result.value = a <= b;

  updateSelect(result.value);
};

const getValueInputNode = (node) => {
  if (!node) return;

  /*const getResult = (data) => { //Recursividad para obtener el result en el objeto data
    const isDataEmpty = !Object.entries(data).length;
    const isResult = data.result !== undefined;

    if (isDataEmpty) return;
    if (isResult) return data.result;
    if (!isResult) return getResult(data.data);
  };*/

  return node.data.input ? Number(node.data.input) : 0;
};

const getInputNode = (input) => {
  if (input.connections.length) {
    const node = input.connections[0].node;

    return drawflow.getNodeFromId(node);
  }
};

const setInputNodes = (numberInput) => {
  const { inputs } = drawflow.getNodeFromId(nodeId.value);
  const input1 = inputs.input_1;
  const input2 = inputs.input_2;

  if (numberInput === 1) {
    nodeA.value = getInputNode(input1);
    valueA.value = getValueInputNode(nodeA.value);
  }

  if (numberInput === 2) {
    nodeB.value = getInputNode(input2);
    valueB.value = getValueInputNode(nodeB.value);
  }
};

const onCalculate = () => {
  setInputNodes(1);
  setInputNodes(2);

  if (nodeA.value && nodeB.value) operations(conditionSelected.value);
};

drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  cardTitle.value = dataNode.value.name.toLowerCase();
  result.value = dataNode.value.result;
});
</script>
