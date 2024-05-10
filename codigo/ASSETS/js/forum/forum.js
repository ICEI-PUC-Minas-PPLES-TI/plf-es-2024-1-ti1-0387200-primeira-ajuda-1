import { usuario } from "./utils.js"

//localStorage.clear();

const form = document.querySelector("form")
const section = document.querySelector("#forum")
const postagensWrapper = document.querySelector("#postagensWrapper")


function determinaId() {
    console.log("Entrei na det")
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
    const textoEntrada = document.querySelector('#textoEntrada').value.trim()

    if (textoEntrada) {
        let postagens = consultaPostagens()

        postagens.data.push({
            id: determinaId(),
            ...usuario,
            conteudo: textoEntrada,
        })

        salvaPostagens(postagens)

        form.reset()
        imprimePostagens()
    } else {
        inlineAlert()
    }

}

// function inlineAlert() {
//     let div = document.createElement("div")
//     div.setAttribute("class", "inline-alert")

//     let texto = document.createTextNode("Comente para publicar")
//     div.appendChild(texto)

//     section.insertBefore(div, postagensWrapper)
// }


function imprimePostagens() {
    let postagens = consultaPostagens()
    const { data } = postagens

    let elementosHTMl = data.reduce((postagens, item) =>
        postagens +
        `
          <article class="postagem">
            <div>
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
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>

            <p>${item.conteudo}</p>        
          </article> 
        `
        , '')

    document.querySelector('#postagensWrapper').innerHTML = elementosHTMl
}

document.querySelector('#btnPublicar').addEventListener('click', (evento) => {
    evento.preventDefault()
    criaPostagem()
})

window.addEventListener('load', () => {
    localStorage.setItem("id", 0)
    imprimePostagens()
})





