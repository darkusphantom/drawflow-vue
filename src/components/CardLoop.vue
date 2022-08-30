<template>
  <div ref="element">
    <Card>
      <CardHeader title="Loop" />
      <CardContainer>
        <CardInput
          id="loop-initial"
          title="Initial value"
          placeholder="Ingresa el valor..."
          @value="inputInitial = $event"
        />
        <CardInput
          id="loop-from"
          title="From"
          placeholder="Ingresa el valor..."
          @value="inputFrom = $event"
        />
        <CardInput
          id="loop-to"
          title="To"
          placeholder="Ingresa el valor..."
          @value="inputTo = $event"
        />
      </CardContainer>
    </Card>
  </div>
</template>

<script setup>
/* eslint-disable*/
import { ref, watch } from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";
import CardInput from "./card/CardInput.vue";
import CardSelect from "./card/CardSelect.vue";
import CardConditionValue from "./card/CardConditionValue";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({});
let drawflow = null;

const nodeA = ref(undefined);
const nodeB = ref(undefined);
const valueA = ref(0);
const valueB = ref(0);
const result = ref(false);

const optionSelected = ref("");
const inputInitial = ref("");
const inputFrom = ref("");
const inputTo = ref("");

//Watch
watch(inputInitial, (value) => console.log(value));
watch(inputFrom, (value) => console.log(value));
watch(inputTo, (value) => console.log(value));

// Methods
const updateSelect = (value) => {
  dataNode.value.data.result = value;
  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value);
};

const operations = () => {
  updateSelect(0);
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
