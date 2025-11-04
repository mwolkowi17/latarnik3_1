<script setup lang="ts">
import { useMainCompStore } from "../stores/mainCompStore";
import { useFocusStore } from "../stores/focusStore";

import { useTemplateRef, onMounted, nextTick, onUnmounted } from "vue";

const storeMainComp = useMainCompStore();
const storeFocus = useFocusStore();

//referencje do el html używane do obsługi focusa

const wybierzLevel1Ref = useTemplateRef("level2");

onMounted(() => {
  console.log(storeFocus.ifLevelChoseInFocus);
  if (storeFocus.ifLevelChoseInFocus) {
    wybierzLevel1Ref.value?.focus();
  }
});

onUnmounted(() => {
  storeFocus.ifLevelChoseInFocus = false;
});

async function Level1() {
  storeMainComp.ifSceneChose2 = false;
  storeMainComp.ifMain1 = true;
}

async function Level1Focus(event: any) {
  storeFocus.ifPytanieInFocus = true;
  await nextTick();
  event.preventDefault();
  storeMainComp.ifSceneChose2 = false;
  storeMainComp.ifMain1 = true;
}

async function Level2() {
  storeMainComp.ifSceneChose2 = false;
  storeMainComp.ifMain2 = true;
}

async function Level2Focus(event: any) {
  storeFocus.ifPytanieInFocus = true;
  event.preventDefault();
  storeMainComp.ifSceneChose2 = false;
  storeMainComp.ifMain2 = true;
}
</script>
<template>
  <div class="tlo">
    <button
      class="button-level1 my-button"
      @click="Level1"
      @keydown.enter="Level1Focus"
      ref="level2"
    >
      Poziom 1
    </button>
    <button
      class="button-level2 my-button"
      @click="Level2"
      @keydown.enter="Level2Focus"
    >
      Poziom 2
    </button>
  </div>
</template>
<style scoped>
.tlo {
  background-image: url("../assets/latarnia.png");
  background-size: 1920px 1080px;
  height: 1080px;
  width: 1920px;
  top: 0px;
  left: 0px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.button-level1 {
  /* position: absolute; */
  color: white;
  background-color: #093343;
  width: 550px;
  height: 153px;
  border-radius: 39px;
  font-size: 48px;
  font-style: bold;
  font-weight: 600;
  font-family: "Proxima Nova", sans-serif;
  margin-right: 200px;
}

.button-level2 {
  /* position: absolute; */
  color: white;
  background-color: #093343;
  width: 550px;
  height: 153px;
  border-radius: 39px;
  font-size: 48px;
  font-style: bold;
  font-weight: 600;
  font-family: "Proxima Nova", sans-serif;
}

.button-level1:focus {
  outline: 5px solid black;
  outline-offset: 10px;
}
.button-level2:focus {
  outline: 5px solid black;
  outline-offset: 10px;
}
</style>
