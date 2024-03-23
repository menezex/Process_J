function RuaBairro(cep) {
  const rua = document.getElementById("rua");
  const bairro = document.getElementById("bairro");

  if (cep.logradouro === undefined) {
    rua.value = "Verifique o CEP digitado";
    bairro.value = "Verifique o CEP digitado";
  } else {
    rua.value = cep.logradouro;
    bairro.value = cep.bairro;
  }
}

async function CepAPI(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
    (res) => res.json()
  );

  RuaBairro(response);
}

export { CepAPI };
