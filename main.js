// Função para ser chamada quando o formulário for enviado
function submitForm() {
    // Obter o nome do kit digitado
    var kitName = document.getElementById('kit-name').value;

    // Obter os itens selecionados no select
    var selectedItems = [];
    var select = document.getElementById('items');
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].selected) {
            selectedItems.push(select.options[i].value);
        }
    }

    // Criar um objeto para representar o kit
    var kit = {
        kitName: kitName,
        selectedItems: selectedItems
    };

    // Verificar se já existe algum dado armazenado no localStorage
    var kits = JSON.parse(localStorage.getItem('kits')) || [];

    // Adicionar o novo kit ao array de kits
    kits.push(kit);

    // Armazenar o array de kits atualizado no localStorage
    localStorage.setItem('kits', JSON.stringify(kits));

    // Esvaziar o campo de texto
    document.getElementById('kit-name').value = "";

    // Exibir uma mensagem de confirmação
    alert('Kit criado com sucesso e armazenado no localStorage!');
}