export function formataData(dateString) {
    return dateString.toLocaleString().replace(',', '')
}

export function confirmarAcao() {
    let confirma = confirm("Deseja excluir essa postagem?")

    if (confirma) {
        alert("Sua postagem será excluída.")
    } else {
        alert("Ação cancelada!")
    }

    return confirma
}