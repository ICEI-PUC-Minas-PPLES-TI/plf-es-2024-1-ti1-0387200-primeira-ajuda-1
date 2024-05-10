export const usuario = {
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