import { criarPostagem, editarPostagem, deletarPostagem, imprimirPostagens } from './postagemController.js'

document.querySelector("#mainForm").addEventListener("submit", (evento) => {
    evento.preventDefault()
    criarPostagem()
})

window.editarPostagem = (id) => editarPostagem(id)
window.deletarPostagem = (id) => deletarPostagem(id)
window.addEventListener("load", imprimirPostagens)
