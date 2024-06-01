
function SalvaDados (dados){
    localStorage.setItem('CadastroPerguntas',JSON.stringify (dados));
}
function ClearInputs(){
    document.getElementById("inputquestion").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
}
function SalvarPergunta(){

    //Coletar Dados da pergunta
    let Qpergunta = document.getElementById("inputquestion").value;
    let Qoption1 = document.getElementById("option1").value;
    let Qoption2 = document.getElementById("option2").value;
    let Qoption3 = document.getElementById("option3").value;
    let Qoption4 = document.getElementById("option4").value;

    // Verificar se todos os campos estão preenchidos
    if (!Qpergunta || !Qoption1 || !Qoption2 || !Qoption3 || !Qoption4) {
        alert("Por favor, preencha todos os campos antes de salvar.");
        return; // Não continua com o salvamento
    }

    //Formato dos dados
    let NovaPergunta = {
        pergunta: Qpergunta,
        Alternativa1: Qoption1,
        Alternativa2: Qoption2,
        Alternativa3: Qoption3,
        Alternativa4: Qoption4
    }
    //Adição do objeto ao Local Storange
    SalvaDados(NovaPergunta);
    //Alerta dizendo que a pergunta foi salva
    alert("A pergunta foi salva!");
    //Chamada da função que limpa os inputs
    ClearInputs();
}