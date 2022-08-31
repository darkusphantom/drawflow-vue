<template>
  <div ref="element">
    <Card>
      <CardHeader title="Loop" />
      <CardContainer>
        <CardConditionValue
          :valueA="valueInitial"
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
/* eslint-disable*/
import { onMounted, ref, watch, getCurrentInstance, nextTick } from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";
import CardConditionValue from "./card/CardConditionValue";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({});
let drawflow = null;

const inputNodeA = ref(undefined);
const inputNodeB = ref(undefined);
const valueInitial = ref(0);
const valueB = ref(0);
const outputNodeA = ref(0);
const outputNodeB = ref(0);
const outputA = ref(0);
const outputB = ref(0);
const result = ref(false);

const conditionSelected = ref("");

//Watch
watch(outputNodeA, (value) => console.log(value));
watch(outputNodeB, (value) => console.log(value));
watch(outputA, (value) => console.log(value));
watch(outputB, (value) => console.log(value));
watch(result, (value) => console.log(value));

// Methods
const updateSelect = (value) => {
  dataNode.value.data.result = value;
  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value);
};

const getCondition = (condition) => {
  const a = valueInitial.value;
  const b = valueB.value;

  if (condition === "equal") return a === b;
  if (condition === "nequal") return a !== b;
  if (condition === "greatthan") return a > b;
  if (condition === "lessthan") return a < b;
  if (condition === "greateq") return a >= b;
  if (condition === "lesseq") return a <= b;
};

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

  if (isCardValue) return node.data.input ? Number(node.data.input) : 0;
  if (!isCardValue) return Number(getResult(node.data));
};

const getNode = (input) => {
  if (input.connections.length) {
    const node = input.connections[0].node;
    return drawflow.getNodeFromId(node);
  }
};

const setInputNodes = (numberInput, input) => {
  if (numberInput === 1) {
    inputNodeA.value = getNode(input);
    valueInitial.value = getValueInputNode(inputNodeA.value);
  }

  if (numberInput === 2) {
    inputNodeB.value = getNode(input);
    valueB.value = getValueInputNode(inputNodeB.value);
  }
};

const setOutputNodes = (numberInput, output) => {
  if (numberInput === 1) {
    outputNodeA.value = getNode(output);
    outputA.value = getValueInputNode(outputNodeA.value);
  }

  if (numberInput === 2) {
    outputNodeB.value = getNode(output);
    outputB.value = getValueInputNode(outputNodeB.value);
  }
};

const onCalculate = () => {
  const { inputs, outputs } = drawflow.getNodeFromId(nodeId.value);

  setInputNodes(1, inputs.input_1);
  setInputNodes(2, inputs.input_2);

  if (!inputNodeA.value && !inputNodeB.value) return;

  result.value = getCondition(conditionSelected);

  const saludar = (mensaje) => {
    console.log(mensaje);
  };

  const llamarSaludo = (saludo, callback) => {
    callback(saludo)
  };

  llamarSaludo("Hola bb", saludar);


  /*if (continueLoop) {
    setOutputNodes(1, outputs.output_1);
  }*/
};

drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  result.value = dataNode.value.result;
});
</script>
