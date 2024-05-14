import { USUARIO, REMOVE_POSTAGEM, CONTEUDO_INLINE_ALERT, confirmaAcao } from "./utils.js"

// localStorage.clear()

const section = document.querySelector("#forum")
const mainForm = document.querySelector("#mainForm")
const mainTextArea = document.querySelector('#mainTextArea')
const postagensWrapper = document.querySelector("#postagensWrapper")

function determinaId() {
    let id = parseInt(localStorage.getItem("id"))
    id++
    localStorage.setItem("id", id)
    return id;
}

function salvaPostagens(dados) {
    localStorage.setItem('postagens', JSON.stringify(dados))
}


function consultaPostagens() {
    return JSON.parse(localStorage.getItem('postagens')) || { data: [] }
}

function criaPostagem() {
    let inlineAlert = document.querySelector(".inline-alert")

    if (mainTextArea.value) {
        if (inlineAlert) inlineAlert.remove()

        let postagens = consultaPostagens()
        postagens.data.push({
            id: determinaId(),
            ...USUARIO,
            conteudo: mainTextArea.value.trim(),
        })

        mainForm.reset()
        salvaPostagens(postagens)
        imprimePostagens()

    } else {
        if (!inlineAlert) exibirInlineAlert()
    }

}

function exibirInlineAlert() {
    let div = document.createElement("div")
    div.setAttribute("class", "inline-alert")

    let conteudo = document.createTextNode(CONTEUDO_INLINE_ALERT)
    div.appendChild(conteudo)

    section.insertBefore(div, postagensWrapper)
}

function imprimePostagens() {
    let postagens = consultaPostagens()
    const { data } = postagens

    let elementosHTMl = data.reduce((postagens, item) =>
        postagens +
        `
          <article class="postagem">
            <header>
                <div>
                    <img>
                    <div>
                        <h3>${item.nome}</h3>
                        <p>
                            <span>${item.level} |</span>
                            <span>${item.profissao} |</span>
                            <span>${item.data}</span>
                        </p>
                    </div>
                </div>
                
        
                <div>
                    <span onClick="editaPostagem(${item.id})">
                        <i class="fa-solid fa-pen-to-square"></i>                   
                    </span >

                    <span onClick="removePostagem(${item.id})">
                        <i class="fa-solid fa-trash"></i>     
                    </span > 
                </div>             
            </header>
            
            <form>
                <textarea id="textArea${item.id}" disabled>${item.conteudo}</textarea>        
            </form>
          </article >
    `
        , '')

    document.querySelector('#postagensWrapper').innerHTML = elementosHTMl
}

document.querySelector('#btnPublicar').addEventListener('click', (evento) => {
    evento.preventDefault()
    criaPostagem()
})

window.removePostagem = (id) => {
    let postagens = consultaPostagens()

    if (confirmaAcao(REMOVE_POSTAGEM)) {
        salvaPostagens({ data: postagens.data.filter(postagem => postagem.id !== id) })
        imprimePostagens()
    }
}

function criarGrupoDeBotoes() {
    let div = document.createElement("div")
    let editarBtn = document.createElement("button")
    let cancelarBtn = document.createElement("button")

    cancelarBtn.setAttribute("type", "button")
    cancelarBtn.setAttribute("id", "cancelarBtn")
    cancelarBtn.appendChild(document.createTextNode("Cancelar"))

    editarBtn.setAttribute("type", "submit")
    editarBtn.setAttribute("id", "editarBtn")
    editarBtn.appendChild(document.createTextNode("Salvar Alterações"))

    div.appendChild(cancelarBtn)
    div.appendChild(editarBtn)
    return div
}

window.editaPostagem = (id) => {
    let postTextArea = document.querySelector(`#textArea${id}`)
    postTextArea.disabled = false

    // não esquecer de disabilitar novamente ao concluir

    let postForm = postTextArea.parentElement

    // adiciona botão em tela 
    postForm.appendChild(criarGrupoDeBotoes())
}

window.addEventListener('load', () => {
    localStorage.setItem("id", 0)
    imprimePostagens()
})
