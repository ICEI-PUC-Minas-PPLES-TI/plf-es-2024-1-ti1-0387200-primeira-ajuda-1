export const USUARIO = {
    level: 'Bronze',
    profissao: 'Estudante',
    nome: 'Pedro da Silva',
    data: dataFormatada(),
}

function dataFormatada() {
    let data = new Date(),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;
}


export const REMOVE_POSTAGEM = {
    titulo: "Deseja excluir essa postagem?",
    sucesso: "Sua postagem será excluída.",
    cancelado: "Ação cancelada!",
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