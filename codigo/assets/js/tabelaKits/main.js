// Função abrir página de criar kits
function OpenCreatKitPage() {
    document.getElementById("checkbox").checked = true;
    document.querySelector(".creat-kits-page").style.display = "flex";
}

// Função que limpar os inputs
function ClearInput() {
    document.getElementById("Inputkit").value = "";
    for (let i = 1; i <= 16; i++) {
        let checkbox = document.getElementById(`item${i}`);
        if (checkbox) {
            checkbox.checked = false;
        }
    }
}

// Função para fechar a página de criar kits
function CleanCloseCreatKitPage() {
    ClearInput();
    document.getElementById("checkbox").checked = false;
    document.querySelector(".creat-kits-page").style.display = "none";
}

// Função para salvar um novo kit
function SaveNewKit() {
    const kitName = document.getElementById("Inputkit").value.trim();
    if (!kitName) {
        alert("Por favor, insira um nome para o kit.");
        return;
    }

    const items = [];
    for (let i = 1; i <= 16; i++) {
        let checkbox = document.getElementById(`item${i}`);
        if (checkbox && checkbox.checked) {
            items.push(checkbox.value);
        }
    }

    const kits = JSON.parse(localStorage.getItem('kits')) || [];
    const newKit = {
        id: kits.length ? kits[kits.length - 1].id + 1 : 1,
        name: kitName,
        date: new Date().toLocaleDateString(),
        items: items
    };
    kits.push(newKit);
    localStorage.setItem('kits', JSON.stringify(kits));
    UpdateKitTable();
    CleanCloseCreatKitPage();
}

// Função para atualizar a tabela de kits
function UpdateKitTable() {
    const kits = JSON.parse(localStorage.getItem('kits')) || [];
    const tbody = document.getElementById("tablerow");
    tbody.innerHTML = "";
    kits.forEach(kit => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><i class="fa-solid fa-kit-medical"></i></td>
            <td>${kit.name}</td>
            <td>${kit.date}</td>
            <td>
                <button onclick="ViewOrEditKitContent(${kit.id})" class="button1" id="btn-editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="removerow(this, ${kit.id})" class="button2" id="remove-kit"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para marcar os itens do kit ao editar
function marcarItensKitAoEditar(kit) {
    for (let i = 1; i <= 16; i++) {
        let checkbox = document.getElementById(`edit-item${i}`);
        if (checkbox) {
            checkbox.checked = kit.items.includes(checkbox.value);
        }
    }
}

// Função para visualizar ou editar o conteúdo do kit
function ViewOrEditKitContent(kitId) {
    const kits = JSON.parse(localStorage.getItem('kits')) || [];
    const kit = kits.find(k => k.id === kitId);
    if (!kit) return;

    marcarItensKitAoEditar(kit);
    document.querySelector(".content-kit").style.display = "flex";
    document.querySelector('.item-kits').dataset.kitId = kit.id;
}

// Função para salvar o kit editado
function saveEditedKit() {
    const kits = JSON.parse(localStorage.getItem('kits')) || [];
    const kitId = document.querySelector('.item-kits').dataset.kitId;
    const kitIndex = kits.findIndex(k => k.id === parseInt(kitId));
    if (kitIndex === -1) return;

    const items = [];
    for (let i = 1; i <= 16; i++) {
        let checkbox = document.getElementById(`edit-item${i}`);
        if (checkbox && checkbox.checked) {
            items.push(checkbox.value);
        }
    }

    kits[kitIndex].items = items;
    localStorage.setItem('kits', JSON.stringify(kits));
    UpdateKitTable();
    ReturnToTable();
}

// Função para retornar à tabela de kits
function ReturnToTable() {
    document.querySelector(".content-kit").style.display = "none";
    document.querySelector(".kit-table").style.display = "block";
}

function removerow(button, kitId) {
    const row = button.closest("tr");

    if (row) {
        const confirmacao = confirm("Tem certeza de que deseja apagar esse kit?");
        if (confirmacao) {
            // Obtém os kits do localStorage
            let kits = JSON.parse(localStorage.getItem("kits")) || [];

            // Encontra o índice do kit a ser removido
            const indexToDelete = kits.findIndex(kit => kit.id === kitId);

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

// Inicializar a tabela de kits na página
document.addEventListener("DOMContentLoaded", function () {
    UpdateKitTable();
});
