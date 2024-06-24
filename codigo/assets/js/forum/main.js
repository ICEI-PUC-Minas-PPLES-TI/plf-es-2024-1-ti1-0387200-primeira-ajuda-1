import { ForumService } from "../../services/forumService.js"

const USUARIO = JSON.parse(localStorage.getItem('usuario')) || {}

const forumService = new ForumService()
const criarElemento = (variante) => document.createElement(variante)
const consultarSeletor = (variante) => document.querySelector(variante)

const formPrincipal = consultarSeletor('#mainForm')
const btnPublicar = consultarSeletor('#btnPublicar')
const iconePublicar = consultarSeletor('#btnPublicar i')
const textAreaPrincipal = consultarSeletor('#mainTextArea')
const postagensWrapper = consultarSeletor('#postagensWrapper')

function obterId() {
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

function validarUsuario() {
    if (Object.values(USUARIO).length === 0) {
        window.location.href = `/codigo/pages/login/login.html`
        return
    }
}

function posicionarCursor(seletor) {
    seletor.setSelectionRange(0, 0)
    seletor.focus()
}

function posicionarCursorVarianteTexto(seletor) {
    seletor.selectionStart = seletor.value.length
    seletor.selectionEnd = seletor.value.length
    seletor.focus()
}

function gerenciarScroll() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

function montarIcone({ id, classes, tooltip, callback }) {
    const icone = criarElemento('i')
    icone.setAttribute('data-toggle', 'tooltip')
    icone.setAttribute('title', tooltip)
    icone.addEventListener('click', () => callback(id))
    icone.classList.add(...classes)
    return icone
}

function montarPostagem({ item, isComment = false }) {
    const img = criarElemento('img')
    img.src = item.avatar
    img.alt = 'avatar'

    const h4 = criarElemento('h4')
    h4.textContent = item.nome

    const p = criarElemento('p')
    const conteudos = [`${item.level} `, `| ${item.profissao} |`, ` ${item.data}`]
    conteudos.forEach(conteudo => {
        const span = criarElemento('span')
        span.textContent = conteudo
        p.appendChild(span)
    })

    const infoDiv = criarElemento('div')
    infoDiv.appendChild(h4)
    infoDiv.appendChild(p)

    const divSuperior = criarElemento('div')
    divSuperior.appendChild(img)
    divSuperior.appendChild(infoDiv)

    const iconeEditar = montarIcone({
        id: item.id,
        classes: ['fa-solid', 'fa-pen-to-square'],
        tooltip: !isComment ? 'Editar Postagem' : 'Editar Comentário',
        callback: !isComment ? editarPostagem : editarComentario
    })

    const iconeDeletar = montarIcone({
        id: item.id,
        classes: ['fa-solid', 'fa-trash'],
        tooltip: !isComment ? 'Excluir Postagem' : 'Excluir Comentário',
        callback: !isComment ? deletarPostagem : deletarComentario
    })

    const divInferior = criarElemento('div')
    divInferior.appendChild(iconeEditar)
    divInferior.appendChild(iconeDeletar)

    const header = criarElemento('header')
    header.className = !isComment ? 'postagemHeader' : 'comentarioHeader'

    header.appendChild(divSuperior)
    header.appendChild(divInferior)

    const postTextArea = criarElemento('textarea')
    postTextArea.id = !isComment ? `textArea${item.id}` : `comentarioTextArea${item.id}`
    postTextArea.className = 'textArea'
    postTextArea.disabled = true
    postTextArea.textContent = item.conteudo

    const postForm = criarElemento('form')
    postForm.className = !isComment ? 'postagemForm' : 'comentarioForm'
    postForm.appendChild(postTextArea)

    if (!isComment) {
        const iconeCurtir = montarIcone({
            id: item.id,
            classes: [item.curtida ? 'fa-solid' : 'fa-regular', 'fa-heart'],
            tooltip: item.curtida ? 'Descurtir' : 'Curtir Postagem',
            callback: gerenciarCurtidasPostagem
        })
        iconeCurtir.style.color = item.curtida ? '#e10e0e' : '#b5b5b5'

        const iconeComentar = montarIcone({
            id: item.id,
            classes: ['fa-regular', 'fa-comment'],
            tooltip: 'Comentar Postagem',
            callback: criarComentario
        })

        const divIcones = criarElemento('div')
        divIcones.className = 'divIcones'
        divIcones.appendChild(iconeCurtir)
        divIcones.appendChild(iconeComentar)

        const commentTextArea = criarElemento('textarea')
        commentTextArea.id = `comentarioTextArea${item.id}`
        commentTextArea.className = 'comentarioTextArea'

        const commentForm = criarElemento('form')
        commentForm.id = `comentarioForm${item.id}`
        commentForm.className = 'commentForm'
        commentForm.appendChild(commentTextArea)

        const footer = criarElemento('footer')
        footer.className = 'postagemFooter'
        footer.appendChild(divIcones)
        footer.appendChild(commentForm)

        const article = criarElemento('article')
        article.id = item.id
        article.className = 'postagem'

        article.appendChild(header)
        article.appendChild(postForm)
        article.appendChild(footer)
        return article
    }

    const article = criarElemento('article')
    article.id = item.id
    article.className = 'comentarioPostagem'

    article.appendChild(header)
    article.appendChild(postForm)
    return article
}

function montarBotoes() {
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

    const cancelarBtn = criarElemento('button')
    cancelarBtn.textContent = 'Cancelar'
    Object.keys(CANCELAR_ATRIBUTOS).forEach(key => cancelarBtn.setAttribute(key, CANCELAR_ATRIBUTOS[key]))

    const editarBtn = criarElemento('button')
    editarBtn.textContent = 'Salvar Alterações'
    Object.keys(EDITAR_ATRIBUTOS).forEach(key => editarBtn.setAttribute(key, EDITAR_ATRIBUTOS[key]))

    const publicarBtn = criarElemento('button')
    publicarBtn.textContent = 'Publicar'
    Object.keys(PUBLICAR_ATRIBUTOS).forEach(key => publicarBtn.setAttribute(key, PUBLICAR_ATRIBUTOS[key]))

    return { editarBtn, publicarBtn, cancelarBtn }
}

function montarGrupoDeBotoes({ id, isComment = false, varianteBtn1, varianteBtn2 }) {
    const GRUPO_ATRIBUTOS = {
        id: isComment ? `commentGrupoDeBotoes${id}` : `grupoDeBotoes${id}`,
        class: 'grupoDeBotoes'
    }

    const div = criarElemento('div')
    Object.keys(GRUPO_ATRIBUTOS).forEach(key => div.setAttribute(key, GRUPO_ATRIBUTOS[key]))

    div.appendChild(varianteBtn1)
    div.appendChild(varianteBtn2)
    return div
}

async function criarPostagem() {
    const resposta = await forumService.createPostagem({
        id: obterId(),
        ...USUARIO,
        data: formataData(new Date()),
        conteudo: textAreaPrincipal.value.trim(),
        comentarios: [],
        curtida: false,
    })

    if (resposta) await imprimirPostagens()
}

async function imprimirPostagens() {
    const data = await forumService.getPostagens()

    const banner = consultarSeletor('.postagensEmpty')
    const fragmento = document.createDocumentFragment()
    postagensWrapper.innerHTML = ''

    if (data.length === 0) {
        banner.style.display = 'flex'
    } else {
        banner.style.display = 'none'

        data.forEach(item => {
            const postagemWrapper = criarElemento('div');
            postagemWrapper.id = item.id
            postagemWrapper.className = 'postagemWrapper'

            const postagem = montarPostagem({ item })
            postagemWrapper.appendChild(postagem)

            item.comentarios.forEach(comentario => {
                const comentarioElemento = montarPostagem({
                    item: comentario,
                    isComment: true
                })

                postagemWrapper.appendChild(comentarioElemento)
            })
            fragmento.appendChild(postagemWrapper)
        })
        postagensWrapper.appendChild(fragmento)
    }
}

async function editarPostagem(id) {
    validarUsuario()
    const postagem = await forumService.getPostagemById(id)

    const postagemTextArea = consultarSeletor(`#textArea${id}`)
    const textAreaValorIncial = postagemTextArea.value

    postagemTextArea.disabled = false
    posicionarCursorVarianteTexto(postagemTextArea)

    const { editarBtn, cancelarBtn } = montarBotoes()
    cancelarBtn.addEventListener('click', imprimirPostagens)

    postagemTextArea.addEventListener('input', ({ target }) => {
        redimensionarAltura(target)
        editarBtn.disabled = target.value.trim() === '' || target.value.trim() === textAreaValorIncial
    })

    editarBtn.addEventListener('click', async (evento) => {
        evento.preventDefault()
        const resposta = await forumService.updatePostagem(id, {
            ...postagem,
            conteudo: postagemTextArea.value.trim(),
            data: formataData(new Date()),
        })

        if (resposta) await imprimirPostagens()
        gerenciarScroll()
    })

    const grupoDeBotoes = consultarSeletor(`#grupoDeBotoes${id}`)
    if (!grupoDeBotoes) postagemTextArea.parentElement.appendChild(
        montarGrupoDeBotoes({
            id,
            varianteBtn1: cancelarBtn,
            varianteBtn2: editarBtn
        })
    )
}

async function deletarPostagem(id) {
    validarUsuario()
    const confirma = confirm('Deseja excluir essa postagem?')

    if (confirma) {
        const resposta = await forumService.deletePostagem(id)
        if (resposta) await imprimirPostagens()
    } else {
        alert('Ação cancelada!')
    }
}

async function gerenciarCurtidasPostagem(id) {
    validarUsuario()
    const postagem = await forumService.getPostagemById(id)
    const resposta = await forumService.updatePostagem(id, {
        ...postagem,
        curtida: !postagem.curtida
    })

    if (resposta) await imprimirPostagens()
}

async function criarComentario(id) {
    validarUsuario()
    const postagem = await forumService.getPostagemById(id)

    const comentarioForm = consultarSeletor(`#comentarioForm${id}`)
    comentarioForm.style.display = 'flex'

    const comentarioTextArea = consultarSeletor(`#comentarioTextArea${id}`)
    posicionarCursor(comentarioTextArea)

    const { cancelarBtn, publicarBtn } = montarBotoes()
    cancelarBtn.addEventListener('click', () => {
        comentarioForm.style.display = 'none'
        comentarioTextArea.value = ''
    })

    comentarioTextArea.addEventListener('input', ({ target }) => {
        redimensionarAltura(target)
        publicarBtn.disabled = target.value.trim() === ''
    })

    publicarBtn.addEventListener('click', async (evento) => {
        evento.preventDefault()
        const resposta = await forumService.updatePostagem(id, {
            ...postagem,
            comentarios: [
                ...postagem.comentarios,
                {
                    ...USUARIO,
                    id: obterId(),
                    conteudo: comentarioTextArea.value.trim(),
                    data: formataData(new Date()),
                }
            ]
        })

        if (resposta) await imprimirPostagens()
        gerenciarScroll()
    })

    const grupoDeBotoes = consultarSeletor(`#commentGrupoDeBotoes${id}`)
    if (!grupoDeBotoes) comentarioForm.appendChild(
        montarGrupoDeBotoes({
            id,
            isComment: true,
            varianteBtn1: cancelarBtn,
            varianteBtn2: publicarBtn
        })
    )
}

async function editarComentario(id) {
    validarUsuario()
    const comentario = consultarSeletor(`[id='${id}']`)
    const postagem = await forumService.getPostagemById(comentario.parentElement.id)

    const comentarioTextArea = consultarSeletor(`#comentarioTextArea${id}`)
    const textAreaValorIncial = comentarioTextArea.value

    comentarioTextArea.disabled = false
    posicionarCursorVarianteTexto(comentarioTextArea)

    const { editarBtn, cancelarBtn } = montarBotoes()
    cancelarBtn.addEventListener('click', imprimirPostagens)

    comentarioTextArea.addEventListener('input', ({ target }) => {
        redimensionarAltura(target)
        editarBtn.disabled = target.value.trim() === '' || target.value.trim() === textAreaValorIncial
    })

    editarBtn.addEventListener('click', async (evento) => {
        evento.preventDefault()
        const resposta = await forumService.updatePostagem(comentario.parentElement.id, {
            ...postagem,
            comentarios: postagem.comentarios.map(comentario =>
                comentario.id === id
                    ? {
                        ...comentario,
                        conteudo: comentarioTextArea.value.trim(),
                        data: formataData(new Date()),
                    }
                    : comentario
            ),
        })

        if (resposta) await imprimirPostagens()
        gerenciarScroll()
    })

    const grupoDeBotoes = consultarSeletor(`#grupoDeBotoes${id}`)
    if (!grupoDeBotoes) comentarioTextArea.parentElement.appendChild(
        montarGrupoDeBotoes({
            id,
            varianteBtn1: cancelarBtn,
            varianteBtn2: editarBtn
        })
    )
}

async function deletarComentario(id) {
    validarUsuario()
    const comentario = consultarSeletor(`[id='${id}']`)
    const postagem = await forumService.getPostagemById(comentario.parentElement.id)

    const confirma = confirm('Deseja excluir esse comentário?')
    if (confirma) {
        const resposta = await forumService.updatePostagem(comentario.parentElement.id, {
            ...postagem,
            comentarios: postagem.comentarios.filter(comentario => comentario.id !== id)
        })
        if (resposta) comentario.remove()
    } else {
        alert('Ação cancelada!')
    }
}

textAreaPrincipal.addEventListener('input', ({ target }) => {
    controlarBtnPublicar()
    redimensionarAltura(target)
})

formPrincipal.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    validarUsuario()

    await criarPostagem()
    formPrincipal.reset()
    controlarBtnPublicar()

    posicionarCursor(textAreaPrincipal)
    redimensionarAltura(textAreaPrincipal)
    gerenciarScroll()
})

window.addEventListener('DOMContentLoaded', async () => {
    await imprimirPostagens()
    posicionarCursor(textAreaPrincipal)
})
