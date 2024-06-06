const section = document.querySelector("#forum")
const formPrincipal = document.querySelector("#mainForm")
const btnPublicar = document.querySelector("#btnPublicar")
const iconePublicar = document.querySelector("#btnPublicar i")
const textAreaPrincipal = document.querySelector("#mainTextArea")
const postagensWrapper = document.querySelector("#postagensWrapper")

const USUARIO = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    avatar: '../assets/img/avatar.svg'
}

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

function posicionarCursor(seletor) {
    seletor.setSelectionRange(0, 0)
    seletor.focus()
}

function redimensionarAltura() {
    textAreaPrincipal.style.height = 'auto'
    textAreaPrincipal.style.height = textAreaPrincipal.scrollHeight + 'px'
}

function controlarBtnPublicar() {
    let verificador = textAreaPrincipal.value.trim() === ''

    btnPublicar.disabled = verificador
    btnPublicar.style.cursor = verificador ? 'not-allowed' : 'pointer'
    iconePublicar.style.cursor = verificador ? 'not-allowed' : 'pointer'
    formPrincipal.style.flexFlow = verificador ? 'row' : 'column'
}

function criarPostagem() {
    let postagens = consultarPostagens()

    postagens.data.push({
        id: determinarId(),
        ...USUARIO,
        data: formataData(new Date()),
        conteudo: textAreaPrincipal.value.trim(),
    })

    salvarPostagens(postagens)
    imprimirPostagens()
}

function exibirBanner() {
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

function montarIcone(classNames, tooltip) {
    let icone = document.createElement("i");
    icone.setAttribute("data-toggle", "tooltip");
    icone.setAttribute("title", tooltip);
    classNames.forEach(className => icone.classList.add(className));
    return icone;
}

function montarPostagem(item) {
    let img = document.createElement("img")
    img.src = item.avatar
    img.alt = "avatar"

    let h4 = document.createElement("h4")
    h4.textContent = item.nome

    let p = document.createElement("p")
    let conteudos = [`${item.level} `, `| ${item.profissao} |`, ` ${item.data}`]
    conteudos.forEach((conteudo) => {
        let span = document.createElement("span")
        span.textContent = conteudo
        p.appendChild(span)
    })

    let infoDiv = document.createElement("div")
    infoDiv.appendChild(h4)
    infoDiv.appendChild(p)

    let divSuperior = document.createElement("div")
    divSuperior.appendChild(img)
    divSuperior.appendChild(infoDiv)

    let iconeEditar = montarIcone(["fa-solid", "fa-pen-to-square"], "Editar Postagem")
    let iconeDeletar = montarIcone(["fa-solid", "fa-trash"], "Excluir Postagem")

    iconeEditar.addEventListener("click", console.log('teste'))

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
    textArea.textContent = item.conteudo

    let form = document.createElement("form")
    form.className = "postForm"
    form.appendChild(textArea)

    let iconeCurtir = montarIcone(["fa-regular", "fa-heart"], "Curtir Postagem")
    let iconeComentar = montarIcone(["fa-regular", "fa-comment"], "Comentar Postagem")

    let footer = document.createElement("footer")
    footer.className = "postagemFooter"
    footer.appendChild(iconeCurtir)
    footer.appendChild(iconeComentar)

    let article = document.createElement("article")
    article.id = item.id
    article.className = "postagem"
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
        if (!banner) exibirBanner()
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

    cancelarBtn.textContent = "Cancelar"
    Object.keys(CANCELAR_ATRIBUTOS).forEach((key) => cancelarBtn.setAttribute(key, CANCELAR_ATRIBUTOS[key]))

    editarBtn.textContent = "Salvar Alterações"
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

textAreaPrincipal.addEventListener("input", () => {
    controlarBtnPublicar()
    redimensionarAltura()
})

formPrincipal.addEventListener("submit", (evento) => {
    evento.preventDefault()

    criarPostagem()
    formPrincipal.reset()
    controlarBtnPublicar()
    redimensionarAltura()
    posicionarCursor(textAreaPrincipal)

    window.scrollTo({ top: 0, behavior: 'smooth' });
})

window.addEventListener("load", () => {
    imprimirPostagens()
    posicionarCursor(textAreaPrincipal)
})
