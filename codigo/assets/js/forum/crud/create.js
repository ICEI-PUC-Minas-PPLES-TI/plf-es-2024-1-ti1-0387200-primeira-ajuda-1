import { USUARIO } from "../utils.js"
import { imprimirPostagens } from "./read.js"
import { salvarPostagens, consultarPostagens } from "../main.js"
import { exibirAlertaEmbutido } from "../componentes/alertaEmbutido.js"

const formPrincipal = document.querySelector("#mainForm")
const textAreaPrincipal = document.querySelector("#mainTextArea")

function determinarId() {
    let id = parseInt(localStorage.getItem("id")) || 0
    id++
    localStorage.setItem("id", id)
    return id
}

export function criarPostagem() {
    let alertaEmbutido = document.querySelector(".inline-alert")

    if (textAreaPrincipal.value) {
        if (alertaEmbutido) alertaEmbutido.remove()

        let postagens = consultarPostagens()
        postagens.data.push({
            id: determinarId(),
            ...USUARIO,
            conteudo: textAreaPrincipal.value.trim(),
        })

        formPrincipal.reset()
        salvarPostagens(postagens)
        imprimirPostagens()
    } else {
        if (!alertaEmbutido) exibirAlertaEmbutido()
    }
}