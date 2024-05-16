import { criarPostagem } from "./crud/create.js"
import { imprimirPostagens } from "./crud/read.js"
import { atualizarPostagens } from "./crud/update.js"

import { confirmarAcao, REMOVE_POSTAGEM } from "./utils.js"

import { criarBotoes } from "./componentes/grupoDeBotoes.js"
import { criarGrupoDeBotoes } from "./componentes/grupoDeBotoes.js"

// localStorage.clear()

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

window.removerPostagem = (id) => {
    let postagens = consultarPostagens()

    if (confirmarAcao(REMOVE_POSTAGEM)) {
        salvarPostagens({
            data: postagens.data.filter((postagem) => postagem.id !== id),
        })
        imprimirPostagens()
    }
}

window.editarPostagem = (id) => {
    let postagemTextArea = document.querySelector(`#textArea${id}`)
    postagemTextArea.disabled = false

    let { editarBtn, cancelarBtn } = criarBotoes()
    cancelarBtn.addEventListener("click", imprimirPostagens)

    postagemTextArea.addEventListener("change", () => {
        editarBtn.disabled = false

        editarBtn.addEventListener("click", (e) => {
            e.preventDefault()

            if (postagemTextArea.value) {
                salvarPostagens({ data: atualizarPostagens(id, postagemTextArea.value.trim()) })
                imprimirPostagens()
            }
        })
    })


    let grupoDeBotoes = document.querySelector(`#grupoDeBotoes${id}`)
    if (!grupoDeBotoes) postagemTextArea.parentElement.appendChild(criarGrupoDeBotoes(id, editarBtn, cancelarBtn))
}

window.addEventListener("load", imprimirPostagens)
