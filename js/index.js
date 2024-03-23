//import { buscaCEP } from "./validaCEP.js";

const modal = document.getElementById("modal");

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  const form = document.getElementById("form");
  form.reset();
  modal.classList.remove("active");
}

document.getElementById("btnNovoCliente").addEventListener("click", openModal);

document
  .getElementById("cancelarCliente")
  .addEventListener("click", closeModal);

document.getElementById("modalClose").addEventListener("click", closeModal);
