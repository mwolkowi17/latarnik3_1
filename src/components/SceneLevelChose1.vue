<script setup lang="ts">
import { useMainCompStore } from "../stores/mainCompStore";

const storeMainComp = useMainCompStore();

function Level1() {
  storeMainComp.ifSceneChose1 = false;
  storeMainComp.ifMain1 = true;
}

function Level1Focus(event: any) {
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
    >
      Poziom 1
    </button>
    <button class="button-level2" disabled>Poziom 2</button>
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
