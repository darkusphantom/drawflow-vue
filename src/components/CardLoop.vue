<template>
  <div ref="element">
    <Card>
      <CardHeader title="Loop" />
      <CardContainer>
        <CardInput
          id="loop-initial"
          title="Initial value"
          placeholder="Ingresa el valor inicial..."
          @value="valueInitial = $event"
        />
        <CardInput
          id="loop-to"
          title="To"
          placeholder="Ingresa hasta la cantidad de veces a repetir..."
          @value="valueEnd = $event"
        />
      </CardContainer>
      <el-button type="primary" @click="onCalculate" df-CardConditionValue
        >Calculate</el-button
      >
      <CardFooter :valueTotal="valueTotal" />
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, nextTick } from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";
import CardInput from "./card/CardInput.vue";
import CardFooter from "./card/CardFooter.vue";
import { sum, subs, mult, div, mod, power } from "../utils/Operations.js";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({});
const script = ref("");
let drawflow = null;

const inputNodeA = ref(undefined);
const operationName = ref("");
const valueA = ref(0);
const valueB = ref(0);
const valueInitial = ref(0);
const valueEnd = ref(0);
const valueTotal = ref(0);

// Methods
const updateDataNode = (value) => {
  dataNode.value.data.result = value;

  dataNode.value.data.script = `
      def calculate(operation):
        if operation == 'add': total += value
        if operation == 'subs': total -= value
        if operation == 'mult': total *= value
        if operation == 'div': total /= value
        if operation == 'mod': total %= value
      return total

      i = ${valueInitial.value}
      max = ${valueEnd.value}
      value = ${valueB.value}
      total = 0
      typeOperation = ${operationName.value.toLowerCase()}

      for i in range(max)
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

  return valueTotal.value;
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

const getValueNode = (input) => {
  if (input.connections.length) {
    const node = input.connections[0].node;
    inputNodeA.value = drawflow.getNodeFromId(node);

    return getValueInputNode(inputNodeA.value);
  }

  return 0;
};

const onCalculate = () => {
  if (!valueInitial.value && !valueEnd.value) return;

  const { inputs } = drawflow.getNodeFromId(nodeId.value);
  valueB.value = getValueNode(inputs.input_1);

  const { name } = inputNodeA.value;
  operationName.value = name.toLowerCase();

  for (let i = valueInitial.value; i < valueEnd.value; i++) {
    const operation = operations(operationName);
    updateDataNode(operation);
    valueA.value = valueTotal.value;
  }
};

drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  valueTotal.value = dataNode.value.result;
  script.value = dataNode.value.script;
});
</script>
