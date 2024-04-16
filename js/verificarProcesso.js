const NumProcesso = document.getElementById("numProcesso");

async function validaProcesso(processo) {
  try {
    const response = await fetch(
      `http://localhost:3000/buscarProcesso/${processo}`
    );

    if (!response.ok) {
      throw new Error(`Erro de rede - ${(await response).status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data.length > 0) {
      alert(`Número de processo já cadastrado no sistema.
            Cliente: ${data[0].NOME}
            CPF: ${data[0].CPF}`);
    } else {
      return;
    }
  } catch (error) {
    console.log("Erro durante a requisição", error.message);
  }
}

NumProcesso.addEventListener("blur", () => {
  const processo = NumProcesso.value;
  if (processo === "") {
    alert("NÚMERO DO PROCESSO NÃO PODE SER VAZIO");
  } else {
    validaProcesso(processo);
  }
});
