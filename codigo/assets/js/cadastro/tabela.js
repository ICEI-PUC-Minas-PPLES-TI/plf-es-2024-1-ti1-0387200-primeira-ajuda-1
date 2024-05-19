function preencherTabela() {
  const dataTableBody = document.querySelector("#dataTable tbody");
  const usuarios = buscarUsuarios();

  usuarios.forEach((u) => {
    dataTableBody.innerHTML += `
        <tr>
          <td>${u.name}</td>
          <td>${u.phone}</td>
          <td>${u.city}</td>
          <td>${u.profession}</td>
          <td>${u.email}</td>
          <td>${u.password}</td>
          <td>
            <a href="${window.location.pathname}?id=${u.id}">Editar</a>
          </td>
          <td>
            <buttom onclick="deletarUsuario(${u.id})">Excluir</buttom>
          </td>
          <td>
            <a href="/codigo/pages/perfil.html?id=${u.id}" target="_blank"> Acessar Perfil </a>
          </td>
        </tr>
      `;
  });
}
1;

function preencherFormularioDeCadastro(id) {
  const usuario = buscarUsuario(id);
  if (!usuario) {
    window.location.href = window.location.pathname;
    return;
  }

  nameField.value = usuario.name;
  phoneField.value = usuario.phone;
  cityField.value = usuario.city;
  professionField.value = usuario.profession;
  emailField.value = usuario.email;
  passwordField.value = usuario.password;
}

window.onload = () => {
  preencherTabela();

  const urlSearchParams = new URLSearchParams(window.location.search);
  if (urlSearchParams.has("id")) {
    preencherFormularioDeCadastro(urlSearchParams.get("id"));
  }
};
