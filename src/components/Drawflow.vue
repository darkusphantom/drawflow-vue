<template>
  <el-container>
    <el-header class="header">
      <h3>Drawflow - Learn Programming</h3>
      <el-button type="primary" @click="exportEditor">Export</el-button>
    </el-header>
    <el-container class="container">
      <el-aside width="250px" class="column">
        <ul>
          <li
            v-for="node in listNodes"
            :key="node"
            draggable="true"
            :data-node="node.item"
            @dragstart="drag($event)"
            class="drag-drawflow"
          >
            <div class="node" :style="`background: ${node.color}`">
              {{ node.name }}
            </div>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <div
          id="drawflow"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        ></div>
      </el-main>
    </el-container>
  </el-container>
  <el-dialog v-model="dialogVisible" title="Export" width="50%">
    <span>Data:</span>
    <pre><code>{{dialogData}}</code></pre>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
/* eslint-disable */
import Drawflow from "drawflow";
import styleDrawflow from "drawflow/dist/drawflow.min.css";
import style from "../assets/style.css";
import {
  onMounted,
  onUpdated,
  shallowRef,
  h,
  getCurrentInstance,
  render,
  readonly,
  ref,
  watch,
} from "vue";
import { ListNodes } from "../assets/data/listNodes.js";
import { drawflowData } from "../assets/data/drawflow.js";
import CardValue from "./CardValue.vue";
import CardOperations from "./CardOperations.vue";
import CardConditional from "./CardConditional.vue";
import CardLoop from "./CardLoop.vue";

// Initialization drawflow
const listNodes = readonly(ListNodes);
const editor = shallowRef({});
const dialogVisible = ref(false);
const dialogData = ref({});
const Vue = { version: 3, h, render };
const internalInstance = getCurrentInstance();
internalInstance.appContext.app._context.config.globalProperties.$df = editor;

const exportEditor = () => {
  dialogData.value = editor.value.export();
  dialogVisible.value = true;
};

//Drag & Drop
let mobileItemSelec = "";
let mobileLastMove = null;
const positionMobile = (event) => (mobileLastMove = event);
const allowDrop = (event) => event.preventDefault();

const drag = (event) => {
  if (event.type === "touchstart") {
    mobileItemSelec = event.target
      .closest(".drag-drawflow")
      .getAttribute("data-node");
  } else {
    event.dataTransfer.setData("node", event.target.getAttribute("data-node"));
  }
};

const drop = (event) => {
  if (event.type === "touchend") {
    let parentdrawflow = document
      .elementFromPoint(
        mobileLastMove.touches[0].clientX,
        mobileLastMove.touches[0].clientY
      )
      .closest("#drawflow");
    if (parentdrawflow != null) {
      addNodeToDrawFlow(
        mobileItemSelec,
        mobileLastMove.touches[0].clientX,
        mobileLastMove.touches[0].clientY
      );
    }
    mobileItemSelec = "";
  } else {
    event.preventDefault();
    let data = event.dataTransfer.getData("node");
    addNodeToDrawFlow(data, event.clientX, event.clientY);
  }
};

const addNodeToDrawFlow = (name, pos_x, pos_y) => {
  let zoomValue = editor.value.zoom;
  let witdhCanvas = editor.value.precanvas.clientWidth;
  let heightCanvas = editor.value.precanvas.clientHeight;
  let positionElementCanvas = editor.value.precanvas.getBoundingClientRect();

  pos_x =
    pos_x * (witdhCanvas / (witdhCanvas * zoomValue)) -
    positionElementCanvas.x * (witdhCanvas / (witdhCanvas * zoomValue));
  pos_y =
    pos_y * (heightCanvas / (heightCanvas * zoomValue)) -
    positionElementCanvas.y * (heightCanvas / (heightCanvas * zoomValue));

  const nodeSelected = listNodes.find((element) => element.item == name);
  editor.value.addNode(
    name,
    nodeSelected.input,
    nodeSelected.output,
    pos_x,
    pos_y,
    name,
    {},
    name,
    "vue"
  );
};


//Life Cycle
onMounted(() => {
  const elements = [...document.getElementsByClassName("drag-drawflow")];
  elements.forEach((element) => {
    element.addEventListener("touchend", drop, false);
    element.addEventListener("touchmove", positionMobile, false);
    element.addEventListener("touchstart", drag, false);
  });

  const id = document.getElementById("drawflow");
  editor.value = new Drawflow(
    id,
    Vue,
    internalInstance.appContext.app._context
  );
  editor.value.start();

  editor.value.registerNode("Value", CardValue, {}, {});
  editor.value.registerNode("Conditional", CardConditional, {}, {});
  editor.value.registerNode("Loop", CardLoop, {}, {});
  editor.value.registerNode("Add", CardOperations, {}, {});
  editor.value.registerNode("Subs", CardOperations, {}, {});
  editor.value.registerNode("Mult", CardOperations, {}, {});
  editor.value.registerNode("Div", CardOperations, {}, {});
  //editor.value.import(drawflowData);
});

onUpdated(() => {
  console.log(editor.value);
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #494949;
}
.container {
  min-height: calc(100vh - 100px);
}
.column {
  border-right: 1px solid #494949;
}
.column ul {
  padding-inline-start: 0px;
  padding: 10px 10px;
}
.column li {
  background: transparent;
}
.node {
  border-radius: 8px;
  border: 2px solid #494949;
  display: block;
  height: 60px;
  line-height: 40px;
  padding: 10px;
  margin: 10px 0px;
  cursor: move;
}
#drawflow {
  width: 100%;
  height: 100%;
  text-align: initial;
  background: #2b2c30;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
}
.drawflow-node {
  width: auto;
}
</style>
