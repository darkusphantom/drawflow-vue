import { drawflowData } from "../assets/data/drawflow.js";

const keyEditor = "PRGS_V1";
const initialEditorValue = drawflowData;

const getSavedEditor = () => {
  try {
    const localStorageEditor = localStorage.getItem(keyEditor);

    if (!localStorageEditor) {
      localStorage.setItem(keyEditor, JSON.stringify(initialEditorValue));
    }
  } catch (error) {
    console.error(error);
  }
};

const saveEditor = (editorValue) => {
  try {
    const stringifiedEditor = JSON.stringify(editorValue);
    localStorage.setItem(keyEditor, stringifiedEditor);
  } catch (error) {
    console.error(error);
  }
};

const deleteEditor = () => {
  try {
    localStorage.removeItem(keyEditor);
  } catch (error) {
    console.error(error);
  }
};

export { getSavedEditor, saveEditor, deleteEditor };
