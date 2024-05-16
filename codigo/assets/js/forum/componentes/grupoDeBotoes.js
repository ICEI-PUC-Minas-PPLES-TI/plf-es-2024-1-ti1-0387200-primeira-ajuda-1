export function criarBotoes() {
    let editarBtn = document.createElement("button")
    let cancelarBtn = document.createElement("button")

    let cancelarBtnAtributos = {
        type: "button",
        id: "cancelarBtn"
    }

    let editarBtnAtributos = {
        type: "submit",
        id: "editarBtn",
        disabled: "true"
    }

    cancelarBtn.appendChild(document.createTextNode("Cancelar"))
    Object.keys(cancelarBtnAtributos).forEach((key) => cancelarBtn.setAttribute(key, cancelarBtnAtributos[key]))

    editarBtn.appendChild(document.createTextNode("Salvar Alterações"))
    Object.keys(editarBtnAtributos).forEach((key) => editarBtn.setAttribute(key, editarBtnAtributos[key]))

    return { editarBtn, cancelarBtn }
}

export function criarGrupoDeBotoes(id, editarBtn, cancelarBtn) {
    let atributos = {
        id: `grupoDeBotoes${id}`,
        class: "grupoDeBotoes"
    }

    let div = document.createElement("div")
    Object.keys(atributos).forEach((key) => div.setAttribute(key, atributos[key]))

    div.appendChild(cancelarBtn)
    div.appendChild(editarBtn)
    return div
}