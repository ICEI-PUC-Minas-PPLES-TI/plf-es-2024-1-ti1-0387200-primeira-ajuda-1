import { CadastroService } from "../../services/cadastroService.js"

let usuario = {}
var senhasValidadas = false
const cadastroService = new CadastroService()
const urlSearchParams = new URLSearchParams(window.location.search)
const id = urlSearchParams.get("id")

const consultarSeletor = (variante) => document.querySelector(variante)
const form = consultarSeletor("form")
const nome = consultarSeletor("#nome")
const email = consultarSeletor("#email")
const senha = consultarSeletor("#senha")
const bairro = consultarSeletor("#bairro")
const cidade = consultarSeletor("#cidade")
const telefone = consultarSeletor("#telefone")
const profissao = consultarSeletor("#profissao")
const confirmaSenha = consultarSeletor("#confirmaSenha")
const dataTableBody = consultarSeletor("#dataTable tbody")

async function preencherFormularioDeCadastro(id) {
  usuario = await cadastroService.getUsuario(id)

  if (!usuario) {
    window.location.href = window.location.pathname
    return
  }

  nome.value = usuario.nome
  email.value = usuario.email
  senha.value = usuario.senha
  bairro.value = usuario.bairro
  cidade.value = usuario.cidade
  telefone.value = usuario.telefone
  profissao.value = usuario.profissao
}

async function deletarUsuario(id) {
  const confirma = confirm('Deseja excluir esse usuário?')
  if (confirma) {
    const resposta = await cadastroService.deleteUsuario(id)
    if (resposta) {
      alert("Usuário deletado com sucesso!")
      window.location.href = window.location.pathname
    }
  } else {
    alert('Ação cancelada!')
  }
}

async function preencherTabela() {
  const usuarios = await cadastroService.getUsuarios()

  usuarios.forEach((usuario) => {
    dataTableBody.innerHTML += `
        <tr>
          <td>${usuario.nome}</td>
          <td>${usuario.telefone}</td>
          <td>${usuario.cidade}</td>
          <td>${usuario.bairro}</td>
          <td>${usuario.profissao}</td>
          <td>${usuario.email}</td>
          <td>
            <a href="${window.location.pathname}?id=${usuario.id}">
              <button>Editar</button>
            </a>
          </td>
          <td>
            <button onclick="deletarUsuario(${usuario.id})">
              Excluir
            </button>
          </td>
          <td>
            <a href="/codigo/pages/perfil.html?id=${usuario.id}" target="_blank">
              <button>Perfil</button>
            </a>
          </td>
        </tr>
      `
  })
}

confirmaSenha.addEventListener('keyup', ({ target }) => {
  if (target.value.length === 0) {
    senhasValidadas = false
    mensagemErro.style.display = 'none'

    target.classList.remove('senhasValidas')
    target.classList.remove('senhasInvalidas')
    senha.classList.remove('senhasValidas')
    senha.classList.remove('senhasInvalidas')

  } else if (target.value != senha.value) {
    senhasValidadas = false
    mensagemErro.style.display = 'block'

    target.classList.add('senhasInvalidas')
    senha.classList.add('senhasInvalidas')
  } else {
    senhasValidadas = true
    mensagemErro.style.display = 'none'

    target.classList.remove('senhasInvalidas')
    target.classList.add('senhasValidas')
    senha.classList.remove('senhasInvalidas')
    senha.classList.add('senhasValidas')
  }
})

form.addEventListener("submit", async (evento) => {
  evento.preventDefault()

  if (senhasValidadas) {
    const dadosEdiatUsuario = {}

    const valoresFormulario = new FormData(evento.target)
    valoresFormulario.forEach((value, key) => dadosEdiatUsuario[key] = value)
    delete dadosEdiatUsuario['confirmaSenha']

    const resposta = await cadastroService.updateUsuario(id, {
      ...usuario,
      ...dadosEdiatUsuario
    })


    localStorage.setItem('usuario', JSON.stringify(resposta))
    evento.target.reset()

    if (resposta) {
      alert("Usuário editado com sucesso!")
      window.location.href = window.location.pathname
    }
  }
})

window.deletarUsuario = (id) => deletarUsuario(id)

window.addEventListener("DOMContentLoaded", () => {
  preencherTabela()

  if (urlSearchParams.has("id")) {
    preencherFormularioDeCadastro(id)
  }
})
