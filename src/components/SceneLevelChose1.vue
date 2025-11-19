<script setup lang="ts">
import { useMainCompStore } from "../stores/mainCompStore";
import { useFocusStore } from "../stores/focusStore";
import { useTemplateRef, onMounted, nextTick } from "vue";

const storeMainComp = useMainCompStore();
const storeFocus = useFocusStore();

//referencje do el html używane do obsługi focusa

const wybierzLevel1Ref = useTemplateRef("level1");

onMounted(() => {
  console.log(storeFocus.ifLevelChoseInFocus);
  if (storeFocus.ifLevelChoseInFocus) {
    wybierzLevel1Ref.value?.focus();
  }
});

onMounted(() => {
  storeFocus.ifLevelChoseInFocus = false;
});

async function Level1() {
  storeFocus.ifPytanieInFocus = false;
  await nextTick();
  storeMainComp.ifSceneChose1 = false;
  storeMainComp.ifMain1 = true;
}

async function Level1Focus(event: any) {
  storeFocus.ifPytanieInFocus = true;
  await nextTick();
  event.preventDefault();
  storeMainComp.ifSceneChose1 = false;
  storeMainComp.ifMain1 = true;
}
</script>
<template>
  <div class="tlo">
    <button
      class="button-level1 my-button"
      @click="Level1"
      @keydown.enter="Level1Focus"
      ref="level1"
    >
      Poziom 1
    </button>
    <button class="button-level2" disabled>
      <img class="klodka-image" src="../assets/klodka.png" />
      Poziom 2
    </button>
  </div>
</template>
<style scoped>
.tlo {
  background-image: url("../assets/latarnia.jpg");
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
  color: white;
  background-color: #6b6f71;
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

.klodka-image {
  position: absolute;
  top: 537px;
  left: 1500px;
}
</style>
