//localStorage.clear();
var id = 1

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
    localStorage.setItem('db', JSON.stringify(dados))
}

function consultaPostagens() {
    let dados = localStorage.getItem('db')
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
    const input = document.querySelector('#inputEntrada').value

    let postagens = consultaPostagens()
    determinaId()

    postagens.data.push({
        id,
        ...usuario,
        conteudo: input,
    })

    salvaPostagens(postagens)
    imprimePostagens()
}


function imprimePostagens() {
    let postagens = consultaPostagens()
    const { data } = postagens

    let elementosHTMl = data?.reduce((postagens, item) =>
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

    let postagensWrapper = document.querySelector('#postagensWrapper')
    postagensWrapper.innerHTML = elementosHTMl

}

document.querySelector('#btnPublicar').addEventListener('click', criaPostagem)
window.addEventListener('load', imprimePostagens)
