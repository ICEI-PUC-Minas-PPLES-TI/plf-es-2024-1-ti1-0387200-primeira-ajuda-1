import { formataData } from "../utils.js"
import { imprimirPostagens } from "./exibirPostagem.js"
import { criarBotoes } from "../componentes/grupoDeBotoes.js"
import { consultarPostagens, salvarPostagens } from "../main.js"
import { criarGrupoDeBotoes } from "../componentes/grupoDeBotoes.js"

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

        editarBtn.addEventListener("click", (e) => {
            e.preventDefault()

            if (postagemTextArea.value) {
                salvarPostagens({ data: atualizarPostagens(id, postagemTextArea.value.trim()) })
                imprimirPostagens()
            }
        })
    })


    let grupoDeBotoes = document.querySelector(`#grupoDeBotoes${id}`)
    if (!grupoDeBotoes) postagemTextArea.parentElement.appendChild(criarGrupoDeBotoes(id, editarBtn, cancelarBtn))
}