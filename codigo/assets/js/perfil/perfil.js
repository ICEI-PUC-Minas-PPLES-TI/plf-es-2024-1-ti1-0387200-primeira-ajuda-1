function buscarUsuarios() {
  const localStorageUsuarios = localStorage.getItem("usuarios");
  const usuarios = localStorageUsuarios ? JSON.parse(localStorageUsuarios) : [];
  return usuarios;
}

function buscarUsuario(id) {
  const usuarios = buscarUsuarios();
  const usuario = usuarios.find((u) => u.id == id);
  return usuario;
}

function preencherPerfil() {
  const buscarParametro = new URLSearchParams(window.location.search);
  const id = buscarParametro.get("id");
  const usuario = buscarUsuario(id);

  if (!usuario) return;

  // preencher os campos do perfil
  document.querySelector("#nome").value = usuario.name;
  document.querySelector("#telefone").value = usuario.phone;
  document.querySelector("#cidade").value = usuario.city;
  document.querySelector("#email").value = usuario.email;
  document.querySelector("#senha").value = usuario.password;
  document.querySelector("#profissao").value = usuario.profession;
}

window.onload = preencherPerfil;

btn.addEventListener('click', () => {
    alert('Dados alterados com sucesso');
});
