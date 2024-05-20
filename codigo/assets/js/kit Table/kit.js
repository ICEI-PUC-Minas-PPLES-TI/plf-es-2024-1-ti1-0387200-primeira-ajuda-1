// Função abrir página de criar kits
function OpenCreatKitPage(){
    document.getElementById("checkbox").checked = true;
    document.querySelector(".creat-kits-page").style.display = "flex";
}

// Função que limpar os inputs
function ClearInput(){
    document.getElementById("Inputkit").value = "";

    for (let i = 1; i <= 16; i++) {
        let checkbox = document.getElementById(`item${i}`);
        if (checkbox) {
            checkbox.checked = false;
        }
    }
}

// Função de voltar da página de tabela, e limpar o que havia sido adicionado ou marcado na página de criar kit
function CleanCloseCreatKitPage(){
    document.getElementById("checkbox").checked = false;
    document.querySelector(".creat-kits-page").style.display = "none";
    ClearInput();
}


// Visualizar e ou editar kit, e voltar para página da tabela
function ViewOrEditKitContent(){
    document.getElementById("checkbox-edit-kit").checked = true;
    document.querySelector(".content-kit").style.display = "flex";
    marcarItensKitAoEditar()
}

function ReturnToTable(){
    document.getElementById("checkbox-edit-kit").checked = false;
    document.querySelector(".content-kit").style.display = "none";
}



// Função de criar id
function determinarId() {
    let id = parseInt(localStorage.getItem("id")) || 0;
    id++;
    localStorage.setItem("id", id);
    return id;
}



// Função que obtém os itens selecionados dos checkboxes e salva no localStorage
function atualizarItensKit() {
    // Selecionar os checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Inicializar o array de itens do kit
    const itensSelecionados = [];
    
    // Percorrer os checkboxes e adicionar os valores dos marcados ao array
    checkboxes.forEach(checkbox => {
        if (checkbox.checked && checkbox.id.startsWith('item')) {
            itensSelecionados.push(checkbox.value.toLowerCase());
        }
    });
    
    // Criar o objeto JSON do kit
    const kit = {
        id: determinarId(),
        nome: document.getElementById("Inputkit").value,
        itensKit: itensSelecionados
    };
    
    // Salvar o kit no localStorage
    let kits = JSON.parse(localStorage.getItem("kits")) || [];
    kits.push(kit);
    localStorage.setItem("kits", JSON.stringify(kits));
    
    // Retornar o objeto kit
    return kit;
}




// Função que salva os Kits e cria uma nova linha na tabela
function SaveNewKit(){
    // Pega o valor do input nome
    var kitname = document.getElementById("Inputkit").value;
    // Alerta caso não seja escrito o nome no input
    if (kitname === "") {
        alert("Por favor, preencha o nome do kit.");
        ClearInput();
        return;
    }
    
    // Obter itens selecionados e salvar no localStorage
    const kit = atualizarItensKit();
    
    // Declara que o NewRow é um tr que será adicionado ao HTML
    var NewRow = document.createElement("tr");
    // Declara que o tbody com id tablerow será representado pela variável tbody
    var tbody = document.getElementById("tablerow");
    // Declara o conteúdo do NewRow que será inserido no HTML
    NewRow.innerHTML = `
        <td><p class="kit-logo"><i class="fa-solid fa-kit-medical"></i></p></td>
        <td>${kit.nome}</td>
        <td>${BrazilDate}</td>
        <td>
            <button onclick="ViewOrEditKitContent()" class="button1" id="btn-editar"><i class="fa-solid fa-pen-to-square"></i></button>
            <input type="checkbox" id="checkbox-edit-kit">
            <button onclick="removerow(this)" class="button2" id="remove-kit"><i class="fa-solid fa-trash"></i></button>
            <input type="checkbox" id="checkbox-save-kit">
        </td>
    `;
    // Adiciona a linha da tabela, representada pelo NewRow, no tbody
    tbody.appendChild(NewRow);

    // Função que limpa os inputs
    ClearInput();
    // Parte que fecha a página de kit
    document.getElementById("checkbox").checked = false;
    document.querySelector(".creat-kits-page").style.display = "none";
}




// Função que apaga os kits e pede confirmação para apagar
function removerow(button) {
    const row = button.closest("tr");

    if (row) {
        const confirmacao = confirm("Tem certeza de que deseja apagar esse kit?");
        if (confirmacao) {
            const kitName = row.children[1].innerText;

            // Obtém os kits do localStorage
            let kits = JSON.parse(localStorage.getItem("kits")) || [];

            // Encontra o índice do kit a ser removido
            const indexToDelete = kits.findIndex(kit => kit.nome === kitName);

            if (indexToDelete !== -1) {
                // Remove o kit do array
                kits.splice(indexToDelete, 1);

                // Atualiza o localStorage
                localStorage.setItem("kits", JSON.stringify(kits));
            }

            // Remove a linha da tabela
            row.remove();
        }
    }
}




// Código que pega a data do dia atual e formata para data BR
var CurrentDate = new Date();
var day = CurrentDate.getDate();
var month = CurrentDate.getMonth() + 1;
var year = CurrentDate.getFullYear();
var BrazilDate = day + '/' + month + '/' + year;





// Função para carregar e exibir os kits do localStorage na tabela
function loadKits() {
    const kits = JSON.parse(localStorage.getItem("kits")) || [];
    const tbody = document.getElementById("tablerow");

    kits.forEach(kit => {
        const NewRow = document.createElement("tr");
        NewRow.innerHTML = `
            <td><p class="kit-logo"><i class="fa-solid fa-kit-medical"></i></p></td>
            <td>${kit.nome}</td>
            <td>${BrazilDate}</td>
            <td>
                <button onclick="ViewOrEditKitContent()" class="button1" id="btn-editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <input type="checkbox" id="checkbox-edit-kit">
                <button onclick="removerow(this)" class="button2" id="remove-kit"><i class="fa-solid fa-trash"></i></button>
                <input type="checkbox" id="checkbox-save-kit">
            </td>
        `;
        tbody.appendChild(NewRow);
    });
}

// Código que pega a data do dia atual e formata para data BR
var CurrentDate = new Date();
var day = CurrentDate.getDate();
var month = CurrentDate.getMonth() + 1;
var year = CurrentDate.getFullYear();
var BrazilDate = day + '/' + month + '/' + year;

// Carregar os kits do localStorage quando a página é carregada
document.addEventListener("DOMContentLoaded", loadKits);

