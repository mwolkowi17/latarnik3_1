import { defineStore } from "pinia";
import { nextTick, ref } from "vue";
import { useScene2Store } from "./scene2Store";
import { metodyPomocnicze } from "../lib/metody-pomocnicze";
import { useKolaStore } from "./storeKola";

export const useKola2Store = defineStore("kola_store2", () => {
  const storeSceneMain = useScene2Store();
  //pomocniczo żeby wyłączyć koła użyte w pierwszej części
  const storeKolaPrevious = useKolaStore();

  //wyswietlanie ikon podpowiedzi
  const ifWymien = ref(true);
  const ifFifty = ref(true);
  const ifSeventy = ref(true);
  const ifButtonPodpowiedz = ref(true);

  //flaga wskazujaca na uzycie koła w kolejce pytań gracza
  const ifSkorzystałZKola = ref(false);

  //flaga blokująca użycie kół
  const ifZablokowaneKola = ref(false);

  function UpdateKolaUzyte() {
    if (!storeKolaPrevious.ifWymien) {
      ifWymien.value = false;
    } else {
      ifWymien.value = true;
    }

    if (!storeKolaPrevious.ifFifty) {
      ifFifty.value = false;
    } else {
      ifFifty.value = true;
    }

    if (!storeKolaPrevious.ifSeventy) {
      ifSeventy.value = false;
    } else {
      ifSeventy.value = true;
    }
  }

  async function PokazPodpowiedz() {
    ifSkorzystałZKola.value = true;
    await nextTick();
    storeSceneMain.ifPodpowiedz = true;
    ifButtonPodpowiedz.value = false;
  }

  async function WymienPytanie() {
    ifSkorzystałZKola.value = true;
    await nextTick();
    storeSceneMain.addQuestionLevel1();
    ifWymien.value = false;
  }

  async function UsunJedna() {
    ifSkorzystałZKola.value = true;
    await nextTick();
    console.log("usuwam jedą odpwowiedź");
    ifSeventy.value = false;

    if (
      metodyPomocnicze.sprawdzOdpowiedz(1, storeSceneMain.nrOdpowiedziDobrej) !=
        true &&
      storeSceneMain.ifOdpowiedz1 === true
    ) {
      storeSceneMain.ifOdpowiedz1 = false;
    } else if (
      metodyPomocnicze.sprawdzOdpowiedz(2, storeSceneMain.nrOdpowiedziDobrej) !=
        true &&
      storeSceneMain.ifOdpowiedz2 === true
    ) {
      storeSceneMain.ifOdpowiedz2 = false;
    } else if (
      metodyPomocnicze.sprawdzOdpowiedz(3, storeSceneMain.nrOdpowiedziDobrej) !=
        true &&
      storeSceneMain.ifOdpowiedz3 === true
    ) {
      storeSceneMain.ifOdpowiedz3 = false;
    } else {
      storeSceneMain.ifOdpowiedz4 = false;
    }
  }

  async function UsunDwie() {
    ifSkorzystałZKola.value = true;
    await nextTick();
    let jendaJuzJest = 0;
    console.log("usuwam dwie");

    ifFifty.value = false;
    if (
      metodyPomocnicze.sprawdzOdpowiedz(1, storeSceneMain.nrOdpowiedziDobrej) !=
        true &&
      storeSceneMain.ifOdpowiedz1 === true
    ) {
      storeSceneMain.ifOdpowiedz1 = false;
      jendaJuzJest++;
    }
    if (
      metodyPomocnicze.sprawdzOdpowiedz(2, storeSceneMain.nrOdpowiedziDobrej) !=
        true &&
      storeSceneMain.ifOdpowiedz2 === true
    ) {
      storeSceneMain.ifOdpowiedz2 = false;
      jendaJuzJest++;
      await nextTick();
      if (jendaJuzJest === 2) {
        return;
      }
    }
    if (
      metodyPomocnicze.sprawdzOdpowiedz(3, storeSceneMain.nrOdpowiedziDobrej) !=
        true &&
      storeSceneMain.ifOdpowiedz3 === true
    ) {
      storeSceneMain.ifOdpowiedz3 = false;
      jendaJuzJest++;
      await nextTick();
      if (jendaJuzJest === 2) {
        return;
      }
    }
    if (
      metodyPomocnicze.sprawdzOdpowiedz(4, storeSceneMain.nrOdpowiedziDobrej) !=
        true &&
      storeSceneMain.ifOdpowiedz4 === true
    ) {
      storeSceneMain.ifOdpowiedz4 = false;
      jendaJuzJest++;
      await nextTick();
      if (jendaJuzJest === 2) {
        return;
      }
    }
  }

  function ResetKolRatunkowych() {
    ifWymien.value = true;
    ifFifty.value = true;
    ifSeventy.value = true;
    ifButtonPodpowiedz.value = true;
    ifSkorzystałZKola.value = false;
  }

  return {
    ifWymien,
    ifFifty,
    ifSeventy,
    ifButtonPodpowiedz,
    ifSkorzystałZKola,
    ifZablokowaneKola,
    UpdateKolaUzyte,
    PokazPodpowiedz,
    WymienPytanie,
    UsunJedna,
    UsunDwie,
    ResetKolRatunkowych,
  };
});
