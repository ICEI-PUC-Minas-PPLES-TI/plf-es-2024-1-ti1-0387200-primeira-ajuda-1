const CANCELAR_ATRIBUTOS = {
    type: "button",
    id: "cancelarBtn"
}

const EDITAR_ATRIBUTOS = {
    type: "submit",
    id: "editarBtn",
    disabled: "true"
}

export function criarBotoes() {
    let editarBtn = document.createElement("button")
    let cancelarBtn = document.createElement("button")

    cancelarBtn.appendChild(document.createTextNode("Cancelar"))
    Object.keys(CANCELAR_ATRIBUTOS).forEach((key) => cancelarBtn.setAttribute(key, CANCELAR_ATRIBUTOS[key]))

    editarBtn.appendChild(document.createTextNode("Salvar Alterações"))
    Object.keys(EDITAR_ATRIBUTOS).forEach((key) => editarBtn.setAttribute(key, EDITAR_ATRIBUTOS[key]))

    return { editarBtn, cancelarBtn }
}

export function criarGrupoDeBotoes(id, editarBtn, cancelarBtn) {
    let GRUPO_ATRIBUTOS = {
        id: `grupoDeBotoes${id}`,
        class: "grupoDeBotoes"
    }

    let div = document.createElement("div")
    Object.keys(GRUPO_ATRIBUTOS).forEach((key) => div.setAttribute(key, GRUPO_ATRIBUTOS[key]))

    div.appendChild(cancelarBtn)
    div.appendChild(editarBtn)
    return div
}