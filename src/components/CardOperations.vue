<template>
  <div ref="element">
    <Card>
      <CardHeader :title="operationName" />
      <CardContainer>
        <CardOperationValues :valueA="valueA" :valueB="valueB" />
        <el-button type="primary" @click="onCalculate">Calculate</el-button>
      </CardContainer>
      <CardFooter :valueTotal="valueTotal" />
    </Card>
  </div>
</template>
<script setup>
/* eslint-disable */
import {
  onMounted,
  onUpdated,
  ref,
  watch,
  getCurrentInstance,
  nextTick,
} from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";
import CardFooter from "./card/CardFooter.vue";
import CardOperationValues from "./card/CardOperationValues.vue";
import { sum, subs, mult, div, mod, power } from "../utils/Operations.js";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({}); // Node para la carta principal
const node1 = ref({}); // Node 1 y 2 son para inputs
const node2 = ref({});
let drawflow = null;
const operationName = ref("Operation");
const valueA = ref(0);
const valueB = ref(0);
const valueTotal = ref(0);

// Methods
const updateNode = (value) => {
  dataNode.value.data.result = value;
  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value);
};

const operations = (operation) => {
  if (operation === "add") valueTotal.value = sum(valueA.value, valueB.value);
  if (operation === "subs") valueTotal.value = subs(valueA.value, valueB.value);
  if (operation === "mult") valueTotal.value = mult(valueA.value, valueB.value);
  if (operation === "div") valueTotal.value = div(valueA.value, valueB.value);
  if (operation === "mod") valueTotal.value = mod(valueA.value, valueB.value);
  if (operation === "pow") valueTotal.value = power(valueA.value, valueB.value);

  updateNode(valueTotal.value);
};

const sumAllInputs = (numbers) =>
  numbers.reduce((sum, item) => sum + item, 0) || 0;

const getValueInputNodes = (nodes) => {
  if (!nodes) return 0;

  let total = 0;
  const getResult = (data) => { //Recursividad para obtener el result en el objeto data
    const isDataEmpty = !Object.entries(data).length;
    const isResult = data.result !== undefined;

    if (isDataEmpty) return;
    if (isResult) return data.result;
    if (!isResult) return getResult(data.data);
  };

  const numbers = nodes.map((node) => {
    const nodeName = node.name.toLowerCase();

    if (nodeName === "value") { //Retorna el valor del input en las cards value
      return node.data.input ? Number(node.data.input) : 0;
    }

    if (!(nodeName === "value")) { //Retorna el valor 
      if (!node.data.result) {
        return Number(getResult(node.data));
      }
    }
  });

  return sumAllInputs(numbers);
};

const getInputNodes = (input) => {
  const nodes = input.connections.map((connection) =>
    drawflow.getNodeFromId(connection.node)
  );

  if (input.connections.length) {
    return nodes;
  }
};

const setInputNodes = (numberInput) => {
  const { inputs } = drawflow.getNodeFromId(nodeId.value);
  const input1 = inputs.input_1;
  const input2 = inputs.input_2;

  if (numberInput === 1) {
    const nodes = getInputNodes(input1);
    valueA.value = getValueInputNodes(nodes);
  }

  if (numberInput === 2) {
    const nodesId = getInputNodes(input2);
    valueB.value = getValueInputNodes(nodesId);
  }
};

const onCalculate = () => {
  setInputNodes(1);
  setInputNodes(2);
  if (node1.value && node2.value) operations(operationName.value);
};

//Flow code
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  operationName.value = dataNode.value.name.toLowerCase();
});
</script>
