<template>
  <div ref="element">
    <Card>
      <CardHeader title="Loop" :nodeId="nodeId" />
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
import { onMounted, ref, getCurrentInstance, nextTick, watch } from "vue";
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

watch(valueInitial, (value) => console.log("A:", value));
watch(valueEnd, (value) => console.log("A:", value));

// Methods
const buildScript = () => {
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
};

const updateDataNode = (value) => {
  dataNode.value.data.total = value;
  buildScript();

  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value);
  console.log(dataNode.value.data);
};

const calculateOperation = (operation) => {
  if (operation === "add") return sum(valueA.value, valueB.value);
  if (operation === "subs") return subs(valueA.value, valueB.value);
  if (operation === "mult") return mult(valueA.value, valueB.value);
  if (operation === "div") return div(valueA.value, valueB.value);
  if (operation === "mod") return mod(valueA.value, valueB.value);
  if (operation === "pow") return power(valueA.value, valueB.value);
};

const getValueInputNode = (node) => {
  if (!node) return;

  const isCardValue = node.name === "Value";
  if (!isCardValue) return Number(node.data.total);
};

const getValueNode = (input) => {
  if (input.connections.length) {
    const nodeId = input.connections[0].node;
    inputNodeA.value = drawflow.getNodeFromId(nodeId);

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
    valueTotal.value = calculateOperation(operationName.value);
    updateDataNode(valueTotal.value);
    valueA.value = valueTotal.value;
  }

  //Reset values to prevent bad operations
  valueA.value = 0;
  valueInitial.value = 0;
  valueEnd.value = 0;
};

drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  valueTotal.value = dataNode.value.total;
  script.value = dataNode.value.script;
});
</script>
