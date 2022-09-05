<template>
  <div ref="element">
    <Card>
      <CardHeader :title="operationName" :nodeId="nodeId" />
      <CardContainer>
        <CardOperationValues :value_1="value_1" :value_2="value_2" />
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
const value_1 = ref(0);
const value_2 = ref(0);
const valueTotal = ref(0);

const script = ref("");

// Methods
const buildScript = () => {
  dataNode.value.data.script = `
      def calculate(operation):
        a = ${value_1.value}
        b = ${value_2.value}
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
};

const updateNode = (value) => {
  dataNode.value.data.total = value;
  dataNode.value.data.value_1 = value_1.value;
  dataNode.value.data.value_2 = value_2.value;
  buildScript();

  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value.data);
};

const calculateOperation = (operation) => {
  if (operation === "add") return sum(value_1.value, value_2.value);
  if (operation === "subs") return subs(value_1.value, value_2.value);
  if (operation === "mult") return mult(value_1.value, value_2.value);
  if (operation === "div") return div(value_1.value, value_2.value);
  if (operation === "mod") return mod(value_1.value, value_2.value);
  if (operation === "pow") return power(value_1.value, value_2.value);
};

const sumAllInputs = (numbers) =>
  numbers.reduce((sum, item) => sum + item, 0) || 0;

const getValueInputNodes = (nodes) => {
  if (!nodes) return 0;

  const numbers = nodes.map((node) => {
    const nodeName = node.name.toLowerCase();
    const isNumberCard = nodeName === "value";

    if (isNumberCard) return node.data.input ? Number(node.data.input) : 0;
    if (!isNumberCard) return Number(node.data.total);
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
    value_1.value = getValueInputNodes(nodes);
  }

  if (numberInput === 2) {
    const nodesId = getInputNodes(input2);
    value_2.value = getValueInputNodes(nodesId);
  }
};

const onCalculate = () => {
  const { inputs } = drawflow.getNodeFromId(nodeId.value);

  setInputNodes(1, inputs);
  setInputNodes(2, inputs);

  valueTotal.value = calculateOperation(operationName.value);
  updateNode(valueTotal.value);
};

//Main
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();

  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  // If exist any data before mounted, it will set it
  operationName.value = dataNode.value.name.toLowerCase();
  valueTotal.value = dataNode.value.total;
  script.value = dataNode.value.script;

  if (dataNode.value.inputs.input_1.connections.length) {
    setInputNodes(1, dataNode.value.inputs);
  }

  if (dataNode.value.inputs.input_2.connections.length) {
    setInputNodes(2, dataNode.value.inputs);
  }
});
</script>
