function MarcarCheckEExibirPaginaCriar(){
    document.getElementById("checkbox").checked = true;
    document.querySelector(".pagina-criar-kit").style.display = "flex";
}

//Função de voltar da pagina de criar para tabela, e limpar o que havia sido adiciona ou marcado;
function DesmarcarCheckEPararDeExibirPaginaCriar(){
    document.getElementById("checkbox").checked = false;
    document.querySelector(".pagina-criar-kit").style.display = "none";

document.getElementById("InputKit").value = "";

    document.getElementById("item1").checked = false;
    document.getElementById("item2").checked = false;
    document.getElementById("item3").checked = false;
    document.getElementById("item4").checked = false;
    document.getElementById("item5").checked = false;
    document.getElementById("item6").checked = false;
    document.getElementById("item7").checked = false;
    document.getElementById("item8").checked = false;
    document.getElementById("item9").checked = false;
    document.getElementById("item10").checked = false;
    document.getElementById("item11").checked = false;
    document.getElementById("item12").checked = false;
    document.getElementById("item13").checked = false;
    document.getElementById("item14").checked = false;
    document.getElementById("item15").checked = false;
    document.getElementById("item16").checked = false;

}

//Vizualizar Kit e voltar para tabela
function MarcarCheckEVizualizarConteudoKit(){
    document.getElementById("checkbox-vizualizar-kit").checked = true;
    document.querySelector(".content-kit").style.display = "flex";
}
function DesmarcarCheckEPararDeVizualizar(){
    document.getElementById("checkbox-vizualizar-kit").checked = false;
    document.querySelector(".content-kit").style.display = "none";
}


//Editar kit Funções Abrir e voltar para tabela
function MarcarCheckEEditarConteudoKit(){
    document.getElementById("checkbox-editar-kit").checked = true;
    document.querySelector(".pagina-editar-kit").style.display = "flex";
}
function DesmarcarCheckEEditarConteudoKit(){
    document.getElementById("checkbox-editar-kit").checked = false;
    document.querySelector(".pagina-editar-kit").style.display = "none";
}
