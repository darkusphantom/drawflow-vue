<template>
  <div ref="element">
    <Card>
      <CardHeader title="Script" :nodeId="nodeId" />
      <CardContainer>
        <p class="card-start">It's dangerous to go alone, check this!</p>
        <el-button type="info" size="small" @click="openEditor">Edit</el-button>
        <teleport to="body">
          <el-drawer
            v-model="drawer"
            title="Edit Options"
            :direction="direction"
            :before-close="handleClose"
          >
            <p>Code (Will be autosave)</p>
            <el-input
              v-model="textarea"
              :rows="8"
              df-script
              @change="updateScript"
              type="textarea"
              placeholder="Please input"
            />
          </el-drawer>
        </teleport>
      </CardContainer>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, nextTick } from "vue";
import Card from "./card/Card.vue";
import CardContainer from "./card/CardContainer.vue";
import CardHeader from "./card/CardHeader.vue";
import { ElMessageBox } from "element-plus";

// Vars
const element = ref("");
const nodeId = ref(0);
const dataNode = ref({});
const inputNode = ref({});
let drawflow = null;

const isOpenFirstTime = ref(true);
const textarea = ref("");
const drawer = ref(false);
const direction = ref("rtl");
const handleClose = (done) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      done();
    })
    .catch((error) => {
      console.error(error);
    });
};

// Methods
const updateScript = (value) => {
  dataNode.value.data.script = value;
  drawflow.updateNodeDataFromId(nodeId.value, dataNode.value);
};

const openEditor = () => {
  if (isOpenFirstTime.value) {
    const { inputs } = drawflow.getNodeFromId(nodeId.value);

    const inputId = inputs.input_1.connections[0].node;
    inputNode.value = drawflow.getNodeFromId(inputId);

    const dataScript = inputNode.value.data;
    textarea.value = dataScript.data.script;

    isOpenFirstTime.value = false;
  }

  drawer.value = true;
};

//Main
drawflow = getCurrentInstance().appContext.config.globalProperties.$df.value;

onMounted(async () => {
  await nextTick();

  nodeId.value = element.value.parentElement.parentElement.id.slice(5);
  dataNode.value = drawflow.getNodeFromId(nodeId.value);
  textarea.value = dataNode.value.data.script;
});
</script>

<style>
.card-start {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 12px;
}
</style>
