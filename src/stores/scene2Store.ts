import { defineStore } from "pinia";
import { ref, nextTick } from "vue";
import gameData from "../lib/pytania.json";
import pointsPosition from "../lib/pozycjaRamki.json";
//import polozenieOdpowiedzi from "../lib/odpowiedziPozycje.json";
import { metodyPomocnicze } from "../lib/metody-pomocnicze";
import { useMainCompStore } from "../stores/mainCompStore";
import { useTimer2Store } from "./timer2Store";
import { useKola2Store } from "./store2Kola";
import { useFocusStore } from "./focusStore";

export const useScene2Store = defineStore("storeScene2", () => {
  //dostęp do store'ów
  const storeSceneMain = useMainCompStore();
  const timerStore = useTimer2Store();
  const storeKola = useKola2Store();
  const storeFocus = useFocusStore();

  //sterowanie komponentami głównej sceny
  const ifPodpowiedz = ref(false);
  const ifPrawidlowaOdpowiedz = ref(false);
  const ifZlaOdpowiedz = ref(false);

  //widocznosc odpowiedzi

  const ifOdpowiedz1 = ref(true);
  const ifOdpowiedz2 = ref(true);
  const ifOdpowiedz3 = ref(true);
  const ifOdpowiedz4 = ref(true);

  //blokowanie odpowiedzi
  const ifZablokowanaOdpowiedz = ref(false);

  //refy do elementów
  const pytanieTempRef = ref<HTMLElement | null>(null);

  //położenie odpowiedzi, po zmianach położenie odpowiedzi jest stałe, ale na razie zostawiam...
  //const nrKolekcjiPolozenPytan = ref(0);

  const odpowiedz1Polozenie = ref(["786px", "32px"]);

  const odpowiedz2Polozenie = ref(["786px", "675px"]);

  const odpowiedz3Polozenie = ref(["930px", "32px"]);

  const odpowiedz4Polozenie = ref(["930px", "675px"]);

  //położenie ramki punktacji
  const ramkaPunktacjaWysokosc = ref(pointsPosition.pozycjaRamki[5]);

  //liczik punktacji (sterownie ramką punktacji)
  const licznikPunktacja = ref(5);

  // właściwości dot pytań
  const kolekcjaPytan = ref(gameData.poziom2);
  const kolekcjaPytanB = ref(gameData.poziom2b);
  const kolekcjaPytanC = ref(gameData.poziom2c);
  const pytanie = ref("pytanie");
  const odpowiedz1 = ref("odpowiedz1");
  const odpowiedz2 = ref("odpowiedz2");
  const odpowiedz3 = ref("odpowiedz3");
  const odpowiedz4 = ref("odpowiedz4");
  const podpowiedzTresc = ref("tresc podpowiedzi");
  const nrOdpowiedziDobrej = ref(0);
  const wybranaOdpowiedz = ref(0);

  const nrKolejki = ref(0);

  //właściwości koloru punktacji
  const backgroundColorOdpowiedz1 = ref("#D7E2F1");
  const backgroundColorOdpowiedz2 = ref("#D7E2F1");
  const backgroundColorOdpowiedz3 = ref("#D7E2F1");
  const backgroundColorOdpowiedz4 = ref("#D7E2F1");

  //metoda dodajaca losowo pytania
  async function addQuestionLevel1() {
    storeKola.ifZablokowaneKola = false;
    console.log("kola? " + storeKola.ifZablokowaneKola);
    //await nextTick();
    ifOdpowiedz1.value = true;
    ifOdpowiedz2.value = true;
    ifOdpowiedz3.value = true;
    ifOdpowiedz4.value = true;
    ifPodpowiedz.value = false;

    backgroundColorOdpowiedz1.value = "#D7E2F1";
    backgroundColorOdpowiedz2.value = "#D7E2F1";
    backgroundColorOdpowiedz3.value = "#D7E2F1";
    backgroundColorOdpowiedz4.value = "#D7E2F1";
    //const kolekcjaPytan = gameData.poziom1;
    let iloscElementowKolekcjiPytan = gameData.poziom1.length - nrKolejki.value;
    let pytanieNr: number;
    pytanieNr = metodyPomocnicze.wybierzPytanie(iloscElementowKolekcjiPytan);
    console.log("wyswietlane pytanie:" + pytanieNr);

    await nextTick();
    nrKolejki.value++;
    pytanie.value = kolekcjaPytan.value[pytanieNr]?.pytanie ?? "";
    podpowiedzTresc.value = kolekcjaPytan.value[pytanieNr]?.podpowiedz ?? "";
    odpowiedz1.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz1 ?? "";
    odpowiedz2.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz2 ?? "";
    odpowiedz3.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz3 ?? "";
    odpowiedz4.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz4 ?? "";
    nrOdpowiedziDobrej.value =
      Number(kolekcjaPytan.value[pytanieNr]?.prawidlowa_odpowiedz) || 0;
    //wybranaOdpowiedz.value = nrWybranegoPytania;

    await nextTick();
    function pytanieNrindex(_: (typeof kolekcjaPytan.value)[0], index: number) {
      return index !== pytanieNr;
    }
    const result = kolekcjaPytan.value.filter(pytanieNrindex);
    kolekcjaPytan.value = result;
    console.log(kolekcjaPytan.value);
    await nextTick();
    console.log("oczekiwana odpowiedz:" + nrOdpowiedziDobrej.value);
    ifZablokowanaOdpowiedz.value = false;
    //to tylko informacyjne w wer developerskiej, na produkcji usunąć
    if (nrKolejki.value === 5) {
      console.log("koniec etapu2");
    }
  }

  //sprawdzanie odpoiwedzi
  function sprawdzOdpowiedz(nrWybranegoPytania: number) {
    storeKola.ifSkorzystałZKola = false;
    console.log("wybrana odpowiedz:" + nrWybranegoPytania);
    if (
      metodyPomocnicze.sprawdzOdpowiedz(
        nrWybranegoPytania,
        nrOdpowiedziDobrej.value
      ) === true
    ) {
      console.log("prawidłowa odpowiedz");
      ifPrawidlowaOdpowiedz.value = true;
    }
    if (
      metodyPomocnicze.sprawdzOdpowiedz(
        nrWybranegoPytania,
        nrOdpowiedziDobrej.value
      ) === false
    ) {
      console.log("zła odpowiedz");
      ifZlaOdpowiedz.value = true;
    }
  }

  //obsługa punktacji
  async function ramkaPunktyMove() {
    licznikPunktacja.value = licznikPunktacja.value + 1;
    await nextTick();
    ramkaPunktacjaWysokosc.value =
      pointsPosition.pozycjaRamki[licznikPunktacja.value];
  }

  //obsługa odpowiedzi

  async function Odpowiedz1(buttonNumber: number) {
    sprawdzOdpowiedz(buttonNumber);
    await nextTick();
    if (ifPrawidlowaOdpowiedz.value === true) {
      setTimeout(() => {
        addQuestionLevel1();
        ifPrawidlowaOdpowiedz.value = false;
        //obsługa focusa
        if (storeFocus.ifPytanieInFocus) {
          pytanieTempRef.value?.focus();
        }

        ramkaPunktyMove();
        timerStore.isPaused = false;
        timerStore.timeScene1Local = 20;
        if (licznikPunktacja.value === 10) {
          timerStore.isPaused = true;
          storeSceneMain.ifMain2 = false;
          storeSceneMain.ifWinGold = true;
        }
      }, 3000);
    } else {
      setTimeout(() => {
        //obsługa focusa
        if (storeFocus.ifPytanieInFocus) {
          storeFocus.ifPrzegranaSilverInFocus = true;
        }
        ifZlaOdpowiedz.value = false;
        storeSceneMain.ifMain2 = false;
        storeSceneMain.ifPrzegranaGold = true;
      }, 3000);
    }
  }

  //metoda podająca punktację do czytnika nvda

  function czytajPunkty() {
    let puntkyCzytaj = "";
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[5]) {
      puntkyCzytaj = "odpowiedź za jedną złotą monetę";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[6]) {
      puntkyCzytaj = "odpowiedź za dwie złote monety";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[7]) {
      puntkyCzytaj = "odpowiedź za trzy złote monety";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[8]) {
      puntkyCzytaj = "odpowiedź za cztery złote monety";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[9]) {
      puntkyCzytaj = "odpowiedź premiowana złotym pucharem";
    }
    return puntkyCzytaj;
  }

  // metoda resetująca scenę
  function ResetScene() {
    licznikPunktacja.value = 5;
    ramkaPunktacjaWysokosc.value = pointsPosition.pozycjaRamki[5];
    nrKolejki.value = 0;
    kolekcjaPytan.value = gameData.poziom2;
    console.log(kolekcjaPytan.value);
  }

  return {
    ifPodpowiedz,
    ifPrawidlowaOdpowiedz,
    ifZlaOdpowiedz,
    ramkaPunktacjaWysokosc,
    kolekcjaPytan,
    kolekcjaPytanB,
    kolekcjaPytanC,
    pytanie,
    pytanieTempRef,
    ifOdpowiedz1,
    ifOdpowiedz2,
    ifOdpowiedz3,
    ifOdpowiedz4,
    odpowiedz1,
    odpowiedz2,
    odpowiedz3,
    odpowiedz4,
    ifZablokowanaOdpowiedz,
    backgroundColorOdpowiedz1,
    backgroundColorOdpowiedz2,
    backgroundColorOdpowiedz3,
    backgroundColorOdpowiedz4,
    odpowiedz1Polozenie,
    odpowiedz2Polozenie,
    odpowiedz3Polozenie,
    odpowiedz4Polozenie,
    podpowiedzTresc,
    nrOdpowiedziDobrej,
    wybranaOdpowiedz,
    licznikPunktacja,
    nrKolejki,
    // nrKolekcjiPolozenPytan,
    addQuestionLevel1,
    sprawdzOdpowiedz,
    ramkaPunktyMove,
    Odpowiedz1,
    czytajPunkty,
    ResetScene,
  };
});
