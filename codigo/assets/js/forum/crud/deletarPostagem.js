import { imprimirPostagens } from "./exibirPostagem.js"
import { confirmarAcao, REMOVE_POSTAGEM } from "../utils.js"
import { consultarPostagens, salvarPostagens } from "../main.js"

export function deletarPostagem(id) {
    let postagens = consultarPostagens()

    if (confirmarAcao(REMOVE_POSTAGEM)) {
        salvarPostagens({
            data: postagens.data.filter((postagem) => postagem.id !== id),
        })
        imprimirPostagens()
    }
}
