const USUARIO = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    avatar: '../assets/img/avatar.svg'
}

const USUARIO2 = {
    level: 'PRATA',
    profissao: 'Bancária',
    nome: 'Branca Letícia de Barros Motta',
    avatar: '../assets/img/avatar.svg'
}

const consultarSeletor = (variante) => document.querySelector(variante)
const section = consultarSeletor('#forum')
const formPrincipal = consultarSeletor('#mainForm')
const btnPublicar = consultarSeletor('#btnPublicar')
const iconePublicar = consultarSeletor('#btnPublicar i')
const textAreaPrincipal = consultarSeletor('#mainTextArea')
const postagensWrapper = consultarSeletor('#postagensWrapper')

function salvarPostagens(dados) {
    localStorage.setItem('postagens', JSON.stringify(dados))
}

function consultarPostagens() {
    return JSON.parse(localStorage.getItem('postagens')) || { data: [] }
}

function determinarId() {
    let id = parseInt(localStorage.getItem('id')) || 0
    id++
    localStorage.setItem('id', id)
    return id
}

function formataData(dateString) {
    const data = dateString.toLocaleString().replace(',', '')
    const componentesData = data.split(':')
    return `${componentesData[0]}:${componentesData[1]}`

}

function posicionarCursor(seletor) {
    seletor.setSelectionRange(0, 0)
    seletor.focus()
}

function redimensionarAltura(seletor) {
    seletor.style.height = 'auto'
    seletor.style.height = seletor.scrollHeight + 'px'
}

function controlarBtnPublicar() {
    const verificador = textAreaPrincipal.value.trim() === ''

    btnPublicar.disabled = verificador
    btnPublicar.style.cursor = verificador ? 'not-allowed' : 'pointer'
    iconePublicar.style.cursor = verificador ? 'not-allowed' : 'pointer'
    formPrincipal.style.flexFlow = verificador ? 'row' : 'column'
}

function montarBanner() {
    const h2 = document.createElement('h2')
    h2.textContent = 'Vamos Começar?'

    const p = document.createElement('p')
    p.textContent = 'Parece que não temos nenhuma informação por aqui...Que tal criar uma nova publicação?'

    const div = document.createElement('div')
    div.appendChild(h2)
    div.appendChild(p)

    const img = document.createElement('img')
    img.src = '../assets/img/forum.svg'
    img.alt = 'postagensEmpty'

    const article = document.createElement('article')
    article.className = 'postagensEmpty'

    article.appendChild(div)
    article.appendChild(img)
    section.appendChild(article)
}

function montarIcone({ id, classes, tooltip, callback }) {
    const icone = document.createElement('i')
    icone.setAttribute('data-toggle', 'tooltip')
    icone.setAttribute('title', tooltip)
    icone.addEventListener('click', () => callback(id))
    icone.classList.add(...classes)
    return icone
}

function montarPostagem(item) {
    const img = document.createElement('img')
    img.src = item.avatar
    img.alt = 'avatar'

    const h4 = document.createElement('h4')
    h4.textContent = item.nome

    const p = document.createElement('p')
    const conteudos = [`${item.level} `, `| ${item.profissao} |`, ` ${item.data}`]
    conteudos.forEach((conteudo) => {
        const span = document.createElement('span')
        span.textContent = conteudo
        p.appendChild(span)
    })

    const infoDiv = document.createElement('div')
    infoDiv.appendChild(h4)
    infoDiv.appendChild(p)

    const divSuperior = document.createElement('div')
    divSuperior.appendChild(img)
    divSuperior.appendChild(infoDiv)

    const iconeEditar = montarIcone({
        id: item.id,
        classes: ['fa-solid', 'fa-pen-to-square'],
        tooltip: 'Editar Postagem',
        callback: editarPostagem
    })

    const iconeDeletar = montarIcone({
        id: item.id,
        classes: ['fa-solid', 'fa-trash'],
        tooltip: 'Excluir Postagem',
        callback: deletarPostagem
    })

    const divInferior = document.createElement('div')
    divInferior.appendChild(iconeEditar)
    divInferior.appendChild(iconeDeletar)

    const header = document.createElement('header')
    header.className = 'postagemHeader'

    header.appendChild(divSuperior)
    header.appendChild(divInferior)

    const postTextArea = document.createElement('textarea')
    postTextArea.id = `textArea${item.id}`
    postTextArea.className = 'textArea'
    postTextArea.disabled = true
    postTextArea.textContent = item.conteudo

    const postForm = document.createElement('form')
    postForm.className = 'postForm'
    postForm.appendChild(postTextArea)

    const iconeCurtir = montarIcone({
        id: item.id,
        classes: ['fa-regular', 'fa-heart'],
        tooltip: 'Curtir Postagem',
        callback: console.log
    })

    const iconeComentar = montarIcone({
        id: item.id,
        classes: ['fa-regular', 'fa-comment'],
        tooltip: 'Comentar Postagem',
        callback: criarComentario
    })

    const divIcones = document.createElement('div')
    divIcones.className = 'divIcones'
    divIcones.appendChild(iconeCurtir)
    divIcones.appendChild(iconeComentar)

    const commentTextArea = document.createElement('textarea')
    commentTextArea.id = `comentarioTextArea${item.id}`
    commentTextArea.className = 'comentarioTextArea'

    const commentForm = document.createElement('form')
    commentForm.id = `comentarioForm${item.id}`
    commentForm.className = 'commentForm'
    commentForm.appendChild(commentTextArea)

    const footer = document.createElement('footer')
    footer.className = 'postagemFooter'
    footer.appendChild(divIcones)
    footer.appendChild(commentForm)

    const article = document.createElement('article')
    article.id = item.id
    article.className = 'postagem'
    article.appendChild(header)
    article.appendChild(postForm)
    article.appendChild(footer)
    return article
}

function criarComentario(id) {
    const postagens = consultarPostagens()
    const { data } = postagens

    const comentarioForm = consultarSeletor(`#comentarioForm${id}`)
    comentarioForm.style.display = 'flex'

    const comentarioTextArea = consultarSeletor(`#comentarioTextArea${id}`)
    posicionarCursor(comentarioTextArea)

    comentarioTextArea.addEventListener('input', () => {
        redimensionarAltura(comentarioTextArea)
        publicarBtn.disabled = comentarioTextArea.value === ''
    })

    const { cancelarBtn, publicarBtn } = criarBotoes()
    cancelarBtn.addEventListener('click', () => {
        comentarioForm.style.display = 'none'
    })

    publicarBtn.addEventListener('click', (evento) => {
        evento.preventDefault()

        if (comentarioTextArea.value.trim()) {
            salvarPostagens({
                data: data.reduce(
                    (postagens, item) =>
                        item.id === id
                            ? [
                                ...postagens,
                                {
                                    ...item,
                                    comentarios: [
                                        ...item?.comentarios,
                                        {
                                            ...USUARIO2,
                                            id: item.comentarios.length += 1,
                                            conteudo: comentarioTextArea.value.trim(),
                                            data: formataData(new Date()),
                                        }
                                    ]
                                },
                            ]
                            : [...postagens, item],
                    []
                )
            })
            imprimirPostagens()
        }
    })

    const grupoDeBotoes = consultarSeletor(`#commentGrupoDeBotoes${id}`)
    if (!grupoDeBotoes) comentarioForm.appendChild(
        criarGrupoDeBotoes({
            id,
            isComment: true,
            varianteBtn1: cancelarBtn,
            varianteBtn2: publicarBtn
        })
    )
}

function criarBotoes() {
    const CANCELAR_ATRIBUTOS = {
        type: 'button',
        id: 'cancelarBtn'
    }

    const EDITAR_ATRIBUTOS = {
        type: 'submit',
        id: 'editarBtn',
        disabled: 'true'
    }

    const PUBLICAR_ATRIBUTOS = {
        type: 'submit',
        id: 'publicarBtn',
        disabled: 'true'
    }

    const criarBotao = () => document.createElement('button')

    const cancelarBtn = criarBotao()
    cancelarBtn.textContent = 'Cancelar'
    Object.keys(CANCELAR_ATRIBUTOS).forEach((key) => cancelarBtn.setAttribute(key, CANCELAR_ATRIBUTOS[key]))

    const editarBtn = criarBotao()
    editarBtn.textContent = 'Salvar Alterações'
    Object.keys(EDITAR_ATRIBUTOS).forEach((key) => editarBtn.setAttribute(key, EDITAR_ATRIBUTOS[key]))

    const publicarBtn = criarBotao()
    publicarBtn.textContent = 'Publicar'
    Object.keys(PUBLICAR_ATRIBUTOS).forEach((key) => publicarBtn.setAttribute(key, PUBLICAR_ATRIBUTOS[key]))

    return { editarBtn, publicarBtn, cancelarBtn }
}

function criarGrupoDeBotoes({ id, isComment = false, varianteBtn1, varianteBtn2 }) {
    const GRUPO_ATRIBUTOS = {
        id: isComment ? `commentGrupoDeBotoes${id}` : `grupoDeBotoes${id}`,
        class: 'grupoDeBotoes'
    }

    const div = document.createElement('div')
    Object.keys(GRUPO_ATRIBUTOS).forEach((key) => div.setAttribute(key, GRUPO_ATRIBUTOS[key]))

    div.appendChild(varianteBtn1)
    div.appendChild(varianteBtn2)
    return div
}

function criarPostagem() {
    const postagens = consultarPostagens()

    postagens.data.push({
        id: determinarId(),
        ...USUARIO,
        data: formataData(new Date()),
        conteudo: textAreaPrincipal.value.trim(),
        comentarios: [],
    })

    salvarPostagens(postagens)
    imprimirPostagens()
}

function imprimirPostagens() {
    const postagens = consultarPostagens()
    const { data } = postagens

    postagensWrapper.innerHTML = ''
    const banner = consultarSeletor('.postagensEmpty')
    const fragmento = document.createDocumentFragment()

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
    const confirma = confirm('Deseja excluir essa postagem?')

    if (confirma) {
        salvarPostagens({ data: postagens.data.filter((postagem) => postagem.id !== id) })
        imprimirPostagens()
    } else {
        alert('Ação cancelada!')
    }
}

function editarPostagem(id) {
    const postagens = consultarPostagens()
    const { data } = postagens

    const postagemTextArea = consultarSeletor(`#textArea${id}`)
    const textAreaValorIncial = postagemTextArea.value

    postagemTextArea.disabled = false
    postagemTextArea.selectionStart = postagemTextArea.value.length
    postagemTextArea.selectionEnd = postagemTextArea.value.length
    postagemTextArea.focus()

    postagemTextArea.addEventListener('input', () => {
        redimensionarAltura(postagemTextArea)
        editarBtn.disabled = postagemTextArea.value === '' || postagemTextArea.value === textAreaValorIncial
    })

    const { editarBtn, cancelarBtn } = criarBotoes()
    cancelarBtn.addEventListener('click', imprimirPostagens)

    editarBtn.addEventListener('click', (evento) => {
        evento.preventDefault()
        if (postagemTextArea.value.trim()) {
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
    if (!grupoDeBotoes) postagemTextArea.parentElement.appendChild(
        criarGrupoDeBotoes({
            id,
            varianteBtn1: cancelarBtn,
            varianteBtn2: editarBtn
        })
    )
}

textAreaPrincipal.addEventListener('input', () => {
    controlarBtnPublicar()
    redimensionarAltura(textAreaPrincipal)
})

formPrincipal.addEventListener('submit', (evento) => {
    evento.preventDefault()
    criarPostagem()
    formPrincipal.reset()
    controlarBtnPublicar()
    posicionarCursor(textAreaPrincipal)
    redimensionarAltura(textAreaPrincipal)
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

window.addEventListener('DOMContentLoaded', () => {
    imprimirPostagens()
    posicionarCursor(textAreaPrincipal)
})
