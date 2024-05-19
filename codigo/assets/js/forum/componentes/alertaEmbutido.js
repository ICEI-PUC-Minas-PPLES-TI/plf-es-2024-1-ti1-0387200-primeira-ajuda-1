const CONTEUDO_ALERTA_EMBUTIDO = `Para criar uma publicação é necessário adicionar um comentário`

export function exibirAlertaEmbutido(form, textArea) {
    let div = document.createElement("div")

    div.setAttribute("class", "alerta-embutido")
    div.appendChild(document.createTextNode(CONTEUDO_ALERTA_EMBUTIDO))

    form.insertBefore(div, textArea)
}


