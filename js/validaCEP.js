import { CepAPI } from "./CepAPI.js";
const allowedKeys = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];
const cep = document.getElementById("cep");

const buscaCEP = (ev) => {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    cep.value += ev.key;
  }

  if (ev.key === "Backspace") {
    cep.value = cep.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    CepAPI(cep.value);
  }
  cep.addEventListener('blur', CepAPI(cep.value))
};

cep.addEventListener("keydown", buscaCEP);
