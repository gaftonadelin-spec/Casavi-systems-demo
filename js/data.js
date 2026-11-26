/* Casavi Systems — conținut editabil: avantaje, zone de rute, flotă, țări. */

window.CASAVI_DATA = {
  advantages: [
    {
      tone: "red",
      icon: "clock",
      title: "Tranzit non-stop, fără timpi morți",
      text: "Fără restricțiile și pauzele obligatorii de tahograf ale camioanelor mari. Cu doi șoferi care se schimbă la volan, ajungem cu până la 40% mai repede la destinație."
    },
    {
      tone: "green",
      icon: "globe",
      title: "Acoperire completă Europa + UK",
      text: "Rute regulate și curse dedicate către Germania, Franța, Italia, Spania, Olanda, Belgia, Austria și Marea Britanie, inclusiv Londra și zonele urbane cu acces restricționat."
    },
    {
      tone: "amber",
      icon: "door",
      title: "Door-to-door, fără transbordare",
      text: "Marfa nu trece prin depozite intermediare. Pleacă din curtea ta și ajunge direct la destinatar, în aceeași dubă, cu același echipaj."
    },
    {
      tone: "blue",
      icon: "bolt",
      title: "Flexibilitate pentru urgențe",
      text: "Plecări rapide pentru paleți, colete voluminoase, piese auto, echipamente sau marfă urgentă. Încărcăm de regulă în aceeași zi sau a doua zi dimineață."
    }
  ],

  zones: [
    {
      id: "central",
      tone: "green",
      name: "Europa Centrală",
      transit: "24–36 h",
      countries: ["Ungaria", "Austria", "Germania", "Cehia", "Slovacia", "Polonia"],
      hubs: "Viena, München, Berlin, Praga"
    },
    {
      id: "west",
      tone: "red",
      name: "Europa de Vest",
      transit: "36–48 h",
      countries: ["Franța", "Belgia", "Olanda", "Luxemburg", "Danemarca"],
      hubs: "Paris, Lyon, Bruxelles, Rotterdam"
    },
    {
      id: "south",
      tone: "amber",
      name: "Europa de Sud",
      transit: "36–60 h",
      countries: ["Italia", "Spania", "Portugalia", "Grecia", "Slovenia", "Croația"],
      hubs: "Milano, Barcelona, Madrid, Atena"
    },
    {
      id: "uk",
      tone: "blue",
      name: "Coridorul UK",
      transit: "48–72 h",
      countries: ["Londra", "Birmingham", "Manchester", "Leeds", "Bristol"],
      hubs: "Traversare prin Calais–Dover sau Eurotunnel. Te ajutăm cu documentele vamale de după Brexit.",
      image: "./assets/van-uk.jpg",
      imageAlt: "Autoutilitară Casavi gri-albastră în trafic, în Londra"
    }
  ],

  fleet: [
    {
      name: "Dubă expres mare",
      model: "Ford Transit Custom",
      image: "./assets/van-fleet-1.jpg",
      imageAlt: "Ford Transit Custom roșu pe autostradă",
      tone: "red",
      specs: [
        ["Volum util", "6,0 m³"],
        ["Sarcină utilă", "până la 1.000 kg"],
        ["Compartiment (L×l×h)", "2,92 × 1,77 × 1,40 m"],
        ["Paleți EUR", "3 bucăți"]
      ]
    },
    {
      name: "Dubă expres sport",
      model: "Ford Transit Custom Sport",
      image: "./assets/van-express.jpg",
      imageAlt: "Ford Transit Custom verde lime pe un drum european",
      tone: "green",
      specs: [
        ["Volum util", "5,8 m³"],
        ["Sarcină utilă", "până la 950 kg"],
        ["Compartiment (L×l×h)", "2,77 × 1,77 × 1,40 m"],
        ["Paleți EUR", "3 bucăți"]
      ]
    },
    {
      name: "Dubă urbană compactă",
      model: "Ford Transit Connect",
      image: "./assets/van-fleet-2.jpg",
      imageAlt: "Ford Transit Connect alb parcat",
      tone: "amber",
      specs: [
        ["Volum util", "3,6 m³"],
        ["Sarcină utilă", "până la 750 kg"],
        ["Compartiment (L×l×h)", "2,15 × 1,50 × 1,27 m"],
        ["Paleți EUR", "1–2 bucăți"]
      ]
    }
  ],

  cargoTypes: [
    "Paleți",
    "Colete voluminoase",
    "Piese auto",
    "Echipamente / utilaje mici",
    "Mobilier",
    "Documente / marfă urgentă",
    "Altele"
  ],

  // Țări UE + Marea Britanie, cu zona folosită pentru timpul estimativ de tranzit
  countries: [
    { code: "RO", name: "România", zone: "home" },
    { code: "AT", name: "Austria", zone: "central" },
    { code: "BE", name: "Belgia", zone: "west" },
    { code: "BG", name: "Bulgaria", zone: "near" },
    { code: "HR", name: "Croația", zone: "south" },
    { code: "CY", name: "Cipru", zone: "south" },
    { code: "CZ", name: "Cehia", zone: "central" },
    { code: "DK", name: "Danemarca", zone: "west" },
    { code: "EE", name: "Estonia", zone: "central" },
    { code: "FI", name: "Finlanda", zone: "west" },
    { code: "FR", name: "Franța", zone: "west" },
    { code: "DE", name: "Germania", zone: "central" },
    { code: "GR", name: "Grecia", zone: "south" },
    { code: "HU", name: "Ungaria", zone: "near" },
    { code: "IE", name: "Irlanda", zone: "uk" },
    { code: "IT", name: "Italia", zone: "south" },
    { code: "LV", name: "Letonia", zone: "central" },
    { code: "LT", name: "Lituania", zone: "central" },
    { code: "LU", name: "Luxemburg", zone: "west" },
    { code: "MT", name: "Malta", zone: "south" },
    { code: "NL", name: "Olanda", zone: "west" },
    { code: "PL", name: "Polonia", zone: "central" },
    { code: "PT", name: "Portugalia", zone: "south" },
    { code: "SK", name: "Slovacia", zone: "central" },
    { code: "SI", name: "Slovenia", zone: "central" },
    { code: "ES", name: "Spania", zone: "south" },
    { code: "SE", name: "Suedia", zone: "west" },
    { code: "GB", name: "Marea Britanie", zone: "uk" }
  ],

  // Timp estimativ de tranzit pornind din România, pe zone
  transitByZone: {
    home: "12–24 h",
    near: "12–24 h",
    central: "24–36 h",
    west: "36–48 h",
    south: "36–60 h",
    uk: "48–72 h"
  }
};
