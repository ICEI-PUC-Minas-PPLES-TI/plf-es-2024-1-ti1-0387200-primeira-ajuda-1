import { USUARIO, REMOVE_POSTAGEM, confirmaAcao } from "./utils.js"
// localStorage.clear();

const section = document.querySelector("#forum")
const form = document.querySelector("form")
const textArea = document.querySelector('#textoEntrada')
const postagensWrapper = document.querySelector("#postagensWrapper")

function determinaId() {
    let id = parseInt(localStorage.getItem("id"))
    id += 1

    localStorage.setItem("id", id)
    return id;
}

function salvaPostagens(dados) {
    localStorage.setItem('postagens', JSON.stringify(dados))
}


function consultaPostagens() {
    let dados = localStorage.getItem('postagens')
    let postagens = {}

    if (dados) {
        postagens = JSON.parse(dados)
    } else {
        postagens = { data: [] }
    }

    return postagens
}

function criaPostagem() {
    let inlineAlert = document.querySelector(".inline-alert")

    if (textArea.value) {
        if (inlineAlert) inlineAlert.remove()

        let postagens = consultaPostagens()
        postagens.data.push({
            id: determinaId(),
            ...USUARIO,
            conteudo: textArea.value.trim(),
        })

        salvaPostagens(postagens)
        form.reset()
        imprimePostagens()
    } else {
        if (!inlineAlert) displayInlineAlert()
    }

}

function displayInlineAlert() {
    let div = document.createElement("div")
    div.setAttribute("class", "inline-alert")

    let texto = document.createTextNode("Para criar uma publicação é necessário adicionar um comentário")
    div.appendChild(texto)

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
            
            <textarea disabled>${item.conteudo}</textarea>        
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

window.editaPostagem = (id) => {

}

window.addEventListener('load', () => {
    localStorage.setItem("id", 0)
    imprimePostagens()
})
