<script setup lang="ts">
import { useMainCompStore } from "../stores/mainCompStore";
import { useFocusStore } from "../stores/focusStore";
import { nextTick, useTemplateRef, onMounted, onUnmounted } from "vue";
import instrukcja_reader from "../lib/aria-texty.json";

const storeMainComp = useMainCompStore();
const storeFocus = useFocusStore();

//referencje do el html używane do obsługi focusa

const instrukcjaRef = useTemplateRef("instrukcja");

onMounted(() => {
  if (storeFocus.ifInstructionFocus) {
    instrukcjaRef.value?.focus();
  }
});

onUnmounted(() => {
  storeFocus.ifInstructionFocus = false;
});

async function Graj() {
  storeFocus.ifLevelChoseInFocus = false;
  await nextTick();
  storeMainComp.ifInstruction = false;
  storeMainComp.ifSceneChose1 = true;
}

async function grajWithFocus(event: any) {
  event.preventDefault();
  storeFocus.ifLevelChoseInFocus = true;
  await nextTick();
  storeMainComp.ifInstruction = false;
  storeMainComp.ifSceneChose1 = true;
}
</script>

<template>
  <div class="tlo" aria-label="Zasady gry">
    <div class="container">
      <div class="inner-box">
        <h1 class="title">Zasady gry</h1>
        <div class="kola-ratunkowe">
          <span class="kola-napis">Koła ratunkowe:</span>
          <div class="kola-elementy">
            <div class="elipsa elipsa-seven">
              <img class="line-diagonal" src="../assets/line.png" />
              <p class="elipsa-fifty-text">2</p>
            </div>
            <p class="podpis-1">usuń dwie</p>
            <p class="podpis-1">niepoprawne odpowiedzi</p>
          </div>
          <div class="kola-elementy">
            <div class="elipsa elipsa-fifty">
              <img class="line-diagonal" src="../assets/line.png" />
              <p class="elipsa-seventy-text">1</p>
            </div>
            <p class="podpis-1">usuń jedną</p>
            <p class="podpis-1">niepoprawną odpowiedź</p>
          </div>
          <div class="kola-elementy">
            <div class="elipsa elipsa-wymien">
              <img
                src="../assets/wymien.png"
                alt="wymien pytanie"
                width="60px"
                height="100px"
              />
            </div>
            <p class="podpis-1">wymień pytanie</p>
            <p class="podpis-1">pytanie</p>
          </div>
          <div class="kola-elementy">
            <div class="elipsa elipsa-podpowiedz">
              <img
                src="../assets/podpowiedz.png"
                alt="wymien pytanie"
                width="90px"
                height="80px"
              />
            </div>
            <p class="podpis-1">podpowiedź</p>
            <p class="podpis-1">&nbsp</p>
          </div>
        </div>
        <ol
          class="zasady"
          ref="instrukcja"
          tabindex="0"
          :aria-label="instrukcja_reader.instrukcja"
        >
          <li>
            Gra składa się z dwóch poziomów. Na każdym poziomie odpowiadasz na
            pięć pytań.
          </li>
          <li>
            Poziom 1 – masz trzy koła ratunkowe:
            <ul>
              <li>usuń dwie niepoprawne odpowiedzi</li>
              <li>usuń jedną niepoprawną odpowiedź</li>
              <li>wymień pytanie</li>
            </ul>
          </li>
          <li>Poziom 2 – masz dodatkowe koło ratunkowe: podpowiedź.</li>
          <li>Każde koło ratunkowe możesz wykorzystać tylko raz.</li>
          <li>
            Za każdą poprawną odpowiedź zdobywasz monetę. Niepoprawna odpowiedź
            oznacza koniec gry.
          </li>
          <li>
            Nagrody:
            <ul>
              <li>Jeśli wygrasz poziom 1, to otrzymujesz srebrny puchar.</li>
              <li>Jeśli wygrasz całą grę, to otrzymujesz złoty puchar.</li>
            </ul>
          </li>
          <!-- <p class="powodzenia-text">Powodzenia!</p> -->
          <p class="powodzenia-text">Powodzenia!</p>
        </ol>

        <button
          class="button-start my-button"
          @click="Graj"
          @keydown.enter="grajWithFocus"
        >
          Start
        </button>
      </div>
    </div>
  </div>
  <!-- <div class="linia-test"></div> -->
</template>

<style scoped>
.linia-test {
  width: 1900px;
  height: 4px;
  background-color: black;
  position: absolute;
  top: 340px;
  right: 0px;
  z-index: 2;
}

.tlo {
  background-image: url("../assets/latarnia.png");
  background-size: 1920px 1080px;
  height: 1080px;
  width: 1920px;
  top: 0px;
  left: 0px;
  position: absolute;
}

.container {
  display: flex;
  flex-direction: column;
  height: 1080px;
  justify-content: center;
  align-items: center;
}

.inner-box {
  height: 1000px;
  width: 1800px;
  background-color: #e7f1ff;
  border: 5px solid #02506c;
  border-radius: 82px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: #093343;
  font-size: 50px;
  font-style: bold;
  font-weight: 700;
  font-family: "Proxima Nova", sans-serif;
  margin-top: 0px;
}

.kola-ratunkowe {
  color: #093343;
  font-size: 35px;
  font-style: medium;
  font-weight: 500;
  font-family: "Proxima Nova", sans-serif;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  gap: 24px;
  position: relative;
  margin-left: 181px;
  margin-bottom: 10px;
}

li {
  margin-bottom: 10px;
}

.kola-elementy {
  display: inline-block;
  position: relative;
  text-align: center;
  margin-left: 0px;
  /* background-color: aqua; */
  width: 340px;
}

#kola-naglowek {
  margin-top: -110px;
}

.kola-napis {
  margin-left: -130px;
}

.elipsa {
  display: block;
  width: 158px;
  height: 118px;
  background-image: url("../assets/ellipse1.png");
  background-size: 158px 118px;
  background-repeat: no-repeat;
  margin-left: 80px;
  padding-top: 36px;
  margin-bottom: -20px;
}

.elipsa-seven {
  color: #093343;
  font-size: 50px;
  font-style: medium;
  font-weight: 500;
  font-family: "Proxima Nova", sans-serif;
  /* position: absolute; */
  top: 17px;
}

.elipsa-fifty {
  color: #093343;
  font-size: 50px;
  font-style: medium;
  font-weight: 500;
  font-family: "Proxima Nova", sans-serif;
  /* position: absolute; */
  top: 17px;
}

.line-diagonal {
  position: absolute;
  top: 40px;
  left: 130px;
}
.elipsa-seventy-text {
  position: absolute;
  top: -22px;
  left: 145px;
  /* background-image: url("../assets/line.png");
  background-size: 55px 38px;
  background-repeat: no-repeat; */
}

.elipsa-fifty-text {
  position: absolute;
  top: -22px;
  left: 145px;
}

.elipsa-wymien {
  padding-top: 15px !important;
  margin-bottom: -0px !important;
}

.elipsa-podpowiedz {
  padding-top: 21px !important;
  margin-bottom: -7px !important;
}

.podpis-1 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 30px;
  font-style: medium;
  font-weight: 500;
  font-family: "Proxima Nova", sans-serif;
}

.podpis-odpowiedz {
  margin-bottom: 42px !important;
  margin-left: 25px;
}

.podpis-wymien {
  margin-left: 25px;
}

.podpis-pytanie {
  margin-left: 25px;
}

.zasady {
  color: #093343;
  font-size: 30px;
  font-style: medium;
  font-weight: 500;
  font-family: "Proxima Nova", sans-serif;
  margin-left: 40px;
  margin-right: 50px;
  align-self: start;
}

.zasady:focus {
  outline: 2px solid black;
  outline-offset: 10px;
}

ul {
  list-style-type: disc;
}

.powodzenia-text {
  color: #093343;
  font-size: 30px;
  font-style: medium;
  font-weight: 500;
  font-family: "Proxima Nova", sans-serif;
  margin-top: 0px;
  margin-bottom: 0px;
}

.button-start {
  color: white;
  background-color: #093343;
  width: 260px;
  height: 93px;
  border-radius: 39px;
  font-size: 48px;
  font-style: bold;
  font-weight: 600;
  font-family: "Proxima Nova", sans-serif;
  position: relative;
  margin-top: -30px;
}

.button-start:focus {
  outline: 5px solid black;
  outline-offset: 10px;
}
</style>
