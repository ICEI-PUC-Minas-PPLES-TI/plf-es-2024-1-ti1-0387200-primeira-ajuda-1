import { CadastroService } from "../../services/cadastroService.js";

const cadastroService = new CadastroService()
const consultarSeletor = (variante) => document.querySelector(variante)

var senhasValidadas = false
const form = consultarSeletor("form")
const senha = consultarSeletor("#senha")
const telefone = consultarSeletor("#telefone")
const confirmaSenha = consultarSeletor("#confirmaSenha")

telefone.addEventListener('input', ({ target }) => {
  let valor = target.value.replace(/\D/g, '')
  let valorFormatado = ''

  if (valor.length > 0) {
    valorFormatado += '(' + valor.substring(0, 2)
  }
  if (valor.length >= 3) {
    valorFormatado += ') ' + valor.substring(2, 7)
  }
  if (valor.length >= 8) {
    valorFormatado += '-' + valor.substring(7, 11)
  }

  target.value = valorFormatado
})

confirmaSenha.addEventListener('keyup', ({ target }) => {
  if (target.value.length === 0) {
    senhasValidadas = false

    target.classList.remove('senhasValidas')
    target.classList.remove('senhasInvalidas')
    senha.classList.remove('senhasValidas')
    senha.classList.remove('senhasInvalidas')

  } else if (target.value != senha.value) {
    senhasValidadas = false

    target.classList.add('senhasInvalidas')
    senha.classList.add('senhasInvalidas')
  } else {
    senhasValidadas = true

    target.classList.remove('senhasInvalidas')
    target.classList.add('senhasValidas')
    senha.classList.remove('senhasInvalidas')
    senha.classList.add('senhasValidas')
  }
})

form.addEventListener('reset', () => {
  senha.classList.remove('senhasValidas')
  senha.classList.remove('senhasInvalidas')
  confirmaSenha.classList.remove('senhasValidas')
  confirmaSenha.classList.remove('senhasInvalidas')
})

form.addEventListener("submit", async (evento) => {
  evento.preventDefault()

  if (senhasValidadas) {
    const dadosCadastroUsuario = {}

    const valoresFormulario = new FormData(evento.target)
    valoresFormulario.forEach((value, key) => dadosCadastroUsuario[key] = value)

    const resposta = await cadastroService.createUsuario(dadosCadastroUsuario)
    if (resposta) {
      evento.target.reset()
      alert("Usuário cadastrado com sucesso!")
      window.location.href = ""
    }
  }
})


