import { criarPostagem } from "./crud/criarPostagem.js"
import { editarPostagem } from "./crud/editarPostagem.js"
import { deletarPostagem } from "./crud/deletarPostagem.js"
import { imprimirPostagens } from "./crud/exibirPostagem.js"

export function salvarPostagens(dados) {
    localStorage.setItem("postagens", JSON.stringify(dados))
}

export function consultarPostagens() {
    return JSON.parse(localStorage.getItem("postagens")) || { data: [] }
}


document.querySelector("#btnPublicar").addEventListener("click", (evento) => {
    evento.preventDefault()
    criarPostagem()
})

window.editarPostagem = (id) => editarPostagem(id)
window.deletarPostagem = (id) => deletarPostagem(id)
window.addEventListener("load", imprimirPostagens)
