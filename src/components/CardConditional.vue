<template>
  <Card>
    <CardHeader title="Conditional" />
    <CardContainer>
      <CardSelect
        title="Select if or else:"
        type="conditional"
        @option="optionSelected = $event"
      />
      <CardConditionValue />
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

//Watch
watch(optionSelected, (value) => {
  console.log(optionSelected.value);
});

// Methods
</script>
