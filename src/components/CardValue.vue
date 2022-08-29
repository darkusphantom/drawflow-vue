<template>
  <div ref="element">
    <Card>
      <CardHeader title="Card" />
      <CardContainer>
        <CardSelect
          title="Select a type:"
          type="value"
          @option="updateSelect($event)"
          df-optionSelected
        />
        <CardInput
          id="value"
          title="Ingresa un valor:"
          placeholder="Ingresa el valor..."
          @value="updateInput($event)"
          df-input
        />
      </CardContainer>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, nextTick } from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";
import CardInput from "./card/CardInput.vue";
import CardSelect from "./card/CardSelect.vue";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({});
const optionSelected = ref("");
const input = ref("");
let drawflow = null;

// Methods
const updateSelect = (value) => {
  dataNode.value.data.option = value;
  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value);
};

const updateInput = (value) => (input.value = value);

// Flow code
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();
  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);

  optionSelected.value = dataNode.value.data.option;
  input.value = dataNode.value.data.input;
});
</script>
