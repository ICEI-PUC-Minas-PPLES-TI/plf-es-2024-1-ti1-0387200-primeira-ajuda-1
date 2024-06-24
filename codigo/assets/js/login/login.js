import { CadastroService } from "../../services/cadastroService.js";

const cadastroService = new CadastroService()
const consultarSeletor = (variante) => document.querySelector(variante)

const form = consultarSeletor('form')
const senhaInput = consultarSeletor('#senha')
const mensagemErroLogin = consultarSeletor('#mensagemErro')
const mensagemErroSenha = consultarSeletor('#mensagemErroSenha')

senhaInput.addEventListener('input', () => {
    mensagemErroSenha.style.display = 'none'
    mensagemErroLogin.style.display = 'none'
})

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const dadosLoginUsuario = {}
    const valoresFormulario = new FormData(evento.target)
    valoresFormulario.forEach((value, key) => dadosLoginUsuario[key] = value)

    const usuariosCadastrados = await cadastroService.getUsuarios()
    const usuarioRecuperado = usuariosCadastrados.find((usuario) => usuario.email === dadosLoginUsuario.email)

    if (usuarioRecuperado) {
        if (usuarioRecuperado.senha === dadosLoginUsuario.senha) {
            localStorage.setItem('usuario', JSON.stringify(usuarioRecuperado))
            window.location.href = `/codigo/pages/perfil.html?id=${usuarioRecuperado.id}`
        } else {
            mensagemErroSenha.style.display = 'flex'
        }
    } else {
        mensagemErroLogin.style.display = 'flex'
    }
})

