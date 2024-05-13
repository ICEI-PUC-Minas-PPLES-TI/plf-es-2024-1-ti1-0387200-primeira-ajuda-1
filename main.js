function submitForm() {
    const kitName = document.getElementById('kit-name').value;
    alert('Nome do Kit é ' + kitName);
    function submitForm() {
        const kitName = document.getElementById('kit-name').value;
        const itemsSelect = document.getElementById('items');
        const selectedItems = Array.from(itemsSelect.selectedOptions).map(option => option.value);
    
        alert('Nome do Kit é ' + kitName);
        alert('Itens selecionados: ' + selectedItems.join(', '));
    }
    
}
