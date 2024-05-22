const section = document.querySelector("#forum")
const formPrincipal = document.querySelector("#mainForm")
const btnPublicar = document.querySelector("#btnPublicar")
const textAreaPrincipal = document.querySelector("#mainTextArea")
const postagensWrapper = document.querySelector("#postagensWrapper")

function salvarPostagens(dados) {
    localStorage.setItem("postagens", JSON.stringify(dados))
}

function consultarPostagens() {
    return JSON.parse(localStorage.getItem("postagens")) || { data: [] }
}

function determinarId() {
    let id = parseInt(localStorage.getItem("id")) || 0
    id++
    localStorage.setItem("id", id)
    return id
}

function formataData(dateString) {
    return dateString.toLocaleString().replace(',', '')
}


const USUARIO = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    avatar: '../assets/img/avatar.svg'
}

function criarPostagem() {
    if (textAreaPrincipal.value) {
        let postagens = consultarPostagens()
        postagens.data.push({
            id: determinarId(),
            ...USUARIO,
            data: formataData(new Date()),
            conteudo: textAreaPrincipal.value.trim(),
        })

        formPrincipal.reset()
        salvarPostagens(postagens)
        imprimirPostagens()
    }
}

function exibirBanner(section) {
    let h2 = document.createElement("h2")
    h2.textContent = "Vamos Começar?"

    let p = document.createElement("p")
    p.textContent = "Parece que não temos nenhuma informação por aqui...Que tal criar uma nova publicação?"

    let div = document.createElement("div")
    div.appendChild(h2)
    div.appendChild(p)

    let img = document.createElement("img")
    img.src = "../assets/img/forum.svg"
    img.alt = "postagensEmpty"

    let article = document.createElement("article")
    article.className = "postagensEmpty"

    article.appendChild(div)
    article.appendChild(img)
    section.appendChild(article)
}

function montarPostagem(item) {
    let img = document.createElement("img")
    img.src = `${item.avatar}`
    img.alt = "avatar"

    let h4 = document.createElement("h4")
    h4.textContent = `${item.nome}`

    let p = document.createElement("p")
    let conteudo = [`${item.level} `, `| ${item.profissao} |`, ` ${item.data}`]
    conteudo.forEach((value) => {
        let span = document.createElement("span")
        span.textContent = value
        p.appendChild(span)
    })


    let infoDiv = document.createElement("div")
    infoDiv.appendChild(h4)
    infoDiv.appendChild(p)

    let divSuperior = document.createElement("div")
    divSuperior.appendChild(img)
    divSuperior.appendChild(infoDiv)


    let iconeEditar = document.createElement("i")
    iconeEditar.setAttribute("data-toggle", "tooltip")
    iconeEditar.setAttribute("title", "Editar Postagem")
    iconeEditar.classList.add("fa-solid", "fa-pen-to-square")

    iconeEditar.addEventListener('click', () => editarPostagem(`${item.id}`))

    let iconeDeletar = document.createElement("i")
    iconeDeletar.setAttribute("data-toggle", "tooltip")
    iconeDeletar.setAttribute("title", "Excluir Postagem")
    iconeDeletar.classList.add("fa-solid", "fa-trash")

    iconeDeletar.addEventListener('click', () => deletarPostagem(`${item.id}`))

    let divInferior = document.createElement("div")
    divInferior.appendChild(iconeEditar)
    divInferior.appendChild(iconeDeletar)

    let header = document.createElement("header")
    header.className = "postagemHeader"

    header.appendChild(divSuperior)
    header.appendChild(divInferior)

    let textArea = document.createElement("textarea")
    textArea.id = `textArea${item.id}`
    textArea.className = "textArea"
    textArea.disabled = true
    textArea.textContent = `${item.conteudo}`

    let form = document.createElement("form")
    form.className = "postForm"
    form.appendChild(textArea)

    let iconeCurtir = document.createElement("i")
    iconeCurtir.setAttribute("data-toggle", "tooltip")
    iconeCurtir.setAttribute("title", "Curtir Postagem")
    iconeCurtir.classList.add("fa-regular", "fa-heart")

    let iconeComentar = document.createElement("i")
    iconeComentar.setAttribute("data-toggle", "tooltip")
    iconeComentar.setAttribute("title", "Comentar Postagem")
    iconeComentar.classList.add("fa-regular", "fa-comment")

    let footer = document.createElement("footer")
    footer.className = "postagemFooter"
    footer.appendChild(iconeCurtir)
    footer.appendChild(iconeComentar)

    let article = document.createElement("article")
    article.className = "postagem"
    article.id = `${item.id}`
    article.appendChild(header)
    article.appendChild(form)
    article.appendChild(footer)

    return article
}

function imprimirPostagens() {
    let postagens = consultarPostagens()
    let { data } = postagens

    let banner = document.querySelector(".postagensEmpty")

    if (data.length === 0) {
        if (!banner) exibirBanner(section)
    } else {
        if (banner) banner.remove()
        postagensWrapper.innerHTML = data.reduce((postagens, item) => postagens + `${montarPostagem(item).outerHTML}`, ``)

    }
}

function deletarPostagem(id) {
    let postagens = consultarPostagens()
    let confirma = confirm("Deseja excluir essa postagem?")

    if (confirma) {
        alert("Sua postagem será excluída.")
        salvarPostagens({ data: postagens.data.filter((postagem) => postagem.id !== id) })
        imprimirPostagens()
    } else {
        alert("Ação cancelada!")
    }
}

function criarBotoes() {
    const CANCELAR_ATRIBUTOS = {
        type: "button",
        id: "cancelarBtn"
    }

    const EDITAR_ATRIBUTOS = {
        type: "submit",
        id: "editarBtn",
        disabled: "true"
    }

    let editarBtn = document.createElement("button")
    let cancelarBtn = document.createElement("button")

    cancelarBtn.appendChild(document.createTextNode("Cancelar"))
    Object.keys(CANCELAR_ATRIBUTOS).forEach((key) => cancelarBtn.setAttribute(key, CANCELAR_ATRIBUTOS[key]))

    editarBtn.appendChild(document.createTextNode("Salvar Alterações"))
    Object.keys(EDITAR_ATRIBUTOS).forEach((key) => editarBtn.setAttribute(key, EDITAR_ATRIBUTOS[key]))

    return { editarBtn, cancelarBtn }
}

function criarGrupoDeBotoes(id, editarBtn, cancelarBtn) {
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

function editarPostagem(id) {
    let postagemTextArea = document.querySelector(`#textArea${id}`)
    postagemTextArea.disabled = false

    let { editarBtn, cancelarBtn } = criarBotoes()
    cancelarBtn.addEventListener("click", imprimirPostagens)

    postagemTextArea.addEventListener("change", () => {
        editarBtn.disabled = false

        editarBtn.addEventListener("click", (evento) => {
            evento.preventDefault()

            if (postagemTextArea.value) {
                let postagens = consultarPostagens()
                let { data } = postagens


                salvarPostagens({
                    data: data.reduce(
                        (postagens, item) =>
                            item.id === id
                                ? [
                                    ...postagens,
                                    {
                                        ...item,
                                        conteudo: postagemTextArea.value.trim(),
                                        data: formataData(new Date()),
                                    },
                                ]
                                : [...postagens, item],
                        []
                    )
                })
                imprimirPostagens()
            }
        })
    })


    let grupoDeBotoes = document.querySelector(`#grupoDeBotoes${id}`)
    if (!grupoDeBotoes) postagemTextArea.parentElement.appendChild(criarGrupoDeBotoes(id, editarBtn, cancelarBtn))
}


document.querySelector("#mainForm").addEventListener("submit", (evento) => {
    evento.preventDefault()
    criarPostagem()
})

textAreaPrincipal.addEventListener("input", () => {
    btnPublicar.disabled = false;
    if (!textAreaPrincipal.value) btnPublicar.disabled = true
})

window.addEventListener("load", () => {
    imprimirPostagens()
    textAreaPrincipal.setSelectionRange(0, 0)
    textAreaPrincipal.focus()
})
