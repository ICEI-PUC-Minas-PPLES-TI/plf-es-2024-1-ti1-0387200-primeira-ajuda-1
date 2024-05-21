import { exibirAlertaEmbutido } from './componentes/alertaEmbutido.js'
import { criarGrupoDeBotoes, criarBotoes } from './componentes/grupoDeBotoes.js'
import { exibirBanner } from './componentes/banner.js'
import { formataData, confirmarAcao } from './utils.js'

const section = document.querySelector("#forum")
const formPrincipal = document.querySelector("#mainForm")
const textAreaPrincipal = document.querySelector("#mainTextArea")

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

export const USUARIO = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    avatar: '../assets/img/avatar.svg'
}

export function criarPostagem() {
    let alertaEmbutido = document.querySelector(".alerta-embutido")

    if (textAreaPrincipal.value) {
        if (alertaEmbutido) alertaEmbutido.remove()

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
    } else {
        if (!alertaEmbutido) exibirAlertaEmbutido(formPrincipal, textAreaPrincipal)
    }
}


export function deletarPostagem(id) {
    let postagens = consultarPostagens()

    if (confirmarAcao()) {
        salvarPostagens({
            data: postagens.data.filter((postagem) => postagem.id !== id),
        })
        imprimirPostagens()
    }
}


function atualizarPostagens(id, conteudo) {
    let postagens = consultarPostagens()
    const { data } = postagens

    let postagensAtualizadas = data.reduce(
        (postagens, item) =>
            item.id === id
                ? [
                    ...postagens,
                    {
                        ...item,
                        conteudo,
                        data: formataData(new Date()),
                    },
                ]
                : [...postagens, item],
        []
    )

    return postagensAtualizadas
}

export function editarPostagem(id) {
    let postagemTextArea = document.querySelector(`#textArea${id}`)
    postagemTextArea.disabled = false

    let { editarBtn, cancelarBtn } = criarBotoes()
    cancelarBtn.addEventListener("click", imprimirPostagens)

    postagemTextArea.addEventListener("change", () => {
        editarBtn.disabled = false

        editarBtn.addEventListener("click", (evento) => {
            evento.preventDefault()

            if (postagemTextArea.value) {
                salvarPostagens({ data: atualizarPostagens(id, postagemTextArea.value.trim()) })
                imprimirPostagens()
            }
        })
    })


    let grupoDeBotoes = document.querySelector(`#grupoDeBotoes${id}`)
    if (!grupoDeBotoes) postagemTextArea.parentElement.appendChild(criarGrupoDeBotoes(id, editarBtn, cancelarBtn))
}

export function imprimirPostagens() {
    let postagens = consultarPostagens()
    const { data } = postagens

    let elementosHTMl = data.reduce(
        (postagens, item) =>
            postagens +
            `
          <article id="${item.id}" class="postagem">
            <header class="postagemHeader">
                <div>
                    <img src="${item.avatar}" alt="avatar">
                    <div>
                        <h4>${item.nome}</h4>
                        <p>
                            <span>${item.level} </span>
                            <span>| ${item.profissao} |</span>
                            <span>${item.data}</span>
                        </p>
                    </div>
                </div>
                
        
                <div>
                    <span onClick="editarPostagem(${item.id})" data-toggle="tooltip" title="Editar Postagem">
                        <i class="fa-solid fa-pen-to-square"></i>                   
                    </span>

                    <span onClick="deletarPostagem(${item.id})" data-toggle="tooltip" title="Excluir Postagem">
                        <i class="fa-solid fa-trash"></i>     
                    </span> 
                </div>             
            </header>
            
            <form class="postForm">
                <textarea id="textArea${item.id}" class="textArea" disabled>${item.conteudo}</textarea>        
            </form>

            <footer class="postagemFooter">
                <span>
                    <i class="fa-regular fa-heart" data-toggle="tooltip" title="Curtir Postagem"></i>                 
                </span>

                <span>
                    <i class="fa-regular fa-comment" data-toggle="tooltip" title="Comentar Postagem"></i>    
                </span> 
            </footer>
          </article>
    `,
        ``
    )

    let banner = document.querySelector(".postagensEmpty")
    if (elementosHTMl.length === 0) {
        if (!banner) exibirBanner(section)
    } else {
        if (banner) banner.remove()
    }

    document.querySelector("#postagensWrapper").innerHTML = elementosHTMl
}
