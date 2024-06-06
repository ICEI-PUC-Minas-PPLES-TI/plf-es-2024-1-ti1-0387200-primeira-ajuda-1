const USUARIO = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    avatar: '../assets/img/avatar.svg'
}

const consultarSeletor = (variante) => document.querySelector(variante)

const section = consultarSeletor("#forum")
const formPrincipal = consultarSeletor("#mainForm")
const btnPublicar = consultarSeletor("#btnPublicar")
const iconePublicar = consultarSeletor("#btnPublicar i")
const textAreaPrincipal = consultarSeletor("#mainTextArea")
const postagensWrapper = consultarSeletor("#postagensWrapper")

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
    const verificador = textAreaPrincipal.value.trim() === ''

    btnPublicar.disabled = verificador
    btnPublicar.style.cursor = verificador ? 'not-allowed' : 'pointer'
    iconePublicar.style.cursor = verificador ? 'not-allowed' : 'pointer'
    formPrincipal.style.flexFlow = verificador ? 'row' : 'column'
}

function criarPostagem() {
    const postagens = consultarPostagens()

    postagens.data.push({
        id: determinarId(),
        ...USUARIO,
        data: formataData(new Date()),
        conteudo: textAreaPrincipal.value.trim(),
    })

    salvarPostagens(postagens)
    imprimirPostagens()
}

function montarBanner() {
    const h2 = document.createElement("h2")
    h2.textContent = "Vamos Começar?"

    const p = document.createElement("p")
    p.textContent = "Parece que não temos nenhuma informação por aqui...Que tal criar uma nova publicação?"

    const div = document.createElement("div")
    div.appendChild(h2)
    div.appendChild(p)

    const img = document.createElement("img")
    img.src = "../assets/img/forum.svg"
    img.alt = "postagensEmpty"

    const article = document.createElement("article")
    article.className = "postagensEmpty"

    article.appendChild(div)
    article.appendChild(img)
    section.appendChild(article)
}

function montarIcone(id, classes, tooltip, callback) {
    const icone = document.createElement("i");
    icone.setAttribute("data-toggle", "tooltip");
    icone.setAttribute("title", tooltip);
    icone.addEventListener("click", () => callback(id))
    classes.forEach(classe => icone.classList.add(classe));
    return icone;
}

function montarPostagem(item) {
    const img = document.createElement("img")
    img.src = item.avatar
    img.alt = "avatar"

    const h4 = document.createElement("h4")
    h4.textContent = item.nome

    const p = document.createElement("p")
    const conteudos = [`${item.level} `, `| ${item.profissao} |`, ` ${item.data}`]
    conteudos.forEach((conteudo) => {
        const span = document.createElement("span")
        span.textContent = conteudo
        p.appendChild(span)
    })

    const infoDiv = document.createElement("div")
    infoDiv.appendChild(h4)
    infoDiv.appendChild(p)

    const divSuperior = document.createElement("div")
    divSuperior.appendChild(img)
    divSuperior.appendChild(infoDiv)

    const iconeEditar = montarIcone(item.id, ["fa-solid", "fa-pen-to-square"], "Editar Postagem", editarPostagem)
    const iconeDeletar = montarIcone(item.id, ["fa-solid", "fa-trash"], "Excluir Postagem", deletarPostagem)

    const divInferior = document.createElement("div")
    divInferior.appendChild(iconeEditar)
    divInferior.appendChild(iconeDeletar)

    const header = document.createElement("header")
    header.className = "postagemHeader"

    header.appendChild(divSuperior)
    header.appendChild(divInferior)

    const textArea = document.createElement("textarea")
    textArea.id = `textArea${item.id}`
    textArea.className = "textArea"
    textArea.disabled = true
    textArea.textContent = item.conteudo

    const form = document.createElement("form")
    form.className = "postForm"
    form.appendChild(textArea)

    const iconeCurtir = montarIcone(item.id, ["fa-regular", "fa-heart"], "Curtir Postagem", console.log)
    const iconeComentar = montarIcone(item.id, ["fa-regular", "fa-comment"], "Comentar Postagem", console.log)

    const footer = document.createElement("footer")
    footer.className = "postagemFooter"
    footer.appendChild(iconeCurtir)
    footer.appendChild(iconeComentar)

    const article = document.createElement("article")
    article.id = item.id
    article.className = "postagem"
    article.appendChild(header)
    article.appendChild(form)
    article.appendChild(footer)
    return article
}

function imprimirPostagens() {
    const postagens = consultarPostagens()
    const { data } = postagens

    postagensWrapper.innerHTML = ''
    const banner = consultarSeletor(".postagensEmpty")
    const fragmento = document.createDocumentFragment();

    if (data.length === 0) {
        if (!banner) montarBanner()
    } else {
        if (banner) banner.remove()
        data.forEach(item => {
            const postagem = montarPostagem(item)
            fragmento.appendChild(postagem)
        })

        postagensWrapper.appendChild(fragmento)
    }
}

function deletarPostagem(id) {
    const postagens = consultarPostagens()
    const confirma = confirm("Deseja excluir essa postagem?")

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

    const editarBtn = document.createElement("button")
    const cancelarBtn = document.createElement("button")

    cancelarBtn.textContent = "Cancelar"
    Object.keys(CANCELAR_ATRIBUTOS).forEach((key) => cancelarBtn.setAttribute(key, CANCELAR_ATRIBUTOS[key]))

    editarBtn.textContent = "Salvar Alterações"
    Object.keys(EDITAR_ATRIBUTOS).forEach((key) => editarBtn.setAttribute(key, EDITAR_ATRIBUTOS[key]))

    return { editarBtn, cancelarBtn }
}

function criarGrupoDeBotoes(id, editarBtn, cancelarBtn) {
    const GRUPO_ATRIBUTOS = {
        id: `grupoDeBotoes${id}`,
        class: "grupoDeBotoes"
    }

    const div = document.createElement("div")
    Object.keys(GRUPO_ATRIBUTOS).forEach((key) => div.setAttribute(key, GRUPO_ATRIBUTOS[key]))

    div.appendChild(cancelarBtn)
    div.appendChild(editarBtn)
    return div
}

function editarPostagem(id) {
    const postagens = consultarPostagens()
    const { data } = postagens

    const postagemTextArea = consultarSeletor(`#textArea${id}`)
    const textAreaValorIncial = postagemTextArea.value

    postagemTextArea.disabled = false
    postagemTextArea.selectionStart = postagemTextArea.value.length;
    postagemTextArea.selectionEnd = postagemTextArea.value.length;
    postagemTextArea.focus();

    postagemTextArea.addEventListener("input", () => {
        editarBtn.disabled = postagemTextArea.value === '' || postagemTextArea.value === textAreaValorIncial
    })

    const { editarBtn, cancelarBtn } = criarBotoes()
    cancelarBtn.addEventListener("click", imprimirPostagens)

    editarBtn.addEventListener("click", (evento) => {
        evento.preventDefault()
        if (postagemTextArea.value) {
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

    const grupoDeBotoes = consultarSeletor(`#grupoDeBotoes${id}`)
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

window.addEventListener("DOMContentLoaded", () => {
    imprimirPostagens()
    posicionarCursor(textAreaPrincipal)
})
