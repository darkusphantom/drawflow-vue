<template>
  <div ref="element">
    <Card>
      <CardHeader :title="cardTitle" :nodeId="nodeId" />
      <CardContainer>
        <CardConditionValue
          :valueA="value_1"
          :valueB="value_2"
          :result="condition"
          @condition="conditionSelected = $event"
          df-condition
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
const condition = ref(false);
let drawflow = null;
const conditionSelected = ref("");
let cardTitle = ref("Conditional");
const nodeA = ref(undefined);
const nodeB = ref(undefined);
const value_1 = ref(0);
const value_2 = ref(0);

// Methods
const buildScript = () => {
  dataNode.value.data.script = `
    def calculate(operation):
      a = ${value_1.value}
      b = ${value_2.value}
      value = 0\n
      if operation == 'equal': value a == b
      if operation == 'nequal': value = a != b
      if operation == 'greatthan': value = a > b
      if operation == 'lessthan': value = a < b
      if operation == 'greateq': value = a >= b
      if operation == 'lesseq': value = a <= b\n
    
    typeOperation = ${conditionSelected.value}
    print(typeOperation)
    `;
};

const updateSelect = (value) => {
  dataNode.value.data.condition = value;
  buildScript();

  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value.data);
};

const calculateCondition = (condition) => {
  const a = value_1.value;
  const b = value_2.value;

  if (condition === "equal") return a === b;
  if (condition === "nequal") return a !== b;
  if (condition === "greatthan") return a > b;
  if (condition === "lessthan") return a < b;
  if (condition === "greateq") return a >= b;
  if (condition === "lesseq") return a <= b;
};

const getValueInputNode = (node) => {
  if (!node) return;

  const isCardValue = node.name === "Value";
  if (isCardValue) return node.data.input ? Number(node.data.input) : 0;
  if (!isCardValue) return Number(node.data.total);
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
    value_1.value = getValueInputNode(nodeA.value);
  }

  if (numberInput === 2) {
    nodeB.value = getInputNode(input2);
    value_2.value = getValueInputNode(nodeB.value);
  }
};

const onCalculate = () => {
  setInputNodes(1);
  setInputNodes(2);

  const isNodesEmpty = !nodeA.value && !nodeB.value;
  if (isNodesEmpty) return;

  condition.value = calculateCondition(conditionSelected.value);
  updateSelect(condition.value);
};

drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  cardTitle.value = dataNode.value.name.toLowerCase();
  condition.value = dataNode.value.condition;
});
</script>
