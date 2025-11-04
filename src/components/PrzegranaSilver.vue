<script setup lang="ts">
import { useMainCompStore } from "../stores/mainCompStore";
import { onMounted, onUnmounted, useTemplateRef, nextTick } from "vue";
import { useFocusStore } from "../stores/focusStore";
import { useKolaStore } from "../stores/storeKola";
import ariatekst from "../lib/aria-texty.json";

const storeMainComp = useMainCompStore();
const storeFocus = useFocusStore();
const storeKola = useKolaStore();

const silverPrzegranaRef = useTemplateRef("przegrana-ref");

onMounted(async () => {
  if (storeFocus.ifPrzegranaSilverInFocus) {
    silverPrzegranaRef.value?.focus();
  }
  const sound_przegrana = new Audio(
    new URL("../assets/przegrana_gra.mp3", import.meta.url).href
  );
  await nextTick();
  sound_przegrana.play();
});

onUnmounted(() => {
  storeFocus.ifPrzegranaSilverInFocus = false;
});

async function jeszczeRaz() {
  storeMainComp.ifPrzegranaSilver = false;
  storeMainComp.ifSceneChose1 = true;
}

async function jeszczeRazInFocus(event: any) {
  event.preventDefault();
  storeFocus.ifPytanieInFocus = true;
  await nextTick();
  storeMainComp.ifPrzegranaSilver = false;
  storeMainComp.ifSceneChose1 = true;
}

function zakonczGre() {
  storeMainComp.ifPrzegranaSilver = false;
  storeMainComp.ifStart = true;
  storeKola.ifWymien = true;
  storeKola.ifFifty = true;
  storeKola.ifSeventy = true;
}

async function zakonczGreInFocus(event: any) {
  event.preventDefault();
  storeMainComp.ifPrzegranaSilver = false;
  storeMainComp.ifStart = true;
  storeKola.ifWymien = true;
  storeKola.ifFifty = true;
  storeKola.ifSeventy = true;
}
</script>

<template>
  <div class="tlo">
    <div class="container-fail-silver">
      <div class="circle">
        <div class="przekontna przekontna-a"></div>
        <div class="przekontna przekontna-b"></div>
      </div>
      <div
        class="text-container"
        ref="przegrana-ref"
        tabindex="0"
        :aria-label="ariatekst.komunikatSrebrny"
      >
        <p class="brawo">Przegrana!</p>
        <p class="text">Chcesz spróbować jeszcze raz?</p>
      </div>
      <div class="button-row">
        <button
          class="my-button button-win"
          @click="jeszczeRaz"
          @keydown.enter="jeszczeRazInFocus"
        >
          Zagraj jeszcze raz
        </button>
        <button
          class="my-button button-win"
          @click="zakonczGre"
          @keydown.enter="zakonczGreInFocus"
        >
          Zakończ grę
        </button>
      </div>
    </div>
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
}

.circle {
  width: 289px;
  height: 289px;
  border-radius: 150px;
  background-color: #093343;
  position: relative;
  top: 25px;
  left: 555px;
}

.przekontna {
  width: 230px;
  height: 15px;
  background-color: #f48506;
  position: absolute;
  top: 140px;
  left: 27px;
}

.przekontna-a {
  transform: rotate(45deg);
}

.przekontna-b {
  transform: rotate(135deg);
}

.container-fail-silver {
  width: 1400px;
  height: 700px;
  border-radius: 39px;
  background-color: #f48506;
  border: 5px solid #1d5488;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  font-family: "Proxima Nova", sans-serif;
  text-align: center;
  position: absolute;
  top: 231px;
  left: 267px;
}

/*.brawo {
  font-size: 64px;
  margin-top: 32px;
  margin-bottom: 0px;
  margin-left: 290px;
  margin-right: 290px;
}

.brawo:focus {
  outline: 3px solid black;
  outline-offset: 5px;
}

.text {
  margin-top: 20px;
  margin-bottom: 20px;
}

.ikona {
  margin-top: 20px;
}

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
}

.button-win {
  text-align: center;
  font-size: 36px;
  font-style: bold;
  font-weight: 400;
  font-family: "Proxima Nova", sans-serif;
  display: grid;
  place-content: center;
  width: 552px;
  height: 121px;
  border-radius: 39px;
  background-color: #093343;
  color: white;
  position: absolute;
}

.button-win:focus {
  outline: 5px solid black;
  outline-offset: 10px;
}

.button-text {
  margin-top: 0px;
  margin-bottom: 0px;
} */

.text-container {
  margin-left: 90px;
  margin-right: 90px;
}

.text-container:focus {
  outline: 3px solid black;
  outline-offset: 5px;
}

.brawo {
  font-size: 64px;
  margin-top: 32px;
  margin-bottom: 0px;
}

.text {
  margin-top: 20px;
  margin-bottom: 20px;
}

.ikona {
  margin-top: 20px;
}

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
}

.button-win {
  text-align: center;
  font-size: 36px;
  font-style: bold;
  font-weight: 400;
  font-family: "Proxima Nova", sans-serif;
  display: grid;
  place-content: center;
  width: 460px;
  height: 113px;
  border-radius: 39px;
  background-color: #093343;
  color: white;
  position: relative;
}

.button-win:focus {
  outline: 5px solid black;
  outline-offset: 10px;
}
</style>
