async function excluirClienteBanco(cpf) {
  const response = await fetch(`http://localhost:3000/deletar/${cpf}`);

  if (!response.ok) {
    throw new Error(`Erro de rede - ${response.status}`);
  }

  location.reload();
}

const excluirCliente = (ev) => {
  if (ev.target.className === "btnExcluirCliente") {
    const [cpf, nome] = ev.target.id.split("-");
    console.log(cpf, nome);

    if (
      confirm(`Confirma a exclusão do cliente?
      ${nome} - CPF: ${cpf}`)
    ) {
      excluirClienteBanco(cpf);
      alert("Cliente excluido com sucesso!");
    }
  }
};

const btnExcluirCliente = document
  .querySelector("table > tbody")
  .addEventListener("click", excluirCliente);
