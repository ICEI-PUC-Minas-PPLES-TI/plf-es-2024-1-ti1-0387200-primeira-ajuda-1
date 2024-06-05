function getNextID() {
    let currentID = parseInt(localStorage.getItem('currentID')) || 0;
    currentID++;
    localStorage.setItem('currentID', currentID);
    return currentID;
}

function SalvaDados(dados) {
    // Obter as perguntas existentes do localStorage
    let perguntasExistentes = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];
    // Adicionar a nova pergunta às perguntas existentes
    perguntasExistentes.push(dados);
    // Salvar todas as perguntas no localStorage
    localStorage.setItem('CadastroPerguntas', JSON.stringify(perguntasExistentes));
}

function ClearInputs() {
    document.getElementById("inputquestion").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
    document.getElementById("answer").value = "";
}

function SalvarPergunta() {
    // Coletar Dados da pergunta
    let Qpergunta = document.getElementById("inputquestion").value;
    let Qoption1 = document.getElementById("option1").value;
    let Qoption2 = document.getElementById("option2").value;
    let Qoption3 = document.getElementById("option3").value;
    let Qoption4 = document.getElementById("option4").value;
    let Qresposta = document.getElementById("answer").value;

    // Verificar se todos os campos estão preenchidos
    if (!Qpergunta || !Qoption1 || !Qoption2 || !Qoption3 || !Qoption4 || !Qresposta) {
        alert("Por favor, preencha todos os campos antes de salvar.");
        return; // Não continua com o salvamento
    }

    // Verificar se a resposta é uma das alternativas
    if (Qresposta !== Qoption1 && Qresposta !== Qoption2 && Qresposta !== Qoption3 && Qresposta !== Qoption4) {
        alert("A resposta deve ser igual a uma das alternativas.");
        return; // Não continua com o salvamento
    }

    // Verificar se há alternativas duplicadas
    let alternativas = [Qoption1, Qoption2, Qoption3, Qoption4];
    let alternativasSet = new Set(alternativas);
    if (alternativasSet.size !== alternativas.length) {
        alert("As alternativas devem ser únicas.");
        return; // Não continua com o salvamento
    }

    // Formato dos dados com ID
    let NovaPergunta = {
        id: getNextID(),
        pergunta: Qpergunta,
        Alternativa1: Qoption1,
        Alternativa2: Qoption2,
        Alternativa3: Qoption3,
        Alternativa4: Qoption4,
        Resposta: Qresposta
    }

    // Adição do objeto ao Local Storage
    SalvaDados(NovaPergunta);
    // Alerta dizendo que a pergunta foi salva
    alert("A pergunta foi salva!");
    // Chamada da função que limpa os inputs
    ClearInputs();
}

