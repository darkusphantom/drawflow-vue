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
import { onMounted, ref, getCurrentInstance, nextTick } from "vue";
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
let drawflow = null;

const operationName = ref("Operation");
const valueA = ref(0);
const valueB = ref(0);
const valueTotal = ref(0);

const script = ref("");

// Methods
const updateNode = (value) => {
  dataNode.value.data.result = value;
  dataNode.value.data.valueA = valueA.value;
  dataNode.value.data.valueB = valueB.value;

  dataNode.value.data.script = `
      def calculate(operation):
        a = ${valueA.value}
        b = ${valueB.value}
        value = 0\n
        if operation == 'add': value = a+b
        if operation == 'subs': value = a-b
        if operation == 'mult': value = a*b
        if operation == 'div': value = a/b
        if operation == 'mod': value = a%b
        if operation == 'pow': value = a**b\n

      typeOperation = ${operationName.value.toLowerCase()}\n
      print(calculate(typeOperation))
    `;

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

  //Recursividad para obtener el result en el objeto data
  const getResult = (data) => {
    const isDataEmpty = !Object.entries(data).length;
    const isResult = data.result !== undefined;

    if (isDataEmpty) return;
    if (isResult) return data.result;
    if (!isResult) return getResult(data.data);
  };

  const numbers = nodes.map((node) => {
    const nodeName = node.name.toLowerCase();

    //Retorna el valor del input en las cards value
    if (nodeName === "value")
      return node.data.input ? Number(node.data.input) : 0;

    //Retorna el valor
    if (!(nodeName === "value")) {
      if (!node.data.result) return Number(getResult(node.data));
    }
  });

  return sumAllInputs(numbers);
};

const getInputNodes = (input) => {
  const nodes = input.connections.map((connection) =>
    drawflow.getNodeFromId(connection.node)
  );

  if (input.connections.length) return nodes;
};

const setInputNodes = (numberInput, inputs) => {
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
  const { inputs } = drawflow.getNodeFromId(nodeId.value);

  setInputNodes(1, inputs);
  setInputNodes(2, inputs);

  operations(operationName.value);
};

//Flow code
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();

  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  operationName.value = dataNode.value.name.toLowerCase();
  valueTotal.value = dataNode.value.result;
  script.value = dataNode.value.script;

  if (dataNode.value.inputs.input_1.connections.length) {
    setInputNodes(1, dataNode.value.inputs);
  }

  if (dataNode.value.inputs.input_2.connections.length) {
    setInputNodes(2, dataNode.value.inputs);
  }
});
</script>
