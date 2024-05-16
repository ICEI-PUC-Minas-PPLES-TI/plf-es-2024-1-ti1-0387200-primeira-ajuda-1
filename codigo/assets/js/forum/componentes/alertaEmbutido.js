import { CONTEUDO_ALERTA_EMBUTIDO } from "../utils.js"

const section = document.querySelector("#forum")
const postagensWrapper = document.querySelector("#postagensWrapper")

export function exibirAlertaEmbutido() {
    let div = document.createElement("div")

    div.setAttribute("class", "inline-alert")
    div.appendChild(document.createTextNode(CONTEUDO_ALERTA_EMBUTIDO))

    section.insertBefore(div, postagensWrapper)
}
