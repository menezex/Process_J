const dataPrazo = document.querySelectorAll('input[name="prazo"]');
const dataPrazoProcesso = document.getElementById('dataPrazoProcesso')

dataPrazo.forEach((data) => {
  data.addEventListener('click', function(){
    if(this.checked) {
      if(this.value === 'sim') {
        dataPrazoProcesso.disabled = false
      } else {
        dataPrazoProcesso.value = ''
        dataPrazoProcesso.disabled = true
      }
    }
  })
})

document.getElementById('causaProcesso').addEventListener('focus', () => {
  const inputCliente = document.getElementById('nomeClienteProcesso')
  const inputCpf = document.getElementById('cpfProcesso')

  inputCliente.disabled = false
  inputCpf.disabled = false
})
