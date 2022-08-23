<template>
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
let optionSelected = ref("");
let cardTitle = ref("");
const inputInitial = ref("");
const inputFrom = ref("");
const inputTo = ref("");

//Watch
watch(inputInitial, (value) => {
  console.log(value);
});

// Methods
</script>
