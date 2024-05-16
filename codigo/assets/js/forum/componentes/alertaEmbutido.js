import { CONTEUDO_ALERTA_EMBUTIDO } from "../utils.js"

export function exibirAlertaEmbutido(form, textArea) {
    let div = document.createElement("div")

    div.setAttribute("class", "alerta-embutido")
    div.appendChild(document.createTextNode(CONTEUDO_ALERTA_EMBUTIDO))

    form.insertBefore(div, textArea)
}
