export const USUARIO = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    data: formataData(new Date()),
}

export const REMOVE_POSTAGEM = {
    titulo: "Deseja excluir essa postagem?",
    sucesso: "Sua postagem será excluída.",
    cancelado: "Ação cancelada!",
}

export const CONTEUDO_INLINE_ALERT = `Para criar uma publicação é necessário adicionar um comentário`

export function formataData(dateString) {
    return dateString.toLocaleString().replace(',', '')
}

export function confirmaAcao(variante) {
    let confirma = confirm(variante.titulo)

    if (confirma) {
        alert(variante.sucesso)
        return true
    } else {
        alert(variante.cancelado)
        return false
    }
}