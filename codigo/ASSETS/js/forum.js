// localStorage.clear();
var id = 1

const section = document.querySelector("#forum")
const postagensWrapper = document.querySelector("#postagensWrapper")


const usuario = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    data: new Date(),
}

function determinaId() {
    id++
}

function salvaPostagens(dados) {
    localStorage.setItem('postagens', JSON.stringify(dados))
}

function consultaPostagens() {
    let dados = localStorage.getItem('postagens')
    let postagens = {}

    if (dados) {
        postagens = JSON.parse(dados)
        id = postagens.data.at(-1).id
    } else {
        postagens = {
            data: [
                {
                    id,
                    ...usuario,
                    conteudo: 'Lorem ipsum dolor sit amet consectetur. Aenean enim diam ut donec consequat arcu habitant. Aliquam elit habitant duis.'
                }
            ]
        }
    }

    return postagens
}

function criaPostagem() {
    const textoEntrada = document.querySelector('#textoEntrada').value.trim()

    if (textoEntrada) {
        let postagens = consultaPostagens()
        determinaId()

        postagens.data.push({
            id,
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

function inlineAlert() {
    let div = document.createElement("div")
    div.setAttribute("class", "inline-alert")

    let texto = document.createTextNode("Comente para publicar")
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


window.addEventListener('load', imprimePostagens)


// function removePostagem(id) {
//     let postagens = consultaPostagens()
//     salvaPostagens(postagens.data.filter(postagem => postagem.id !== id))
//     imprimePostagens()
// }

// removePostagem(2)

