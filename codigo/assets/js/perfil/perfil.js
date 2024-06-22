import { getUsuario, updateUsuario } from '../../services/perfilService.js'

async function preencherPerfil() {
    const buscarParametro = new URLSearchParams(window.location.search);
    const id = buscarParametro.get("id");
    
    if (!id) {
        console.error("ID do usuário não fornecido na URL");
        return;
    }

    const usuario = await getUsuario(id);

    if (!usuario) {
        console.error("Usuário não encontrado");
        return;
    }

    // preencher os campos do perfil
    document.querySelector("#nome").value = usuario.name;
    document.querySelector("#telefone").value = usuario.phone;
    document.querySelector("#cidade").value = usuario.city;
    document.querySelector("#email").value = usuario.email;
    document.querySelector("#senha").value = usuario.password;
    document.querySelector("#profissao").value = usuario.profession;
}

document.getElementById('form-perfil').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
        console.error("ID do usuário não fornecido na URL");
        return;
    }

    const usuarioAtualizado = {
        name: document.querySelector("#nome").value,
        phone: document.querySelector("#telefone").value,
        city: document.querySelector("#cidade").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#senha").value,
        profession: document.querySelector("#profissao").value
    };

    await updateUsuario(id, usuarioAtualizado);
    alert('Dados alterados com sucesso');
});

window.onload = preencherPerfil;