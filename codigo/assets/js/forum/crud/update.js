import { formataData } from "../utils.js"
import { consultarPostagens } from "../main.js"

export function atualizarPostagens(id, conteudo) {
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