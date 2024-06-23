import { CadastroService } from "../../services/cadastroService.js";

let usuario = {}
const cadastroService = new CadastroService()
const buscarParametro = new URLSearchParams(window.location.search)
const id = buscarParametro.get("id")

const consultarSeletor = (variante) => document.querySelector(variante)
const consultarSeletores = (variante) => document.querySelectorAll(variante)

const form = consultarSeletor("form")
const nome = consultarSeletor("#nome")
const email = consultarSeletor("#email")
const bairro = consultarSeletor("#bairro")
const cidade = consultarSeletor("#cidade")
const telefone = consultarSeletor("#telefone")
const profissao = consultarSeletor("#profissao")

const avatar = consultarSeletores("#avatar")
const usuarioNome = consultarSeletor("#usuarioNome")
const usuarioLevel = consultarSeletor("#usuarioLevel")
const usuarioProfissao = consultarSeletor("#usuarioProfissao")

async function preencherPerfil() {
    if (!id) {
        console.error("ID do usuário não fornecido na URL")
        window.location.href = `/codigo/index.html`
        return
    }

    usuario = await cadastroService.getUsuario(id)
    if (Object.values(usuario).length === 0) {
        console.error("Usuário não encontrado")
        window.location.href = `/codigo/index.html`
        return
    }

    avatar[0].src = usuario.avatar
    avatar[1].src = usuario.avatar

    usuarioNome.textContent = usuario.nome
    usuarioProfissao.textContent = usuario.profissao

    usuarioLevel.textContent = usuario.level
    usuarioLevel.style.color = usuario.level === 'Bronze' ? '#A45A03' : usuario.level === 'Prata' ? '#C0C0C0' : '#FFD700'

    nome.value = usuario.nome
    email.value = usuario.email
    bairro.value = usuario.bairro
    cidade.value = usuario.cidade
    telefone.value = usuario.telefone
    profissao.value = usuario.profissao
}

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

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const dadosEditarUsuario = {}
    const valoresFormulario = new FormData(evento.target)
    valoresFormulario.forEach((value, key) => dadosEditarUsuario[key] = value)

    const resposta = await cadastroService.updateUsuario(id, {
        ...usuario,
        ...dadosEditarUsuario
    })

    if (resposta) {
        alert('Dados alterados com sucesso')
        window.location.reload()
    }
})

window.addEventListener('DOMContentLoaded', preencherPerfil)