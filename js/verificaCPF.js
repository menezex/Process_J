const CPFInput = document.getElementById('cpf')

async function verificaCPF(CPF){
  try {
    const response = await fetch(`http://localhost:3000/buscar/${CPF}`)

    if(!response.ok){
      throw new Error(`Erro de rede - ${response.status}`)
    }

    const data = await response.json()

    if(data.length > 0){
      alert(`CPF já cadastrado no sistema, cliente: ${data[0].NOME}`)
    }else {
      return
    }
    
  } catch (error) {
    console.log("Erro durante a requisição", error.message)
  }
}

CPFInput.addEventListener('blur', ()=> {
  const CPF = CPFInput.value
  if(CPF.length < 11 || CPF.length > 11){
    alert('Verifique o tamanho digitado do CPF !')
    
  }
  verificaCPF(CPF)
})