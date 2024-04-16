const selecao = document.getElementById('clienteProcesso')
const form = {
  nome: document.getElementById('nomeClienteProcesso'),
  cpf: document.getElementById('cpfProcesso'),
  rua: document.getElementById('ruaProcesso'),
  num: document.getElementById('numeroEnderecoProcesso'),
  bairro: document.getElementById('bairroProcesso'),
  tel: document.getElementById('telefoneProcesso')
}
async function verificaCPF(CPF){
  try {
    const response = await fetch(`http://localhost:3000/buscar/${CPF}`)

    if(!response.ok){
      throw new Error(`Erro de rede - ${response.status}`)
    }

    const data = await response.json()


    form.nome.value = data[0].NOME
    form.cpf.value = data[0].CPF
    form.rua.value = data[0].RUA
    form.num.value = data[0].END_NUMERO
    form.bairro.value = data[0].BAIRRO
    form.tel.value = data[0].TELEFONE

    console.log(form.nome.value)
  } catch (error) {
    console.log("Erro durante a requisição", error.message)
  }
}

selecao.addEventListener('change', () => {
  verificaCPF(selecao.value)
})

